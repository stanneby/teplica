import { Plan, PlanEntry } from "../shared/plans/plans";
import { IDevice } from "../shared/devices/device-interface";

export interface IModel {
  init(): Promise<void>;
  startGrowth(planName: string): IModel;
  stopGrowth(): IModel;
  getPlans(): Plan[];

  addDeviceUpdateListener(
    callback: (devices: IDevice[], entry: PlanEntry) => void
  ): IModel;
  addInternalStopGrowthListener(callback: () => void): IModel;
  clearDeviceUpdateListeners(): IModel;
  clearInternalStopGrowthListeners(): IModel;
}
