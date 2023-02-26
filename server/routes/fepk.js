import express from "express";
import multer from "multer";
import {
    getFepks, getFepksByTitle, getFepkbyId, 
    createFepk, updateFepk, uploadFepkFile, deleteFepk, getFepksByFilmmakerId, 
    getFepkLiked, getFepkFavourite, getFepksByUser, getFepkByTitle, uploadFepkFiles, 
    getFepkSharings, getFepkWishedToBuy, getMediumSynopsis, getLongSynopsis, 
    getUniqueness, getStills, getFollowers, createReport} from "../controllers/fepk.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

// Gets all FEPKs
router.get("/", getFepks);

// Gets all FEPKs of certain film maker
router.get("/byfilmmaker/:id", getFepksByFilmmakerId);

// Gets all Fepks added to "My List" by certain user
router.get("/favourite/byuser/:id", getFepksByUser);

// Gets FEPK by FEPK's id
router.get("/:id", getFepkbyId);

// This api is for FEPK view Page
router.get("/byTitle/:title", getFepkByTitle);

// this is for Upload FPK page checks if title already exists
router.get("/byTitles/:title", getFepksByTitle);

// Calling this route you will get the total count of followers in facebook, instagram and twitter
router.get("/followers/:id", getFollowers);

// Create FEPK
router.post("/", createFepk);

// Modify FEPK
router.put("/update/:id", updateFepk);

// user sends report on the EPK to Film Maker
router.put("/report/:fepkId", createReport);

// Calling these APIs will add user to the appropriate list (likes(star), favourites, sharings, wishes_to_buy($))
router.get("/like/:fepkid/:userid", getFepkLiked);
router.get("/favourite/:fepkid/:userid", getFepkFavourite);
router.get("/sharing/:fepkid/:userid", getFepkSharings);
router.get("/wishestobuy/:fepkid/:userid", getFepkWishedToBuy);

// Calling these APIs will create the requests for medium and long synopsises, uniqueness, and stills
router.get("/mediumSynopsis/:fepkid/:userid", getMediumSynopsis);
router.get("/longSynopsis/:fepkid/:userid", getLongSynopsis);
router.get("/uniqueness/:fepkid/:userid", getUniqueness);
router.get("/stills/:fepkid/:userid", getStills);

// Uploads 1 file to AWS S3
router.post("/uploadFile", upload.single("file"), uploadFepkFile);

// Uploads up to 2 files to AWS S3 
router.post(
    "/uploadFiles",
    upload.fields([{ name: "file1" }, { name: "file2" }]),
    uploadFepkFiles
);

// Deletes (makes FEPK invisible for users)
router.delete("/delete/:id", deleteFepk);

export default router;