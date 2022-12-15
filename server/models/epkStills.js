import mongoose from "mongoose";

const epkStillsSchema = mongoose.Schema({
    epk: {
        type: String,
        required: true,
    },

    image1:{
        type:String,
      },
      image2:{
        type:String,
      },
      image3:{
        type:String,
      },
      image4:{
        type:String,
      },
      image5:{
        type:String,
      },
      image6:{
        type:String,
      },
      image7:{
        type:String,
      },
      image8:{
        type:String,
      }

});

const stills = mongoose.model("epkStills", epkStillsSchema);

export default stills;