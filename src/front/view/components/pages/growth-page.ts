import { DevicePresentationData } from "../../../shared/common-types";
import { Page } from "./page";
import { ISettableInterface } from "../../settable-interface";
import { DeviceComponent } from "../device/device-component";

export class GrowthPage extends Page implements ISettableInterface {
  private devices: DeviceComponent[] = [];

  constructor() {
    super();
    this.element.innerHTML = "Growth";
  }

  setData(data: DevicePresentationData[]) {
    console.log(this.devices);
    data.forEach((deviceData) => {
      let deviceListed = this.findAmongDevices(deviceData);
      if (deviceListed) {
        deviceListed.update(deviceData);
      } else {
        this.devices.push(
          new DeviceComponent(deviceData).render(
            this.element
          ) as DeviceComponent
        );
      }
    });
    return this;
  }

  findAmongDevices(device: DevicePresentationData): DeviceComponent {
    return this.devices.find((element) => {
      return element.id == device.id;
    });
  }
}
