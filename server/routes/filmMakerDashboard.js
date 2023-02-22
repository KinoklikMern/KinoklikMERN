//////////////////////////////////////////////
// Create routes for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
//////////////////////////////////////////////
import express from "express";
import { getMyEpks, getEpkbyId, getUserbyId } from "../controllers/filmMakerDashboard.js";
const router = express.Router();
router.get("/", getMyEpks);
router.get("/selectedepk/:id", getEpkbyId);
router.get("/getUserbyId/:id", getUserbyId);
export default router;

