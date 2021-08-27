const socketController = (socket) => {
  console.log("CLIENTE CONECTADO", socket.id);

  socket.on("disconnect", () => {
    console.log("CLIENTE DESCONECTADO", socket.id);
  });

  socket.on("send-message", (payload, callback) => {
    socket.broadcast.emit("send-message", payload);
    const id = 123456;
    callback(id);
  });
};

module.exports = {
  socketController,
};
