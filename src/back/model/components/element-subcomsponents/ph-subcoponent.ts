import { ActiveSensor } from "../../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../../shared/devices/device-interface";
import { EnvDevice } from "../../../shared/devices/env-device";
import { Sensor } from "../../../shared/devices/sensor";
import { Environment } from "../../environment/environment";
import { PlanEntry } from "../../../shared/plans/plans";
import { Subcomponent } from "../subcomponent";
import { ISubcomponent } from "../subcomponent-interface";

export class PHSubcomponent extends Subcomponent {
  protected maxDivergence: number = 0.3;
  constructor(types: DeviceType[]) {
    super();

    let x = 10;
    let y = 95;

    const propogateCoords = () => {
      x += this.xAddition;
      if (x > 90) {
        y += this.yAddition;
        x = 10;
      }
    };

    types.forEach((type) => {
      if (type == DeviceType.PHEnvDevice) {
        let newDevice = new EnvDevice(type, "pH", 8, x, y);
        this.envDevices.push(newDevice);
        propogateCoords();
        Environment.getInstance().registerpHSource(newDevice.getSource);
      } else if (type == DeviceType.PHSensor) {
        let newSensor = new Sensor(
          type,
          "pH",
          Environment.getInstance().getpH.bind(Environment.getInstance()),
          x,
          y
        );
        propogateCoords();
        this.sensors.push(newSensor);
      }
    });
  }

  alert(entry: PlanEntry): ISubcomponent {
    this.idealValue = entry.pH;

    return this;
  }
}
