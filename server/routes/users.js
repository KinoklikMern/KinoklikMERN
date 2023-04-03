import express from "express";
import { authUser } from "../middlwares/auth.js";
import { isValidPassResetToken } from "../middlwares/user.js";
import multer from "multer";
import {
  register,
  login,
  getUser,
  getProfile,
  logout,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  updateProfile,
  uploadUserAvatar,
  changePassword,
  deleteAccount,
} from "../controllers/users.js";
import { validate, validatePassword } from "../middlwares/validator.js";
const upload = multer({ dest: "images/" });
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

router.put("/updateProfile/:userId", updateProfile);
router.post("/uploadUserAvatar", upload.single("file"), uploadUserAvatar);
router.put("/changePassword", changePassword);
router.delete("/deleteAccount/:userId", deleteAccount);
export default router;
