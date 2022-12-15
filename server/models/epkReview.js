import mongoose from "mongoose";

const epkReviewSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },

    review1Magazine: {
        type: String,

    },
    review1Review: {
        type: String,

    },
    review1Award: {
        type: String,

    },

    review2Magazine: {
        type: String,

    },
    review2Review: {
        type: String,

    },
    review2Award: {
        type: String,

    },

    review3Magazine: {
        type: String,

    },
    review3Review: {
        type: String,

    },
    review3Award: {
        type: String,

    },

    review4Magazine: {
        type: String,

    },
    review4Review: {
        type: String,

    },
    review4Award: {
        type: String,

    },
});

const review = mongoose.model("epkReview", epkReviewSchema);

export default review;
