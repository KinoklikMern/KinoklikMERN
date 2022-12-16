import mongoose from "mongoose";

const epkStillsSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    
    stills1Img_url: {
        type: String
    },
    
    stills2Img_url: {
        type: String
    },
    
    stills3Img_url: {
        type: String
    },
    
    stills4Img_url: {
        type: String
    },     

    stills5Img_url: {
        type: String
    },
    
    stills6Img_url: {
        type: String
    },
    
    stills7Img_url: {
        type: String
    },
    
    stills8Img_url: {
        type: String
    },     

});

const stills = mongoose.model("epkStills", epkStillsSchema);

export default stills;
