import User from "../models/User.js";
import { validateEmail, validateLength } from "../helpers/validation.js";
import { generateToken } from "../helpers/tokens.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { response } from "express";

export const register = async (req, res) => {
  //Required Fields
  const { firstName, lastName, email, role, password, phone, website } =
    req.body;
  if (!firstName || !lastName || !email || !role || !password)
    return res.status(400).json({ message: "Invalid request: Missing fields" });
  if (!validateEmail(email)) {
    return res.status(400).json({
      message: "invalid email address",
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
  try {
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({
        message:
          "This email address already exists. Try with a different email address",
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
  const { email, password } = request.body;
  if (!email || !password)
    return response
      .status(400)
      .json({ message: "Email and Password required." });

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return response.status(400).json({
        message: "The email address you entered is not connected to an account",
      });
    } else {
      const isSame = await bcrypt.compare(password, user.password);

      if (!isSame) {
        return response
          .status(400)
          .json({ message: "Invalid credentials. Please try again" });
      }
      //JWT
      const accessToken = generateToken(
        { id: user._id.toString(), role: user.role.toString() },
        "15m"
      );
      const refreshToken = jwt.sign(
        { id: user._id.toString(), role: user.role.toString() },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      response.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        maxAge: 24 * 60 * 60 * 1000,
      });
      // response.cookie("token", token, {
      //   path: "/",
      //   httpOnly: true,
      //   expires: new Date(Date.now() + 1000 * 86400), // 1 day
      //   sameSite: "none",
      //   secure: true,
      // });
      if (isSame) {
        await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });
        response.send({
          id: user._id,
          picture: user.picture,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          token: accessToken,
          message: "Login success!",
        });
      }
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });
  if (!foundUser) {
    response.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      maxAge: 24 * 60 * 60 * 1000,
    });
    return response.sendStatus(204);
  }
  User.findOneAndReplace({ refreshToken: refreshToken }, { refreshToken: "" });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser._id !== decoded._id) return response.sendStatus(403);
    const accessToken = jwt.sign(
      { id: decoded._id.toString(), role: decoded.role.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    response.json({ accessToken });
  });

  // res.cookie("token", "", {
  //   path: "/",
  //   httpOnly: true,
  //   expires: new Date(0),
  //   sameSite: "none",
  //   secure: true,
  // });
  // return res.status(200).json({ message: "Successfully Logged Out" });
};
