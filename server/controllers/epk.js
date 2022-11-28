import Epk from "../models/epk.js";
import Movie from "../models/movie.js";
import {ObjectId} from'mongodb';

export const getEpkByMovieId = async (req, res) => {  
  try {
    const epk = await Epk.findOne({ movie: ObjectId(req.params.id)});
   
    res.status(200).json(epk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// create epk
export const createEpk = async(req, res) => {   
  const newepk = new Epk(req.body);  
  //const movie = await Movie.findOne({ _id: ObjectId(req.params.id) });
  newepk.movie = ObjectId(req.params.id);
  newepk.save((err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(response);       
  });
};

//update epk by id
export const updateEpkByMovieId = async (req,res) =>{
  let newValue = req.body;  

  Epk.updateOne({movie:ObjectId(req.params.id) },newValue, (err, response) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(response );       
  });
}


// get uniques of epk by movieId
export const getEpkUniquesByMovieId = (req,res) =>{
  Epk.find({ movie: ObjectId(req.params.id)  }, {uniques:1},(err, epk) => {
     //console.log(req.params.id);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);      
  });
}



//update uniques of epk by movieId
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkUniquesByMovieId = async (req,res) =>{
  const newuniques = req.body.uniques;
  //console.log(newuniques);
  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ uniques:newuniques}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}


// get stills of epk by movieId
export const getEpkStillsByMovieId = (req,res) =>{
  Epk.find({ movie: ObjectId(req.params.id)  }, {stills:1},(err, epk) => {
     //console.log(req.params.id);
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);      
  });
}



//update stills of epk by movieId
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkStillsByMovieId = async (req,res) =>{
  const newstills = req.body.stills;
  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ stills:newstills}},(err, epk) => {
     
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

  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ synopses:newsynopses}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}

//update leadactors of epk by movieId
export const updateEpkLeadActorsByMovieId = async (req,res) =>{
  const newLeadActors = req.body.leadactors;

  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ leadactors:newLeadActors}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}


//update supportingactors of epk by movieId
export const updateEpkSupportingActorsByMovieId = async (req,res) =>{
  
  const newSupportingActors = req.body.supportingactors;

  Epk.updateMany({ movie: ObjectId(req.params.id)}, {$set:{ supportingactors:newSupportingActors}},(err, epk) => {
     
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).json(epk);       
  });
}


