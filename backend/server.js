
import "dotenv/config";

import express from "express";
import cors from "cors";
import path from "node:path";

import connectDB from "./config/db.js";
import { verifyMailerConnection } from "./config/mailer.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

import {
  notFound,
  errorHandler
} from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Event Platform API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Check Gmail SMTP connection
    await verifyMailerConnection();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
