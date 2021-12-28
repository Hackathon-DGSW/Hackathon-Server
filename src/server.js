import express from "express";
import userRouter from "./router/userRouter";

const app = express();
const PORT = 9090;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server : http://localhost:${PORT}`);
});
