import express from "express";
import { authUser } from "../middlwares/auth.js";

import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";
import { createEpkSynopsis } from "../controllers/epkSynopsis.js";

// For unique section
import { getEpkUniquesById , updateEpkUniquesById} from "../controllers/epk.js";
// For still section
import { getEpkStillsById,updateEpkStillsById } from "../controllers/epk.js";
// For logline section
import { getEpkLoglineById,updateEpkLoglineById } from "../controllers/epk.js";
// For producer section
import { getEpkProducerById,updateEpkProducerById } from "../controllers/epk.js";


const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);
router.post("/createEpkSynopsis", createEpkSynopsis);

/* router.get("/", authUser, getEpk);
router.post("/", authUser, createEpk);
router.put("/", authUser, updateEpk); */


//for uniques section
router.get("/:id/uniques",getEpkUniquesById);
router.put("/:id/uniques",updateEpkUniquesById);
/*
router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  uploadEpkFiles
);*/

//for stills section
router.get("/:id/stills",getEpkStillsById);
router.put("/:id/stills",updateEpkStillsById);

//for logline section
router.get("/:id/loglines",getEpkLoglineById);
router.put("/:id/loglines",updateEpkLoglineById);

//for producer section
router.get("/:id/producers",getEpkProducerById);
router.put("/:id/producers",updateEpkProducerById);

/*
router.post(
  "/uploadStills",
  upload.fields([{ name: "file1" }, { name: "file2" },
   { name: "file3" },, { name: "file4" },, { name: "file5" }, { name: "file6" }, { name: "file7" }, { name: "file8" }]),
  uploadEpkStills
);*/
export default router;
