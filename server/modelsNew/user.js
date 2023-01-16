import mongoose from "mongoose";
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true, //will trim empty spaces from beginning and end
    required: true,
    unique:true,
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
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
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
    ],
  },
  movies: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
      },
    },
  ],
  uploaded_movies: [
    {
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
      },
    },
  ],
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
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};


const User = mongoose.model("User", UserSchema);

export default User;
