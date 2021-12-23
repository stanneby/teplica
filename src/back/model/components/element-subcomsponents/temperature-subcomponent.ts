import { ActiveSensor } from "../../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../../shared/devices/device-interface";
import { EnvDevice } from "../../../shared/devices/env-device";
import { Sensor } from "../../../shared/devices/sensor";
import { Environment } from "../../../shared/environment/environment";
import { PlanEntry } from "../../../shared/plans/plans";
import { ISubcomponent } from "./subcomponent";

export class TemperatureSubcomponent implements ISubcomponent {
  private envDevices: EnvDevice[] = [];
  private sensors: Sensor[] = [];
  private activeSensors: ActiveSensor[] = [];
  private idealTemperature: number = 0;
  private maxDivergence: number = 10;

  constructor(types: DeviceType[]) {
    let x = 10;
    let y = 10;
    types.forEach((type) => {
      if (type == DeviceType.TemperatureEnvDevice) {
        let newDevice = new EnvDevice(type, "DegC");
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

  getDevices(): IDevice[] {
    let devices: IDevice[] = [];
    devices = devices.concat(this.envDevices);
    devices = devices.concat(this.sensors);

    return devices;
  }

  ping(): ISubcomponent {
    let value = this.sensors[0].getValue();
    if (Math.abs(this.idealTemperature - value) > this.maxDivergence) {
      this.envDevices.forEach((elem) => elem.turnOn());
    } else {
      this.envDevices.forEach((elem) => elem.turnOff());
    }

    return this;
  }

  alert(entry: PlanEntry): ISubcomponent {
    this.idealTemperature = entry.temperature;

    return this;
  }
}
