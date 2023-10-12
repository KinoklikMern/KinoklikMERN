import stripe from "stripe"; // Import the Stripe SDK
import Donation from "../models/donation.js"; // Import your Mongoose model for donations

// Create a new Stripe instance with your secret API key
//const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

// Controller function to process a donation
export const processDonation = async (req, res) => {
  try {
    const { amount, token, userId, epkId } = req.body;

    // Create a charge with Stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      source: token,
      description: "Donation for a epk",
    });

    // Save donation data to MongoDB
    const donation = new Donation({
      amount,
      user: userId,
      epk: epkId,
      stripeChargeId: charge.id,
    });

    await donation.save();

    return res.status(200).json({ message: "Donation processed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Donation processing failed" });
  }
};


// // donation.js

// import stripe from "stripe"; // Import the Stripe SDK
// import Donation from "../models/donation.js";// Import your Mongoose model for donations
// import fepk from "../models/fepk.js";
// import User from "../models/User.js";




// // Controller function to process a donation
// export const processDonation = async (req, res) => {
//   try {
//     const { amount, token, userId, fepkId } = req.body;

//     // Create a charge with Stripe
//     const charge = await stripe.charges.create({
//       amount: amount,
//       currency: "cad",
//       source: token.id,
//       description: "Donation for a fepk",
//     });

//     // Save donation data to MongoDB
//     const donation = new Donation({
//       amount,
//       user: userId,
//       fepk: fepkId,
//       stripeChargeId: charge.id,
//     });

//     await donation.save();

//     return res.status(200).json({ message: "Donation processed successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Donation processing failed" });
//   }
// };
