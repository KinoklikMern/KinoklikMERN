import mongoose from "mongoose";

const epkCinematographerSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    image: {
        type: String,

    },
    name: {
        type: String,

    },
    header: {
        type: String,

    },
    biography: {
        type: String,

    },

});

const cinematographer = mongoose.model("epkCinematographer", epkCinematographerSchema);

export default cinematographer;
