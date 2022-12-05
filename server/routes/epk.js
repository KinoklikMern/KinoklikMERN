import express from "express";
import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";
import { createEpkSynopsis, getEpkSynopsis } from "../controllers/epkSynopsis.js";
import { createEpkDirector, getEpkDirector } from "../controllers/epkDirector.js";

const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);
router.post("/EpkSynopsis", createEpkSynopsis);
router.get("/EpkSynopsis/:id", getEpkSynopsis);

/* router.get("/", authUser, getEpk);
router.post("/", authUser, createEpk);
router.put("/", authUser, updateEpk); */

router.post("/EpkDirector", createEpkDirector);
router.get("/EpkDirector/:id", getEpkDirector);


export default router;
