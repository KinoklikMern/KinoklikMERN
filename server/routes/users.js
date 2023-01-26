import express from "express";
import { authUser } from "../middlwares/auth.js";
import { isValidPassResetToken } from "../middlwares/user.js";

import {
  register,
  login,
  getUser,
  getProfile,
  logout,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} from "../controllers/users.js";
import { validate, validatePassword } from "../middlwares/validator.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/login", logout);
router.post("/getuser", getUser);
router.get("/getProfile/:email", authUser, getProfile);


router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);

router.post(
  "/reset-password",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);
export default router;
