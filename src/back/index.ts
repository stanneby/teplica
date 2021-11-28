import { IncomingMessage, ServerResponse } from "http";

var http = require("http");
var fs = require("fs");
var path = require("path");
const WebSocket = require("ws");

http
  .createServer(function (request: IncomingMessage, response: ServerResponse) {
    console.log("request starting...");

    var filePath = "." + request.url;
    if (filePath == "./") filePath = "./dist/index.html";

    var extname = path.extname(filePath);
    var contentType = "text/html";
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
      case ".wav":
        contentType = "audio/wav";
        break;
    }

    fs.readFile(
      filePath,
      function (error: NodeJS.ErrnoException, content: string) {
        if (error) {
          if (error.code == "ENOENT") {
            fs.readFile(
              "./404.html",
              function (error: NodeJS.ErrnoException, content: string) {
                response.writeHead(200, { "Content-Type": contentType });
                response.end(content, "utf-8");
              }
            );
          } else {
            response.writeHead(500);
            response.end(
              "Sorry, check with the site admin for error: " +
                error.code +
                " ..\n"
            );
            response.end();
          }
        } else {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content, "utf-8");
        }
      }
    );
  })
  .listen(8125);
console.log("Server running at http://127.0.0.1:8125/");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws: WebSocket) {
  console.log("connection attempted");
  // Wire up logic for the message event (when a client sends something)
  ws.addEventListener("message", function incoming(e: MessageEvent) {
    console.log("received: %s", e.data);
  });

  // Send a message
  ws.send("Hello client!");
});
