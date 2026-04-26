import express from 'express';
import { authUser } from '../middleware/auth.js';
import { isValidPassResetToken } from '../middleware/user.js';
import multer from 'multer';
import {
  deleteUserMediaBatch,
  uploadUserMedia,
  actorUploadFiles,
  register,
  verifyEmail,
  resendEmailVerificationToken,
  login,
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
  updateLastActive,
  signupForNewsletter,
  getGenericFollowers,
  getGenericLikes,
  getGenericRecommendations,
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
// router.post("/login", login);
router.post('/login', loginValidator, login);
router.get('/login', logout);
router.get('/getProfile/:email', authUser, getProfile);

// get user by id
router.get('/getuser/:id', getUserById);

// get actor by name
//router.post('/getactor', getActor);

router.post('/forget-password', forgetPassword);
router.post(
  '/verify-pass-reset-token',
  isValidPassResetToken,
  sendResetPasswordTokenStatus,
);

//router.post('/send-invitation', sendInvitation)

router.post(
  '/reset-password',
  // validatePassword,
  // validate,
  // isValidPassResetToken,
  resetPassword,
);

router.put('/updateProfile/:userId', updateProfile);
router.post('/uploadUserAvatar', upload.single('file'), uploadUserAvatar);
router.put('/changePassword', changePassword);
router.delete('/deleteAccount/:userId', deleteAccount);

// actor routes
router.get('/getactors', getProfileActor);
router.get('/starred/:id', getActoStarred);
router.get('/followed/:id', getActorFollowing);
router.get('/getactor/:id', getUserById);
router.get('/getfollower/:id', getFollowers);
router.get('/getfollowing/:id', getFollowingActor);
router.get('/likes/:id', getLikes);
router.get('/mostlikes', getMostLikes);
router.get('/mostfollowed', getMostFollowed);

router.post('/follow/:targetid/:userid', getGenericFollowers);
router.post('/like/:targetid/:userid', getGenericLikes);
router.post('/recommend/:targetid', getGenericRecommendations);

// Calling these APIs will add user to the appropriate list of likes(star), favourites,
router.post('/follow/:actorid/:userid', getActorFollowers);
router.post('/like/:actorid/:userid', getActorLikes);
router.post('/recommend/:actorid', getActorRecommendations);
// upload actor thumbnail
router.post('/actorthumbnail', upload.single('file'), uploadActorThumbnail);
router.get('/getallusers', getAllUsers);

// upload actor banner
router.post('/actorbanner', upload.single('file'), uploadActorBanner);

router.post(
  '/user/uploadFiles',
  upload.array('portfolio', 10), // Allow up to 10 files under the name 'portfolio'
  uploadUserMedia,
);

//delete media from S3
router.post('/user/deleteMediaBatch', authUser, deleteUserMediaBatch);

// final save in actor profiles
router.put('/actor/files/:id', actorUploadFiles);

// get filmmaker
router.get('/getfilmmaker/:id', getUserById);

router.put('/lastactive/:id', updateLastActive);
router.put('/signupfornewsletter', signupForNewsletter);

export default router;
