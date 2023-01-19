import express from "express";
import multer from "multer";
import {getFepks, getFepkbyId, createFepk, updateFepk, uploadFepkFile, deleteFepk} from "../controllers/fepk.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

router.get("/", getFepks);
router.get("/:id", getFepkbyId);
router.post("/", createFepk);
router.put("/update/:id", updateFepk);
router.post("/uploadFile", upload.single("file"), uploadFepkFile);
router.delete("/delete/:id", deleteFepk);

export default router;