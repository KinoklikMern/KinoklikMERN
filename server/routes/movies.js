import express from "express";
import multer from "multer";

const upload = multer({ dest: "images/" });

import {
  getMovies,
  createMovie,
  getMovieImage,
  getMovieMedia,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.post(
  "/uploadMedia",
  upload.fields([{ name: "fileFilm" }, { name: "fileTrailer" }]),
  getMovieMedia
);

router.post("/image", upload.single("file"), getMovieImage);

export default router;
