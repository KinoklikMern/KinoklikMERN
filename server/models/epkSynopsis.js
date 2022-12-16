import mongoose from "mongoose";

const epkSynopsisSchema = mongoose.Schema({
  epk: {
    type: String,
    required: true,
  },
  image: {
    type: String,

  },
  text: {
    type: String,

  },
  type: {
    type: String,

  },
});

const epkSynopsis = mongoose.model("epkSynopsis", epkSynopsisSchema);

export default epkSynopsis;
