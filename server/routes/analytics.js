import express from "express";
import { trackUniversalView } from "../controllers/analytics.js";

const router = express.Router();

router.post("/track-view", trackUniversalView);

export default router;