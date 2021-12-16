import { DeviceType, IDevice } from "../../shared/devices/device-interface";
import { MockSubcomponent } from "./element-subcomsponents/mock-subsystem";
import { ISubcomponent } from "./element-subcomsponents/subcomponent";

export class DevicesComponent {
  private subcomponents: ISubcomponent[] = [];

  clear() {
    this.subcomponents = [];
  }

  reset(types: DeviceType[]) {
    this.clear();
    this.subcomponents.push(new MockSubcomponent(types));
  }

  getDevices() {
    let ret: IDevice[] = [];

    this.subcomponents.forEach((subcomponent) => {
      ret = ret.concat(subcomponent.getDevices());
    });

    return ret;
  }
}
