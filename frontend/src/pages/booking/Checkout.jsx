
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Minus,
  Plus,
  Ticket,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

import eventService from "../../services/eventSerices.js";
import bookingService from "../../services/bookingService";
import Loading from "../../components/common/Loading";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  const baseURL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
  ).replace(/\/api\/?$/, "");

  return `${baseURL}/${image.replace(/^\/+/, "")}`;
};

const Checkout = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);

        const response = await eventService.getEventById(eventId);

        const eventData =
          response.event ||
          response.data?.event ||
          response.data ||
          response;

        if (!eventData) {
          throw new Error("Event details could not be loaded.");
        }

        setEvent(eventData);

        const tickets = eventData.ticketTypes || [];

        if (tickets.length > 0) {
          setSelectedTicketId(
            tickets[0]._id || tickets[0].name
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Unable to load event details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <Loading />;
  }

  if (!event) {
    return (
      <div className="checkout-empty">
        <h2>Event not found</h2>
        <p>We could not find the event you requested.</p>
        <Link to="/events" className="checkout-back-link">
          Browse Events
        </Link>
      </div>
    );
  }

  const ticketTypes = event.ticketTypes || [];

  const selectedTicket = ticketTypes.find(
    (ticket) =>
      (ticket._id || ticket.name) === selectedTicketId
  );

  const availableTickets = selectedTicket
    ? Math.max(
        0,
        Number(selectedTicket.quantity || 0) -
          Number(selectedTicket.sold || 0)
      )
    : 0;

  const ticketPrice = Number(selectedTicket?.price || 0);

  const subtotal = ticketPrice * quantity;
  const tax = 0;
  const convenienceFee = 0;
  const totalAmount = subtotal + tax + convenienceFee;

  const handleTicketChange = (ticketId) => {
    setSelectedTicketId(ticketId);
    setQuantity(1);
  };

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  const increaseQuantity = () => {
    if (quantity >= 10) {
      toast.info("You can book a maximum of 10 tickets.");
      return;
    }

    if (quantity >= availableTickets) {
      toast.info("No more tickets are available in this category.");
      return;
    }

    setQuantity((previous) => previous + 1);
  };

  // Create booking
  const handleBooking = async () => {
    if (!selectedTicket) {
      toast.error("Please select a ticket category.");
      return;
    }

    if (availableTickets < 1 || quantity > availableTickets) {
      toast.error("Not enough tickets available.");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await bookingService.createBooking({
        eventId: event._id,
        ticketType: selectedTicket._id || selectedTicket.name,
        quantity,
      });

      if (!response.success || !response.booking) {
        throw new Error(
          response.message || "Booking could not be created."
        );
      }

      const booking = response.booking;

      toast.success(response.message || "Booking created successfully!");

      // Free booking: directly go to confirmation
      if (
        booking.paymentStatus === "not_required" ||
        Number(booking.totalAmount) === 0
      ) {
        navigate(`/booking-confirmation/${booking._id}`);
      } else {
        // Paid booking: continue to mock payment
        navigate(`/payment/${booking._id}`);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Booking failed. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const eventImage = getImageUrl(event.image);

  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* Back navigation */}
        <Link
          to={`/events/${event._id}`}
          className="checkout-back-link"
        >
          <ArrowLeft size={18} />
          Back to Event
        </Link>

        <div className="checkout-heading">
          <span className="checkout-eyebrow">
            VENUEZA BOOKING
          </span>

          <h1>Complete Your Booking</h1>

          <p>
            Choose your tickets and review your booking details.
          </p>
        </div>

        <div className="checkout-grid">

          {/* Event details */}
          <div className="checkout-event-card">

            {eventImage && (
              <img
                src={eventImage}
                alt={event.title}
                className="checkout-event-image"
              />
            )}

            <div className="checkout-event-content">

              <span className="checkout-category">
                {event.category}
              </span>

              <h2>{event.title}</h2>

              <div className="checkout-event-info">
                <p>
                  <CalendarDays size={17} />
                  {eventDate}
                </p>

                {event.startTime && (
                  <p>
                    <Clock size={17} />
                    {event.startTime}
                    {event.endTime ? ` - ${event.endTime}` : ""}
                  </p>
                )}

                <p>
                  <MapPin size={17} />
                  {event.venue}, {event.location}
                </p>
              </div>

              {event.description && (
                <p className="checkout-description">
                  {event.description}
                </p>
              )}

            </div>
          </div>

          {/* Ticket selection and summary */}
          <div className="checkout-booking-card">

            <div className="checkout-card-heading">
              <Ticket size={21} />
              <h2>Select Tickets</h2>
            </div>

            {ticketTypes.length === 0 ? (
              <p className="checkout-unavailable">
                No ticket categories are currently available.
              </p>
            ) : (
              <>
                {/* Ticket categories */}
                <div className="checkout-ticket-types">

                  {ticketTypes.map((ticket) => {
                    const ticketId = ticket._id || ticket.name;

                    const remaining =
                      Number(ticket.quantity || 0) -
                      Number(ticket.sold || 0);

                    const isSelected =
                      selectedTicketId === ticketId;

                    return (
                      <button
                        type="button"
                        key={ticketId}
                        className={`checkout-ticket-option ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleTicketChange(ticketId)
                        }
                        disabled={remaining <= 0}
                      >
                        <div>
                          <strong>{ticket.name}</strong>

                          <span>
                            {remaining > 0
                              ? `${remaining} tickets available`
                              : "Sold out"}
                          </span>
                        </div>

                        <div className="checkout-ticket-price">
                          {formatPrice(Number(ticket.price || 0))}
                        </div>
                      </button>
                    );
                  })}

                </div>

                {/* Quantity selector */}
                {selectedTicket && (
                  <>
                    <div className="checkout-quantity-section">
                      <div>
                        <h3>Number of Tickets</h3>
                        <p>Maximum 10 tickets per booking</p>
                      </div>

                      <div className="checkout-quantity-control">
                        <button
                          type="button"
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          onClick={increaseQuantity}
                          disabled={
                            quantity >= 10 ||
                            quantity >= availableTickets
                          }
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price summary */}
                    <div className="checkout-summary">
                      <h3>Price Details</h3>

                      <div className="checkout-summary-row">
                        <span>
                          {selectedTicket.name} × {quantity}
                        </span>

                        <span>{formatPrice(subtotal)}</span>
                      </div>

                      <div className="checkout-summary-row">
                        <span>Tax</span>
                        <span>{formatPrice(tax)}</span>
                      </div>

                      <div className="checkout-summary-row">
                        <span>Convenience Fee</span>
                        <span>{formatPrice(convenienceFee)}</span>
                      </div>

                      <div className="checkout-summary-total">
                        <strong>Total Amount</strong>
                        <strong>{formatPrice(totalAmount)}</strong>
                      </div>
                    </div>

                    {/* Payment notice */}
                    <div className="checkout-secure-notice">
                      <ShieldCheck size={20} />

                      <span>
                        {totalAmount === 0
                          ? "This is a free booking. No payment is required."
                          : "Secure mock payment for development testing."}
                      </span>
                    </div>

                    {/* Booking button */}
                    <button
                      type="button"
                      className="checkout-confirm-button"
                      onClick={handleBooking}
                      disabled={
                        bookingLoading ||
                        availableTickets < 1 ||
                        quantity > availableTickets
                      }
                    >
                      {bookingLoading
                        ? "Processing..."
                        : totalAmount === 0
                        ? "Confirm Free Booking"
                        : `Continue to Payment · ${formatPrice(totalAmount)}`}
                    </button>
                  </>
                )}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
