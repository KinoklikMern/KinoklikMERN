import crew from "../models/crew.js";
import {uploadFileToS3} from "../s3.js";

// fetch all Crews
export const getCrews = async (req, res) => {
    try {
      const crews = await crew.find()
      .where("deleted")
      .equals(false);
      res.status(200).json(crews);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

// fetch Crew by Id
export const getCrewbyId = async (req, res) => {
    const id = req.params.id;
    try {
      const crewOne = await crew.findOne({ _id: id })
      .where("deleted")
      .equals(false);
      res.status(200).json(crewOne);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

// fetch Crew by Name
export const getCrewByName = async (req, res) => {
  const name = req.params.name;
  try {
    const crewOne = await crew.findOne({ name: { $regex : new RegExp(`^${name}$`, "i")} })
    .where("deleted")
    .equals(false);
    res.status(200).json(crewOne);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// create Crew
export const createCrew = async (req, res) => {
  try {
    const crewToSave = req.body;
    const newCrew = new crew(crewToSave);
    await newCrew.save();
    res.status(201).json(newCrew);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update Crew
export const updateCrew = async (req, res) => {
  const id = req.params.id;
  try {
    const crewOne = await crew.findOne({ _id: id })
    .where("deleted")
    .equals(false);
    if(!crewOne){
      res.json({ error: "No Crew was found!" });
    }
    else
    {
      const updatedCrew = req.body;
      await crewOne.updateOne(updatedCrew);
      await crewOne.updateOne({ updatedAt: new Date()},{ where: {_id: id} });
      const crewUpdated = await crew.findOne({ _id: id });
      res.status(200).json(crewUpdated);
    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  } 
};

// upload a file to S3
export const uploadCrewFile = async (req, res) => {
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

// delete Crew
// Soft-deletion of documents in databases is an operation in which a flag is used 
// to mark documents as deleted without erasing the data from the database.
export const deleteCrew = async (req, res) => {
  const id = req.params.id;
  try {
    const crewOne = await crew.findOne({ _id: id })
    .where("deleted")
    .equals(false);
    if(!crewOne){
      res.json({ error: "No Crew was found!" });
    }
    else
    {
      await crewOne.updateOne({ deleted: true }, { 
          where: {
              _id: id
          } 
      });
      res.status(200).json("Crew was deleted!");
    }
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  } 
};