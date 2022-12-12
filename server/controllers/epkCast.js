import epkCast from "../models/epkCast.js";
import epk from "../models/epk.js";

export const createEpkCast = async (req, res) => {
    const title = req.body.title;
    const castList = req.body.castList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedCast = [];
        for (let i = 0; i < castList.length; i++) {
            console.log(castList[i]);
            const newCast = new epkCast(castList[i]);
            newCast.save();

            savedCast.push(newCast);
        }
        res.status(201).json(savedCast);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkCast = async (req, res) => {
    const epk = req.params.id;
    try {
        const CastFromDb = await epkCast.find({ epk: epk });
        console.log(CastFromDb);
        res.status(200).json(CastFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
