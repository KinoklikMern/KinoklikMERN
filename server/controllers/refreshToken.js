const jwt = require("jsonwebtoken");
import User from "../models/User";

const refreshToken = async (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(401);
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  const foundUser = User.findOne({ refreshToken: refreshToken });
  if (!foundUser) return response.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser._id !== decoded._id) return response.sendStatus(403);
    const accessToken = jwt.sign(
      { id: decoded._id.toString(), role: decoded.role.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    response.json({ accessToken });
  });
};
modules.exports = { refreshToken };
