import mongoose from "mongoose";

const epkLoglineSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }

});

const logline = mongoose.model("epkLogline", epkLoglineSchema);

export default logline;
