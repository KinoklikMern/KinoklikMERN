import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
=======
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
<<<<<<< HEAD
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
=======
    enum: ["USER", "ADMIN", "FILM_MAKER", "ACTOR"],
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b
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
