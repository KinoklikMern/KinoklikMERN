import mongoose from "mongoose";

const epkUniquenessSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    
    uniqueness1Title: {
        type: String
    },
    uniqueness1Description:{
        type: String
    },
    uniqueness1Img_url: {
        type: String
    },
    
    uniqueness2Title: {
        type: String
    },
    uniqueness2Description:{
        type: String
    },
    uniqueness2Img_url: {
        type: String
    },

});

const uniqueness = mongoose.model("epkUniqueness", epkUniquenessSchema);

export default uniqueness;
