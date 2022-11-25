import express from "express";

import { getStarring, createStarring, updateStarring} from "../controllers/starring.js";

const router = express.Router();

router.get("/read", getStarring);
router.post("/insert", createStarring);
router.put("/update", updateStarring);


//router.patch("/movie/:id/epk", patchEpk);
export default router;