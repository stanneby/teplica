import {
  DevicePresentationData,
  GrowthPresentationData,
} from "../../../shared/common-types";
import { Page } from "./page";
import { ISettableInterface } from "../../settable-interface";
import { DeviceComponent } from "../device/device-component";
import "./page.css";

export class GrowthPage extends Page implements ISettableInterface {
  private devices: DeviceComponent[] = [];

  constructor() {
    super(["growth-page"]);
  }

  setData(data: GrowthPresentationData[]) {
    data[0]?.devices.forEach((deviceData) => {
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
