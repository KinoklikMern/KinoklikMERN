import epkDirector from "../models/epkDirector.js";
import epk from "../models/epk.js";

export const createEpkDirector = async (req, res) => {
    const title = req.body.title;
    const directorList = req.body.directorList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedDirector = [];
        for (let i = 0; i < directorList.length; i++) {
            console.log(directorList[i]);
            const newDirector = new epkDirector(directorList[i]);
            newDirector.save();

            savedDirector.push(newDirector);
        }
        res.status(201).json(savedDirector);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkDirector = async (req, res) => {
    const epk = req.params.id;
    try {
        const DirectorFromDb = await epkDirector.find({ epk: epk });
        console.log(DirectorFromDb);
        res.status(200).json(DirectorFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
