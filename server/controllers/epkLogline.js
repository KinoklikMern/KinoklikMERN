import epkLogline from "../models/epkLogline.js";
import epk from "../models/epk.js";

export const createEpkLogline = async (req, res) => {
    const title = req.body.title;
    const loglineList = req.body.loglineList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedLogline = [];
        for (let i = 0; i < loglineList.length; i++) {
            console.log(loglineList[i]);
            const newLogline = new epkLogline(loglineList[i]);
            newLogline.save();

            savedLogline.push(newLogline);
        }
        res.status(201).json(savedLogline);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkLogline = async (req, res) => {
    const epk = req.params.id;
    try {
        const LoglineFromDb = await epkLogline.find({ epk: epk });
        console.log(LoglineFromDb);
        res.status(200).json(LoglineFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
