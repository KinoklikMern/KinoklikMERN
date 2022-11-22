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
  const epk = req.body;

  const newEpk = new Epk(epk);

  try {
    await newEpk.save();

    res.status(201).json(newEpk);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }

};


//update uniques of epk by movieId
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkUniquesByMovieId = async (req,res) =>{
  const newuniques = req.body.uniques;
  console.log(newuniques);
  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ uniques:newuniques}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}


//update synopses of epk by movieId
export const updateEpkSynopsesByMovieId = async (req,res) =>{
  const newsynopses = req.body.synopses;
  console.log(newuniques);
  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ synopses:newsynopses}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}

