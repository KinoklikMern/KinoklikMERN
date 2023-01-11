const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET = "token_secret";

const userModel = require("../models/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let resMsg = {
    success: false,
    message: "Password is incorrect or the username ,password are missing",
  };

  if (username && password) {
    const user = await userModel.findOne({ username: username });

    if (!user) {
      const message =
        "Invalid login - username " + username + " doesn't exist.";
      resMsg = { success: false, message: message };
    } else {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        const message = "Successful login";
        const token = jwt.sign(
          { id: String(user._id), role: user.role },
          SECRET,
          { expiresIn: "6h" }
        );
        resMsg = {
          success: true,
          message: message,
          content: { role: user.role, token },
        };
      }
    }
  }
  res.send(resMsg);
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const website = req.body.website;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const role = "user";

  let resMsg = {
    success: false,
    message: "Invalid registration - missing username or password",
  };

  // if (username && validator.isAlphanumeric(username) && password && validator.isStrongPassword(password)) {
  if (username && password) {
    const user = await userModel.findOne({ username: username });
    if (user) {
      const message =
        "Invalid registration - username " + username + " already exists.";
      resMsg = { success: false, message: message };
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userToSave = {
        username: username,
        password: hashedPassword,
        email: email,
        phone: phone,
        website: website,
        firstName: firstName,
        lastName: lastName,
        role: role,
      };
      await userModel.create(userToSave);
      resMsg = { success: true, message: "Successful registration" };
    }
  }
  if (resMsg.success) {
    res.send(resMsg);
  } else {
    res.status(403).send(resMsg);
  }
});

module.exports = router;
