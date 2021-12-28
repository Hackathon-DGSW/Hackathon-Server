import express from "express";
import { userLogin } from "../controller/userController/login";
import { userJoin } from "../controller/userController/join";
import { userDelete } from "../controller/userController/delete";
import { checkToken } from "../middleware";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/join", userJoin);
userRouter.delete("/delete", checkToken, userDelete);

export default userRouter;
