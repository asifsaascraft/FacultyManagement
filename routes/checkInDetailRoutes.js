import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  createCheckInDetail,
  getAllCheckInDetails,
  getCheckInDetailById,
  updateArrivalCheckIn,
  updateDepartureCheckIn,
  updateHotelCheckIn,
} from "../controllers/checkInDetailController.js";

const router = express.Router();

// Protected routes
router.post("/users/checkin-details", protect, createCheckInDetail);     // Create
router.get("/checkin-details", protect, getAllCheckInDetails);     // Get all
router.get("/checkin-details/:id", protect, getCheckInDetailById);  // Get single

// Update check-in statuses
router.put("/checkin-details/:id/arrival", protect, updateArrivalCheckIn);
router.put("/checkin-details/:id/departure", protect, updateDepartureCheckIn);
router.put("/checkin-details/:id/hotel", protect, updateHotelCheckIn);


export default router;
