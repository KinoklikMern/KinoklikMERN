import epk from "../models/epk.js";
import Movie from "../models/movie.js";
import {ObjectId} from'mongodb';


export const getEpk = async (req, res) => {
  const title = req.body.title;
  try {
    const epk = await epk.findOne({ title: title });

    res.status(200).json(epk);
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





// get uniques of epk by Id
export const getEpkUniquesById = (req,res) =>{
  const id = req.params.id;
epk.find({ _id: ObjectId(req.params.id)  }, {unique1_title:1,
  unique2_title:1, unique1_description:1, unique2_description:1,
  unique1_poster_url:1, unique2_poster_url:1},(err, epk) => {  
   //console.log(req.params.id);
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  console.log(epk);
  res.status(200).json(epk);      
});
}



//update uniques of epk by Id
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkUniquesById = async (req,res) =>{
//const newuniques = req.body.uniques;
//console.log(newuniques);
const newtitle1 = req.body.unique1_title;
const newtitle2 = req.body.unique2_title;
const newdescription1 = req.body.unique1_description;
const newdescription2 = req.body.unique2_description;
const newposter1 = req.body.unique1_poster_url;
const newposter2 = req.body.unique2_poster_url;

epk.updateOne({ _id: ObjectId(req.params.id)}, {$set:{ unique1_title:newtitle1,
  unique2_title:newtitle2,unique1_description:newdescription1,unique2_description:newdescription2,
  unique1_poster_url:newposter1,unique2_poster_url:newposter2}},(err, epk) => {
   
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).json(epk);       
});
}


// get stills of epk by Id
export const getEpkStillsById = (req,res) =>{
epk.find({ _id: ObjectId(req.params.id)  }, {still_img1_url:1,still_img2_url:1,
  still_img3_url:1,still_img4_url:1,still_img5_url:1,still_img6_url:1,still_img7_url:1,still_img8_url:1},(err, epk) => {
   //console.log(req.params.id);
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).json(epk);      
});
}



//update stills of epk by Id
//example: db.employees.updateMany({_id:5},{$set:{ skills:["Sales Tax"]}})
export const updateEpkStillsById = async (req,res) =>{
const newstill1 = req.body.still_img1_url;
const newstill2 = req.body.still_img2_url;
const newstill3 = req.body.still_img3_url;
const newstill4 = req.body.still_img4_url;
const newstill5 = req.body.still_img5_url;
const newstill6 = req.body.still_img6_url;
const newstill7 = req.body.still_img7_url;
const newstill8 = req.body.still_img8_url;
epk.updateOne({ _id: ObjectId(req.params.id)}, {$set:{ still_img1_url:newstill1,still_img2_url:newstill2,
  still_img3_url:newstill3,still_img4_url:newstill4,still_img5_url:newstill5,
  still_img6_url:newstill6,still_img7_url:newstill7,still_img8_url:newstill8,}},(err, epk) => {
   
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).json(epk);       
});
}
