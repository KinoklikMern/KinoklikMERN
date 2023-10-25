import express from "express";
import { authUser } from "../middlwares/auth.js";
import {
  allMessages,
  sendMessage,
  updateMessageAsRead,
} from "../controllers/message.controllers.js";

const router = express.Router();

router.route("/:chatId").get(authUser, allMessages);
router.route("/").post(authUser, sendMessage);
router.route("/updateMessage/:chatId").put(authUser, updateMessageAsRead);

export default router;
