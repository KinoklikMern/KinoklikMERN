import epkUniqueness from "../models/epkUniqueness.js";
import epk from "../models/epk.js";

export const createEpkUniqueness = async (req, res) => {
    const title = req.body.title;
    const uniquenessList = req.body.uniquenessList;
    console.log(req.body.title);
    console.log(req.body.uniquenessList);
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedUniqueness = [];
        for (let i = 0; i < uniquenessList.length; i++) {
            console.log(uniquenessList[i]);
            const newUniqueness = new epkUniqueness(uniquenessList[i]);
            newUniqueness.save();

            savedUniqueness.push(newUniqueness);
        }
        res.status(201).json(savedUniqueness);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkUniqueness = async (req, res) => {
    const epk = req.params.id;
    try {
        const UniquenessFromDb = await epkUniqueness.find({ epk: epk });
        //console.log(UniquenessFromDb);
        res.status(200).json(UniquenessFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};