import { ActiveSensor } from "../../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../../shared/devices/device-interface";
import { EnvDevice } from "../../../shared/devices/env-device";
import { Sensor } from "../../../shared/devices/sensor";
import { Environment } from "../../../shared/environment/environment";
import { PlanEntry } from "../../../shared/plans/plans";
import { Subcomponent } from "../subcomponent";
import { ISubcomponent } from "../subcomponent-interface";

export class HumiditySubcomponent extends Subcomponent {
  constructor(types: DeviceType[]) {
    super();

    let x = 10;
    let y = 10;
    types.forEach((type) => {
      if (type == DeviceType.HumidityEnvDevice) {
        let newDevice = new EnvDevice(type, "%");
        this.envDevices.push(newDevice);
        Environment.getInstance().registerHumiditySource(newDevice.getSource);
      } else if (type == DeviceType.HumiditySensor) {
        let newSensor = new Sensor(
          type,
          "%",
          Environment.getInstance().getHumidity.bind(Environment.getInstance())
        );
        this.sensors.push(newSensor);
      }
    });
  }

  alert(entry: PlanEntry): ISubcomponent {
    this.idealValue = entry.humidity;

    return this;
  }
}
