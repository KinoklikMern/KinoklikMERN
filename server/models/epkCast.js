import mongoose from "mongoose";

const epkCastSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    
    leadActor1Name: {
        type: String
    },
    leadActor1Biography:{
        type: String
    },
    leadActor1Img_url: {
        type: String
    },
    
    leadActor2Name:{
        type: String
    },
    leadActor2Biography:{
        type: String
    },
    leadActor2Img_url: {
        type: String
    },
    
    supportingActor1Name:{
        name: String,
    },
    supportingActor1Biography:{
        type: String
    },
    supportingActor1Img_url: {
        type: String
    },
    
    supportingActor2Name:{
        name: String,
    },
    supportingActor2Biography:{
        type: String
    },
    supportingActor2Img_url: {
        type: String
    },
    
    cinematographerName:{
        type: String,
    },
    cinematographerHeader:{
        type: String
    },
    cinematographerBiography:{
        type: String
    },
    cinematographerImg_url: {
        type: String
    },
      

});

const cast = mongoose.model("epkCast", epkCastSchema);

export default cast;
