import { getRandomInt } from "../../../shared/mock/mock";
import { Device } from "./device";
import { DevicePayload, DeviceType, IDevice } from "./device-interface";

export class Sensor extends Device {
  constructor(
    type: DeviceType,
    measure: string,
    private getValueCallBack: () => number,
    x = getRandomInt(),
    y = getRandomInt()
  ) {
    super(type, measure, x, y);
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
