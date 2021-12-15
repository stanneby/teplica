import { IModel } from "../model/model-interface";
import { IBackPresenter } from "./b-presenter-interface";
import { ReceiverTransmitterBack } from "./rt-back";

export class BackPresenter implements IBackPresenter {
  private rs: ReceiverTransmitterBack;

  constructor(model: IModel) {}
}
