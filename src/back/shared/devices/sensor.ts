import { Device } from "./device";
import { DevicePayload, DeviceType, IDevice } from "./device-interface";

export class Sensor extends Device {
  constructor(
    type: DeviceType,
    measure: string,
    private getValueCallBack: () => number
  ) {
    super(type, measure);
  }

  getPayload(): DevicePayload {
    let payload = {} as DevicePayload;
    payload.value = this.getValueCallBack();

    return payload;
  }

  getValue(): number {
    return this.getValueCallBack();
  }
}
