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
});

const epk = mongoose.model("epk", epkSchema);

export default epk;
