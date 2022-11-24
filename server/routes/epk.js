import express from "express";

import { getEpkByMovieId, createEpk, updateEpkByMovieId,updateEpkUniquesByMovieId ,
         updateEpkSynopsesByMovieId, updateEpkLeadActorsByMovieId,updateEpkSupportingActorsByMovieId } from "../controllers/epk.js";

const router = express.Router();

router.get("/:id", getEpkByMovieId);
router.post("/:id", createEpk);
router.put("/:id", updateEpkByMovieId);
router.put("/:id/uniques", updateEpkUniquesByMovieId);
router.put("/:id/synopses", updateEpkSynopsesByMovieId);

//router.patch("/movie/:id/epk", patchEpk);
export default router;