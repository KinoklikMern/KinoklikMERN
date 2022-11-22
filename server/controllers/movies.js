import Movie from "../models/movie.js"

export const getMovies = async (req, res) => {
 try {
  const movies = await Movie.find();

  res.status(200).json(movies);
 } catch (error) {
  res.status(404).json({message: error.message});
 }
}

export const createMovie = async (req, res) => {
  const movie = req.body;

  const newMovie = new Movie(movie);

  try {
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const greeting = async (req, res) => {  
   res.status(200).json("hello");

 }
