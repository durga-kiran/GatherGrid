
import express from "express";

import {
  createPaymentOrder,
  completeMockPayment,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create-order", createPaymentOrder);

router.post("/mock/complete", completeMockPayment);

export default router;
