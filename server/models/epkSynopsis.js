import mongoose from "mongoose";

const epkSynopsisSchema = mongoose.Schema({
  epk: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const epkSynopsis = mongoose.model("epkSynopsis", epkSynopsisSchema);

export default epkSynopsis;
