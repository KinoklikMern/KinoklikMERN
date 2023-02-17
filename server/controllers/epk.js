import epk from "../models/epk.js";
import Movie from "../models/movie.js";

// edit by Tony /////////////////////////////////////
export const getMyEpks = async (req, res) => {
  try {
    const myEpks = await epk.find();
    res.status(200).json(myEpks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// end //////////////////////////////////////////////

export const getEpk = async (req, res) => {
  const title = req.body.title;
  try {
    const epkFromDb = await epk.findOne({ title: title });
    console.log(epkFromDb.synopsis[0].image);
    res.status(200).json(epkFromDb);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEpk = async (req, res) => {
  try {
    const epkToSave = req.body;
    const newEpk = new epk(epkToSave);
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
