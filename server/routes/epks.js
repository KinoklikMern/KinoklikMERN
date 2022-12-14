import express from "express";
import multer from "multer";

const upload = multer({ dest: "images/" });

import { getEpk, createEpk, updateEpk } from "../controllers/epk.js";

import {
  getEpkCover,
  createEpkCover,
  updateEpkCover,
  uploadEpkFile,
  uploadEpkFiles,
} from "../controllers/epkCover.js";

const router = express.Router();

router.get("/", getEpk);
router.post("/", createEpk);
router.put("/", updateEpk);

router.get("/epkcover", getEpkCover);
router.post("/epkcover", createEpkCover);
router.put("/epkcover", updateEpkCover);

router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }]),
  uploadEpkFiles
);

router.post("/uploadFile", upload.single("file"), uploadEpkFile);
export default router;
