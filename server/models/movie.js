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
<<<<<<< HEAD
  dollarAmount: Number,
=======

>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b
  genre: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  traile: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
=======
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

  dollarAmount: Number,
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b
});

const Movie = mongoose.model("movie", movieSchema);

export default Movie;
