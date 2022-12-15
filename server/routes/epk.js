import express from "express";
import { authUser } from "../middlwares/auth.js";

import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";
import { createEpkSynopsis } from "../controllers/epkSynopsis.js";

// For unique section
//import { getEpkUniquesById , updateEpkUniquesById} from "../controllers/epk.js";
import { createEpkUniqueness, getEpkUniqueness } from "../controllers/epkUniqueness.js";
// For still section
//import { getEpkStillsById,updateEpkStillsById } from "../controllers/epk.js";
import { createEpkStills, getEpkStills } from "../controllers/epkStills.js";


const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);
router.post("/createEpkSynopsis", createEpkSynopsis);




//for uniques section
//router.get("/:id/uniques",getEpkUniquesById);
//router.put("/:id/uniques",updateEpkUniquesById);
router.post("/EpkUniqueness", createEpkUniqueness);
router.get("/EpkUniqueness/:id", getEpkUniqueness);

//for stills section
//router.get("/:id/stills",getEpkStillsById);
//router.put("/:id/stills",updateEpkStillsById);
router.post("/EpkStills", createEpkStills);
router.get("/EpkStills/:id", getEpkStills);


export default router;
