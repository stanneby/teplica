import { CONNECTING } from "ws";
import { Message, RequestType } from "../../shared/rt-types";
import {
  DevicePresentationData,
  GrowthPresentationData,
  PlanTablePresentationData,
} from "../shared/common-types";

export class ReceiverTransmitterFront {
  private ws = new WebSocket("ws://localhost:8080");

  constructor(
    onPlansGivenCallback: (plans: PlanTablePresentationData[]) => void,
    onDevicesUpdateCallback: (devices: GrowthPresentationData[]) => void
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
            JSON.parse(message.data) as GrowthPresentationData[]
          );
        }
      }
    });
  }

  sendStarted(name: string) {
    if (this.ws.readyState === 1) {
      console.log("state ready");
      this.ws.send(JSON.stringify(new Message(RequestType.StartGrowth, name)));
    } else {
      setTimeout(() => {
        this.ws.send(
          JSON.stringify(new Message(RequestType.StartGrowth, name))
        );
      }, 500);
    }
  }

  sendStopped() {
    if (this.ws.readyState === 1) {
      console.log("state ready");
      this.ws.send(JSON.stringify(new Message(RequestType.StopGrowth, "")));
    } else {
      setTimeout(() => {
        this.ws.send(JSON.stringify(new Message(RequestType.StopGrowth, "")));
      }, 500);
    }
  }
}
