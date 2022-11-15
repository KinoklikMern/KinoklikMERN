import express from "express";

import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";

const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);
export default router;
