////////////////////////////////////////////////
// Create controller for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
////////////////////////////////////////////////

import fepk from "../models/fepk.js";

export const getMyEpks = async (req, res) => {
  try {
    const myEpks = await fepk.find();
    res.status(200).json(myEpks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


