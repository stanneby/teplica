import { ActiveSensor } from "../../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../../shared/devices/device-interface";
import { EnvDevice } from "../../../shared/devices/env-device";
import { Sensor } from "../../../shared/devices/sensor";
import { Environment } from "../../environment/environment";
import { PlanEntry } from "../../../shared/plans/plans";
import { Subcomponent } from "../subcomponent";
import { ISubcomponent } from "../subcomponent-interface";

export class HumiditySubcomponent extends Subcomponent {
  constructor(types: DeviceType[]) {
    super();

    let x = 10;
    let y = 35;

    const propogateCoords = () => {
      x += this.xAddition;
      if (x > 90) {
        y += this.yAddition;
        x = 10;
      }
    };

    types.forEach((type) => {
      if (type == DeviceType.HumidityEnvDevice) {
        console.log(x);
        console.log(y);
        let newDevice = new EnvDevice(type, "%", 100, x, y);
        this.envDevices.push(newDevice);
        propogateCoords();
        Environment.getInstance().registerHumiditySource(newDevice.getSource);
      } else if (type == DeviceType.HumiditySensor) {
        let newSensor = new Sensor(
          type,
          "%",
          Environment.getInstance().getHumidity.bind(Environment.getInstance()),
          x,
          y
        );
        propogateCoords();
        this.sensors.push(newSensor);
      }
    });
  }

  alert(entry: PlanEntry): ISubcomponent {
    this.idealValue = entry.humidity;

    return this;
  }
}
