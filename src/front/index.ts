import { debugOut } from "./utils";
import { ViewDeviceData } from "./utils/common-types";
import { View } from "./view/view";

const socket = new WebSocket("ws://localhost:8080");

// Connection opened
socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", function (event) {
  console.log("Message from server ", event.data);
});

let view: View;

window.onload = async () => {
  view = new View();
};
