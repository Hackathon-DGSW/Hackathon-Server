import express from "express";
import { andList } from "../controller/listController/AndList";
import { designList } from "../controller/listController/DesList";
import { embList } from "../controller/listController/EmbList";
import { serverList } from "../controller/listController/ServerList";
import { userList } from "../controller/listController/userList";
import { webList } from "../controller/listController/webList";

const listRouter = express.Router();

listRouter.post("/webList", webList);
listRouter.post("/andList", andList);
listRouter.post("/serverList", serverList);
listRouter.post("/designList", designList);
listRouter.post("/embeddedList", embList);
listRouter.post("/userList", userList);

export default listRouter;
