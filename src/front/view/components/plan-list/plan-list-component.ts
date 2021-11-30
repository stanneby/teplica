import { PlanTablePresentationData } from "../../../shared/common-types";
import { ISettableInterface } from "../../settable-interface";
import { BaseComponent } from "../base-component";
import { PlanListElementComponent } from "./plan-list-element-component";

export class PlanListComponent
  extends BaseComponent
  implements ISettableInterface
{
  constructor(data: PlanTablePresentationData[]) {
    super("div");
    this.setData(data);
  }

  setData(data: PlanTablePresentationData[]) {
    data.forEach((elem) => {
      new PlanListElementComponent(elem).render(this.element);
    });
    return this;
  }
}
