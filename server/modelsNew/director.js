const mongoose = require("mongoose");

const directorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    header: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      trim: true,
      required: true,
    },
   
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  { timestamps: true } // used to know when the director is created or updated
);

directorSchema.index({ name: "text" });

module.exports = mongoose.model("Director", directorSchema);
