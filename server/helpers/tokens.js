import jwt from "jsonwebtoken";

export const generateToken = (payload, expired) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expired,
  });
};
