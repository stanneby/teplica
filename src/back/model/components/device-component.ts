import { DeviceType, IDevice } from "../../shared/devices/device-interface";
import { PlanEntry } from "../../shared/plans/plans";
import { HumiditySubcomponent as HumiditySubcomponent } from "./element-subcomsponents/humidity-subcomponent";
import { MockSubcomponent } from "./element-subcomsponents/mock-subsystem";
import { ISubcomponent } from "./subcomponent-interface";
import { TemperatureSubcomponent } from "./element-subcomsponents/temperature-subcomponent";
import { IlluminationSubcomponent } from "./element-subcomsponents/illumination-subcomponent";
import { PHSubcomponent } from "./element-subcomsponents/ph-subcoponent";

export class DevicesComponent {
  private subcomponents: ISubcomponent[] = [];

  clear() {
    this.subcomponents = [];
  }

  reset(types: DeviceType[]) {
    this.clear();
    this.subcomponents.push(new TemperatureSubcomponent(types));
    this.subcomponents.push(new HumiditySubcomponent(types));
    this.subcomponents.push(new IlluminationSubcomponent(types));
    this.subcomponents.push(new PHSubcomponent(types));
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
