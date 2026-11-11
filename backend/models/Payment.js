
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      default: "mock"
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
