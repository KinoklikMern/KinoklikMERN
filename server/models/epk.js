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

  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "epkDirector",
  },

});

const epk = mongoose.model("epk", epkSchema);

export default epk;
