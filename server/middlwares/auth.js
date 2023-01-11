//const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import userModel from "../models/user";
const SECRET = "token_secret";
//const userModel = require("../models/user");

checkToken = async (req) => {
  let token = req.header("Authorization");
  let userInfo = await jwt.verify(token, SECRET);

  let resMsg = { success: false, message: "Access denied. Please login" };
  if (userInfo && userInfo.id && userInfo.role) {
    user = await userModel.findOne({ _id: userInfo.id });
    if (user) resMsg = { success: true, message: "Access granted.", user: user, role: userInfo.role };
  }
  return resMsg;
};

getUserFromToken = async (req) => {
  let token = req.header("Authorization");
  let userInfo = await jwt.verify(token, SECRET);

  if (userInfo && userInfo.id && userInfo.role) {
    user = await userModel.findOne({ _id: userInfo.id });
    return user;
  }
  throw new Error("The toke is incorrect from getUserFromToken");  
};  

checkRole = (resMsg, role) => {
  let isValidRole = false;
  if (resMsg.success) {
    let user = resMsg.user;
    if (user && user.role === role && resMsg.role === role) {
      isValidRole = true;
    }
  }
  return isValidRole;
};

isLogin = async (req, res, next) => {
  let resMsg = await checkToken(req);

  if (resMsg.success) next();
  else res.status(402).send(resMsg);
};

isNormal = async (req, res, next) => {
  let resMsg = await checkToken(req);

  if (checkRole(resMsg, "user")) {
    next();
  } else res.status(401).send({success:false,message:"Access denied. The user has not a normal role"});
};

isAdmin = async (req, res, next) => {
  let resMsg = await checkToken(req);

  if (checkRole(resMsg, "admin")) {
    next();
  } else res.status(401).send({success:false,message:"Access denied. The user has not an admin role"});
};

const auth = {
  isAdmin: isAdmin,
  isNormal: isNormal,
  isLogin: isLogin,
  getUserFromToken:getUserFromToken
};

// import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    let tmp = req.header("Authorization");

    const token = tmp ? tmp.slice(7, tmp.length) : "";
    // const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Invalid Authentification" });
    }
    jwt.verify(token, "ABQ7f?yU>/4?y~p-x.07vnuG9@`b~", (err, user) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Authentification" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = auth;




// import jwt from "jsonwebtoken";

// export const authUser = async (req, res, next) => {
//   try {
//     let tmp = req.header("Authorization");

//     const token = tmp ? tmp.slice(7, tmp.length) : "";
//     // const token = req.cookies.token;
//     if (!token) {
//       return res.status(400).json({ message: "Invalid Authentification" });
//     }
//     jwt.verify(token, "ABQ7f?yU>/4?y~p-x.07vnuG9@`b~", (err, user) => {
//       if (err) {
//         return res.status(400).json({ message: "Invalid Authentification" });
//       }
//       req.user = user;
//       next();
//     });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
