import { PlanTablePresentationData } from "../../../shared/common-types";
import { BaseComponent } from "../base-component";
import "./plan-list.css";

export class PlanListElementComponent extends BaseComponent {
  constructor(data: PlanTablePresentationData) {
    super("div", ["row"]);
    let name = document.createElement("p");
    name.innerHTML = data.name;
    name.classList.add("row-col");
    name.classList.add("name");
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
    devices.classList.add("row-col");
    devices.classList.add("devices");
    this.element.appendChild(name);
    this.element.appendChild(devices);
  }
}
