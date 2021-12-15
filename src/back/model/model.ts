import { Plan } from "../shared/common-types";
import { IDevice } from "./devices/device-interface";
import { IModel } from "./model-interface";

export class Model implements IModel {
  init(): IModel {
    throw new Error("Method not implemented.");
  }
  startGrowth(planName: string): IModel {
    throw new Error("Method not implemented.");
  }
  stopGrowth(): IModel {
    throw new Error("Method not implemented.");
  }
  getTables(): Plan[] {
    throw new Error("Method not implemented.");
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
