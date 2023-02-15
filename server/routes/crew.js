import express from "express";
import multer from "multer";
import {getCrews, getCrewbyId, createCrew, updateCrew, uploadCrewFile, deleteCrew, getCrewByName} from "../controllers/crew.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

router.get("/", getCrews);
router.get("/:id", getCrewbyId);
// This api is for Crew by name
router.get("/byName/:name", getCrewByName);
router.post("/", createCrew);
router.put("/update/:id", updateCrew);
router.post("/uploadFile", upload.single("file"), uploadCrewFile);
router.delete("/delete/:id", deleteCrew)

export default router;