import mongoose from "mongoose";

const fepkSchema = mongoose.Schema({
  film_maker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Cover
  title: {
    type: String,
    unique: true,
    required: true,
  },
  logLine_short: { type: String },
  genre: { type: String },
  banner_url: { type: String },
  trailer_url: { type: String },
  kickstarter_url: { type: String },
  status: {
    type: String,
    enum: ["Preproduction", "Production", "Postproduction"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },

  // Film Details
  image_details: { type: String },
  productionCo: { type: String },
  distributionCo: { type: String },
  productionYear: { type: String },
  durationMin: { type: String },

  // Logline
  image_logline: { type: String },
  logLine_long: { type: String },

  // Synopsis
  image_synopsis: { type: String },
  text_short: { type: String },
  text_medium: { type: String },
  text_long: { type: String },

  // Uniqueness
  title_uniqueness: { type: String },
  description_uniqueness: { type: String },
  image_uniqueness: { type: String },

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

  // Film Stills
  stills: [
    {
      image: { type: String },
    },
  ],

  // Film Trailer
  trailer: { type: String },

  // Reviews
  reviews: [
    {
      text: { type: String },
      magazine: { type: String },
      award_logo: { type: String },
    },
  ],

  // Resources
  resources: [
    {
      image: { type: String },
      title: { type: String, required: true },
      time: { type: String },
      description: { type: String },
    },
  ],

  // "star" sign in front end, users liked this EPK
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // "+" sign front end
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // "$" sign front end
  wishes_to_buy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // sharing sign front end
  sharings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // Medium Synopsis approval
  mediumSynopsis: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
    },
  ],

  // Long Synopsis approval
  longSynopsis: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
    },
  ],

  // Uniqueness approval
  uniqueness: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
    },
  ],

  // Stills approval
  stillsApproval: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
    },
  ],

  // Company Information
  company: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
  
  reports: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reason: {
        type: String,
        enum: ["Spam", "Nudity or Sexual Content", "Non-narration content", "Copyrighted Intellectual Property Violation"],
      },
      comment: {type: String},
      status: {
        type: String,
        enum: ["opened", "closed"],
        default: "opened", 
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],

  // if this status is "true" the EPK will be blured 
  status_pause: {
    type: Boolean,
    default: false,
  },

  // Soft-deletion of documents in databases is an operation in which a flag is used
  // to mark documents as deleted without erasing the data from the database.
  deleted: {
    type: Boolean,
    default: false,
  },
});

const fepk = mongoose.model("fepk", fepkSchema);

export default fepk;
