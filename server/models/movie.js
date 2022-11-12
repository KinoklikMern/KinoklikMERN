import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  title: String,
  description: String,
  language: String,
  thumbnail: String,
  userId: Number,
  moviefile: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  releaseDate: Date,
  dollarAmount: Number,
  genre: String,
  traile: String,
  poster: String,
  movieId: Number

});

const Movie = mongoose.model('movie', movieSchema);

export default Movie;
