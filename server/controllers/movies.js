import Movie from "../models/movie.js";
import { uploadFileToS3 } from "../s3.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  const { firstName, lastName, email, role, password } = req.body;
  const movie = req.body;
  console.log(movie);
  const newMovie = new Movie(movie);

  try {
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getMovieImage = async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result.key);

    res.status(200).send({ key: result.key });
  }
};
