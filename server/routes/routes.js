import express from "express";
const router = express.Router();

import { addUser, getUsers } from "../controllers/user.controller.js";
import { newConversation } from "../controllers/conversation.controller.js";

router.post("/add", addUser);
router.get("/users", getUsers);
router.post("/conversation/add", newConversation);

export default router;
