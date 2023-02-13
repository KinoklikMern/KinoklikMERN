import express from "express";
import multer from "multer";
import {
  getMovies,
  getMoviesByFilmmakerId,
  createMovie,
  uploadMovieFile,
  uploadMovieFiles,
} from "../controllers/movies.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

router.get("/movies", getMovies);

// Gets all Movies of certain film maker
router.get("/movies/byfilmmaker/:id", getMoviesByFilmmakerId);

// Gets all Movies of certain user
router.get("/movies/byuser/:userid", getMoviesByUserId);

router.post("/", createMovie);
router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  uploadMovieFiles
);

router.post("/uploadFile", upload.single("file"), uploadMovieFile);

export default router;
