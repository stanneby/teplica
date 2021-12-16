import { IDevice } from "../../../shared/devices/device-interface";

export interface ISubcomponent {
  getDevices(): IDevice[];
}
