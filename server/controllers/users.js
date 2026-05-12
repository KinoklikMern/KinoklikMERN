import User from '../models/User.js';
import { validateEmail, validateLength } from '../helpers/validation.js';
import { generateToken } from '../helpers/tokens.js';
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { uploadFileToS3, deleteFilesFromS3 } from '../s3.js';
import PasswordResetToken from '../models/passwordResetToken.js';
import { generateOTP, generateMailTransport } from '../utils/mail.js';
import { isValidObjectId } from 'mongoose';
import { sendError } from '../utils/helper.js';
import { addSubscriber } from '../utils/mailChimp.js';
import axios from 'axios';

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      role,
      password,
      phone,
      website,
      bannerImg,
      thumbnail,
      headImg,
      receiveNewsletter,
      gender,
    } = req.body;

    // Normalize the email to lowercase
    const normalizedEmail = email.toLowerCase();

    if (!validateEmail(normalizedEmail)) {
      return sendError(res, 'Invalid email address');
    }
    const emailCheck = await User.findOne({ email: normalizedEmail });
    if (emailCheck) {
      return res.status(409).json({
        message:
          'This email address already exists. Try with a different email address',
        emailExists: true,
      });
    }

    if (!validateLength(firstName, 2, 30)) {
      return sendError(
        res,
        'First name must be between 2 and 30 characters long.'
      );
    }
    if (!validateLength(lastName, 2, 30)) {
      return sendError(
        res,
        'Last name must be between 2 and 30 characters long.'
      );
    }
    if (!validateLength(password, 6, 40)) {
      return sendError(
        res,
        'Password must be between 6 and 40 characters long.'
      );
    }

    // Add the user to mailchimp as a subscriber according to the newsletter options
    try {
      await addSubscriber(
        normalizedEmail,
        firstName,
        lastName,
        receiveNewsletter
      );
    } catch (mailchimpError) {
      // Log the error so you know it failed, but don't stop the user signup
      console.error("Mailchimp Sync Failed:", mailchimpError.message);
    }

    // Hash the password
    const cryptedPassword = await bcrypt.hash(password, 12);

    // Generate 6 digit otp
    const OTP = generateOTP();

    const user = await new User({
      firstName,
      lastName,
      role,
      email: normalizedEmail,
      phone,
      website,
      password: cryptedPassword,
      isVerified: false,
      receiveNewsletter,
      gender,
      otp: OTP,
    }).save();

    // Send email using SendGrid's Web API
    const templateId = 'd-c8d9248b91314639880759cdd5e78448';
    const sender = 'info@kinoklik.ca';
    const recipient = user.email;
    const dynamicTemplateData = {
      name: user.firstName,
      otp: user.otp,
    };

    await sendEmail(templateId, sender, recipient, dynamicTemplateData);

    res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      },
      emailExists: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, emailExists: false });
  }
};

const sendEmail = async (
  templateId,
  sender,
  recipient,
  dynamicTemplateData
) => {
  try {
    const apiKey = process.env.SENDGRID_KEY;
    const url = 'https://api.sendgrid.com/v3/mail/send';

    const payload = {
      personalizations: [
        {
          to: [{ email: recipient }],
          dynamic_template_data: dynamicTemplateData,
        },
      ],
      from: { email: sender },
      template_id: templateId,
    };

    await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error.response.data);
    throw error;
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  try {
    if (!isValidObjectId(userId)) return sendError(res, 'Invalid user!');

    const user = await User.findById(userId);
    if (!user) return sendError(res, 'User not found!', 404);

    if (user.isVerified) return sendError(res, 'User is already verified!');

    if (user.otp === '') {
      return sendError(res, 'Token not found!');
    }
    if (user.otp !== OTP) return sendError(res, 'Please submit a valid OTP!');

    const wasDeleted = user.deleted;

    user.isVerified = true;
    user.deleted = false;
    user.otp = "";
    await user.save();

    // Send email using SendGrid's Web API
    const templateId = 'd-5022ad5499dc45c9a152ec0f22d2aa1d';
    const sender = 'info@kinoklik.ca';
    const recipient = user.email;
    const dynamicTemplateData = {
      name: user.firstName,
    };

    await sendEmail(templateId, sender, recipient, dynamicTemplateData);

    const token = generateToken({ id: user._id.toString() }, '1d');
    res.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day expiration
      sameSite: 'none',
      secure: true,
    });
    res.json({
      message: wasDeleted 
        ? 'Welcome back! Your account has been reactivated.' 
        : 'Your email is verified and you are logged in.',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
      token: token,
    });
  } catch (error) {
    console.error('Error in verifyEmail:', error.message);
    return sendError(res, 'An error occurred while verifying the email.');
  }
};

export const resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return sendError(res, 'User not found!', 404);

    if (user.isVerified)
      return sendError(res, 'This email is already verified!');

    // const alreadyHasToken = await EmailVerificationToken.findOne({
    //   owner: userId,
    // });
    // if (alreadyHasToken)
    //   return sendError(
    //     res,
    //     "Only after one hour you can request another token!"
    //   );
    const now = new Date();
    if (now - user.updatedAt < 3600000)
      // 1 hour
      return sendError(
        res,
        'Sorry, you must wait one hour to request another token!'
      );

    // Generate 6 digit otp
    const OTP = generateOTP();
    await User.updateOne(
      { _id: user._id },
      { $set: { otp: OTP, updatedAt: now } }
    );

    // Send email using SendGrid's Web API
    const templateId = 'd-c8d9248b91314639880759cdd5e78448';
    const sender = 'info@kinoklik.ca';
    const recipient = user.email;
    const dynamicTemplateData = {
      name: user.firstName,
      otp: OTP,
    };

    await sendEmail(templateId, sender, recipient, dynamicTemplateData);

    res.json({
      message: 'New OTP has been sent to your registered email account.',
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error resending OTP:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while resending OTP' });
  }
};

export const login = async (request, response) => {
  let { email, password } = request.body;
  // Normalize the email to lowercase
  email = email.toLowerCase();

  try {
    if (email && password) {
      const user = await User.findOne({
        email: email,
      })
        .where('deleted')
        .equals(false);

      if (!user) {
        return response.status(400).json({
          message:
            'The email address you entered is not connected to an account',
        });
      }

      const isSame = await bcrypt.compare(password, user.password);

      if (!isSame) {
        return response.status(400).json({ message: 'Invalid credentials, please try again' });
      }

      if (isSame && !user.isVerified) {
        // If the user is not verified, send OTP for verification
        const templateId = 'd-c8d9248b91314639880759cdd5e78448';
        const sender = 'info@kinoklik.ca';
        const recipient = user.email;
        const dynamicTemplateData = {
          name: user.firstName,
          otp: user.otp,
        };

        await sendEmail(templateId, sender, recipient, dynamicTemplateData);

        return response.json({
          isVerified: false,
          message: 'New OTP has been sent to your registered email account.',
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        });
      }
      
      const token = generateToken({ id: user._id.toString() }, '1d');

      response.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
      });

      return response.send({
        id: user._id,
        picture: user.picture,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: token,
        isVerified: user.isVerified,
        message: 'Login success!',
      });
    } else {
      return response.status(400).json({ message: "Email and password are required." });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  return res.status(200).json({ message: 'Successfully Logged Out' });
};

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await User.findOne({ email }).select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.json({ ...profile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update user's last active time
export const updateLastActive = async (req, res) => {
  const userId = req.params.id;

  try {
    const userToUpdate = await User.findOne({ _id: userId })
      .where('deleted')
      .equals(false);

    if (!userToUpdate) {
      console.log('No User was found!');
      res.status(404).json({ error: 'No User was found!' });
    } else {
      await userToUpdate.updateOne(
        { lastActive: new Date() },
        { where: { _id: userId } }
      );
      res.status(200).json({ message: 'LastActive field was updated!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(404).json({ message: "email is missing!" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found!" });

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return res.status(404).json({
      message: "Only after one hour you can request for another token!",
    });

  const token = crypto.randomBytes(32).toString("hex");

  await PasswordResetToken.create({
    owner: user._id,
    token,
  });

  const resetPasswordUrl = `${process.env.BASE_URL}/resetpassword?token=${token}&id=${user._id}`;

  //send email
  const templateId = "d-cc856ab1114e4ad4b63a84bdce3dbc99";
  const sender = "info@kinoklik.ca";
  const recipient = user.email;
  const dynamicTemplateData = { resetPasswordUrl };

  await sendEmail(templateId, sender, recipient, dynamicTemplateData);

  res.status(200).json({ message: "Link sent to your email!" });
};

export const sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

export const resetPassword = async (req, res) => {
  const { newPassword, retypePassword, token, userId } = req.body;

  if (newPassword.trim() !== retypePassword.trim()) {
    return res.status(422).json({
      message: "The new password must match the re-entered password",
    });
  }

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json({
      message: "User not found",
    });

  const resetTokenDoc = await PasswordResetToken.findOne({ owner: user._id });
  if (!resetTokenDoc) {
    return res.status(404).json({ message: "Token expired" });
  }

  const isValid = await resetTokenDoc.compareToken(token);

  if (!isValid) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const matched = await user.comparePassword(newPassword);
  if (matched)
    return res.status(404).json({
      message: "The new password must be different from the old one!",
    });


  const cryptedPassword = await bcrypt.hash(newPassword, 12);
  user.password = cryptedPassword;
  await user.save();

  await PasswordResetToken.deleteOne({ _id: resetTokenDoc._id });

  transport.sendMail({
    from: "info@kinoklik.ca",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
      <h1>Password Reset Successfully</h1>
      <p>Now you can use the new password.</p>
    `,
  });

  res.json({
    message: "Password reset successfully, now you can use your new password.",
  });
};

export const updateProfile = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (req.user.id !== userId) {
      return res.status(403).json({ 
        message: 'Unauthorized: You can only update your own profile' 
      });
    }

    const userOne = await User.findOne({ _id: userId, deleted: false });
    if (!userOne) {
      return res.status(404).json({ error: 'User not found or has been deleted' });
    } 

    const restrictedFields = ['_id', 'email', 'password', 'deleted', 'otp', 'isVerified', 'createdAt'];
    const updateData = { ...req.body };
    
    restrictedFields.forEach(field => {
      delete updateData[field];
    });

    if (updateData.picture) {
      userOne.picture = updateData.picture;
    }

    if (updateData.photo_albums) {
      updateData.photo_albums = {
        headshots: updateData.photo_albums.headshots || [],
        media: updateData.photo_albums.media || [],
        behind: updateData.photo_albums.behind || [],
        premieres: updateData.photo_albums.premieres || []
      };
    }

    if (updateData.video_gallery) {
      updateData.video_gallery = {
        reels: updateData.video_gallery.reels || [],
        media: updateData.video_gallery.media || [],
        behind: updateData.video_gallery.behind || [],
        premieres: updateData.video_gallery.premieres || []
      };
    }

    await userOne.updateOne({
      ...updateData,
      updatedAt: new Date()
    });

    const userUpdated = await User.findOne({ _id: userId }).select('-password -otp');
      res.status(200).json(userUpdated);
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// upload user avatar file to S3
export const uploadUserAvatar = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: 'File extention not supported!' });
  } else {
    res.status(200).send({ key: result.Key });
  }
};

// upload actor banner
export const uploadActorBanner = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: 'File extention not supported!' });
  } else {
    res.status(200).send({ key: result.Key });
  }
}; 

//update user studio
export const updateStudio = async (req, res) => {
  const id = req.params.userId;
  try {
    const userOne = await User.findOne({ _id: id });
    if (!userOne) {
      res.json({ error: 'No User was found!' });
    } else {
      const updatedProfile = req.body;
      await userOne.updateOne(updatedProfile);
      await userOne.updateOne(
        { updatedAt: new Date() },
        { where: { _id: id } }
      );
      const userUpdated = await User.findOne({ _id: id });
      res.status(200).json(userUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { newPassword, confirmPassword, userId } = req.body;
  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    res.status(404).json({
      message: 'The new password must be different from the old one!',
    });
  else {
    const cryptedPassword = await bcrypt.hash(newPassword, 12);
    user.password = cryptedPassword;
    await user.save();
    res.status(200).json({
      message: 'Change Password successfully!',
    });
  }
};

export const deleteAccount = async (req, res) => {
  const id = req.params.userId;
  try {
    const userToDelete = await User.findOne({ _id: id, deleted: false });

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found or already deleted' });
    }

    const deletionTime = Date.now();
    await userToDelete.updateOne({ 
      deleted: true,
      email: `${userToDelete.email}-deleted-${deletionTime}`,
      updatedAt: new Date()
    });
    
    res.cookie('token', '', { expires: new Date(0) });

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
        }
      });
    }

    res.status(200).json({ message: 'Account was successfully deactivated.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transport = generateMailTransport();

// verify connection configuration
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

// Generic follow function that works for both actors and filmmakers
export const getGenericFollowers = async (req, res) => {
  try {
    const targetId = req.params.targetid;
    const userId = req.params.userid;
    const targetProfile = await User.findOne({ _id: targetId });

    if (!targetProfile) {
      return res.status(404).json({ error: 'User not found!' });
    }

    let iskkFollowed = targetProfile.kkFollowers?.includes(userId);
    if (!iskkFollowed) {
      if (!targetProfile.kkFollowers) targetProfile.kkFollowers = [];
      targetProfile.kkFollowers.push(userId);
    } else {
      targetProfile.kkFollowers.pull(userId);
    }

    await targetProfile.save();
    const updatedProfile = await User.findOne({ _id: targetId }).select({
      kkFollowers: 1,
    });

    res.json({ ...updatedProfile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generic like function that works for both actors and filmmakers
export const getGenericLikes = async (req, res) => {
  try {
    const targetId = req.params.targetid;
    const userId = req.params.userid;
    const targetProfile = await User.findOne({ _id: targetId });

    if (!targetProfile) {
      return res.status(404).json({ error: 'User not found!' });
    }

    let isLiked = targetProfile.likes?.includes(userId);
    if (!isLiked) {
      if (!targetProfile.likes) targetProfile.likes = [];
      targetProfile.likes.push(userId);
    } else {
      targetProfile.likes.pull(userId);
    }

    await targetProfile.save();
    const updatedProfile = await User.findOne({ _id: targetId }).select({
      likes: 1,
    });

    res.json({ ...updatedProfile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generic recommendation function
export const getGenericRecommendations = async (req, res) => {
  try {
    const targetId = req.params.targetId;
    const count = parseInt(req.body.count) || 1;

    const updatedUser = await User.findOneAndUpdate(
      { _id: targetId },
      { $inc: { recommendations: count } },
      { new: true, runValidators: false }
    );    

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found!' });
    }

    res.json({ recommendations: updatedUser.recommendations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllActors = async (req, res) => {
  try {
    const profile = await User.find({ 
      role: 'Actor', 
      deleted: false 
    })
      .select('-password')
      .sort({ createdAt: 1 });
    if (!profile.length) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const profile = await User.find({
      deleted: false,
    })
      .select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get starred actor
export const getActorStarred = async (req, res) => {
  try {
    const profile = await User.find({ role: 'Actor' })
      .where({ likes: { $in: [req.params.id] } })
      .select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMostLikes = async (req, res) => {
  try {
    const profile = await User.find({ role: 'Actor' })
      .sort({ likes: -1 })
      .limit(10)
      .select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getMostFollowed = async (req, res) => {
  try {
    const profile = await User.find({ role: 'Actor' })
      .sort({ follower: -1 })
      .limit(10)
      .select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getLikes = async (req, res) => {
  try {
    const profile = await User.find({ role: 'Actor', _id: req.params.id })
      //.where({ likes: {$in: [req.param.id]} })
      .select({ likes: 1 });
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get followed actor
export const getActorFollowing = async (req, res) => {
  try {
    const profile = await User.find({ role: 'Actor' })
      .where({ kkFollowers: { $in: [req.params.id] } })
      .select('-password');
    if (profile.length === 0) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowingActor = async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.params.id })
      .select({ following: 1 })
      .populate('following');

    const result = await User.find({ _id: { $in: profile.following } });

    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowers = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await User.findOne({ _id: id });

    let facebooks = fepkOne.facebook_followers
      ? parseInt(fepkOne.facebook_followers)
      : 0;
    let instagrams = fepkOne.instagram_followers
      ? parseInt(fepkOne.instagram_followers)
      : 0;
    let twitters = fepkOne.twitter_followers
      ? parseInt(fepkOne.twitter_followers)
      : 0;
    let tiktoks = fepkOne.tiktok_followers
      ? parseInt(fepkOne.tiktok_followers)
      : 0;
    let youtubes = fepkOne.youtube_subs
      ? parseInt(fepkOne.youtube_subs)
      : 0;
    let linkedins = fepkOne.linkedin_followers
      ? parseInt(fepkOne.linkedin_followers)
      : 0;
    let newsletters = fepkOne.newsletter_followers
      ? parseInt(fepkOne.newsletter_followers)
      : 0;
    
    res
      .status(200)
      .json({ facebook: facebooks, instagram: instagrams, twitter: twitters, tiktok: tiktoks, youtube: youtubes, linkedin: linkedins,newsletter: newsletters });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id, deleted: false })
      .select("-password -__v")
      .lean();

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found or has been deleted' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDeletedUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deleted: true })
      .select("-password");
    
    if (!user) return res.status(404).json({ message: "No deleted user found with this ID" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signupForNewsletter = async (req, res) => {
  const { email } = req.body;

  const defaultOptions = ['general'];

  try {
    const result = await addSubscriber(email, '-', '-', true);
    if (result.message) {
      return res.status(500).json({ message: result.message });
    }
    res.json({
      message: 'You have successfully subscribed to our newsletter!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Batch delete media files from S3
export const deleteUserMediaBatch = async (req, res) => {
  try {
    const { userId, keys } = req.body;
    const DEFAULT_AVATAR = "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png";

    if (!keys || keys.length === 0) {
      return res.status(200).json({ message: "No keys provided for deletion" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const protectedKeys = [];
  
    // Protect Headshots marked as Main
    user.photo_albums?.headshots?.forEach(h => {
      if (h.isMain) protectedKeys.push(h.image);
    });

    // Protect Reels marked as Main (Video URL + Thumbnail)
    user.video_gallery?.reels?.forEach(r => {
      if (r.isMain) {
        if (r.url) protectedKeys.push(r.url);
        if (r.thumbnail) protectedKeys.push(r.thumbnail);
      }
    });

    // --- 2. Filter list: 
    const safeKeysToDelete = keys.filter(key => !protectedKeys.includes(key));

    if (safeKeysToDelete.length === 0) {
      return res.status(200).json({ 
        message: "No files deleted. Requested files are either protected (Main) or external links." 
      });
    }

    const s3Response = await deleteFilesFromS3(safeKeysToDelete);

    // Special Case: Revert site-use profile pic to default if deleted
    if (safeKeysToDelete.includes(user.picture)) {
      await User.findByIdAndUpdate(userId, { $set: { picture: DEFAULT_AVATAR } });
    }

    res.status(200).json({
      message: "User media delete successful",
      deletedCount: s3Response.Deleted.length,
      protected: keys.length - safeKeysToDelete.length 
    });

  } catch (error) {
    console.error("Media Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const setReelThumbnail = async (req, res) => {
  try {
    const { userId, reelId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.video_gallery.reels.forEach(reel => {
      reel.isMain = (reel._id.toString() === reelId);
    });

    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const searchUsers = async (req, res) => {
  const { q, limit = 10 } = req.query;
  if (!q || q.trim().length < 2) return res.json([]);
  try {
    const users = await User.find({
      deleted: false,
      $or: [
        { firstName: { $regex: q.trim(), $options: 'i' } },
        { lastName: { $regex: q.trim(), $options: 'i' } },
      ],
    })
      .select('firstName lastName picture role')
      .limit(Math.min(Number(limit), 20));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedActor = async (req, res) => {
  try {
    const actor = await User.findOne({
      role: 'Actor',
      thumbnail: { $exists: true, $not: /^https/ },
      picture: { $exists: true, $not: /^https/ },
    })
      .select('firstName lastName picture thumbnail _id')
      .sort({ createdAt: -1 });
    if (!actor) return res.json(null);
    res.json(actor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadUserFile = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result);
    res.status(200).send({ key: result.Key });
    //res.status(200).send({ Location: result.Location });
  }
};

export const requestReactivation = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email, deleted: true });
    if (!user) return res.status(404).json({ message: "No deactivated account found with this email." });

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    const templateId = 'YOUR_REACTIVATION_TEMPLATE_ID'; 
    const sender = 'info@kinoklik.ca';
    const dynamicTemplateData = {
      name: user.firstName,
      otp: otp,
    };

    await sendEmail(templateId, sender, user.email, dynamicTemplateData);

    res.json({ message: "Reactivation code sent to your email.", userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};