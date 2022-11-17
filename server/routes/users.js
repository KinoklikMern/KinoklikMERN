import express from "express";

import { register, login, getUser, getProfile } from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/getuser", getUser);
router.get("/getProfile/:username", getProfile);
export default router;
