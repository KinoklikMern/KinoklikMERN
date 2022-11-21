import express from "express";
import { authUser } from "../middlwares/auth.js";

import { getMovies, createMovie } from "../controllers/movies.js";

const router = express.Router();
/* 
router.get("/", authUser, getMovies);
router.post("/", authUser, createMovie); */

router.get("/", getMovies);
router.post("/", createMovie);

export default router;
