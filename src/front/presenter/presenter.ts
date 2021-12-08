import { defaults } from "../../shared/defaults";
import { mockPresentationData } from "../../shared/mock/mock";
import { FrontMocker } from "../../shared/mock/mockers";
import { IView } from "../view/view-interface";
import { IPresenter } from "./presenter-interface";

export class Presenter implements IPresenter {
  private view: IView;
  private mocker: FrontMocker = new FrontMocker();

  constructor() {}

  init(view: IView): Presenter {
    this.view = view;
    return this;
  }

  notifyOfCreation(): IPresenter {
    console.log(this.view);
    this.view.setMode(0);
    this.view.givePlanTables(this.mocker.getPlanTables());
    return this;
  }
  stopGrowth(): IPresenter {
    this.mocker.stopGrowth();
    this.view.setMode(0);
    this.view.givePlanTables(this.mocker.getPlanTables());
    return this;
  }
  startGrowth(name: string): IPresenter {
    console.log(name);
    this.view.setMode(1);
    this.mocker.setPlan(name);
    this.mocker.startGrowth(this.view.updateDevices.bind(this.view));
    return this;
  }
}
