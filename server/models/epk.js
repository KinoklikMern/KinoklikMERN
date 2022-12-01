import mongoose from "mongoose";

const epkSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movie",
  },
  title: {
    type: String,
  },
  log_line: {
    type: String,
  },
  cover_banner_url: {
    type: String,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
  },
  poster_url: {
    type: String,
  },
  log_line_poster_url: {
    type: String,
  },
  trailer_url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  releaseDate: Date,
  genre: {
    type: String,
  },

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
  },
  


});

const epk = mongoose.model("epk", epkSchema);

export default epk;