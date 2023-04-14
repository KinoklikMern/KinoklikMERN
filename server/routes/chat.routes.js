import express from "express";
import {authUser} from "../middlwares/auth.js";
import {accessChat, fetchChats} from "../controllers/chat.controllers.js";

const router = express.Router();

router.route("/").post(authUser, accessChat); 
router.route("/").get(authUser, fetchChats);

export default router;