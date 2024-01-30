import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 3000;

const app = express();

const server = createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Chat server started");
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log("Id", socket.id);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
