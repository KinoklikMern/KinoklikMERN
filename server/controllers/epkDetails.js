import epkDetails from "../models/epkDetails.js";
import epk from "../models/epk.js";

export const createEpkDetails = async (req, res) => {
    const title = req.body.title;
    const detailsList = req.body.detailsList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedDetails = [];
        for (let i = 0; i < detailsList.length; i++) {
            console.log(detailsList[i]);
            const newDetails = new epkDetails(detailsList[0]);
            newDetails.save();

            savedDetails.push(newDetails);
        }
        res.status(201).json(savedDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkDetails = async (req, res) => {
    const epk = req.params.id;
    try {
        const DetailsFromDb = await epkDetails.find({ epk: epk });
        console.log(DetailsFromDb);
        res.status(200).json(DetailsFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
