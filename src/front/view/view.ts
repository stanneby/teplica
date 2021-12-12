import { PlanTablePresentationData } from "../shared/common-types";
import { DevicePresentationData } from "../shared/common-types";
import { WindowComponent } from "./components/window/window-component";
import { IView } from "./view-interface";
import { IPresenter } from "../presenter/presenter-interface";
import { TablesPage } from "./components/pages/tables-page";
import { GrowthPage } from "./components/pages/growth-page";

export class View implements IView {
  private readonly root: HTMLElement;
  private readonly window: WindowComponent;

  constructor(private presenter: IPresenter) {
    this.root = document.getElementById("app");
    if (!this.root) throw Error("App root element not found");

    this.window = new WindowComponent(
      (name: string = "default") => {
        this.presenter.startGrowth(name);
      },
      () => {
        this.presenter.stopGrowth();
      }
    ).render(this.root) as WindowComponent;
  }

  setMode(mode: number): IView {
    if (mode) {
      this.window.setPage(new GrowthPage(), 0);
    } else {
      this.window.setPage(new TablesPage(), 1);
    }
    return this;
  }

  givePlanTables(data: PlanTablePresentationData[]): IView {
    console.log("view plan table given");
    this.window.setData(data);
    return this;
  }

  setPlanTable(data: PlanTablePresentationData): IView {
    return this;
  }

  updateDevices(data: DevicePresentationData[]): IView {
    this.window.setData(data);
    return this;
  }

  start(): IView {
    console.log("view started");
    this.presenter.notifyOfCreation();
    return this;
  }
}
