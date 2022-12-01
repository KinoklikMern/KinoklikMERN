import express from "express";
import multer from "multer";


import { getEpkByMovieId, createEpk, updateEpkById,uploadEpkFiles} from "../controllers/epk.js";
// For unique section
import { getEpkUniquesById , updateEpkUniquesById} from "../controllers/epk.js";
// For still section
import { getEpkStillsById,updateEpkStillsById , uploadEpkStills} from "../controllers/epk.js";

const router = express.Router();
const upload = multer({ dest: "images/" });

router.get("/:id", getEpkByMovieId);
router.post("/:id", createEpk);
router.put("/:id", updateEpkById);


//for uniques section
router.get("/:id/uniques",getEpkUniquesById);
router.put("/:id/uniques",updateEpkUniquesById);
router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  uploadEpkFiles
);

//for stills section
router.get("/:id/stills",getEpkStillsById);
router.put("/:id/stills",updateEpkStillsById);
router.post(
  "/uploadStills",
  upload.fields([{ name: "file1" }, { name: "file2" },
   { name: "file3" },, { name: "file4" },, { name: "file5" }, { name: "file6" }, { name: "file7" }, { name: "file8" }]),
  uploadEpkStills
);

//router.patch("/movie/:id/epk", patchEpk);
export default router;