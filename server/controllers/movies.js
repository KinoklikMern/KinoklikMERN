import Movie from "../models/movie.js";
import { uploadFileToS3 } from "../s3.js";
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

export const uploadMovieFile = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result);

    res.status(200).send({ key: result.Key });
  }
};

export const uploadMovieFiles = async (req, res) => {
  const file1 = req.files.file1[0];
  const file2 = req.files.file2[0];

  let totalResult = {};
  const result1 = await uploadFileToS3(file1);
  if (!result1) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result1);
    totalResult["file1"] = result1.Key;
  }
  const result2 = await uploadMediaFileToS3(file2);
  if (!result2) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(totalResult);
    totalResult["file2"] = result2.Key;
  }
  console.log(totalResult);
  res.send(totalResult);
};
