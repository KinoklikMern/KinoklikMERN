import express from "express";
import multer from "multer";
import {
  getNewest,
  getMostPopular,
  getFepks,
  getFepksByTitle,
  getFepkbyId,
  createFepk,
  updateFepk,
  uploadFepkFile,
  deleteFepk,
  getFepksByFilmmakerId,
  getFepkLiked,
  getFepkFavourite,
  getFepksByUser,
  getFepkByTitle,
  uploadFepkFiles,
  getFepkSharings,
  getFepkWishedToDonate,
  getFepkWishedToBuy,
  getMediumSynopsis,
  getLongSynopsis,
  getUniqueness,
  getStills,
  getFollowers,
  createReport,
  postRequests,
  getStarredFepksByUser,
  getFollowingFepksByUser,
  getRequestsFepksByUser,
  approveRequests,
  refuseRequests,
  getWishToDonateFepksByUser,
  getWishToBuyFepksByUser,
  getFepksByActorId,
  transferEpkOwnership,
  getDeletedFepksByFilmmakerId,
  restoreFepk,
  addCollaborator,
  removeCollaborator,
  listCollaborators,
  getMyCollaborations,
  deleteFepkMediaBatch
} from "../controllers/fepk.js";
import { canEditEpk } from "../middleware/canEditEpk.js";
import { authUser } from "../middleware/auth.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

// Gets all FEPKs
router.get("/", getFepks);

// Gets all FEPKs of certain film maker
router.get("/byfilmmaker/:id", getFepksByFilmmakerId);

// Gets all Fepks added to "My List" by certain user
router.get("/favourite/byuser/:id", getFepksByUser);

// get fepks which are starred by user
router.get("/getStarredFepksByUser/:userId", getStarredFepksByUser);

// get fepks which are following by user
router.get("/getFollowingFepksByUser/:userId", getFollowingFepksByUser);

// get fepks which are wish_to_donate by user
router.get("/getWishTodonateByUser/:userId", getWishToDonateFepksByUser);

// get fepks which are wish_to_buy by user
router.get("/getWishTobuyByUser/:userId", getWishToBuyFepksByUser);

// get fepks which are requests by user
router.get("/getRequestsFepksByUser/:userId", getRequestsFepksByUser);

// sent request to get 10 newest movie
router.get("/newest/:newId", getNewest);

// get most popular
router.get("/popular/:popular", getMostPopular);

// get actor by movie
router.get("/getmoviesbyactor/:actorId", getFepksByActorId);

// get and restore deleted epks
router.get("/deleted/:id", getDeletedFepksByFilmmakerId);
router.put("/restore/:id", authUser, restoreFepk);

// this is for Upload FPK page checks if title already exists
router.get("/byTitles/:title", getFepksByTitle);

// Calling these APIs will create the requests for medium and long synopsises, uniqueness, and stills
router.get("/mediumSynopsis/:fepkid/:userid", getMediumSynopsis);
router.get("/longSynopsis/:fepkid/:userid", getLongSynopsis);
router.get("/uniqueness/:fepkid/:userid", getUniqueness);
router.get("/stills/:fepkid/:userid", getStills);

// Calling this route you will get the total count of followers
router.get("/followers/:id", getFollowers);

// Calling these APIs will add user to the appropriate list
router.get("/like/:fepkid/:userid", getFepkLiked);
router.get("/favourite/:fepkid/:userid", getFepkFavourite);
router.get("/sharing/:fepkid/:userid", getFepkSharings);
router.get("/wishestodonate/:fepkid/:userid", getFepkWishedToDonate);
router.get("/wishestobuy/:fepkid/:userid", getFepkWishedToBuy);

// Get all FEPKs the authenticated user collaborates on
router.get("/collaborations/mine", authUser, getMyCollaborations);

// Collaborator management (owner only)
router.get("/:epkId/collaborators", authUser, canEditEpk, listCollaborators);
router.post("/:epkId/collaborators", authUser, canEditEpk, addCollaborator);
router.delete("/:epkId/collaborators/:userId", authUser, canEditEpk, removeCollaborator)

// This api is for FEPK view Page
router.get("/byTitle/:title", getFepkByTitle);

// Gets FEPK by FEPK's id — keep this late to avoid swallowing other routes
router.get("/:id", getFepkbyId);

// Create FEPK
router.post("/", authUser, createFepk);

// Modify FEPK
router.put("/update/:id", authUser, canEditEpk, updateFepk);

// user sends report on the EPK to Film Maker
router.put("/report/:fepkId", createReport);

// Uploads 1 file to AWS S3
router.post("/uploadFile", upload.single("file"), uploadFepkFile);

// Uploads up to 3 files to AWS S3
router.post(
  "/uploadFiles",
  upload.fields([{ name: "file1" }, { name: "file2" }, { name: "file3" }]),
  uploadFepkFiles
);

// Deletes (soft delete)
router.delete("/delete/:id", authUser, deleteFepk);

// Add request to fepk
router.post("/postRequests", postRequests);

// Approve/refuse request
router.post("/approveRequest", approveRequests);
router.post("/refuseRequest", refuseRequests);

// Transfer epk ownership
router.put("/:epkId/transfer", transferEpkOwnership);

//delete media files from s3 
router.post("/deleteMediaBatch", authUser, deleteFepkMediaBatch);

export default router;