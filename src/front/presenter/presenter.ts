import { DevicePresentationDataDirector } from "../../shared/mock/mock";
import { FrontMocker } from "../../shared/mock/mockers";
import {
  DevicePresentationData,
  GrowthPresentationData,
  PlanTablePresentationData,
} from "../shared/common-types";
import { IView } from "../view/view-interface";
import { IPresenter } from "./presenter-interface";
import { ReceiverTransmitterFront } from "./rt-front";

export class Presenter implements IPresenter {
  private view: IView;
  // private mocker: FrontMocker = new FrontMocker();
  private rt: ReceiverTransmitterFront;

  constructor() {}

  init(view: IView): Presenter {
    this.view = view;
    this.rt = new ReceiverTransmitterFront(
      (plans: PlanTablePresentationData[]) => {
        this.view.setMode(0);
        this.view.givePlanTables(plans);
      },
      (devices: GrowthPresentationData[]) => {
        this.view.setMode(1);
        this.view.updateDevices(devices);
      }
    );
    return this;
  }

  notifyOfCreation(): IPresenter {
    // this.rt.sendStopped();
    return this;
  }
  stopGrowth(): IPresenter {
    this.rt.sendStopped();
    return this;
  }
  startGrowth(name: string): IPresenter {
    this.rt.sendStarted(name);
    return this;
  }
}
