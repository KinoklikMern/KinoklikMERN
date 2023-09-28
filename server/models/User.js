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
      // "User",
      "Admin",
      "Filmmaker",
      "Sales Agent",
      "Distributor",
      "Film Festival",
      "Viewer",
      "Investor",
      "Actor",
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
  profiles: [{
    type: String,
    trim: true,
  }],
  city: {
    type: String,
  },
  province: {
    type: String,
  },
  country: {
    type: String,
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
  aboutMe: {
    type: String,
    trim: true,
    default: "Biography text here example Biography text here example Biography text here example  Biography text here example Biography text here exampleBiography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example  Biography text here example  Biography text here exampleBiography text here example Biography text here example Biography text here example"
  },
  comunicate:{
    type: [{
      name: String,
      follower: Number
    }]
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sex: {
    enum: [
      "Male",
      "Female"
    ]
  },
  age: {
    type: Number,
    default: 30
  },
  ethnicity: {
    type: String
  },
  // Crew
  crew: [
    {
      crewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "crew",
      },
      epkRole: {
        type: String,
        enum: [
          "lead_actor",
          "supporting_actor",
          "director",
          "producer",
          "cinematographer",
          "editor",
          "writer",
          "sound",
        ],
      },
      biography: { type: String },
      image: { type: String },
      facebook_url: { type: String },
      facebook_followers: { type: String },
      instagram_url: { type: String },
      instagram_followers: { type: String },
      twitter_url: { type: String },
      twitter_followers: { type: String },
    },
  ],
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", UserSchema);

export default User;