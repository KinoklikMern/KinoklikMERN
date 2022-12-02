import epkSynopsis from "../models/epkSynopsis.js";
import epk from "../models/epk.js";

export const createEpkSynopsis = async (req, res) => {
  const title = req.body.title;
  // const epk = await epk.findOne({ title: title });

  const shortSynopsis = req.body.shortSynopsis;
  const mediumSynopsis = req.body.mediumSynopsis;
  const longSynopsis = req.body.longSynopsis;

  try {
    const newShortSynopsis = new epkSynopsis(shortSynopsis);
    const newMediumSynopsis = new epkSynopsis(mediumSynopsis);
    const newLongSynopsis = new epkSynopsis(longSynopsis);
    await newShortSynopsis?.save();
    newMediumSynopsis?.save();
    newLongSynopsis?.save();

    const synopsis = {
      shortSynopsis: newShortSynopsis,
      mediumSynopsis: newMediumSynopsis,
      longSynopsis: newLongSynopsis,
    };
    // epk.synopsis = synopsis;
    // epk.save();
    res.status(201).json(synopsis);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
