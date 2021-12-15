import { Plan } from "../shared/plans/plans";
import { IDevice } from "./devices/device-interface";

export interface IModel {
  init(): Promise<void>;
  startGrowth(planName: string): IModel;
  stopGrowth(): IModel;
  getPlans(): Plan[];

  addDeviceUpdateListener(callback: (devices: IDevice[]) => void): IModel;
  addInternalStopGrowthListener(callback: () => void): IModel;
  clearDeviceUpdateListeners(): IModel;
  clearInternalStopGrowthListeners(): IModel;
}
