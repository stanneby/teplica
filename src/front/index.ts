import { Presenter } from "./presenter/presenter";
import { IPresenter } from "./presenter/presenter-interface";
import { debugOut } from "./utils";
import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "./shared/common-types";
import { View } from "./view/view";
import { IView } from "./view/view-interface";
import { ReceiverTransmitterFront } from "./presenter/rt-front";
import { DevicePresentationDataDirector } from "../shared/mock/mock";

let view: View;
let presenter: Presenter = new Presenter();

window.onload = async () => {
  view = new View(presenter);
  presenter.init(view);
  view.start();
};

let frontrt = new ReceiverTransmitterFront(
  (plans: PlanTablePresentationData[]) => {
    console.log(plans);
  },
  (devices: DevicePresentationData[]) => {
    console.log(devices);
  }
);
