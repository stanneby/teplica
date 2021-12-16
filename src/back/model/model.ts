import { Plan } from "../shared/plans/plans";
import { PlansComponent } from "./components/plan-component";
import { IDevice } from "../shared/devices/device-interface";
import { IModel } from "./model-interface";
import { DevicesComponent } from "./components/device-component";

export class Model implements IModel {
  private plansComponent: PlansComponent;
  private devicesComponent: DevicesComponent;

  private checkInterval: NodeJS.Timer;
  private timeout: number = 5000;
  private updateCallbacks: ((devices: IDevice[]) => void)[] = [];

  constructor() {
    this.plansComponent = new PlansComponent();
    this.devicesComponent = new DevicesComponent();
  }

  async init(): Promise<void> {
    await this.plansComponent.loadPlansFromDefaultFile();
  }
  startGrowth(planName: string): IModel {
    this.devicesComponent.reset(
      this.plansComponent.findPlanByName(planName).deviceTypes
    );

    let triggerCallbacks = () => {
      this.updateCallbacks.forEach((callback) => {
        callback(this.devicesComponent.getDevices());
      });
    };

    triggerCallbacks();
    this.checkInterval = setInterval(triggerCallbacks, this.timeout);

    return this;
  }
  stopGrowth(): IModel {
    clearInterval(this.checkInterval);

    return this;
  }

  getPlans(): Plan[] {
    return this.plansComponent.getPlans();
  }

  addDeviceUpdateListener(callback: (devices: IDevice[]) => void): IModel {
    this.updateCallbacks.push(callback);

    return this;
  }
  addInternalStopGrowthListener(callback: () => void): IModel {
    throw new Error("Method not implemented.");
  }
  clearDeviceUpdateListeners(): IModel {
    this.updateCallbacks = [];

    return this;
  }
  clearInternalStopGrowthListeners(): IModel {
    throw new Error("Method not implemented.");
  }
}
