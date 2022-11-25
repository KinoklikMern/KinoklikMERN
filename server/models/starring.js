const mongoose = require("mongoose");

const StarringSchema = new mongoose.Schema({
    leadActor1Name: {
        type: String,
        required: true,
    },
    
    leadActor1Bio: {
        type: Number,
        required: true,
    }, 

    leadActor1ImageUrl: {
        type: String,
        required: true,
    }, 
    leadActor2Name: {
        type: String,
        required: true,
    },
    
    leadActor2Bio: {
        type: Number,
        required: true,
    }, 

    leadActor2ImageUrl: {
        type: String,
        required: true,
    }, 

    supportingActor1Name: {
        type: String,
        required: true,
    },
    
    supportingActor1Bio: {
        type: Number,
        required: true,
    }, 

    supportingActor1ImageUrl: {
        type: String,
        required: true,
    }, 

    supportingActor2Name: {
        type: String,
        required: true,
    },
    supportingActor2Bio: {
        type: Number,
        required: true,
    }, 
    supportingActor2ImageUrl: {
        type: String,
        required: true,
    }, 
});

const Food = mongoose.model("Strring", StarringSchema)
module.exports = Starring;