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

  socket.on("join", ({ room, username }) => {
    console.log("Client connected!");
    socket.join(room);
    socket.to(room).emit("message", {
      message: `${username} has joined the Room`,
      isToast: true,
    });

    socket.emit("message", {
      message: `Hello ${username}, Welcome to Room ${room}`,
      isToast: true,
    });
  });
  socket.on("message", ({ message, room, isToast }) => {
    console.log("Message recieved!");
    socket.to(room).emit("message", {
      message: message,
      isToast: false,
    });
  });
});
