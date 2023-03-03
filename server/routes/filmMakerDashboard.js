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
            getRefusedRequests,
            getDistributorsEpkRequests,
            getFilmFestivalsEpkRequests,
            getSalesAgentsEpkRequests
        } from "../controllers/filmMakerDashboard.js";
const router = express.Router();
router.get("/", getEpks);
router.get("/selectedepk/:id", getEpkbyId);
router.get("/getuserbyid/:id", getUserbyId);
router.get("/getepkRequests/:id", getEpkRequests);
router.get("/getapprovedrequests/:id", getApprovedRequests);
router.get("/getpendingrequests/:id", getPendingRequests);
router.get("/getrefusedrequests/:id", getRefusedRequests);
router.get("/getdistributorsepkrequests/:id", getDistributorsEpkRequests);
router.get("/getfilmfestivalsepkrequests/:id", getFilmFestivalsEpkRequests);
router.get("/getsalesagentsepkrequests/:id", getSalesAgentsEpkRequests);

export default router;

