
import mongoose from "mongoose";
import { randomBytes } from "node:crypto";

import Booking from "../models/Booking.js";
import Event from "../models/Events.js";
import asyncHandler from "../utils/asyncHandler.js";

// Generate unique booking reference
const generateBookingReference = () => {
  return `VNZ-${randomBytes(5).toString("hex").toUpperCase()}`;
};

// Format booking response for frontend
const formatBooking = (booking) => {
  const data = booking.toObject
    ? booking.toObject()
    : booking;

  const quantity = (data.tickets || []).reduce(
    (total, ticket) => total + Number(ticket.quantity || 0),
    0
  );

  return {
    ...data,
    bookingId: data.bookingReference,
    quantity,
    status: data.bookingStatus,
  };
};

// Validate event date and time
const hasEventPassed = (event) => {
  const eventDate = new Date(event.date);
  const now = new Date();

  if (Number.isNaN(eventDate.getTime())) {
    return true;
  }

  const eventStart = new Date(eventDate);

  if (event.startTime) {
    const [hours, minutes] = event.startTime.split(":").map(Number);

    if (
      Number.isInteger(hours) &&
      Number.isInteger(minutes) &&
      hours >= 0 &&
      hours <= 23 &&
      minutes >= 0 &&
      minutes <= 59
    ) {
      eventStart.setHours(hours, minutes, 0, 0);
    }
  } else {
    eventStart.setHours(23, 59, 59, 999);
  }

  return eventStart < now;
};

// CREATE BOOKING
// POST /api/bookings
// Private
export const createBooking = asyncHandler(
  async (req, res) => {
    const { eventId, ticketType, quantity } = req.body;

    // Validate event ID
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    // Validate quantity
    const ticketQuantity = Number(quantity);

    if (
      !Number.isInteger(ticketQuantity) ||
      ticketQuantity < 1 ||
      ticketQuantity > 10
    ) {
      return res.status(400).json({
        success: false,
        message: "Ticket quantity must be between 1 and 10.",
      });
    }

    // Find event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // Check event status
    if (event.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "This event is not available for booking.",
      });
    }

    // Check event date and time
    if (hasEventPassed(event)) {
      return res.status(400).json({
        success: false,
        message: "This event has already started or passed.",
      });
    }

    if (!event.ticketTypes || event.ticketTypes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No ticket types are available.",
      });
    }

    // Find selected ticket category
    // If ticketType is omitted, use the first category for backward compatibility.
    const selectedTicket = ticketType
      ? event.ticketTypes.find(
          (ticket) =>
            ticket._id.toString() === ticketType ||
            ticket.name.toLowerCase() === String(ticketType).toLowerCase()
        )
      : event.ticketTypes[0];

    if (!selectedTicket) {
      return res.status(400).json({
        success: false,
        message: "Selected ticket type is not available.",
      });
    }

    const ticketPrice = Number(selectedTicket.price);

    if (!Number.isFinite(ticketPrice) || ticketPrice < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket price.",
      });
    }

    // Atomically reserve tickets from the selected category.
    // This prevents two customers from booking the same remaining seats.
    const updatedEvent = await Event.findOneAndUpdate(
      {
        _id: eventId,
        status: "published",
        ticketTypes: {
          $elemMatch: {
            _id: selectedTicket._id,
            $expr: undefined,
          },
        },
        $expr: {
          $gte: [
            {
              $subtract: [
                {
                  $arrayElemAt: [
                    {
                      $map: {
                        input: "$ticketTypes",
                        as: "ticket",
                        in: {
                          $cond: [
                            {
                              $eq: [
                                "$$ticket._id",
                                selectedTicket._id,
                              ],
                            },
                            "$$ticket.quantity",
                            0,
                          ],
                        },
                      },
                    },
                    0,
                  ],
                },
                0,
              ],
            },
            0,
          ],
        },
      },
      {
        $inc: {
          "ticketTypes.$[ticket].sold": ticketQuantity,
          availableSeats: -ticketQuantity,
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            "ticket._id": selectedTicket._id,
            $expr: {
              $gte: [
                {
                  $subtract: [
                    "$ticket.quantity",
                    "$ticket.sold",
                  ],
                },
                ticketQuantity,
              ],
            },
          },
        ],
      }
    );

    if (!updatedEvent) {
      return res.status(400).json({
        success: false,
        message: "Not enough tickets available in this category.",
      });
    }

    try {
      // Calculate booking amount
      const subtotal = ticketPrice * ticketQuantity;
      const tax = 0;
      const convenienceFee = 0;
      const totalAmount = subtotal + tax + convenienceFee;

      const isFreeBooking = totalAmount === 0;

      // Create booking
      const booking = await Booking.create({
        user: req.user._id,
        event: eventId,

        bookingReference: generateBookingReference(),

        tickets: [
          {
            ticketName: selectedTicket.name,
            quantity: ticketQuantity,
            price: ticketPrice,
          },
        ],

        subtotal,
        tax,
        convenienceFee,
        totalAmount,

        paymentStatus: isFreeBooking
          ? "not_required"
          : "pending",

        bookingStatus: isFreeBooking
          ? "confirmed"
          : "pending",
      });

      // Populate event details
      const populatedBooking = await Booking.findById(
        booking._id
      ).populate("event");

      return res.status(201).json({
        success: true,
        message: isFreeBooking
          ? "Free booking confirmed successfully."
          : "Booking created successfully. Please complete payment.",

        booking: formatBooking(populatedBooking),
      });

    } catch (error) {
      // Restore inventory if booking creation fails
      await Event.findOneAndUpdate(
        {
          _id: eventId,
          "ticketTypes._id": selectedTicket._id,
        },
        {
          $inc: {
            "ticketTypes.$.sold": -ticketQuantity,
            availableSeats: ticketQuantity,
          },
        }
      );

      throw error;
    }
  }
);

// GET CUSTOMER BOOKINGS
// GET /api/bookings/my-bookings
// Private
export const getMyBookings = asyncHandler(
  async (req, res) => {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings: bookings.map(formatBooking),
    });
  }
);

// GET BOOKING DETAILS
// GET /api/bookings/:id
// Private
export const getBookingById = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID.",
      });
    }

    const booking = await Booking.findOne({
      _id: id,
      user: req.user._id,
    })
      .populate("event")
      .populate("user", "name email phone");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      booking: formatBooking(booking),
    });
  }
);

// CANCEL BOOKING
// PATCH /api/bookings/:id/cancel
// Private
export const cancelBooking = asyncHandler(
  async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID.",
      });
    }

    const booking = await Booking.findOne({
      _id: id,
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
        message: "Booking is already cancelled.",
      });
    }

    if (
      booking.paymentStatus === "paid" ||
      booking.paymentStatus === "refunded"
    ) {
      return res.status(400).json({
        success: false,
        message: "Paid or refunded bookings cannot be cancelled through this endpoint.",
      });
    }

    // Restore ticket inventory
    const event = await Event.findById(booking.event);

    if (event) {
      for (const bookedTicket of booking.tickets) {
        const ticket = event.ticketTypes.find(
          (item) => item.name === bookedTicket.ticketName
        );

        if (ticket) {
          ticket.sold = Math.max(
            0,
            ticket.sold - bookedTicket.quantity
          );
        }
      }

      // Save recalculates availableSeats through Event pre-validate hook
      await event.save();
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      booking: formatBooking(booking),
    });
  }
);
