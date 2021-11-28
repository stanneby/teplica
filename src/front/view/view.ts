import { PlanTable } from "../../shared/common-types";
import { ViewDeviceData } from "../utils/common-types";
import { WindowComponent } from "./components/window/window-component";
import { IView } from "./view-interface";

export class View implements IView {
  private readonly root: HTMLElement;

  constructor() {
    this.root = document.getElementById("app");
    if (!this.root) throw Error("App root element not found");

    new WindowComponent().render(this.root);
  }

  setMode(mode: number): IView {
    return this;
  }

  givePlanTables(data: PlanTable[]): IView {
    return this;
  }

  setPlanTable(data: PlanTable): IView {
    return this;
  }

  updateDevices(data: ViewDeviceData[]): IView {
    return this;
  }
}
