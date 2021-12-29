import express from "express";
import { chatHistory } from "../controller/chatController/history";
import { msgHistory } from "../controller/chatController/msgHistory";
import { checkToken } from "../middleware";

const chatRouter = express.Router();

chatRouter.post("/chatList", checkToken, chatHistory);
chatRouter.post("/msgList", checkToken, msgHistory);

export default chatRouter;
