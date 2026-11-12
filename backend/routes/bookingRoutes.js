
import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All booking routes require authentication.
router.use(authMiddleware);

router.post("/", createBooking);

router.get("/my-bookings", getMyBookings);

router.get("/:id", getBookingById);

router.patch("/:id/cancel", cancelBooking);

export default router;
