import jwt from "jsonwebtoken";

export const generateToken = (payload, expired) => {
  return jwt.sign(payload, "ABQ7f?yU>/4?y~p-x.07vnuG9@`b~", {
    expiresIn: expired,
  });
};
