import { Plan, PlanEntry } from "../shared/plans/plans";
import { PlansComponent } from "./components/plan-component";
import { IDevice } from "../shared/devices/device-interface";
import { IModel } from "./model-interface";
import { DevicesComponent } from "./components/device-component";
import { Environment } from "./environment/environment";
import { TimerComponent } from "./components/timer-component";

export class Model implements IModel {
  private plansComponent: PlansComponent;
  private devicesComponent: DevicesComponent;
  private timerComponent: TimerComponent;

  private checkInterval: NodeJS.Timer;
  private timeout: number = 5000;
  private updateCallbacks: ((
    devices: IDevice[],
    entry: PlanEntry,
    timestamp: number
  ) => void)[] = [];
  private internalStopCallbacks: (() => void)[] = [];

  constructor() {
    this.plansComponent = new PlansComponent();
    this.devicesComponent = new DevicesComponent();
    this.timerComponent = new TimerComponent();
  }

  async init(): Promise<void> {
    await this.plansComponent.loadPlansFromDefaultFile();
  }
  startGrowth(planName: string): IModel {
    Environment.getInstance().start();
    this.plansComponent.reset(planName);
    this.timerComponent.reset();
    this.devicesComponent.reset(this.plansComponent.getPlan().deviceTypes);

    let cycleProcess = () => {
      let entry = this.timerComponent.chooseEntry(
        this.plansComponent.getPlan()
      );
      if (!entry) {
        this.stopGrowth();
        this.callInternalStopGrowthListeners();
        return;
      }
      this.plansComponent.setEntry(entry);
      this.devicesComponent.alert(entry);

      this.devicesComponent.ping();
      this.updateCallbacks.forEach((callback) => {
        callback(
          this.devicesComponent.getDevices(),
          this.plansComponent.getEntry(),
          this.timerComponent.getCurrentTime()
        );
      });
    };

    cycleProcess();
    this.checkInterval = setInterval(cycleProcess, this.timeout);

    return this;
  }

  stopGrowth(): IModel {
    Environment.getInstance().stop();
    clearInterval(this.checkInterval);
    this.clearDeviceUpdateListeners();

    return this;
  }

  getPlans(): Plan[] {
    return this.plansComponent.getPlans();
  }

  addDeviceUpdateListener(
    callback: (devices: IDevice[], entry: PlanEntry, timestamp: number) => void
  ): IModel {
    this.updateCallbacks.push(callback);

    return this;
  }
  addInternalStopGrowthListener(callback: () => void): IModel {
    this.internalStopCallbacks.push(callback);

    return this;
  }

  callInternalStopGrowthListeners() {
    this.internalStopCallbacks.forEach((callback) => callback());
  }

  clearDeviceUpdateListeners(): IModel {
    this.updateCallbacks = [];

    return this;
  }
  clearInternalStopGrowthListeners(): IModel {
    this.internalStopCallbacks = [];

    return this;
  }
}
