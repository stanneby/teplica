import { Environment } from "../../model/environment/environment";
import { SourceParam } from "../../model/environment/sourceParam";
import { Device } from "./device";
import { DevicePayload, DeviceType, IDevice } from "./device-interface";

export class EnvDevice extends Device {
  private active: boolean = false;
  getActive() {
    return this.active;
  }

  getSource = () => {
    let source = {} as SourceParam;

    source.active = this.active;
    source.value = this.value;

    return source;
  };

  constructor(type: DeviceType, measure: string, private value = 100) {
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
