import express from "express";
import { authUser } from "../middlwares/auth.js";

import {
  register,
  login,
  getUser,
  getProfile,
  logout,
  forgetPassword,
} from "../controllers/users.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", logout);
router.post("/getuser", getUser);
router.get("/getProfile/:email", authUser, getProfile);

//nada
router.post("/forget-password", forgetPassword);
export default router;
