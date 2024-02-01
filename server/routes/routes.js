import express from "express";
const router = express.Router();

import { addUser, getUsers } from "../controllers/user.controller.js";

router.post("/add", addUser);
router.get("/users", getUsers);

export default router;
