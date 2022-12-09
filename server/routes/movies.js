import express from "express";
<<<<<<< HEAD
import { authUser } from "../middlwares/auth.js";

import { getMovies, createMovie } from "../controllers/movies.js";
=======
import multer from "multer";

const upload = multer({ dest: "images/" });

import {
  getMovies,
  createMovie,
  uploadMovieFile,
  uploadMovieFiles,
} from "../controllers/movies.js";
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b

const router = express.Router();
/* 
router.get("/", authUser, getMovies);
router.post("/", authUser, createMovie); */

router.get("/", getMovies);
router.post("/", createMovie);
<<<<<<< HEAD
=======
router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  uploadMovieFiles
);

router.post("/uploadFile", upload.single("file"), uploadMovieFile);
>>>>>>> 5ecf8abf87b218fea273c4d2672ed328ed64c53b

export default router;
