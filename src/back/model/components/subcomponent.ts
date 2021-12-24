import { ActiveSensor } from "../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../shared/devices/device-interface";
import { EnvDevice } from "../../shared/devices/env-device";
import { Sensor } from "../../shared/devices/sensor";
import { Environment } from "../environment/environment";
import { PlanEntry } from "../../shared/plans/plans";
import { ISubcomponent } from "./subcomponent-interface";

export class Subcomponent implements ISubcomponent {
  protected envDevices: EnvDevice[] = [];
  protected sensors: Sensor[] = [];
  protected activeSensors: ActiveSensor[] = [];
  protected idealValue: number = 0;
  protected maxDivergence: number = 10;

  getDevices(): IDevice[] {
    let devices: IDevice[] = [];
    devices = devices.concat(this.envDevices);
    devices = devices.concat(this.sensors);

    return devices;
  }

  ping(): ISubcomponent {
    if (this.sensors.length == 0) {
      return;
    }
    let value = this.sensors[0].getValue();

    if (value < this.idealValue) {
      this.envDevices.forEach((elem) => elem.turnOn());
    } else if (value > this.idealValue) {
      this.envDevices.forEach((elem) => elem.turnOff());
    } else if (Math.abs(this.idealValue - value) < this.maxDivergence) {
      this.envDevices.forEach((elem) => elem.turnOff());
    }

    return this;
  }

  alert(entry: PlanEntry): ISubcomponent {
    return this;
  }
}
