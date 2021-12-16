import { Plan } from "../shared/plans/plans";
import { PlansComponent } from "./components/plan-component";
import { IDevice } from "../shared/devices/device-interface";
import { IModel } from "./model-interface";

export class Model implements IModel {
  private plansComponent: PlansComponent;

  constructor() {
    this.plansComponent = new PlansComponent();
  }

  async init(): Promise<void> {
    await this.plansComponent.loadPlansFromDefaultFile();
  }
  startGrowth(planName: string): IModel {
    throw new Error("Method not implemented.");
  }
  stopGrowth(): IModel {
    throw new Error("Method not implemented.");
  }
  getPlans(): Plan[] {
    return this.plansComponent.getPlans();
  }

  addDeviceUpdateListener(callback: (devices: IDevice[]) => void): IModel {
    throw new Error("Method not implemented.");
  }
  addInternalStopGrowthListener(callback: () => void): IModel {
    throw new Error("Method not implemented.");
  }
  clearDeviceUpdateListeners(): IModel {
    throw new Error("Method not implemented.");
  }
  clearInternalStopGrowthListeners(): IModel {
    throw new Error("Method not implemented.");
  }
}
