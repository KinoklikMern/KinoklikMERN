import mongoose from "mongoose";

const epkDirectorSchema = mongoose.Schema({
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

const director = mongoose.model("epkDirector", epkDirectorSchema);

export default director;
