import express from "express";
import {authUser} from "../middlwares/auth.js";
import { processDonation } from "../controllers/donation.js";

const router = express.Router();

// Create a route to handle donation processing (e.g., POST /donations)
router.post("/donations",authUser, processDonation);

export default router;

// // donation.js

// import express from "express";
// import {authUser} from "../middlwares/auth.js";
// import { processDonation } from "../controllers/donation.js";

// const router = express.Router();

// // Create a route to handle donation processing (e.g., POST /donations)
// router.post("/", processDonation);

// export default router;

