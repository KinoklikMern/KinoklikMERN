import express from "express";
import authUser from "../middlwares/auth";
import {accessChat} from "../controllers/chat.controllers";

const router = express.Router();

router.route("/").post(authUser, accessChat); 