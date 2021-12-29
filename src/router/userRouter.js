import express from "express";
import { userLogin } from "../controller/userController/login";
import { userJoin } from "../controller/userController/join";
import { userDelete } from "../controller/userController/delete";
import { checkToken } from "../middleware";
import { userProfile } from "../controller/userController/profile";
import { userList } from "../controller/userController/list";

const userRouter = express.Router();

userRouter.post("/login", userLogin);
userRouter.post("/join", userJoin);
userRouter.delete("/delete", checkToken, userDelete);
userRouter.post("/profile", checkToken, userProfile);
userRouter.post("/list", userList);

export default userRouter;
