import express from "express";
import userRouter from "./router/userRouter";
import http from "http";
import SocketIO from "socket.io";
import { checkToken } from "./middleware";
import cors from "cors";
import connection from "./db";
import chatRouter from "./router/chatRouter";
import listRouter from "./router/listRouter";

const app = express();
const PORT = 9000;
const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: true,
  },
});

app.get("/", (req, res) => {
  res.send("");
});

// let user_name;

// app.post("/chat", checkToken, (req, res) => {
//   const { name } = req.user;
//   user_name = name;
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);
app.use("/post", chatRouter);
app.use("/list", listRouter);

io.on("connection", (socket) => {
  console.log("connect");
  socket.on("come_in", (data, done) => {
    console.log(data);
    socket.join(data.roomName);
    socket.to(data.roomName).emit("user_names", {
      enter_user: data.name,
      mento_name: data.mento,
    });
    // done();
  });
  socket.on("come_out", (data) => {
    socket.leave(data.roomName);
    socket.to(data.roomName).emit("user_out", user_name);
  });
  socket.on("send_message", (data, done) => {
    const roomName = data.roomName;
    const userName = data.name;
    const msg = data.msg;
    connection.query(
      "insert into chat(room, name, msg) value(?, ?, ?)",
      [data.roomName, data.name, data.msg],
      (err, result) => {
        if (err) console.log(err);
        console.log("insert success!!");
      }
    );
    console.log(data);
    socket.to(roomName).emit("to_message", {
      user_name: userName,
      user_msg: msg,
    });
    // done();
  });
});

server.listen(PORT, () => {
  console.log(`server : http://localhost:${PORT}`);
});
