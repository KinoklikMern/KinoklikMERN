import express from "express";
import {authUser} from "../middlwares/auth.js";
import { allMessages, sendMessage } from "../controllers/message.controllers.js";

const router = express.Router();

router.route("/:chatId").get(authUser, allMessages);
router.route("/").post(authUser, sendMessage);

export default router;