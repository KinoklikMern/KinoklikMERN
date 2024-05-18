import User from '../models/User.js';
import { validateEmail, validateLength } from '../helpers/validation.js';
import { generateToken } from '../helpers/tokens.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { uploadFileToS3 } from '../s3.js';
// Nada
import PasswordResetToken from '../models/passwordResetToken.js';
import { ObjectID, ObjectId } from 'mongodb';
// const PasswordResetToken = require("../models/passwordResetToken");
import { generateOTP, generateMailTransport } from '../utils/mail.js';
import EmailVerificationToken from '../models/emailVerificationToken.js';
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
      newsLetterOptions,
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

    if (!validateLength(firstName, 3, 30)) {
      return sendError(
        res,
        'First name must be between 3 and 30 characters long.'
      );
    }
    if (!validateLength(lastName, 3, 30)) {
      return sendError(
        res,
        'Last name must be between 3 and 30 characters long.'
      );
    }
    if (!validateLength(password, 6, 40)) {
      return sendError(
        res,
        'Password must be between 6 and 40 characters long.'
      );
    }

    // Add the user to mailchimp as a subscriber according to the newsletter options
    let result = await addSubscriber(
      email,
      firstName,
      lastName,
      newsLetterOptions
    );
    if (result.message) {
      return res
        .status(500)
        .json({ message: result.message, emailExists: false });
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
      newsLetterOptions,
      sex: gender,
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
    // console.log("Received userId:", userId);
    // console.log("Received OTP:", OTP);

    if (!isValidObjectId(userId)) return sendError(res, 'Invalid user!');

    const user = await User.findById(userId);
    if (!user) return sendError(res, 'User not found!', 404);

    if (user.isVerified) return sendError(res, 'User is already verified!');

    // console.log("UserId" + userId);
    // const token = await EmailVerificationToken.findOne({ owner: userId });
    //if (!token) return sendError(res, "token not found!");

    if (user.otp === '') {
      return sendError(res, 'Token not found!');
    }
    if (user.otp !== OTP) return sendError(res, 'Please submit a valid OTP!');

    // const isMatched = await token.compareToken(OTP);
    // if (!isMatched) return sendError(res, "Please submit a valid OTP!");
    user.isVerified = true;
    await user.save();

    //await EmailVerificationToken.findByIdAndDelete(token._id);

    // Send email using SendGrid's Web API
    const templateId = 'd-5022ad5499dc45c9a152ec0f22d2aa1d';
    const sender = 'info@kinoklik.ca';
    const recipient = user.email;
    const dynamicTemplateData = {
      name: user.firstName,
    };

    await sendEmail(templateId, sender, recipient, dynamicTemplateData);

    // const jwtToken = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    res.json({
      // user: {
      //   id: user._id,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email,
      //   token: jwtToken,
      // },
      message: 'Your email is verified.',
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
        'Only after one hour you can request another token!'
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
  // const email = request.body.email;
  // const password = request.body.password;

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
      } else {
        // const existingToken = await EmailVerificationToken.findOne({
        //   owner: user._id,
        // });
        if (!user.isVerified) {
          // If the user is not verified, send OTP for verification

          // Send email using SendGrid's Web API
          const templateId = 'd-c8d9248b91314639880759cdd5e78448';
          const sender = 'info@kinoklik.ca';
          const recipient = user.email;
          const dynamicTemplateData = {
            name: user.firstName,
            otp: user.otp,
          };

          await sendEmail(templateId, sender, recipient, dynamicTemplateData);

          return response.json({
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
        // if (!user.isVerified && !existingToken) {
        //   // If the user is not verified and there's no existing token, send OTP for verification
        //   const OTP = generateOTP(); // Generate OTP

        //   // Store the OTP in the database for verification
        //   const emailVerificationToken = new EmailVerificationToken({
        //     owner: user._id,
        //     token: OTP,
        //   });
        //   await emailVerificationToken.save();

        //   // Send OTP to the user's email
        //   var transport = generateMailTransport();

        //   transport.sendMail({
        //     from: "info@kinoklik.ca",
        //     to: user.email,
        //     subject: "Email Verification",
        //     html: `
        //       <p>Your verification OTP</p>
        //       <h1>${OTP}</h1>
        //     `,
        //   });

        //   return response.json({
        //     message: "New OTP has been sent to your registered email account.",
        //     user: {
        //       id: user._id,
        //       email: user.email,
        //       firstName: user.firstName,
        //       lastName: user.lastName,
        //       role: user.role,
        //     },
        //   });
        // }

        const isSame = await bcrypt.compare(password, user.password);

        // Yeming added
        if (isSame && !user.isVerified) {
          // If password is correct but user isn't verified
          return response.json({
            isVerified: false,
            message: 'Your account is not verified. Please verify your email.',
            user: {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            },
          });
        }

        if (!isSame) {
          return response
            .status(400)
            .json({ message: 'Invalid credentials. Please try again' });
        }
        const token = generateToken({ id: user._id.toString() }, '1d');

        response.cookie('token', token, {
          path: '/',
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: 'none',
          secure: true,
        });
        if (isSame) {
          return response.send({
            id: user._id,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: token,
            // Yeming added
            isVerified: user.isVerified,
            message: 'Login success!',
          });
        }
      }
    } else {
      return response.json({ success: false });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return sendError(res, "Email/Password mismatch!");

//   const matched = await user.comparePassword(password);
//   if (!matched) return sendError(res, "Email/Password mismatch!");

//   const { _id, firstName, lastName } = user;

//   const jwtToken = jwt.sign({ userId: _id }, process.env.TOKEN_SECRET);

//   res.json({ user: { id: _id, firstName, lastName, email, token: jwtToken } });
// };

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

export const getUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findOne({ _id: id }).where('deleted').equals(false);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfile = async (req, res) => {
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
      //console.log("User last active time was updated!");
      res.status(200).json({ message: 'LastActive field was updated!' });
    }
  } catch (error) {
    //console.log("UpdateLastActive Error: " + error.message);
    res.status(500).json({ message: error.message });
  }
};

//SEND INVITATION --------------(moved to invitations)-----------------------

// export const sendInvitation = async (req, res) => {
//   const { email, invitedBy, movie, role, firstName, lastName} = req.body;

//   if (!email) return res.status(404).json({ message: "email is missing!" });

//   // Direct link to your signup page
//   const signUpLink = `http://localhost:3000/signup`;

//   // Send the invitation email
//   transport.sendMail({
//     from: "info@kinoklik.com",
//     to: email, // Directly use the provided email
//     subject: "Invitation to Join Kinoklik",
//     html: `
//       <h2>${firstName} ${lastName}, You're Invited!</h2>
//       <p>Hey, You have been invited by ${invitedBy} to register in the Kinoklikk app in connection with participation in the project named "${movie}" in role of ${role}. To do so, please follow the link below:</p>
//       <a href='${signUpLink}'>Register Now</a>
//     `,
//   });

//   res.status(200).json({ message: "Invitation sent to the provided email!" });
// };

//---------------------------------------------------

//***************************Created by Zibin*******************************
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(404).json({ message: 'email is missing!' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found!' });

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return res.status(404).json({
      message: 'Only after one hour you can request for another token!',
    });

  // const token = await generateRandomByte().toString("utf-8");

  const token = await generateRandomByte().toString();

  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const tokenHash = await bcrypt.hash(token, 12);
  // the token will expire in 1 hour.
  const resetPasswordUrl = `${process.env.BASE_URL}/resetpassword?token=${tokenHash}&id=${user._id}`;

  const templateId = 'd-cc856ab1114e4ad4b63a84bdce3dbc99';
  const sender = 'info@kinoklik.ca';
  const recipient = user.email;
  const dynamicTemplateData = {
    resetPasswordUrl: resetPasswordUrl,
  };

  await sendEmail(templateId, sender, recipient, dynamicTemplateData);

  res.status(200).json({ message: 'Link sent to your email!' });
};

export const sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

export const resetPassword = async (req, res) => {
  const { newPassword, retypePassword, token, userId } = req.body;

  if (newPassword.trim() !== retypePassword.trim()) {
    return res.status(422).json({
      message: 'The new password must match the re-entered password',
    });
  }

  const user = await User.findById(userId);
  if (!user)
    return res.status(404).json({
      message: 'User not found',
    });

  const matched = await user.comparePassword(newPassword);
  if (matched)
    return res.status(404).json({
      message: 'The new password must be different from the old one!',
    });

  const cryptedPassword = await bcrypt.hash(newPassword, 12);
  user.password = cryptedPassword;
  await user.save();

  // const expired = await PasswordResetToken.findByIdAndDelete(
  //   req.resetToken._id
  // );

  const expired = await PasswordResetToken.findOneAndDelete({
    owner: user._id,
  });
  console.log(expired);
  if (!expired)
    return res.status(404).json({
      message: 'Token expired',
    });
  // const transport = generateMailTransporter();
  // console.log(transport.verify);

  transport.sendMail({
    from: 'info@kinoklik.ca',
    to: user.email,
    subject: 'Password Reset Successfully',
    html: `
      <h1>Password Reset Successfully</h1>
      <p>Now you can use the new password.</p>

    `,
  });

  res.json({
    message: 'Password reset successfully, now you can use your new password.',
  });
};

export const updateProfile = async (req, res) => {
  const id = req.params.userId;
  try {
    const userOne = await User.findOne({ _id: id });
    if (!userOne) {
      res.json({ error: 'No User was found!' });
    } else {
      const updatedProfile = req.body;
      //console.log(updatedProfile);
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
export const actorUploadFiles = async (req, res) => {
  const id = req.params.id;
  try {
    const userOne = await User.findOne({ _id: id });
    if (!userOne) {
      res.json({ error: 'No User was found!' });
    } else {
      const updatedProfile = {
        //...userOne,
        bannerImg: req.body.bannerImg,
        thumbnail: req.body.thumbnail,
        picture: req.body.picture,
        profiles: req.body.profiles,
      };

      await userOne.updateOne({
        bannerImg: req.body.bannerImg,
        thumbnail: req.body.thumbnail,
        picture: req.body.picture,
        profiles: req.body.profiles,
      });
      await userOne.updateOne(
        { updatedAt: new Date() },
        { where: { _id: id } }
      );
      await userOne.save();
      const userUpdated = await User.findOne({ _id: id });
      res.status(200).json(userUpdated);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// upload user avatar file to S3
export const uploadUserAvatar = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: 'File extention not supported!' });
  } else {
    //console.log(result);
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

// upload profiles
export const uploadActorProfiles = async (req, res) => {
  let totalResult = {};
  console.log('here');
  console.log(req.files);
  if ('file1' in req.files) {
    const file1 = req.files.file1[0];
    const result1 = await uploadFileToS3(file1);
    if (!result1) {
      res.status(406).send({ message: 'File extention not supported!' });
    } else {
      console.log(result1);
      totalResult['file1'] = result1.Key;
    }
  }

  console.log('file2' in req.files);
  if ('file2' in req.files) {
    const file2 = req.files.file2[0];
    const result2 = await uploadFileToS3(file2);
    if (!result2) {
      res.status(406).send({ message: 'File extention not supported!' });
    } else {
      console.log(totalResult);
      totalResult['file2'] = result2.Key;
    }
  }

  console.log('file3' in req.files);
  if ('file3' in req.files) {
    const file3 = req.files.file3[0];
    const result3 = await uploadFileToS3(file3);
    if (!result3) {
      res.status(406).send({ message: 'File extention not supported!' });
    } else {
      console.log(totalResult);
      totalResult['file3'] = result3.Key;
    }
  }

  console.log(totalResult);
  res.send(totalResult);
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
      //console.log(updatedProfile);
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
  //console.log(req.body);
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
  // console.log(id);
  try {
    const userToDelete = await User.findOne({ _id: id })
      .where('deleted')
      .equals(false);
    //console.log(userToDelete);
    if (!userToDelete) {
      res.json({ error: 'No User was found!' });
    } else {
      await userToDelete.updateOne({ deleted: true }, { where: { _id: id } });
      //console.log(userToDelete);
      res.status(200).json({ message: 'Account was deleted!' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

function generateRandomByte() {
  return Math.floor(Math.random() * 256); // generates a random integer between 0 and 255 (inclusive)
}

// create a transporter object using SMTP
// const transport = nodemailer.createTransport({
//   host: "smtp.gmail.com", // replace with your SMTP server address
//   port: 465, // replace with your SMTP server port
//   secure: true, // use SSL
//   auth: {
//     user: "info@kinoklik.ca", // replace with your email address
//     pass: "kzhotugyiukkxjex", // replace with your email password
//   },
// });

// Yeming edit
const transport = generateMailTransport();

// verify connection configuration
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

//**************************************************************************/

export const getActor = async (req, res) => {
  try {
    const actorFind = await User.findOne({
      role: 'Actor',
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    res.json(actorFind);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProfileActor = async (req, res) => {
  try {
    const profile = await User.find({ role: 'Actor' })
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

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const profile = await User.find().select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get starred actor
export const getActoStarred = async (req, res) => {
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
  // const id = req.params.id;
  // try {
  //   const fepkOne = await User.find({ _id: id }).where("deleted").equals(false);
  //   let facebooks = 0;
  //   let instagrams = 0;
  //   let twitters = 0;
  //   fepkOne.crew.forEach((element) => {
  //     if (element.facebook_followers) {
  //       facebooks += parseInt(element.facebook_followers);
  //     }
  //     if (element.instagram_followers) {
  //       instagrams += parseInt(element.instagram_followers);
  //     }
  //     if (element.twitter_followers) {
  //       twitters += parseInt(element.twitter_followers);
  //     }
  //   });
  //   //res.status(200).json(fepkOne);
  //   res
  //     .status(200)
  //     .json({ facebook: facebooks, instagram: instagrams, twitter: twitters });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
  try {
    const profile = await User.find({ role: 'Actor' })
      .where({ kkFollowers: { $in: [req.params.id] } })
      .select('-password');
    if (!profile) {
      return res.json({ ok: false });
    }
    res.send(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getActorById = async (req, res) => {
  try {
    const profile = await User.findOne({ _id: req.params.id });
    if (!profile) {
      return res.json({ ok: false });
    }
    res.json({ ...profile.toObject() });
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

// export const getFollowers = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const fepkOne = await User.findOne({ _id: id });
//     let facebooks = 0;
//     let instagrams = 0;
//     let twitters = 0;
//     fepkOne.crew.forEach((element) => {
//       if (element.facebook_followers) {
//         facebooks += parseInt(element.facebook_followers);
//       }
//       if (element.instagram_followers) {
//         instagrams += parseInt(element.instagram_followers);
//       }
//       if (element.twitter_followers) {
//         twitters += parseInt(element.twitter_followers);
//       }
//     });
//     //res.status(200).json(fepkOne);
//     res
//       .status(200)
//       .json({ facebook: facebooks, instagram: instagrams, twitter: twitters });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
export const getFollowers = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await User.findOne({ _id: id });
    console.log(fepkOne);

    let facebooks = fepkOne.facebook_followers
      ? parseInt(fepkOne.facebook_followers)
      : 0;
    let instagrams = fepkOne.instagram_followers
      ? parseInt(fepkOne.instagram_followers)
      : 0;
    let twitters = fepkOne.twitter_followers
      ? parseInt(fepkOne.twitter_followers)
      : 0;

    res
      .status(200)
      .json({ facebook: facebooks, instagram: instagrams, twitter: twitters });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ----- CHIHYIN -----
// adding user who followed the actor on KinoKlik
export const getActorFollowers = async (req, res) => {
  try {
    const actorId = req.params.actorid;
    const userId = req.params.userid;
    const actorProfile = await User.findOne({ role: 'Actor', _id: actorId });
    if (!actorProfile) {
      return res.status(404).json({ error: 'No Actor was found!' });
    }
    let iskkFollowed = actorProfile.kkFollowers.includes(userId);
    if (!iskkFollowed) {
      actorProfile.kkFollowers.push(userId);
    } else {
      actorProfile.kkFollowers.pull(userId);
    }
    await actorProfile.save();
    const updatedActorProfile = await User.findOne({
      role: 'Actor',
      _id: actorId,
    }).select({ kkFollowers: 1 });
    res.json({ ...updatedActorProfile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// adding user who liked the actor on KinoKlik
export const getActorLikes = async (req, res) => {
  try {
    const actorId = req.params.actorid;
    const userId = req.params.userid;
    const actorProfile = await User.findOne({ role: 'Actor', _id: actorId });
    if (!actorProfile) {
      return res.status(404).json({ error: 'No Actor was found!' });
    }
    let isLiked = actorProfile.likes.includes(userId);
    if (!isLiked) {
      actorProfile.likes.push(userId);
    } else {
      actorProfile.likes.pull(userId);
    }
    await actorProfile.save();
    const updatedActorProfile = await User.findOne({
      role: 'Actor',
      _id: actorId,
    }).select({ likes: 1 });
    res.json({ ...updatedActorProfile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Increment the recommendation count for an actor on KinoKlik
export const getActorRecommendations = async (req, res) => {
  try {
    console.log('Actor ID:', req.params.actorid);
    console.log('Count:', req.body.count);

    const actorId = req.params.actorid;
    const count = req.body.count; // The count of selected filmmakers
    const actorProfile = await User.findOne({ role: 'Actor', _id: actorId });

    console.log('Actor Profile:', actorProfile);

    if (!actorProfile) {
      return res.status(404).json({ error: 'No Actor was found!' });
    }

    actorProfile.recommendations = (actorProfile.recommendations || 0) + count;
    await actorProfile.save();

    res.json({ recommendations: actorProfile.recommendations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// upload user(actor) thumbnail of the demo reel
export const uploadActorThumbnail = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: 'File extention not supported!' });
  } else {
    res.status(200).send({ key: result.Key });
  }
};

// Yeming added
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signupForNewsletter = async (req, res) => {
  const { email } = req.body;

  const defaultOptions = ['general'];

  try {
    const result = await addSubscriber(email, '-', '-', defaultOptions);
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
