import { PlanTablePresentationData } from "../../../shared/common-types";
import { BaseComponent } from "../base-component";

export class PlanListElementComponent extends BaseComponent {
  constructor(data: PlanTablePresentationData) {
    super("div");
    let name = document.createElement("p");
    name.innerHTML = data.name;
    let deviceString = "";
    data.devices.forEach((element, index) => {
      if (index != data.devices.length - 1) {
        deviceString += element + ", ";
      } else {
        deviceString += element;
      }
    });
    let devices = document.createElement("p");
    devices.innerHTML = deviceString;
    this.element.appendChild(name);
    this.element.appendChild(devices);
  }
}
