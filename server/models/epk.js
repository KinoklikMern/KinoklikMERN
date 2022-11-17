import mongoose from "mongoose";

const epkSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
  },
  title: {
    type: String,
  },
  log_line: {
    type: String,
  },
  cover_banner_url: {
    type: String,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
  },
  poster_url: {
    type: String,
  },
  log_line_poster_url: {
    type: String,
  },
  trailer_url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  releaseDate: Date,
  genre: {
    type: String,
  },
});

const epk = mongoose.model("epk", epkSchema);

export default epk;
