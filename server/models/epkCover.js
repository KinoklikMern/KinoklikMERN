import mongoose from "mongoose";

const epkCoverSchema = mongoose.Schema({
  // movie: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "movie",
  // },
  epk: {
    type: String,
  },
  title: {
    type: String,
  },
  logLine: {
    type: String,
  },
  genre: {
    type: String,
  },
  minutes: {
    type: Number,
  },
  banner_url: {
    type: String,
  },

  trailer_url: {
    type: String,
  },
  kickstarter_url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const epkCover = mongoose.model("epkCover", epkCoverSchema);

export default epkCover;
