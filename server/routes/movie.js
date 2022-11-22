import express from 'express';

import { getMovies, createMovie,greeting } from '../controllers/movies.js'

const router = express.Router();

router.get('/movies',  getMovies);
router.get('/greeting',  greeting);


export default router;
