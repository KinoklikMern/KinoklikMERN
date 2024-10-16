import mongoose from "mongoose";

const fepkSchema = mongoose.Schema({
  film_maker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  ],

  // Cover
  title: {
    type: String,
    unique: true,
    required: true,
  },
  budget: {
    type: String,
    default: "",
  },
  logLine_short: { type: String },
  genre: { type: String },
  banner_url: { type: String },
  trailer_url: { type: String },
  //kickstarter_url: { type: String },
  DonatePayPal_url: { type: String },
  DonateStripe_url: { type: String },
  status: {
    type: String,
    enum: ["Preproduction", "Production", "Postproduction"],
    required: true,
  },
  language: {
    type: String,
  },
  production_type: {
    type: String,
    enum: ["Movie", "Documentary", "TV Show", "Web Series"],
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
  image_details: {
    type: String,
    default: "",
  },
  productionCo: { type: String },
  distributionCo: { type: String },
  productionYear: { type: String },
  durationMin: { type: String },

  // Logline
  image_logline: { type: String, default: "" },
  logLine_long: { type: String, default: "" },
  logLine_blur: { type: Boolean, default: false },

  // Synopsis
  image_synopsis: { type: String, default: "" },
  image_synopsis_medium: { type: String, default: "" },
  image_synopsis_long: { type: String, default: "" },
  text_short: { type: String, default: "" },
  text_medium: { type: String, default: "" },
  text_medium_blur: { type: Boolean, default: false },
  text_long: { type: String, default: "" },
  text_long_blur: { type: Boolean, default: false },

  // Uniqueness
  title_uniqueness: { type: String, default: "" },
  description_uniqueness: { type: String, default: "" },
  image_uniqueness: { type: String, default: "" },
  uniqueness_blur: { type: Boolean, default: false },

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
      blur: { type: Boolean, default: false },
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
  wishes_to_donate: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  // donate sign front end
  wishes_to_donate: [
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
      comment: {
        type: String,
        maxlenght: 500,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
      createdAt: {
        type: Date,
        default: new Date(),
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
      comment: {
        type: String,
        maxlenght: 500,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
      createdAt: {
        type: Date,
        default: new Date(),
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
      comment: {
        type: String,
        maxlenght: 500,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
      createdAt: {
        type: Date,
        default: new Date(),
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
      comment: {
        type: String,
        maxlenght: 500,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],

  // Requests approval
  requests: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        maxlenght: 500,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "refused"],
      },
      createdAt: {
        type: Date,
        default: new Date(),
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
        enum: [
          "Spam",
          "Nudity or Sexual Content",
          "Non-narration content",
          "Copyrighted Intellectual Property Violation",
        ],
      },
      comment: { type: String },
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
