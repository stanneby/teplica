import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../../../shared/common-types";
import { BaseComponent } from "../base-component";
import { Page } from "./page";
import { ISettableInterface } from "../../settable-interface";
import { PlanListComponent } from "../plan-list/plan-list-component";
import { ButtonGroupComponent } from "../button-group/button-group";
import { CustomizableButton } from "../button/customizable-button";

export class TablesPage extends Page implements ISettableInterface {
  private table: PlanListComponent;
  private data: PlanTablePresentationData[];
  private buttons: ButtonGroupComponent;
  private planIndex: number;

  constructor() {
    super();
  }

  setData(data: PlanTablePresentationData[]) {
    this.data = data;
    if (this.table) {
      this.table.remove();
    }
    this.table = new PlanListComponent(data).render(
      this.element
    ) as PlanListComponent;
    if (this.buttons) {
      this.buttons.remove();
    }
    this.planIndex = 0;
    this.buttons = new ButtonGroupComponent(
      0,
      this.data.map((element, index) => {
        return new CustomizableButton(element.name, () => {
          this.planIndex = index;
        });
      })
    ).render(this.element) as ButtonGroupComponent;

    return this;
  }

  flushEnd(): string | null {
    return this.data[this.planIndex].name;
  }
}
