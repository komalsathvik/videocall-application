const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ roomId, userName }) => {
    socket.join(roomId);
    socket.data.userName = userName;

    const usersInRoom = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    const usersData = usersInRoom
      .filter((id) => id !== socket.id)
      .map((id) => ({
        userId: id,
        userName: io.sockets.sockets.get(id)?.data?.userName || "User",
      }));
    socket.emit("all-users", usersData);

    socket.to(roomId).emit("user-joined", {
      userId: socket.id,
      userName,
    });

    socket.on("signal", ({ to, from, signal }) => {
      io.to(to).emit("signal", { from, signal });
    });

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-left", { userId: socket.id });
    });
  });
});

server.listen(5001, () => {
  console.log("Signaling server running on http://localhost:5001");
});
