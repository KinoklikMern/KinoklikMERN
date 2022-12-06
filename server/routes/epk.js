import express from "express";
import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";
import { createEpkSynopsis, getEpkSynopsis } from "../controllers/epkSynopsis.js";

import { createEpkCast, getEpkCast } from "../controllers/epkCast.js";
import { createEpkDirector, getEpkDirector } from "../controllers/epkDirector.js";
import { createEpkProducer, getEpkProducer } from "../controllers/epkProducer.js";
import { createEpkCinematographer, getEpkCinematographer } from "../controllers/epkCinematographer.js";

const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);
router.post("/EpkSynopsis", createEpkSynopsis);
router.get("/EpkSynopsis/:id", getEpkSynopsis);

/* router.get("/", authUser, getEpk);
router.post("/", authUser, createEpk);
router.put("/", authUser, updateEpk); */

router.post("/EpkCast", createEpkCast);
router.get("/EpkCast/:id", getEpkCast);

router.post("/EpkDirector", createEpkDirector);
router.get("/EpkDirector/:id", getEpkDirector);

router.post("/EpkProducer", createEpkProducer);
router.get("/EpkProducer/:id", getEpkProducer);

router.post("/EpkCinematographer", createEpkCinematographer);
router.get("/EpkCinematographer/:id", getEpkCinematographer);

export default router;
