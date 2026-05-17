import express from "express";
import multer from "multer";
import { authUser } from "../middleware/auth.js";
import {
  uploadScreenshot,
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  sendResponse,
} from "../controllers/userReports.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

router.post("/upload", authUser, upload.single("file"), uploadScreenshot);
router.post("/", authUser, createReport);
router.get("/", authUser, getAllReports);
router.get("/:id", authUser, getReportById);
router.patch("/:id", authUser, updateReport);
router.delete("/:id", authUser, deleteReport);
router.post("/:id/respond", authUser, sendResponse);

export default router;
