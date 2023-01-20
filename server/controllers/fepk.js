import fepk from "../models/fepk.js";
import {uploadFileToS3} from "../s3.js";

// fetch all Fepks
export const getFepks = async (req, res) => {
    try {
      const fepks = await fepk.find()
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .where("deleted")
      .equals(false);
      res.status(200).json(fepks);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

// fetch all Fepks by Film maker ID
export const getFepksByFilmmakerId = async (req, res) => {
  const id = req.params.id;
  try {
    const fepks = await fepk.find()
    .where({film_maker: id})
    .populate("film_maker") // includes all fields of this object
    .populate("crew.crewId") // includes all fields of this object
    .populate("likes") // includes all fields of this object
    .populate("favourites") // includes all fields of this object
    .where("deleted")
    .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// fetch all Fepks by User in Favourites "My list"
export const getFepksByUser = async (req, res) => {
  const id = req.params.id;
  try {
    const fepks = await fepk.find()
    .where({favourites: id})
    .populate("film_maker") // includes all fields of this object
    .populate("crew.crewId") // includes all fields of this object
    .populate("likes") // includes all fields of this object
    .populate("favourites") // includes all fields of this object
    .where("deleted")
    .equals(false);
    res.status(200).json(fepks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// fetch Fepk by Id
export const getFepkbyId = async (req, res) => {
    const id = req.params.id;
    try {
      const fepkOne = await fepk.findOne({ _id: id })
      .populate("film_maker") // includes all fields of this object
      .populate("crew.crewId") // includes all fields of this object
      .populate("likes") // includes all fields of this object
      .populate("favourites") // includes all fields of this object
      .where("deleted")
      .equals(false);
      res.status(200).json(fepkOne);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

// create Fepk
export const createFepk = async (req, res) => {
  try {
    const fepkToSave = req.body;
    const newFepk = new fepk(fepkToSave);
    await newFepk.save();
    res.status(201).json(newFepk);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update Fepk
export const updateFepk = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await fepk.findOne({ _id: id })
    .where("deleted")
    .equals(false);
    if(!fepkOne){
      res.json({ error: "No EPK was found!" });
    }
    else
    {
      const updatedFepk = req.body;
      await fepkOne.updateOne(updatedFepk);
      await fepkOne.updateOne({ updatedAt: new Date()},{ where: {_id: id} });
      const fepkUpdated = await fepk.findOne({ _id: id });
      res.status(200).json(fepkUpdated);
    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  } 
};

// adding user who liked Fepk
export const getFepkLiked = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk.findOne({ _id: fepkId })
    .where("deleted")
    .equals(false);
    if(!fepkOne){
      res.json({ error: "No EPK was found!" });
    }
    else
    {
      let exists = fepkOne.likes.includes(userId);
      if(exists === false)
      {
        await fepkOne.likes.push(userId);
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      }
      else{
        res.status(200).json(fepkOne);
      }
    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  } 
};

// adding user to  favourite list
export const getFepkFavourite = async (req, res) => {
  const fepkId = req.params.fepkid;
  const userId = req.params.userid;
  try {
    const fepkOne = await fepk.findOne({ _id: fepkId })
    .where("deleted")
    .equals(false);
    if(!fepkOne){
      res.json({ error: "No EPK was found!" });
    }
    else
    {
      let exists = fepkOne.favourites.includes(userId);
      if(exists === false)
      {
        await fepkOne.favourites.push(userId);
        await fepkOne.save();
        const fepkUpdated = await fepk.findOne({ _id: fepkId });
        res.status(200).json(fepkUpdated);
      }
      else{
        res.status(200).json(fepkOne);
      }
    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  } 
};

//upload a file to S3
export const uploadFepkFile = async (req, res) => {
    const file = req.file;
    const result = await uploadFileToS3(file);
    if (!result) {
      res.status(406).send({ message: "File extention not supported!" });
    } else {
      console.log(result);
      res.status(200).send({ key: result.Key });
      //res.status(200).send({ Location: result.Location });
    }
};

// delete Fepk
// Soft-deletion of documents in databases is an operation in which a flag is used 
// to mark documents as deleted without erasing the data from the database.
export const deleteFepk = async (req, res) => {
  const id = req.params.id;
  try {
    const fepkOne = await fepk.findOne({ _id: id })
    .where("deleted")
    .equals(false);
    if(!fepkOne){
      res.json({ error: "No EPK was found!" });
    }
    else
    {
      await fepkOne.updateOne({ deleted: true }, { where: {_id: id} });
      res.status(200).json("EPK was deleted!");
    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
};