import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  createCheckInDetail,
  getAllCheckInDetails,
  getCheckInDetailById,
} from "../controllers/checkInDetailController.js";

const router = express.Router();

// Protected routes
router.post("/users/checkin-details", protect, createCheckInDetail);     // Create
router.get("/checkin-details", protect, getAllCheckInDetails);     // Get all
router.get("/checkin-details/:id", protect, getCheckInDetailById);  // Get single

export default router;
