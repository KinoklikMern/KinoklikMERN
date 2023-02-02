//////////////////////////////////////////////
// Create routes for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
//////////////////////////////////////////////
import express from "express";
import { getMyEpks } from "../controllers/filmMakerDashboard.js";
import { createMyEpk } from "../controllers/filmMakerDashboard.js";

const router = express.Router();
router.get("/", getMyEpks);
router.post("/", createMyEpk);

export default router;

