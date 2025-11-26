import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  createCheckInDetail,
  getAllCheckInDetails,
  getCheckInDetailById,
  getArrivalDateExists,
  getDepartureDateExists,
  getHotelNameExists,
  getTopicNameExists,
  updateArrivalCheckIn,
  updateDepartureCheckIn,
  updateHotelCheckIn,
  updateHallCheckIn,
  updatePresentationSubmit,
} from "../controllers/checkInDetailController.js";

const router = express.Router();

// Protected routes
router.post("/users/checkin-details", protect, createCheckInDetail);     // Create
router.get("/checkin-details", protect, getAllCheckInDetails);     // Get all
router.get("/checkin-details/:id", protect, getCheckInDetailById);  // Get single

// Filter APIs
router.get("/checkin-details/arrival/exist", protect, getArrivalDateExists);
router.get("/checkin-details/departure/exist", protect, getDepartureDateExists);
router.get("/checkin-details/hotel/exist", protect, getHotelNameExists);
router.get("/checkin-details/topic/exist", protect, getTopicNameExists);

// Update check-in statuses
router.put("/checkin-details/:id/arrival", protect, updateArrivalCheckIn);
router.put("/checkin-details/:id/departure", protect, updateDepartureCheckIn);
router.put("/checkin-details/:id/hotel", protect, updateHotelCheckIn);
router.put("/checkin-details/:id/hall", protect, updateHallCheckIn);
router.put("/checkin-details/:id/presentation", protect, updatePresentationSubmit);


export default router;
