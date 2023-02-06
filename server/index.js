const express = require("express");
const socketio = require("socket.io");
const app = express();

const server = app.listen("4000");

const io = new socketio.Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connect", (socket) => {

  console.log(socket.id, " connected"); //prints 

  socket.on("disconnect", () => {
    console.log(socket.id, " Disconnected"); //prints
  });

  socket.on("join", ({ room, username }) => {
    console.log(`${username} joined room ${room}`) //prints
    socket.join(room);
    socket.emit("message", {
      message: `Hello ${username}, Welcome to Room ${room}`,
      isToast: true,
    }); //does not reflect on front-end


    socket
      .to(room)
      .emit("message", {
        message: `${username} has joined the Room`,
        isToast: true,
      }); //does not reflect on front-end

  });

  socket.on("message", (payload) => {
    console.log(payload);
    console.log(`says - ${payload.message}`); //prints
    io.in(payload.room).emit("message", payload) //does not reflect in front-end
  })

});
