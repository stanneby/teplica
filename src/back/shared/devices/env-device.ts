import { Environment } from "../environment/environment";
import { SourceParam } from "../environment/sourceParam";
import { Device } from "./device";
import { DevicePayload, DeviceType, IDevice } from "./device-interface";

export class EnvDevice extends Device {
  private value = 70;
  private active: boolean = false;

  getSource = () => {
    let source = {} as SourceParam;

    source.active = this.active;
    source.value = this.value;

    return source;
  };

  constructor(type: DeviceType, measure: string) {
    super(type, measure);
  }

  turnOn(): IDevice {
    this.active = true;
    return this;
  }
  turnOff(): IDevice {
    this.active = false;
    return this;
  }

  getPayload(): DevicePayload {
    let payload = {} as DevicePayload;
    payload.active = this.active;
    payload.value = this.value;

    return payload;
  }
}
