import { DevicePresentationData } from "../../../shared/common-types";
import { Page } from "./page";
import { ISettableInterface } from "../../settable-interface";

export class GrowthPage extends Page implements ISettableInterface {
  constructor() {
    super();
    this.element.innerHTML = "Growth";
  }

  setData(data: DevicePresentationData) {
    console.log(data);
    return this;
  }
}
