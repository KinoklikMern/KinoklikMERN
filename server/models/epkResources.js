import mongoose from "mongoose";

const epkResourcesSchema = mongoose.Schema({
  epk: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const epkResources = mongoose.model("epkResources", epkResourcesSchema);

export default epkResources;
