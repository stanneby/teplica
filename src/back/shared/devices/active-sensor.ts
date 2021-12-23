import { Device } from "./device";
import { DevicePayload, DeviceType, IDevice } from "./device-interface";

export class ActiveSensor extends Device {
  min: number;
  max: number;

  constructor(type: DeviceType, measure: string) {
    super(type, measure);
  }

  getPayload(): DevicePayload {
    let payload = {} as DevicePayload;

    return payload;
  }
}
