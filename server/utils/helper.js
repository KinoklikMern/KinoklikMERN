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

  // exports.sendError = (res, error, statusCode = 401) =>
  // res.status(statusCode).json({ error });

  export const sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error });