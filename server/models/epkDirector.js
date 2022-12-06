import mongoose from "mongoose";

const epkDirectorSchema = mongoose.Schema({
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

const director = mongoose.model("epkDirector", epkDirectorSchema);

export default director;
