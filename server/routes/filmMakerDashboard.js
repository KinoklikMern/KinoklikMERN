//////////////////////////////////////////////
// Create routes for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
//////////////////////////////////////////////
import express from "express";
import { getMyEpks, getEpkbyId } from "../controllers/filmMakerDashboard.js";
//import { createMyEpk } from "../controllers/filmMakerDashboard.js";

const router = express.Router();
router.get("/", getMyEpks);
router.get("/selectedepk/:id", getEpkbyId);
//router.post("/", createMyEpk);

export default router;

