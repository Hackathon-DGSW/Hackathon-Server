import express from "express";
import userRouter from "./router/userRouter";
import http from "http";
import SocketIO from "socket.io";
import { checkToken } from "./middleware";
import cors from "cors";
import connection from "./db";
import chatRouter from "./router/chatRouter";

const app = express();
const PORT = 9080;
const server = http.createServer(app);
const io = SocketIO(server);

app.get("/chat", checkToken, (req, res) => {
  const { name } = req.user;
  io.on("connection", (socket) => {
    socket.on("enter_room", (data, done) => {
      socket.join(data.roomName);
      socket.to(data.roomName).emit("enter_message", name);
      done();
    });
    socket.on("leave_room", (data, done) => {
      socket.leave(data.roomName);
      socket.to(data.roomName).emit("leave_message", name);
      done();
    });
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) => socket.to(room).emit("bye", name));
    });
    socket.on("send_message", (data) => {
      let room = data.roomName;
      socket.to(room).emit("new_message", data.msg);
      connection.query(
        "insert into chat(roomName, name, msg) value(?, ?, ?)",
        [room, data.name, data.msg],
        (err, result) => {
          if (err) console.log(err);
          console.log("Data insert ok!");
        }
      );
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/post", chatRouter);

app.listen(PORT, () => {
  console.log(`server : http://localhost:${PORT}`);
});
