import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

const app = express();

dotenv.config();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user.sub === userData.sub) &&
    users.push({ ...userData, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  //connect
  socket.on("addUsers", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  //send message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);

    io.to(user.socketId).emit("getMessage", data);
  });
});

app.get("/", (req, res) => {
  res.send("Chat Socket is ON");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT} `);
});
