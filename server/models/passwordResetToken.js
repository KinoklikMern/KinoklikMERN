import mongoose from "mongoose";
import bcrypt from "bcrypt";

const passwordResetTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now(),
    },
});

passwordResetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 12);
    }

    next();
});

passwordResetTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

const PasswordResetToken = mongoose.model("passwordResetToken", passwordResetTokenSchema);

export default PasswordResetToken;

// module.exports = mongoose.model(
//     "PasswordResetToken",
//     passwordResetTokenSchema
// );