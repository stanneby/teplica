import { Presenter } from "./presenter/presenter";
import { IPresenter } from "./presenter/presenter-interface";
import { debugOut } from "./utils";
import { DevicePresentationData } from "./shared/common-types";
import { View } from "./view/view";
import { IView } from "./view/view-interface";

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
let presenter: Presenter = new Presenter();

window.onload = async () => {
  view = new View(presenter);
  presenter.init(view);
  view.start();
};
