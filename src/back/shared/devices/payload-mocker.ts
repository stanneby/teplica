import { getRandomInt } from "../../../shared/mock/mock";
import { DevicePayload } from "./device-interface";

export class PayloadMocker {
  get() {
    let payload = {} as DevicePayload;
    payload.value = getRandomInt(100);
    payload.active = getRandomInt(100) > 50;

    return payload;
  }
}
