import { ActiveSensor } from "../../../shared/devices/active-sensor";
import { DeviceType, IDevice } from "../../../shared/devices/device-interface";
import { EnvDevice } from "../../../shared/devices/env-device";
import { Sensor } from "../../../shared/devices/sensor";
import { Environment } from "../../environment/environment";
import { PlanEntry } from "../../../shared/plans/plans";
import { Subcomponent } from "../subcomponent";
import { ISubcomponent } from "../subcomponent-interface";

export class IlluminationSubcomponent extends Subcomponent {
  constructor(types: DeviceType[]) {
    super();

    let x = 10;
    let y = 65;

    const propogateCoords = () => {
      x += this.xAddition;
      if (x > 90) {
        y += this.yAddition;
        x = 10;
      }
    };

    types.forEach((type) => {
      if (type == DeviceType.IlluminationEnvDevice) {
        let newDevice = new EnvDevice(type, "%", 100, x, y);
        this.envDevices.push(newDevice);
        propogateCoords();
        Environment.getInstance().registerIlluminationSource(
          newDevice.getSource
        );
      } else if (type == DeviceType.IllumintionSensor) {
        let newSensor = new Sensor(
          type,
          "%",
          Environment.getInstance().getIllumination.bind(
            Environment.getInstance()
          ),
          x,
          y
        );
        propogateCoords();
        this.sensors.push(newSensor);
      }
    });
  }

  ping(): ISubcomponent {
    if (this.sensors.length == 0) {
      return;
    }
    let value = this.sensors[0].getValue();

    if (value < this.idealValue) {
      this.envDevices.find((elem) => !elem.getActive()).turnOn();
    } else if (value > this.idealValue) {
      this.envDevices.find((elem) => elem.getActive()).turnOff();
    }

    return this;
  }

  alert(entry: PlanEntry): ISubcomponent {
    this.idealValue = entry.illumination;

    return this;
  }
}
