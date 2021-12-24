import { ActiveSensor } from "../../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../../shared/devices/device-interface";
import { EnvDevice } from "../../../shared/devices/env-device";
import { Sensor } from "../../../shared/devices/sensor";
import { Environment } from "../../environment/environment";
import { PlanEntry } from "../../../shared/plans/plans";
import { Subcomponent } from "../subcomponent";
import { ISubcomponent } from "../subcomponent-interface";

export class TemperatureSubcomponent extends Subcomponent {
  constructor(types: DeviceType[]) {
    super();

    let x = 10;
    let y = 10;
    types.forEach((type) => {
      if (type == DeviceType.TemperatureEnvDevice) {
        let newDevice = new EnvDevice(type, "DegC", 70);
        this.envDevices.push(newDevice);
        Environment.getInstance().registerTemperatureSource(
          newDevice.getSource
        );
      } else if (type == DeviceType.TemperatureSensor) {
        let newSensor = new Sensor(
          type,
          "DegC",
          Environment.getInstance().getTemperature.bind(
            Environment.getInstance()
          )
        );
        this.sensors.push(newSensor);
      }
    });
  }

  alert(entry: PlanEntry): ISubcomponent {
    this.idealValue = entry.temperature;

    return this;
  }
}
