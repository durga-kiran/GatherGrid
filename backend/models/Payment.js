
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "mock"],
      default: "mock",
    },

    // Razorpay fields (for future integration)
    razorpayOrderId: {
      type: String,
      unique: true,
      sparse: true,
    },

    razorpayPaymentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    razorpaySignature: {
      type: String,
      select: false,
    },

    // Transaction reference for mock or real payments
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
