
import mongoose from "mongoose";
import crypto from "node:crypto";

import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import asyncHandler from "../utils/asyncHandler.js";

// Allow mock payments only in development mode.
const ensureMockMode = (res) => {
  if (
    process.env.NODE_ENV !== "development" ||
    process.env.PAYMENT_MODE !== "mock"
  ) {
    res.status(403).json({
      success: false,
      message: "Mock payments are available only in development mode.",
    });

    return false;
  }

  return true;
};

// CREATE MOCK PAYMENT
// POST /api/payments/create-order
// Private
export const createPaymentOrder = asyncHandler(
  async (req, res) => {
    if (!ensureMockMode(res)) return;

    const { bookingId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID.",
      });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "This booking has been cancelled.",
      });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({
        success: false,
        message: "This booking has already been paid.",
      });
    }

    if (
      !Number.isFinite(booking.totalAmount) ||
      booking.totalAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount.",
      });
    }

    // Create a mock payment record.
    const payment = await Payment.create({
      booking: booking._id,
      user: req.user._id,
      amount: booking.totalAmount,
      currency: "INR",
      paymentMethod: "mock",
      paymentStatus: "pending",
    });

    return res.status(201).json({
      success: true,
      mock: true,
      message: "Mock payment session created.",
      payment: {
        id: payment._id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.paymentStatus,
      },
    });
  }
);

// COMPLETE MOCK PAYMENT
// POST /api/payments/mock/complete
// Private
export const completeMockPayment = asyncHandler(
  async (req, res) => {
    if (!ensureMockMode(res)) return;

    const { paymentId, outcome } = req.body;

    if (!mongoose.Types.ObjectId.isValid(paymentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment ID.",
      });
    }

    if (!["success", "failed"].includes(outcome)) {
      return res.status(400).json({
        success: false,
        message: "Outcome must be success or failed.",
      });
    }

    const payment = await Payment.findOne({
      _id: paymentId,
      user: req.user._id,
      paymentMethod: "mock",
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Mock payment not found.",
      });
    }

    const booking = await Booking.findOne({
      _id: payment.booking,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    // Prevent duplicate payment completion.
    if (payment.paymentStatus === "success") {
      if (
        booking.paymentStatus === "paid" &&
        booking.bookingStatus === "confirmed"
      ) {
        return res.status(200).json({
          success: true,
          verified: true,
          message: "Payment was already completed.",
          booking: {
            _id: booking._id,
            bookingReference: booking.bookingReference,
            paymentStatus: booking.paymentStatus,
            bookingStatus: booking.bookingStatus,
          },
        });
      }

      return res.status(409).json({
        success: false,
        message: "Payment record is already completed.",
      });
    }

    if (
      payment.paymentStatus === "failed"
    ) {
      return res.status(400).json({
        success: false,
        message: "This payment attempt has already failed. Create a new payment attempt.",
      });
    }

    if (
      booking.bookingStatus !== "pending" ||
      booking.paymentStatus !== "pending"
    ) {
      return res.status(400).json({
        success: false,
        message: "This booking is not available for payment.",
      });
    }

    // Simulate failed payment.
    if (outcome === "failed") {
      payment.paymentStatus = "failed";
      await payment.save();

      return res.status(200).json({
        success: true,
        verified: false,
        message: "Mock payment failed successfully.",
        paymentStatus: "failed",
      });
    }

    // Simulate successful payment.
    const transactionId =
      `MOCK-${crypto.randomUUID()}`;

    payment.paymentStatus = "success";
    payment.transactionId = transactionId;

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";

    await payment.save();
    await booking.save();

    return res.status(200).json({
      success: true,
      verified: true,
      message: "Mock payment completed successfully.",
      transactionId,
      booking: {
        _id: booking._id,
        bookingReference: booking.bookingReference,
        paymentStatus: booking.paymentStatus,
        bookingStatus: booking.bookingStatus,
      },
    });
  }
);
