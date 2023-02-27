//////////////////////////////////////////////
// Create routes for filmMakerDashboard page
// Edit by Tony 
// On Jan 20, 2023
//////////////////////////////////////////////
import express from "express";
import { getEpks, 
            getEpkbyId, 
            getUserbyId, 
            getEpkRequests, 
            getApprovedRequests,
            getPendingRequests,
            getRefusedRequests
        } from "../controllers/filmMakerDashboard.js";
const router = express.Router();
router.get("/", getEpks);
router.get("/selectedepk/:id", getEpkbyId);
router.get("/getUserbyId/:id", getUserbyId);
router.get("/getEpkRequests/:id", getEpkRequests);
router.get("/getApprovedRequests/:id", getApprovedRequests);
router.get("/getPendingRequests/:id", getPendingRequests);
router.get("/getRefusedRequests/:id", getRefusedRequests);

export default router;

