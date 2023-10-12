import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  amount: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  epk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'epk',
  },
  stripeChargeId: String,
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
