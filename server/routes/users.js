import express from 'express';
import { authUser } from '../middleware/auth.js';
import { isValidPassResetToken } from '../middleware/user.js';
import multer from 'multer';
import {
  deleteUserMediaBatch,
  register,
  verifyEmail,
  resendEmailVerificationToken,
  login,
  getUserByEmail,
  logout,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  updateProfile,
  uploadUserAvatar,
  uploadUserFile,
  changePassword,
  deleteAccount,
  getAllActors,
  getActorStarred,
  getActorFollowing,
  getFollowers,
  getLikes,
  getFollowingActor,
  getMostLikes,
  getMostFollowed,
  getAllUsers,
  getUserById,
  updateLastActive,
  signupForNewsletter,
  getGenericFollowers,
  getGenericLikes,
  getGenericRecommendations,
  searchUsers,
  getFeaturedActor,
  getDeletedUserById,
  requestReactivation,
} from '../controllers/users.js';
import {
  validate,
  validatePassword,
  loginValidator,
} from '../middleware/validator.js';

const upload = multer({ dest: 'images/' });
const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/resend-email-verification-token', resendEmailVerificationToken);
router.post('/login', loginValidator, login);
router.get('/login', logout);
router.get('/getProfile/:email', authUser, getUserByEmail);

router.get('/getuser/:id', getUserById);

router.post('/forget-password', forgetPassword);
router.post(
  '/verify-pass-reset-token',
  isValidPassResetToken,
  sendResetPasswordTokenStatus,
);
router.post("/request-reactivation", requestReactivation);

//router.post('/send-invitation', sendInvitation)

router.post(
  '/reset-password',
  // validatePassword,
  // validate,
  // isValidPassResetToken,
  resetPassword,
);

router.put('/updateProfile/:userId', authUser, updateProfile);
router.post('/uploadUserAvatar', upload.single('file'), uploadUserAvatar);
router.put('/changePassword', authUser, changePassword);
router.delete('/deleteAccount/:userId', authUser, deleteAccount);

// actor routes
router.get('/getallactors', getAllActors);
router.get('/getallusers', getAllUsers);
router.get('/search', searchUsers);
router.get('/featured-actor', getFeaturedActor);

router.post('/follow/:targetid/:userid', getGenericFollowers);
router.post('/like/:targetid/:userid', getGenericLikes);
router.post('/recommend/:targetid', getGenericRecommendations);

router.get('/starred/:id', getActorStarred);
router.get('/followed/:id', getActorFollowing);
router.get('/getfollower/:id', getFollowers);
router.get('/getfollowing/:id', getFollowingActor);
router.get('/likes/:id', getLikes);
router.get('/mostlikes', getMostLikes);
router.get('/mostfollowed', getMostFollowed);

//delete media from S3
router.post('/user/deleteMediaBatch', authUser, deleteUserMediaBatch);

// Uploads 1 file to AWS S3
router.post("/uploadFile", upload.single("file"), uploadUserFile);

router.put('/lastactive/:id', updateLastActive);
router.put('/signupfornewsletter', signupForNewsletter);

router.get("/deleted-user/:id", getDeletedUserById);

export default router;