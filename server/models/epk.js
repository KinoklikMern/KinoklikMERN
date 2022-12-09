import mongoose from "mongoose";

const epkSchema = mongoose.Schema({
  title: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
