import User from "../models/User.js";
import { validateEmail, validateLength } from "../helpers/validation.js";
import { generateToken } from "../helpers/tokens.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { uploadFileToS3 } from "../s3.js";
// Nada
import PasswordResetToken from "../models/passwordResetToken.js";
import { ObjectID, ObjectId } from "mongodb";
// const PasswordResetToken = require("../models/passwordResetToken");
import { generateMailTransporter } from "../utils/mail.js";

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
      headImg,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        message:
          "This email address already exists. Try with a different email address",
      });
    }

    if (!validateLength(firstName, 3, 30)) {
      return res.status(400).json({
        message: "First name must be between 3 and 30 characters long.",
      });
    }
    if (!validateLength(lastName, 3, 30)) {
      return res.status(400).json({
        message: "Last name must be between 3 and 30 characters long.",
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: "Password must be between 6 and 40 characters long.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const user = await new User({
      firstName,
      lastName,
      role,
      email,
      phone,
      website,
      password: cryptedPassword,
    }).save();
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      website: user.website,
      token: token,
      message: "User was registered successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  try {
    if (email && password) {
      const user = await User.findOne({
        email: email,
      })
        .where("deleted")
        .equals(false);

      if (!user) {
        return response.status(400).json({
          message:
            "The email address you entered is not connected to an account",
        });
      } else {
        const isSame = await bcrypt.compare(password, user.password);

        if (!isSame) {
          return response
            .status(400)
            .json({ message: "Invalid credentials. Please try again" });
        }
        const token = generateToken({ id: user._id.toString() }, "1d");

        response.cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400), // 1 day
          sameSite: "none",
          secure: true,
        });
        if (isSame) {
          response.send({
            id: user._id,
            picture: user.picture,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            token: token,
            message: "Login success!",
          });
        }
      }
    } else {
      response.send({ success: false });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
};

export const getUser = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findOne({ _id: id }).where("deleted").equals(false);
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const profile = await User.findOne({ email }).select("-password");
    if (!profile) {
      return res.json({ ok: false });
    }
    res.json({ ...profile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//***************************Created by Zibin*******************************
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

  // const token = await generateRandomByte().toString("utf-8");

  const token = await generateRandomByte().toString();

  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  const tokenHash = await bcrypt.hash(token, 12);
  // the token will expire in 1 hour.
  const resetPasswordUrl = `http://localhost:3000/resetpassword?token=${tokenHash}&id=${user._id}`;

  // console.log(resetPasswordUrl);
  transport.sendMail({
    from: "info@kinoklik.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
    <h2>Reset Password</h2>
        <p>A password change has been requested for your account. If this was you, please use the link below to reset your password.</p>
        <a href='${resetPasswordUrl}'>Change Password</a>
      `,
  });

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

  const matched = await user.comparePassword(newPassword);
  if (matched)
    return res.status(404).json({
      message: "The new password must be different from the old one!",
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
      message: "Token expired",
    });
  // const transport = generateMailTransporter();
  // console.log(transport.verify);

  transport.sendMail({
    from: "info@kinoklik.com",
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
  const id = req.params.userId;
  try {
    const userOne = await User.findOne({ _id: id });
    if (!userOne) {
      res.json({ error: "No User was found!" });
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
      res.json({ error: "No User was found!" });
    } else {
      const updatedProfile = {
        //...userOne,
        bannerImg: req.body.bannerImg,
        picture: req.body.picture,
        profiles: req.body.profiles,
      };

      await userOne.updateOne({
        bannerImg: req.body.bannerImg,
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
    res.status(406).send({ message: "File extention not supported!" });
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
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    res.status(200).send({ key: result.Key });
  }
};

// upload profiles
export const uploadActorProfiles = async (req, res) => {
  let totalResult = {};
  console.log("here");
  console.log(req.files);
  if ("file1" in req.files) {
    const file1 = req.files.file1[0];
    const result1 = await uploadFileToS3(file1);
    if (!result1) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result1);
      totalResult["file1"] = result1.Key;
    }
  }

  console.log("file2" in req.files);
  if ("file2" in req.files) {
    const file2 = req.files.file2[0];
    const result2 = await uploadFileToS3(file2);
    if (!result2) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(totalResult);
      totalResult["file2"] = result2.Key;
    }
  }

  console.log("file3" in req.files);
  if ("file3" in req.files) {
    const file3 = req.files.file3[0];
    const result3 = await uploadFileToS3(file3);
    if (!result3) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(totalResult);
      totalResult["file3"] = result3.Key;
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
      res.json({ error: "No User was found!" });
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
      message: "The new password must be different from the old one!",
    });
  else {
    const cryptedPassword = await bcrypt.hash(newPassword, 12);
    user.password = cryptedPassword;
    await user.save();
    res.status(200).json({
      message: "Change Password successfully!",
    });
  }
};

export const deleteAccount = async (req, res) => {
  const id = req.params.userId;
  //console.log(id);
  try {
    const userToDelete = await User.findOne({ _id: id })
      .where("deleted")
      .equals(false);
    //console.log(userToDelete);
    if (!userToDelete) {
      res.json({ error: "No User was found!" });
    } else {
      await userToDelete.updateOne({ deleted: true }, { where: { _id: id } });
      //console.log(userToDelete);
      res.status(200).json({ message: "Account was deleted!" });
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
const transport = generateMailTransporter();

// verify connection configuration
transport.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

//**************************************************************************/

export const getActor = async (req, res) => {
  try {
    const actorFind = await User.findOne({
      role: "Actor",
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
    const profile = await User.find({ role: "Actor" }).select("-password");
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
    const profile = await User.find({ role: "Actor" })
      .where({ likes: { $in: [req.params.id] } })
      .select("-password");
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
    const profile = await User.find({ role: "Actor" })
      .sort({ likes: -1 })
      .limit(10)
      .select("-password");
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
    const profile = await User.find({ role: "Actor" })
      .sort({ follower: -1 })
      .limit(10)
      .select("-password");
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
    const profile = await User.find({ role: "Actor", _id: req.params.id })
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
  const id = req.params.id;
  try {
    const fepkOne = await User.find({ _id: id }).where("deleted").equals(false);
    let facebooks = 0;
    let instagrams = 0;
    let twitters = 0;
    fepkOne.crew.forEach((element) => {
      if (element.facebook_followers) {
        facebooks += parseInt(element.facebook_followers);
      }
      if (element.instagram_followers) {
        instagrams += parseInt(element.instagram_followers);
      }
      if (element.twitter_followers) {
        twitters += parseInt(element.twitter_followers);
      }
    });
    //res.status(200).json(fepkOne);
    res
      .status(200)
      .json({ facebook: facebooks, instagram: instagrams, twitter: twitters });
  } catch (error) {
    res.status(404).json({ message: error.message });
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
      .populate("following");

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
    let facebooks = 0;
    let instagrams = 0;
    let twitters = 0;
    fepkOne.crew.forEach((element) => {
      if (element.facebook_followers) {
        facebooks += parseInt(element.facebook_followers);
      }
      if (element.instagram_followers) {
        instagrams += parseInt(element.instagram_followers);
      }
      if (element.twitter_followers) {
        twitters += parseInt(element.twitter_followers);
      }
    });
    //res.status(200).json(fepkOne);
    res
      .status(200)
      .json({ facebook: facebooks, instagram: instagrams, twitter: twitters });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
