import stripe from "stripe"; // Import the Stripe SDK
import Donation from "../models/donation.js";

// Initialize Stripe with your secret key
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);


// Controller function to process a donation
export const processDonation = async (req, res) => {
  try {
    //later apply amount
    const { amount, token, userId, epkId } = req.body;

    // Create a charge with Stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "cad",
      source: token,
      description: "Donation for an epkEPK",
    });

    // Save donation data to MongoDB
    const donation = new Donation({
      amount: amount,
      user: userId,  // The user's ID
      fepk: epkId,   // The EPK's ID
      stripeChargeId: charge.id,  // Stripe charge ID
    });
    

    await donation.save();

    return res.status(200).json({ message: "Donation processed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Donation processing failed" });
  }
};







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
