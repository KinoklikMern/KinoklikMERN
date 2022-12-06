import mongoose from "mongoose";

const epkCinematographerSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    header: {
        type: String,
        required: true,
    },
    biography: {
        type: String,
        required: true,
    },

});

const cinematographer = mongoose.model("epkCinematographer", epkCinematographerSchema);

export default cinematographer;
