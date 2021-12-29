import express from "express";
import userRouter from "./router/userRouter";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const PORT = 9080;
const server = http.createServer(app);
const io = SocketIO(server);

app.get("/chat", (req, res) => {
  const { name } = req.user;
  io.on("connection", (socket) => {
    console.log("connecting socketio");
    socket.on("enter_room", (data, done) => {
      socket.join(data); //room join
      socket.to(data).emit("enter_user", name);
      done(); //callback function
    });
    socket.on("leave_room", (data, done) => {
      socket.leave(data); //room leave
      socket.to(data).emit("leave_user", name);
      done(); //callback function
    });
    socket.on("new_message", (data, msg, done) => {
      socket.to(data).emit("send_message", data, msg);
      done();
    });
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server : http://localhost:${PORT}`);
});
