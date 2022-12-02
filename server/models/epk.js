import mongoose from "mongoose";

const epkSchema = mongoose.Schema({
  title: {
    type: String,
  },
  synopsis: [
    {
      epkSynopsis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "epkSynopsis",
      },
    },
  ],

  unique1_title:{
    type:String,
  },
  unique1_description:{
    type:String,
  },
  unique1_poster_url:{
    type:String,
  },
  
  unique2_title:{
    type:String,
  },
  unique2_description:{
    type:String,
  },
  unique2_poster_url:{
    type:String,
  },
  still_img1_url:{
    type:String,
  },
  still_img2_url:{
    type:String,
  },
  still_img3_url:{
    type:String,
  },
  still_img4_url:{
    type:String,
  },
  still_img5_url:{
    type:String,
  },
  still_img6_url:{
    type:String,
  },
  still_img7_url:{
    type:String,
  },
  still_img8_url:{
    type:String,
  }
  
});

const epk = mongoose.model("epk", epkSchema);

export default epk;
