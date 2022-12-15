import epkReview from "../models/epkReview.js";
import epk from "../models/epk.js";

export const createEpkReview = async (req, res) => {
    const title = req.body.title;
    const reviewList = req.body.reviewList;
    const epkFromDb = await epk.findOne({ title: title });

    try {

        const savedReview = [];
        for (let i = 0; i < reviewList.length; i++) {
            console.log(reviewList[i]);
            const newReview = new epkReview(reviewList[i]);
            newReview.save();

            savedReview.push(newReview);
        }
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getEpkReview = async (req, res) => {
    const epk = req.params.id;
    try {
        const ReviewFromDb = await epkReview.find({ epk: epk });
        console.log(ReviewFromDb);
        res.status(200).json(ReviewFromDb);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
