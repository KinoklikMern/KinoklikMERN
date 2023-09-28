// const { isValidObjectId } = require("mongoose");
import { isValidObjectId }  from "mongoose";
//const PasswordResetToken = require("../models/passwordResetToken");
import PasswordResetToken from "../models/passwordResetToken.js";

//const { sendError } = require("../utils/helper");
//import sendError from "../utils/helper.js";
import { sendError } from "../utils/helper.js";

export const isValidPassResetToken = async (req, res, next) => {
    const { token, userId } = req.body;

    if (!token.trim() || !isValidObjectId(userId))
        return sendError(res, "Invalid request!");

    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken)
        return sendError(res, "Unauthorized access, invalid request!");

    const matched = await resetToken.compareToken(token);
    if (!matched) return sendError(res, "Unauthorized access, invalid request!");

    req.resetToken = resetToken;
    next();
};