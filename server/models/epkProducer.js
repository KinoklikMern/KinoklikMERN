import mongoose from "mongoose";

const epkProducerSchema = mongoose.Schema({
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

const producer = mongoose.model("epkProducer", epkProducerSchema);

export default producer;
