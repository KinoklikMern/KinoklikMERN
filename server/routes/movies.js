import express from "express";
import multer from "multer";

const upload = multer({ dest: "images/" });

import {
  getMovies,
  createMovie,
  uploadMovieFile,
  uploadMovieFiles,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  uploadMovieFiles
);

router.post("/uploadFile", upload.single("file"), uploadMovieFile);

export default router;
