
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    sold: {
      type: Number,
      default: 0,
      min: 0
    }
  }
);

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    date: {
      type: Date,
      required: true
    },

    startTime: String,
    endTime: String,

    venue: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    ticketTypes: {
      type: [ticketSchema],
      validate: {
        validator: (tickets) => tickets.length > 0,
        message: "At least one ticket type is required"
      }
    },

    availableSeats: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft"
    }
  },
  { timestamps: true }
);
eventSchema.pre("validate", function () {
  this.availableSeats = (this.ticketTypes || []).reduce(
    (total, ticket) =>
      total + ticket.quantity - ticket.sold,
    0
  );
});
eventSchema.index({
  title: "text",
  description: "text",
  category: "text",
  location: "text"
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
