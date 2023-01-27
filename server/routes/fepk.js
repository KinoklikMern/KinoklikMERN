import express from "express";
import multer from "multer";
import {getFepks, getFepkbyId, createFepk, updateFepk, uploadFepkFile, deleteFepk, getFepksByFilmmakerId, getFepkLiked, getFepkFavourite, getFepksByUser, getFepksByTitle, uploadFepkFiles} from "../controllers/fepk.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

router.get("/", getFepks);
router.get("/byfilmmaker/:id", getFepksByFilmmakerId);
router.get("/favourite/byuser/:id", getFepksByUser);
router.get("/:id", getFepkbyId);
router.get("/like/:fepkid/:userid", getFepkLiked);
router.get("/favourite/:fepkid/:userid", getFepkFavourite);
router.get("/byTitle/:title", getFepksByTitle);
router.post("/", createFepk);
router.put("/update/:id", updateFepk);
router.post("/uploadFile", upload.single("file"), uploadFepkFile);
router.post(
    "/uploadFiles",
    upload.fields([{ name: "file1" }, { name: "file2" }]),
    uploadFepkFiles
  );
router.delete("/delete/:id", deleteFepk);

export default router;