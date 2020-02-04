const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const { addUser } = require("./user");
const { getUser } = require("./user");
const { removeUser } = require("./user");
const { getUserInRoom } = require("./user");
const cors = require("cors");

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Credentials",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

const router = require("./router");

// const server = http.createServer(app);

const port = process.env.PORT || 4000;
var server = app.listen(port, () => console.log(`Port running at ${port}`));
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

io.on("connection", socket => {
  console.log("New connection");
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}`
    }); // message to joined user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` }); // message to members of room only except the joined user
    socket.join(user.room); // this joins the user in room
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room)
    });
    callback();
    // same event "join" as in chat.js frontend
    // const error = true;
    // if (error) {
    //   callback({ error: "error" });
    // }
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    console.log(user);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUserInRoom(user.room)
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`
      });
    }
    console.log("User left");
  });
});

app.use(router);
