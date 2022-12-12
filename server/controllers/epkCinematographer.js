import epkCinematographer from "../models/epkCinematographer.js";
import epk from "../models/epk.js";

export const createEpkCinematographer = async (req, res) => {
    const title = req.body.title;
    const cinematographerList = req.body.cinematographerList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedCinematographer = [];
        for (let i = 0; i < cinematographerList.length; i++) {
            console.log(cinematographerList[i]);
            const newCinematographer = new epkCinematographer(cinematographerList[i]);
            newCinematographer.save();

            savedCinematographer.push(newCinematographer);
        }
        res.status(201).json(savedCinematographer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkCinematographer = async (req, res) => {
    const epk = req.params.id;
    try {
        const CinematographerFromDb = await epkCinematographer.find({ epk: epk });
        console.log(CinematographerFromDb);
        res.status(200).json(CinematographerFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
