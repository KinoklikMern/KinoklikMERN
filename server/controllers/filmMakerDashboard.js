////////////////////////////////////////////////
// Create controller for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
////////////////////////////////////////////////

import fepk from "../models/fepk.js";

export const getMyEpks = async (req, res) => {
  //const id = req.params.id;
  const film_maker_id = "63c0e3bb40253f49b94edd11";
  try {
    const myEpks = await fepk.find().where({film_maker: film_maker_id});
    res.status(200).json(myEpks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEpkbyId = async (req, res) => {
  const epkId = req.params.id;
  try {
    const myEpk = await fepk.findOne({ _id: epkId })
    .populate("likes") 
    .populate("mediumSynopsis") 
    .populate("longSynopsis") 
    res.status(200).json(myEpk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await user.findOne({ _id: id })
    res.status(200).json(myEpk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};