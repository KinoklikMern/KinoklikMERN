////////////////////////////////////////////////
// Create controller for filmMakerDashboard page
// Edit by Tony
// On Jan 20, 2023
////////////////////////////////////////////////

import fepk from "../models/fepk.js";
import User from "../models/User.js";

const PENDING = "pending";
const REFUSED = "refused";
const APPROVED = "approved";
const DISTRIBUTOR = "Distributor";
const FILMFESTIVAL = "Film_Festival";
const SALESAGENT = "Sales_Agent";

export const getEpks = async (req, res) => {
  //const id = req.params.id;
  const film_maker_id = "63c0e3bb40253f49b94edd11";
  try {
    const epks = await fepk.find().where({ film_maker: film_maker_id });
    res.status(200).json(epks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEpkbyId = async (req, res) => {
  const epkId = req.params.id;
  try {
    const myEpk = await fepk
      .findOne({ _id: epkId })
      .populate("likes")
      .populate("mediumSynopsis")
      .populate("longSynopsis");
    res.status(200).json(myEpk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserbyId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEpkRequests = async (req, res) => {
  const epkId = req.params.id;
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");
    res.status(200).json(epk.longSynopsis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getApprovedRequests = async (req, res) => {
  const epkId = req.params.id;
  const rs = new Array();
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");

    epk.longSynopsis.forEach((element) => {
      if (element.status == APPROVED) rs.push(element);
    });
    res.status(200).json(rs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRefusedRequests = async (req, res) => {
  const epkId = req.params.id;
  const rs = new Array();
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");

    epk.longSynopsis.forEach((element) => {
      if (element.status == REFUSED) rs.push(element);
    });
    res.status(200).json(rs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  const epkId = req.params.id;
  const rs = new Array();
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");

    epk.longSynopsis.forEach((element) => {
      if (element.status == PENDING) rs.push(element);
    });
    res.status(200).json(rs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDistributorsEpkRequests = async (req, res) => {
  const epkId = req.params.id;
  const rs = new Array();
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");

    epk.longSynopsis.forEach((element) => {
      if (element.role == DISTRIBUTOR) rs.push(element);
    });
    res.status(200).json(rs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFilmFestivalsEpkRequests = async (req, res) => {
  const epkId = req.params.id;
  const rs = new Array();
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");

    epk.longSynopsis.forEach((element) => {
      if (element.role == FILMFESTIVAL) rs.push(element);
    });
    res.status(200).json(rs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSalesAgentsEpkRequests = async (req, res) => {
  const epkId = req.params.id;
  const rs = new Array();
  try {
    const epk = await fepk.findOne({ _id: epkId }).populate("longSynopsis");

    epk.longSynopsis.forEach((element) => {
      if (element.role == SALESAGENT) rs.push(element);
    });
    res.status(200).json(rs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// search filmmaker by name
// export const searchFilmmakers = async (req, res) => {
//   const searchTerm = req.query.name;
//   if (!searchTerm) {
//     return res.status(400).json({ message: "Search term is required." });
//   }

//   try {
//     const regex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive
//     const filmmakers = await User.find({ name: regex, role: "Filmmaker" });

//     const formattedFilmmakers = filmmakers.map((filmmaker) => ({
//       id: filmmaker._id,
//       name: filmmaker.name,
//       role: filmmaker.role,
//       image: filmmaker.picture,
//     }));

//     res.status(200).json(formattedFilmmakers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const searchFilmmakers = async (req, res) => {
  const searchTerm = req.query.name;
  try {
    const results = await User.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
      ],
      role: "Filmmaker", // If you want to search for actors, or change to 'Filmmaker' if needed
      // Add other filters if necessary
    }).select("firstName lastName role picture");

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
