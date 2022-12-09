import epkSynopsis from "../models/epkSynopsis.js";
import epk from "../models/epk.js";

export const createEpkSynopsis = async (req, res) => {
  const title = req.body.title;
  const synopsisList = req.body.synopsisList;
  const epkFromDb = await epk.findOne({ title: title });

  /*   const shortSynopsis = req.body.shortSynopsis;
  const mediumSynopsis = req.body.mediumSynopsis;
  const longSynopsis = req.body.longSynopsis; */

  try {
    /*     const newShortSynopsis = new epkSynopsis(shortSynopsis);
    const newMediumSynopsis = new epkSynopsis(mediumSynopsis);
    const newLongSynopsis = new epkSynopsis(longSynopsis);
    await newShortSynopsis?.save();
    newMediumSynopsis?.save();
    newLongSynopsis?.save();

    const synopsis = {
      shortSynopsis: newShortSynopsis,
      mediumSynopsis: newMediumSynopsis,
      longSynopsis: newLongSynopsis,
    }; */
    // epk.synopsis = synopsis;
    // epk.save();
    const savedSynopsis = [];
    for (let i = 0; i < synopsisList.length; i++) {
      console.log(synopsisList[i]);
      const newSynopsis = new epkSynopsis(synopsisList[i]);
      newSynopsis.save();
      savedSynopsis.push(newSynopsis);
      // epkFromDb.synopsis.push(newSynopsis);
    }
    // epkFromDb.save();
    res.status(201).json(savedSynopsis);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getEpkSynopsis = async (req, res) => {
  const epk = req.params.id;
  try {
    const EpkSynopsisFromDb = await epkSynopsis.find({ epk: epk });
    console.log(EpkSynopsisFromDb);
    res.status(200).json(EpkSynopsisFromDb);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
