import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Make sure this matches the name of your User model
  },
  fepk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fepk',   // Make sure this matches the name of your FEPK model
  },
  stripeChargeId: String,
  date: {
    type: Date,
    default: Date.now,
  },
  
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;

