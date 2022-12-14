import epkResources from "../models/epkResources.js";
import epk from "../models/epk.js";

export const createEpkResources = async (req, res) => {
  const title = req.body.title;
  const Resource = req.body.resource;
  // const epkFromDb = await epk.findOne({ title: title });

  /*   const shortResources = req.body.shortResources;
  const mediumResources = req.body.mediumResources;
  const longResources = req.body.longResources; */

  try {
    /*     const newShortResources = new epkResources(shortResources);
    const newMediumResources = new epkResources(mediumResources);
    const newLongResources = new epkResources(longResources);
    await newShortResources?.save();
    newMediumResources?.save();
    newLongResources?.save();

    const Resources = {
      shortResources: newShortResources,
      mediumResources: newMediumResources,
      longResources: newLongResources,
    }; */
    // epk.Resources = Resources;
    // epk.save();

    const newResources = new epkResources(Resource);
    newResources.save();
    //savedResources.push(newResources);
    // epkFromDb.Resources.push(newResources);
    // }
    // epkFromDb.save();
    res.status(201).json(newResources);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getEpkResources = async (req, res) => {
  const epk = req.params.id;
  try {
    const EpkResourcesFromDb = await epkResources.find({ epk: epk });
    console.log(EpkResourcesFromDb);
    res.status(200).json(EpkResourcesFromDb);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};