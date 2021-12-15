import { Plan } from "../shared/common-types";
import { IDevice } from "./devices/device-interface";

export interface IModel {
  init(): IModel;
  startGrowth(planName: string): IModel;
  stopGrowth(): IModel;
  getTables(): Plan[];

  addDeviceUpdateListener(callback: (devices: IDevice[]) => void): IModel;
  addInternalStopGrowthListener(callback: () => void): IModel;
  clearDeviceUpdateListeners(): IModel;
  clearInternalStopGrowthListeners(): IModel;
}
