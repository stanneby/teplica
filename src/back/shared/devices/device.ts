import { getRandomInt } from "../../../shared/mock/mock";
import { DevicePayload, DeviceType, IDevice } from "./device-interface";

export class Device implements IDevice {
  static idCount = 0;

  id: string;
  type: DeviceType;
  measureUnit: string;
  x: number;
  y: number;

  constructor(
    type: DeviceType,
    measureUnit: string,
    x = getRandomInt(),
    y = getRandomInt()
  ) {
    this.id = (Device.idCount++).toString();
    this.type = type;
    this.measureUnit = measureUnit;
    this.x = x;
    this.y = y;
  }

  getPayload(): DevicePayload {
    throw new Error("Method not implemented.");
  }
}
