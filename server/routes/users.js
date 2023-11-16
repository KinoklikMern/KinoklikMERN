import express from "express";
import { authUser } from "../middlwares/auth.js";
import { isValidPassResetToken } from "../middlwares/user.js";
import multer from "multer";
import {
  uploadActorProfiles,
  actorUploadFiles,
  getActor,
  register,
  verifyEmail,
  resendEmailVerificationToken,
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
  getProfileActor,
  getActoStarred,
  getActorFollowing,
  getActorById,
  getFollowers,
  uploadActorBanner,
  getLikes,
  getFollowingActor,
  getMostLikes,
  getMostFollowed,
  getActorFollowers,
  getActorLikes,
  uploadActorThumbnail,
  getAllUsers,
  getUserById,
  getActorRecommendations,
} from "../controllers/users.js";
import {
  validate,
  validatePassword,
  loginValidator,
} from "../middlwares/validator.js";
const upload = multer({ dest: "images/" });
const router = express.Router();

router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/resend-email-verification-token", resendEmailVerificationToken);
// router.post("/login", login);
router.post("/login", loginValidator, login);
router.get("/login", logout);
router.post("/getuser", getUser);
router.get("/getProfile/:email", authUser, getProfile);

// get actor by name
router.post("/getactor", getActor);

router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);

//router.post('/send-invitation', sendInvitation)

router.post(
  "/reset-password",
  // validatePassword,
  // validate,
  // isValidPassResetToken,
  resetPassword
);

router.put("/updateProfile/:userId", updateProfile);
router.post("/uploadUserAvatar", upload.single("file"), uploadUserAvatar);
router.put("/changePassword", changePassword);
router.delete("/deleteAccount/:userId", deleteAccount);

// actor routes
router.get("/getactors", getProfileActor);
router.get("/starred/:id", getActoStarred);
router.get("/followed/:id", getActorFollowing);
router.get("/getactor/:id", getActorById);
router.get("/getfollower/:id", getFollowers);
router.get("/getfollowing/:id", getFollowingActor);
router.get("/likes/:id", getLikes);
router.get("/mostlikes", getMostLikes);
router.get("/mostfollowed", getMostFollowed);

// Calling these APIs will add user to the appropriate list of likes(star), favourites,
router.post("/follow/:actorid/:userid", getActorFollowers);
router.post("/like/:actorid/:userid", getActorLikes);
router.post("/recommend/:actorid", getActorRecommendations);
// upload actor thumbnail
router.post("/actorthumbnail", upload.single("file"), uploadActorThumbnail);
router.get("/getallusers", getAllUsers);

// upload actor banner
router.post("/actorbanner", upload.single("file"), uploadActorBanner);

// upload profiles
router.post(
  "/actor/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }, { name: "file3" }]),
  uploadActorProfiles
);

// final save in actor profiles
router.put("/actor/files/:id", actorUploadFiles);

// get user by id
router.get("/:id", getUserById);

export default router;
