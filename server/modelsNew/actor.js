const mongoose = require("mongoose");

const actorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female', 'prefer not to say']
    },
    biography: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ['lead', 'supporting']
    },
    avatar: {
      type: Object,
      url: String,
      public_id: String,
    },
  },
  { timestamps: true } // used to know when the user is created or updated
);

actorSchema.index({ name: "text" });

module.exports = mongoose.model("Actor", actorSchema);
