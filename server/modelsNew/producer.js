const mongoose = require("mongoose");

const producerSchema = mongoose.Schema(
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
  { timestamps: true } // used to know when the producer is created or updated
);

producerSchema.index({ name: "text" });

module.exports = mongoose.model("Producer", producerSchema);
