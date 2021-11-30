import { defaults } from "../../shared/defaults";
import { mockPresentationData } from "../shared/mock";
import { IView } from "../view/view-interface";
import { IPresenter } from "./presenter-interface";

export class Presenter implements IPresenter {
  private view: IView;
  constructor() {}

  init(view: IView): Presenter {
    this.view = view;
    return this;
  }

  notifyOfCreation(): IPresenter {
    console.log(this.view);
    this.view.setMode(0);
    this.view.givePlanTables(
      mockPresentationData.mockPlanTablePresentationData
    );
    return this;
  }
  stopGrowth(): IPresenter {
    this.view.setMode(0);
    return this;
  }
  startGrowth(name: string): IPresenter {
    this.view.setMode(1);
    return this;
  }
}
