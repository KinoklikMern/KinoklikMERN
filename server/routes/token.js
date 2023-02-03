import express from "express";
import { authUser } from "../middlewares/auth.js";

import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get("/", refreshToken);

export default router;
