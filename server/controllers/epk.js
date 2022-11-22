import epk from "../models/epk.js";
import Movie from "../models/movie.js";

export const getEpk = async (req, res) => {
  const id = req.body.id;
  try {
    const epk = await epk.findOne({ _id: id });

    res.status(200).json(epk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEpk = async (req, res) => {
  const id = req.body.id;
  try {
    const movie = await Movie.findOne({ _id: id });
    const epkToSave = req.body;
    const newEpk = new epk(epkToSave);
    newEpk.Movie = movie;
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  try {
    await newEpk.save();
    res.status(201).json(newEpk);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEpk = async (req, res) => {
  const movie = req.body;

  const newMovie = new Movie(movie);

  try {
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
