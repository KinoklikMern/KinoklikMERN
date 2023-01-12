import User from "../models/User.js";
import { validateEmail, validateLength } from "../helpers/validation.js";
import { generateToken } from "../helpers/tokens.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, role, password, phone, website } =
      req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
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
        $or: [{ email: email }, { username: email }],
      });

      if (!user) {
        return response.status(400).json({
          message:
            "The username/email address you entered is not connected to an account",
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
    const user = await User.findOne({ _id: id });
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
    const movies = await Movie.find({ user: profile._id }).sort({
      createdAt: -1,
    });
    res.json({ ...profile.toObject(), movies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
