import { getRandomInt } from "../../../../shared/mock/mock";
import { DevicePayload, DeviceType, IDevice } from "../device-interface";
import { PayloadMocker } from "./payload-mocker";

export class MockDevice implements IDevice {
  id: string;
  type: DeviceType;
  measureUnit: string;
  x: number;
  y: number;

  constructor(id: string, type: DeviceType) {
    this.id = id;
    this.type = type;

    this.init();
  }

  private init() {
    this.x = getRandomInt(100);
    this.y = getRandomInt(100);
  }

  getPayload(): DevicePayload {
    return new PayloadMocker().get();
  }

  start(): IDevice {
    throw new Error("Method not implemented.");
  }
  stop(): IDevice {
    throw new Error("Method not implemented.");
  }
}
