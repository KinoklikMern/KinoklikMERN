import mongoose from "mongoose";

const epkDetailsSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    
    image: {
        type: String
    },

    director:{
        type: String
    },

    producer: {
        type: String
    },
    
    writer:{
        type: String
    },

    cinematographer:{
        type: String
    },

    editor: {
        type: String
    },
    
    sound:{
        type: String,
    },
    
    productionCo:{
        type: String
    },

    distributionCo: {
        type: String
    },
    
    leadActor1:{
        type: String,
    },

    leadActor2:{
        type: String
    },

    supportingActor1: {
        type: String
    },     

    supportingActor2: {
        type: String
    },   

    productionYear: {
        type: String
    },

    durationMin: {
        type: String
    },   
});

const details = mongoose.model("epkDetails", epkDetailsSchema);

export default details;
