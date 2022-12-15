import mongoose from "mongoose";

const epkProducerSchema = mongoose.Schema({
    epk: {
        type: String,

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

const producer = mongoose.model("epkProducer", epkProducerSchema);

export default producer;
