import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  thumbnail: String,
  film_maker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  moviefile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  releaseDate: Date,
  dollarAmount: Number,
  genre: {
    type: String,
    required: true,
  },
  traile: String,
  poster: String,

  productionCompany: {
    type: String,
    required: true,
  },
  distributionCompany: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("movie", movieSchema);

export default Movie;
