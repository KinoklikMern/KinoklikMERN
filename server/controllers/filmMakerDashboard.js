////////////////////////////////////////////////
// Create controller for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
////////////////////////////////////////////////

import fepk from "../models/fepk.js";
import user from "../models/User.js";

import myEpk from "../models/myEpk.js";

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

// create Fepk
export const createMyEpk = async (req, res) => {
  try {
    const newMyEpk = new myEpk({

      user: new user({
        email: "email@gmail.com", 
        password: "6372e0d23418019bc445d4f4",
        firstName: "Tony",
        lastName: "W",
        role: "ADMIN"
      }),

      fepk: new fepk({
        film_maker: new user({
          email: "email@gmail.com", 
          password: "6372e0d23418019bc445d4f4",
          firstName: "Tony",
          lastName: "W",
          role: "ADMIN"
        }),
        title:"admin"
      }),
      likes: false,
      favourites: true
    });
    await newMyEpk.save();
    res.status(201).json(newMyEpk);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


