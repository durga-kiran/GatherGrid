
import Event from "../models/Events.js";
import asyncHandler from "../utils/asyncHandler.js";

const createSlug = (value) =>
  value.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getEvents = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    location,
    sort = "date",
    page = 1,
    limit = 9
  } = req.query;

  const filter = { status: "published" };

  if (search) {
    filter.$text = { $search: search };
  }

  if (category) filter.category = category;

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  const sortOptions = {
    date: { date: 1 },
    priceLow: { "ticketTypes.price": 1 },
    priceHigh: { "ticketTypes.price": -1 },
    newest: { createdAt: -1 }
  };

  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(limit) || 9));

  const [events, total] = await Promise.all([
    Event.find(filter)
      .sort(sortOptions[sort] || sortOptions.date)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize)
      .populate("organizer", "name"),

    Event.countDocuments(filter)
  ]);

  res.json({
    success: true,
    events,
    pagination: {
      total,
      page: currentPage,
      pages: Math.ceil(total / pageSize)
    }
  });
});

export const getFeaturedEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    status: "published",
    date: { $gte: new Date() }
  })
    .sort({ createdAt: -1 })
    .limit(6);

  res.json({ success: true, events });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.id,
    status: "published"
  }).populate("organizer", "name");

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  res.json({ success: true, event });
});

export const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    date,
    startTime,
    endTime,
    venue,
    location,
    ticketTypes,
    status
  } = req.body;

  if (
    !title || !description || !category ||
    !date || !venue || !location ||
    !Array.isArray(ticketTypes) || !ticketTypes.length
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required event information"
    });
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid event date"
    });
  }

  const normalizedTickets = ticketTypes.map((ticket) => ({
    name: ticket.name,
    price: Number(ticket.price),
    quantity: Number(ticket.quantity),
    sold: 0
  }));

  if (normalizedTickets.some((ticket) =>
    !ticket.name ||
    !Number.isFinite(ticket.price) ||
    ticket.price < 0 ||
    !Number.isInteger(ticket.quantity) ||
    ticket.quantity < 1
  )) {
    return res.status(400).json({
      success: false,
      message: "Invalid ticket type, price or quantity"
    });
  }

  let slug = createSlug(title);
  const existing = await Event.findOne({ slug });

  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const event = await Event.create({
    title,
    slug,
    description,
    category,
    image: req.file ? `/uploads/${req.file.filename}` : "",
    date: parsedDate,
    startTime,
    endTime,
    venue,
    location,
    organizer: req.user._id,
    ticketTypes: normalizedTickets,
    status: status === "published" ? "published" : "draft"
  });

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event
  });
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  const allowed = [
    "title", "description", "category",
    "date", "startTime", "endTime",
    "venue", "location", "status"
  ];

  allowed.forEach((field) => {
    if (req.body[field] !== undefined) {
      event[field] = req.body[field];
    }
  });

  if (req.file) {
    event.image = `/uploads/${req.file.filename}`;
  }

  await event.save();

  res.json({
    success: true,
    message: "Event updated successfully",
    event
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found"
    });
  }

  if (event.ticketTypes.some((ticket) => ticket.sold > 0)) {
    event.status = "cancelled";
    await event.save();
  } else {
    await event.deleteOne();
  }

  res.json({
    success: true,
    message: "Event removed or cancelled successfully"
  });
});

export const getEventsByCategory = asyncHandler(async (req, res) => {
  const events = await Event.find({
    category: req.params.category,
    status: "published"
  }).sort({ date: 1 });

  res.json({ success: true, events });
});
