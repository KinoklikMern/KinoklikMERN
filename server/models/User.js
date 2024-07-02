import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
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
      "Admin",
      "Filmmaker",
      "Sales Agent",
      "Distributor",
      "Film Festival",
      "Viewer",
      "Investor",
      "Actor",
      "Director",
      "Editor",
      "Producer",
      "Cinematographer",
      "Sound",
      "Writer",
      "Industry Professional",
    ],
  },
  specialization: {
    type: String,
    maxlength: 30,
    minlength: 3,
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
  profiles: [
    {
      type: String,
      trim: true,
    },
  ],
  city: {
    type: String,
    default: "",
  },
  province: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  bannerImg: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png",
  },
  thumbnail: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844377/banners/sample_banner1.png",
  },
  aboutMe: {
    type: String,
    trim: true,
    default:
      "Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example",
  },
  comunicate: {
    type: [
      {
        name: String,
        follower: Number,
      },
    ],
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  kkFollowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recommendations: {
    type: Number,
    default: 0,
  },
  sex: {
    type: String,
  },
  age: {
    type: Number,
  },
  ethnicity: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  hasAgent: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
  },
  eyesColor: {
    type: String,
  },
  hairColor: {
    type: String,
  },
  bodyBuild: {
    type: String,
  },
  facebook_url: { type: String, default: "" },
  facebook_followers: { type: String, default: "" },
  instagram_url: { type: String, default: "" },
  instagram_followers: { type: String, default: "" },
  twitter_url: { type: String, default: "" },
  twitter_followers: { type: String, default: "" },
  youtube_url: { type: String, default: "" },
  youtube_subs: { type: String, default: "" },
  linkedin_url: { type: String, default: "" },
  linkedin_followers: { type: String, default: "" },

  receiveNewsletter: { type: Boolean, default: true },
  lastActive: { type: Date, default: null },
  otp: {
    type: String,
    default: "",
  },
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", UserSchema);

export default User;
