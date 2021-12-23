import { IDevice } from "../../../shared/devices/device-interface";
import { PlanEntry } from "../../../shared/plans/plans";

export interface ISubcomponent {
  getDevices(): IDevice[];

  ping(): ISubcomponent;
  alert(entry: PlanEntry): ISubcomponent;
}
