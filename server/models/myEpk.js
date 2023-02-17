import mongoose from "mongoose";

const myEpkSchema = mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  fepk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fepk",
    required: true
  },
  
  likes: {
    type: Boolean,
    required: false
  },

  favourites: {
    type: Boolean,
    required: false
  }


});

const myEpk = mongoose.model("myEpk", myEpkSchema);

export default myEpk;