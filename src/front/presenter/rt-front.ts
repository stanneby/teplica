import { Message, RequestType } from "../../shared/rt-types";
import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../shared/common-types";

export class ReceiverTransmitterFront {
  private ws = new WebSocket("ws://localhost:8080");

  constructor(
    onPlansGivenCallback: (plans: PlanTablePresentationData[]) => void,
    onDevicesUpdateCallback: (devices: DevicePresentationData[]) => void
  ) {
    this.ws.addEventListener("open", function (event) {});

    this.ws.addEventListener("message", function (event) {
      let message = JSON.parse(event.data) as Message;
      if (message.type) {
        if (message.type == RequestType.GivePlans) {
          onPlansGivenCallback(
            JSON.parse(message.data) as PlanTablePresentationData[]
          );
        } else if (message.type == RequestType.UpdateDevices) {
          onDevicesUpdateCallback(
            JSON.parse(message.data) as DevicePresentationData[]
          );
        }
      }
    });
  }

  sendStarted(name: string) {
    this.ws.send(JSON.stringify(new Message(RequestType.StartGrowth, name)));
  }

  sendStopped() {
    this.ws.send(JSON.stringify(new Message(RequestType.StopGrowth, "")));
  }
}
