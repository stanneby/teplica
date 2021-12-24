import { IDevice } from "../../shared/devices/device-interface";
import { EnvDevice } from "../../shared/devices/env-device";
import { Sensor } from "../../shared/devices/sensor";
import { PlanEntry } from "../../shared/plans/plans";

export interface ISubcomponent {
  getDevices(): IDevice[];

  ping(): ISubcomponent;
  alert(entry: PlanEntry): ISubcomponent;
}
