import Movie from "../models/movie.js";
import { uploadImageFileToS3 } from "../s3.js";
import { uploadMediaFileToS3 } from "../s3.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMovie = async (req, res) => {
  const movie = req.body;
  try {
    const newMovie = await new Movie(movie).save();
    console.log(newMovie);
    res.status(200).send({ id: newMovie._id });
  } catch (error) {
    console.log(error);
    res.send(error);
    res.status(409).json({ message: error.message });
  }
};

export const getMovieImage = async (req, res) => {
  const file = req.file;
  const result = await uploadImageFileToS3(file);
  if (!result) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result);

    res.status(200).send({ key: result.key });
  }
};

export const getMovieMedia = async (req, res) => {
  const file1 = req.files.fileFilm[0];
  const file2 = req.files.fileTrailer[0];

  let totalResult = {};
  const result1 = await uploadMediaFileToS3(file1);
  if (!result1) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result1);
    totalResult["keyFilm"] = result1.Key;
  }
  const result2 = await uploadMediaFileToS3(file2);
  if (!result2) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result2.Key);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log(totalResult);
    totalResult["keyTrailer"] = result2.Key;
  }
  console.log(totalResult);
  res.send(totalResult);
};
