import mongoose from "mongoose";

const epkUniquenessSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },
    title1:{
        type:String,
      },
    description1:{
        type:String,
    },
    img1:{
       type:String,
    },
    title2:{
        type:String,
      },
    description2:{
        type:String,
    },
    img2:{
       type:String,
    }

});

const uniqueness = mongoose.model("epkUniqueness", epkUniquenessSchema);

export default uniqueness;