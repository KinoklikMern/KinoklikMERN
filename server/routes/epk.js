import express from "express";

import { getEpkByMovieId, createEpk, updateEpkByMovieId,getEpkUniquesByMovieId ,
         updateEpkUniquesByMovieId, getEpkStillsByMovieId,updateEpkStillsByMovieId } from "../controllers/epk.js";

const router = express.Router();

router.get("/:id", getEpkByMovieId);
router.post("/:id", createEpk);
router.put("/:id", updateEpkByMovieId);


//for uniques section
router.get("/:id/uniques",getEpkUniquesByMovieId);
router.patch("/:id/uniques",updateEpkUniquesByMovieId);

//for stills section
router.get("/:id/stills",getEpkStillsByMovieId);
router.patch("/:id/stills",updateEpkStillsByMovieId);


//router.patch("/movie/:id/epk", patchEpk);
export default router;