import { DeviceType } from "../../../shared/devices/device-interface";
import { MockDevice } from "../../../shared/devices/mock/mock-device";
import { PlanEntry } from "../../../shared/plans/plans";
import { ISubcomponent } from "../subcomponent-interface";

export class MockSubcomponent implements ISubcomponent {
  private devices: MockDevice[] = [];
  private currentId: number = 0;

  constructor(types: DeviceType[]) {
    types.forEach((type) => {
      this.devices.push(new MockDevice(`${++this.currentId}`, type));
    });
  }
  alert(entry: PlanEntry): ISubcomponent {
    throw new Error("Method not implemented.");
  }
  ping(): ISubcomponent {
    throw new Error("Method not implemented.");
  }

  getDevices() {
    return this.devices;
  }
}
