import express from "express";
const router = express.Router();

import { addUser, getUsers } from "../controllers/user.controller.js";
import {
  newConversation,
  getConversation,
} from "../controllers/conversation.controller.js";
import { getMessages, newMessage } from "../controllers/message.controller.js";

router.post("/add", addUser);
router.get("/users", getUsers);
router.post("/conversation/add", newConversation);
router.post("/conversation/get", getConversation);
router.post("/message/add", newMessage);
router.get("/message/get/:id", getMessages);

export default router;
