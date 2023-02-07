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
<<<<<<< HEAD
  console.log(socket.id, " connected");
=======

  console.log(socket.id, " connected"); //prints 
>>>>>>> 405e0745bb0b062b990c57894e73fa3518ec3a83

  socket.on("disconnect", () => {
    console.log(socket.id, " Disconnected"); //prints
  });

  socket.on("join", ({ room, username }) => {
<<<<<<< HEAD
    console.log("Client connected!");
    socket.join(room);
    socket.to(room).emit("message", {
      message: `${username} has joined the Room`,
      isToast: true,
    });
=======
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
>>>>>>> 405e0745bb0b062b990c57894e73fa3518ec3a83

  });
<<<<<<< HEAD
  socket.on("message", ({ message, room, isToast }) => {
    console.log("Message recieved!");
    socket.to(room).emit("message", {
      message: message,
      isToast: false,
    });
  });
=======

  socket.on("message", (payload) => {
    console.log(payload);
    console.log(`says - ${payload.message}`); //prints
    io.in(payload.room).emit("message", payload) //does not reflect in front-end
  })

>>>>>>> 405e0745bb0b062b990c57894e73fa3518ec3a83
});
