import express from "express";
import multer from "multer";
import {
  getAllCompany,
  getCompanyByName,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyUsers,
} from "../controllers/company.js";

const upload = multer({ dest: "images/" });
const router = express.Router();

//Fetch data routes
router.get("/", getAllCompany);
router.get("/:name", getCompanyByName);
router.get("/company/:user", getCompanyUsers);

// Create Routes
router.post("/", createCompany);

//Update Routes
router.put("/update/:id", updateCompany);

//Delete Routes (Make invisible for users)
router.delete("/delete/:name", deleteCompany);
