import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import databaseConnection from "./database/db.js";
import userRouter from "./routes/routes.js";

const app = express();
const server = createServer(app);
dotenv.config();
databaseConnection();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Chat server started");
});

app.use("/", userRouter);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
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
  // console.log("user connected");

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

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
