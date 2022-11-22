import express from "express";

import { getEpk, createEpk, updateEpk,updateEpkUniquesByMovieId } from "../controllers/epk.js";

const router = express.Router();

router.get("/movie/:id/epk", getEpk);
router.post("/movie/:id/epk", createEpk);
router.put("/movie/:id/epk", updateEpk);
router.put("/movie/:id/epk/uniques", updateEpkUniquesByMovieId);
//router.put("/movie/:id/epk/synopses", updateEpkSynopses);

//router.patch("/movie/:id/epk", patchEpk);
export default router;