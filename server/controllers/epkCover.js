import Movie from "../models/movie.js";
import Epk from "../models/epkCover.js";
import { uploadFileToS3, uploadImageFileToS3, uploadMediaFileToS3 } from "../s3.js";

export const getEpkCover = async (req, res) => {
  const id = req.body.id;
  try {
    const epkCover = await epkCover.findOne({ _id: id });

    res.status(200).json(epkCover);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEpkCover = async (req, res) => {
  //const id = req.body.id;
  try {
    //const movie = await Movie.findOne({ _id: id });
    const epkCoverToSave = req.body;
    
    const newEpkCover = await new Epk(epkCoverToSave).save();
    // newEpkCover.Movie = movie;
    //await newEpkCover.save();
    res.status(201).json(newEpkCover);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEpkCover = async (req, res) => {
  const movie = req.body;

  //
};

//upload 1 file to S3
export const uploadEpkFile = async (req, res) => {
  const file = req.file;
  const result = await uploadFileToS3(file);
  if (!result) {
    res.status(406).send({ message: "File extention not supported!" });
  } else {
    console.log(result);
    res.status(200).send({ key: result.Key });
    //res.status(200).send({ Location: result.Location });
  }
};

export const uploadEpkFiles = async (req, res) => {
  let totalResult = {};
  console.log(req.files);
  if ("file1" in req.files) {
    const file1 = req.files.file1[0];
    const result1 = await uploadFileToS3(file1);
    if (!result1) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result1);
      totalResult["file1"] = result1.Key;
    }
  }

  console.log("file2" in req.files);
  if ("file2" in req.files) {
    const file2 = req.files.file2[0];
    const result2 = await uploadFileToS3(file2);
    if (!result2) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(totalResult);
      totalResult["file2"] = result2.Key;
    }
  }

  console.log(totalResult);
  res.send(totalResult);
};