import { DeviceType } from "../../../shared/devices/device-interface";
import { MockDevice } from "../../../shared/devices/mock-device";
import { ISubcomponent } from "./subcomponent";

export class MockSubcomponent implements ISubcomponent {
  private devices: MockDevice[] = [];
  private currentId: number = 0;

  constructor(types: DeviceType[]) {
    types.forEach((type) => {
      this.devices.push(new MockDevice(`${++this.currentId}`, type));
    });
  }

  getDevices() {
    return this.devices;
  }
}
