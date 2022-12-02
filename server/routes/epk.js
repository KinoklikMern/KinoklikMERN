import express from "express";
import { authUser } from "../middlwares/auth.js";

import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";
import { createEpkSynopsis } from "../controllers/epkSynopsis.js";
const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);
router.post("/createEpkSynopsis", createEpkSynopsis);

/* router.get("/", authUser, getEpk);
router.post("/", authUser, createEpk);
router.put("/", authUser, updateEpk); */

export default router;
