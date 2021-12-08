import { DevicePresentationData } from "../../front/shared/common-types";
import { JSONWrapper, UpdateDevicesJSONWrapper } from "../../shared/rt-types";

const WebSocket = require("ws");

export class ReceiverTransmitterBack {
  private connections: WebSocket[] = [];

  constructor(
    onStartGrothCallback: (name: string) => void,
    onEndGrowthCallback: () => void
  ) {
    const wss = new WebSocket.Server({ port: 8080 });

    wss.on(
      "connection",
      function connection(ws: WebSocket) {
        this.connections.push(ws);

        ws.addEventListener("message", function incoming(e: MessageEvent) {
          console.log("received: %s", e.data);
        });
      }.bind(this)
    );
  }

  sendDeviceUpdate(devices: DevicePresentationData[]): ReceiverTransmitterBack {
    this.connections.forEach((ws) => {
      ws.send(
        JSON.stringify(new UpdateDevicesJSONWrapper(devices) as JSONWrapper)
      );
    });
    return this;
  }
}
