import { DeviceType, IDevice } from "../../shared/devices/device-interface";
import { PlanEntry } from "../../shared/plans/plans";
import { MockSubcomponent } from "./element-subcomsponents/mock-subsystem";
import { ISubcomponent } from "./element-subcomsponents/subcomponent";
import { TemperatureSubcomponent } from "./element-subcomsponents/temperature-subcomponent";

export class DevicesComponent {
  private subcomponents: ISubcomponent[] = [];

  clear() {
    this.subcomponents = [];
  }

  reset(types: DeviceType[]) {
    this.clear();
    this.subcomponents.push(new TemperatureSubcomponent(types));
    return this;
  }

  getDevices() {
    let ret: IDevice[] = [];

    this.subcomponents.forEach((subcomponent) => {
      ret = ret.concat(subcomponent.getDevices());
    });

    return ret;
  }

  ping() {
    this.subcomponents.forEach((subcomponent) => subcomponent.ping());
    return this;
  }

  alert(entry: PlanEntry) {
    // console.log(entry);
    this.subcomponents.forEach((subcomponent) => subcomponent.alert(entry));
    return this;
  }
}
