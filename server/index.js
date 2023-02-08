const express = require("express");
const socketio = require("socket.io");
const app = express();

const server = app.listen("4000");

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {
  console.log(socket.id, " connected");

  socket.on("disconnect", () => {
    console.log(socket.id, " Disconnected");
  });

  socket.on("leave", ({ room, username }) => {
    socket.to(room).emit("message", {
      message: `${username} has Left the Room`,
      isToast: true,
    });
  });

  socket.on("join", ({ room, username }) => {
    console.log("Client connected!");
    socket.join(room);
    socket.emit("joined", {
      message: `Hello ${username}, Welcome to Room ${room}`,
      isToast: true,
    });

    socket.to(room).emit("message", {
      message: `${username} has joined the Room`,
      isToast: true,
    });

    socket.on("postMessage", (payload) => {
      console.log("Message recieved!");
      console.log(payload);
      socket.to(room).emit("message", payload);
    });
  }); //not the sender
});
