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
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
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
    //minlength: 3,
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
  gender: {
    type: String,
  },
  birthDate: {
    type: Date,
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
  tiktok_url: { type: String, default: "" },
  tiktok_followers: { type: String, default: "" },
  newsletter_subs: { type: String, default: "" },

  receiveNewsletter: { type: Boolean, default: true },
  lastActive: { type: Date, default: null },
  otp: {
    type: String,
    default: "",
  },
  profileViews: {
    type: Number,
    default: 0,
  },

  summary: { 
    type: String, maxlength: 100, trim: true, default: "" 
  },
  photo_albums: {
    headshots: [
      {
        image: { type: String },
        isMain: { type: Boolean, default: false }
      },
    ],
    media: [
      { 
        image: String 
      },
    ],
    behind: [
      { 
        image: String 
      },
    ],
    premieres: [
      { 
        image: String 
      },
    ]
  },
  video_gallery: {
    reels: [
      {
        url: { type: String, required: true },
        thumbnail: { type: String },
        title: { type: String },
        isMain: { type: Boolean, default: false }
      },
    ],
    media: [
      {
        url: { type: String, required: true },
        thumbnail: { type: String },
        title: { type: String }
      },
    ],
    behind: [
      {
        url: { type: String, required: true },
        thumbnail: { type: String },
        title: { type: String }
      },
    ],
    premieres: [
      {
        url: { type: String, required: true },
        thumbnail: { type: String },
        title: { type: String }
      },
    ],
  }
});

// Backward compatibility for users w/o gallery or summary
UserSchema.post(['find', 'findOne'], function(docs) {
  if (!docs) return;

  const migrateActorData = (doc) => {
    const rawDoc = doc._doc || doc; 

    // 1. Safety check for photo_albums
    if (!rawDoc.photo_albums) {
      rawDoc.photo_albums = { headshots: [], behind: [], media: [] };
    }

    // 2. Migrate picture to headshots if headshots is empty
    if (rawDoc.picture && rawDoc.photo_albums.headshots.length === 0) {
      rawDoc.photo_albums.headshots = [{ image: rawDoc.picture }];
    }

    // 4. Safety check for video_gallery
    if (!rawDoc.video_gallery) {
      rawDoc.video_gallery = { reels: [], onSet: [], media: [], premieres: [] };
    }
  };

  if (Array.isArray(docs)) {
    docs.forEach(migrateActorData);
  } else {
    migrateActorData(docs);
  } 
});

// Method to compare password
UserSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;