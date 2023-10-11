//const crypto = require("crypto");
import crypto from "crypto";

export const generateRandomByte = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);
      const buffString = buff.toString("hex");
      console.log(buffString);
      resolve(buffString);
    });
  });
};

export const sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error });

export const handleNotFound = (req, res) => {
  // this.sendError(res, "Not Found.", 404);
  sendError(res, "Not Found.", 404);
};
