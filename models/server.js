const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socket(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parseo y lectura body
    this.app.use(express.json());

    // Directorio Publico
    this.app.use(express.static("public"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

module.exports = Server;
