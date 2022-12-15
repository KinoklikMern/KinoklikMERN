import epkStills from "../models/epkStills.js";
import epk from "../models/epk.js";

export const createEpkStills = async (req, res) => {
    const title = req.body.title;
    const stillsList = req.body.stillsList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedStills = [];
        for (let i = 0; i < stillsList.length; i++) {
            console.log(stillsList[i]);
            const newStills = new epkStills(stillsList[i]);
            newStills.save();

            savedStills.push(newStills);
        }
        res.status(201).json(savedStills);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkStills = async (req, res) => {
    const epk = req.params.id;
    try {
        const StillsFromDb = await epkStills.find({ epk: epk });
        //console.log(StillsFromDb);
        res.status(200).json(StillsFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};