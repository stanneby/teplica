import {
  DevicePresentationData,
  PlanTablePresentationData,
} from "../../front/shared/common-types";
import { Message, RequestType } from "../../shared/rt-types";

const WebSocket = require("ws");

export class ReceiverTransmitterBack {
  private connections: WebSocket[] = [];

  constructor(
    onStartGrowthCallback: (name: string) => void,
    onStopGrowthCallback: () => void
  ) {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on(
      "connection",
      function connection(ws: WebSocket) {
        this.connections.push(ws);

        ws.addEventListener("message", function incoming(e: MessageEvent) {
          let message = JSON.parse(e.data) as Message;
          if (message.type) {
            if (message.type == RequestType.StartGrowth) {
              onStartGrowthCallback(message.data);
            } else if (message.type == RequestType.StopGrowth) {
              onStopGrowthCallback();
            }
          }
        });
      }.bind(this)
    );
  }

  sendDeviceUpdate(devices: DevicePresentationData[]): ReceiverTransmitterBack {
    this.connections.forEach((ws) => {
      ws.send(
        JSON.stringify(
          new Message(RequestType.UpdateDevices, JSON.stringify(devices))
        )
      );
    });
    return this;
  }

  sendPlans(plans: PlanTablePresentationData[]) {
    this.connections.forEach((ws) => {
      ws.send(
        JSON.stringify(
          new Message(RequestType.GivePlans, JSON.stringify(plans))
        )
      );
    });
  }
}
