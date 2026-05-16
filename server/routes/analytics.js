import express from "express";
import { trackUniversalView, getAdminAnalytics } from "../controllers/analytics.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/track-view", trackUniversalView);
router.get("/admin-summary", authUser, getAdminAnalytics);

export default router;
