import express from "express";
import { authUser } from "../middlewares/auth.js";

import {
  register,
  login,
  getUser,
  getProfile,
  logout,
} from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", logout);
router.post("/getuser", getUser);
router.get("/getProfile/:email", authUser, getProfile);
export default router;
