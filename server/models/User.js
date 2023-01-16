import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true, //will trim empty spaces from beginning and end
    required: true,
    unique:true,
  },
  username:{
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
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
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
const User = mongoose.model("User", UserSchema);

export default User;
