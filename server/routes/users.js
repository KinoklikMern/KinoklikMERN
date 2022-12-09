import express from "express";
<<<<<<< HEAD
import { authUser } from "../middlwares/auth.js";

import {
  register,
  login,
  getUser,
  getProfile,
  logout,
} from "../controllers/users.js";
=======

import { register, login, getUser, getProfile } from "../controllers/users.js";
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
<<<<<<< HEAD
router.get("/login", logout);
router.post("/getuser", getUser);
router.get("/getProfile/:email", authUser, getProfile);
=======
router.post("/getuser", getUser);
router.get("/getProfile/:username", getProfile);
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b
export default router;
