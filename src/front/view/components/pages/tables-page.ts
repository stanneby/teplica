import { DevicePresentationData } from "../../../shared/common-types";
import { BaseComponent } from "../base-component";
import { Page } from "./page";
import { ISettableInterface } from "../../settable-interface";

export class TablesPage extends Page implements ISettableInterface {
  constructor() {
    super();
    this.element.innerHTML = "Table";
  }

  setData(data: DevicePresentationData) {
    console.log(data);
    return this;
  }
}
