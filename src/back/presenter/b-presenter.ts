import { DevicePresentationData } from "../../front/shared/common-types";
import { BackMocker } from "../../shared/mock/mockers";
import { IModel } from "../model/model-interface";
import { IDevice } from "../shared/devices/device-interface";
import { IBackPresenter } from "./b-presenter-interface";
import { BackTranslator } from "./back-translate";
import { ReceiverTransmitterBack } from "./rt-back";

export class BackPresenter implements IBackPresenter {
  private backrt: ReceiverTransmitterBack;
  private testMocker = new BackMocker();
  private translator = new BackTranslator();

  constructor(private model: IModel) {
    this.backrt = new ReceiverTransmitterBack(
      (name: string) => {
        this.model
          .addDeviceUpdateListener((devices: IDevice[]) => {
            this.backrt.broadcastDeviceUpdate(
              this.translator.translateDevices(devices)
            );
          })
          .addInternalStopGrowthListener(() => {
            this.backrt.broadcastPlans(
              this.translator.translatePlans(this.model.getPlans())
            );
          })
          .startGrowth(name);
      },
      () => {
        // this.testMocker.stopGrowth();
        this.model.stopGrowth();
        this.backrt.broadcastPlans(
          this.translator.translatePlans(this.model.getPlans())
        );
      },
      () => {
        const mode = this.testMocker.getMode();
        if (mode == 1) {
          this.backrt.broadcastDeviceUpdate(this.testMocker.getDevices());
        } else if (mode == 0) {
          this.backrt.broadcastPlans(
            this.translator.translatePlans(this.model.getPlans())
          );
        }
      }
    );
  }
}
