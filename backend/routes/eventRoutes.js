
import express from "express";

import {
  getEvents,
  getEventById,
  getFeaturedEvents,
  getEventsByCategory,
  createEvent,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/featured", getFeaturedEvents);
router.get("/category/:category", getEventsByCategory);
router.get("/:id", getEventById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createEvent
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteEvent
);

export default router;
