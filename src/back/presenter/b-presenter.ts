import { DevicePresentationData } from "../../front/shared/common-types";
import { BackMocker } from "../../shared/mock/mockers";
import { IModel } from "../model/model-interface";
import { IBackPresenter } from "./b-presenter-interface";
import { BackTranslator } from "./back-translate";
import { ReceiverTransmitterBack } from "./rt-back";

export class BackPresenter implements IBackPresenter {
  private backrt: ReceiverTransmitterBack;
  private testMocker = new BackMocker();

  constructor(private model: IModel) {
    this.backrt = new ReceiverTransmitterBack(
      (name: string) => {
        this.testMocker.setPlan(name);
        this.testMocker.startGrowth((devices: DevicePresentationData[]) => {
          this.backrt.broadcastDeviceUpdate(devices);
        });
      },
      () => {
        this.testMocker.stopGrowth();
        this.backrt.broadcastPlans(
          new BackTranslator().translate(this.model.getPlans())
        );
      },
      () => {
        const mode = this.testMocker.getMode();
        if (mode == 1) {
          this.backrt.broadcastDeviceUpdate(this.testMocker.getDevices());
        } else if (mode == 0) {
          this.backrt.broadcastPlans(
            new BackTranslator().translate(this.model.getPlans())
          );
        }
      }
    );
  }
}
