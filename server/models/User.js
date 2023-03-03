import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 3,
  },
  role: {
    type: String,
    required: true,
    enum: [
      "USER",
      "ADMIN",
      "FILM_MAKER",
      "ACTOR",
      "Sales_Agent",
      "Distributor",
      "Film_Festival",
      "Viewer",
      "Investor"
    ],
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  picture: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png",
  },
  createdAt:{
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt:{
    type: Date,
    default: () => Date.now(),
  }
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", UserSchema);

export default User;
