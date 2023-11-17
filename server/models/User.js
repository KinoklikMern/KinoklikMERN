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
      // "User",
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
    // default:
    //   "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643844376/avatars/default_pic_jeaybr.png",
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
      "Biography text here example Biography text here example Biography text here example  Biography text here example Biography text here exampleBiography text here example Biography text here example Biography text here example Biography text here example Biography text here example Biography text here example  Biography text here example  Biography text here exampleBiography text here example Biography text here example Biography text here example",
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
    //enum: ["Male", "Female"],
  },
  age: {
    type: Number,
    // default: 30,
  },
  ethnicity: {
    type: String,
  },

  // Yeming added
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
    // enum: [
    //   "4'10",
    //   "5'0",
    //   "5'2",
    //   "5'4",
    //   "5'6",
    //   "5'8",
    //   "5'10",
    //   "6'0",
    //   "6'2",
    //   "6'4",
    //   "6'6",
    //   "6'8",
    //   "6'10",
    //   "7'0",
    // ],
  },
  eyesColor: {
    type: String,
    // enum: [
    //   "Black",
    //   "Blue",
    //   "Brown",
    //   "Hazel",
    //   "Grey",
    //   "Green",
    //   "Amber",
    //   "Red",
    //   "Violet",
    // ],
  },
  hairColor: {
    type: String,
    // enum: [
    //   "Black",
    //   "Blonde",
    //   "Brown",
    //   "Red",
    //   "Grey",
    //   "White",
    //   "Auburn",
    //   "Salt & Pepper",
    //   "Chestnut",
    //   "Bald",
    // ],
  },
  bodyBuild: {
    type: String,
    // enum: [
    //   "Slim",
    //   "Medium",
    //   "Muscular",
    //   "Large",
    //   "Very Large",
    //   "Athletic/Toned",
    //   "Curvy",
    // ],
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

  newsLetterOptions: { type: Array, default: [] },
  // Crew
  // crew: [
  //   {
  //     crewId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "crew",
  //     },
  //     epkRole: {
  //       type: String,
  //       enum: [
  //         "lead_actor",
  //         "supporting_actor",
  //         "director",
  //         "producer",
  //         "cinematographer",
  //         "editor",
  //         "writer",
  //         "sound",
  //       ],
  //     },
  //     biography: { type: String },
  //     image: { type: String },
  //     facebook_url: { type: String },
  //     facebook_followers: { type: String },
  //     instagram_url: { type: String },
  //     instagram_followers: { type: String },
  //     twitter_url: { type: String },
  //     twitter_followers: { type: String },
  //   },
  // ],
});

// Mongoose will assume there is a collection called the plural of this name (i.e., 'users' in this case).
UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.model("User", UserSchema);

export default User;
