
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  CalendarDays,
  MapPin,
  Ticket,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";
import Loading from "../../components/common/Loading";

function BookingConfirmation() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response =
          await bookingService.getBookingById(bookingId);

        const data = response.booking || response;

        if (!data?._id) {
          throw new Error("Invalid booking details received.");
        }

        setBooking(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Unable to retrieve booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return <Loading />;
  }

  if (!booking) {
    return (
      <div className="booking-flow-page">
        <div className="booking-result-card">
          <h2>Booking Not Found</h2>

          <p>
            We could not retrieve your booking details.
          </p>

          <Link
            to="/my-bookings"
            className="admin-primary-btn"
          >
            Go to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const event = booking.event || {};

  // Actual backend booking fields
  const paymentStatus = String(
    booking.paymentStatus || "pending"
  ).toLowerCase();

  const bookingStatus = String(
    booking.bookingStatus || "pending"
  ).toLowerCase();

  // Confirm only when both payment and booking are confirmed
  const isConfirmed =
    paymentStatus === "paid" &&
    bookingStatus === "confirmed";

  const isCancelled =
    bookingStatus === "cancelled";

  const total = Number(
    booking.totalAmount || 0
  );

  // Calculate ticket quantity from tickets array
  const totalTickets =
    booking.tickets?.reduce(
      (sum, ticket) => sum + Number(ticket.quantity || 0),
      0
    ) || booking.quantity || 0;

  // Event image URL
  const getEventImage = () => {
    if (!event.image) return "";

    if (
      event.image.startsWith("http://") ||
      event.image.startsWith("https://")
    ) {
      return event.image;
    }

    const baseURL = (
      import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    ).replace(/\/api\/?$/, "");

    return `${baseURL}/${event.image.replace(/^\/+/, "")}`;
  };

  const eventImage = getEventImage();

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  return (
    <div className="booking-flow-page">
      <div
        className={`booking-result-card ${
          isConfirmed
            ? "success"
            : isCancelled
            ? "pending"
            : "pending"
        }`}
      >
        {/* Confirmation Icon */}
        <div className="booking-result-icon">
          {isConfirmed ? (
            <CheckCircle2 size={42} />
          ) : isCancelled ? (
            <Clock3 size={42} />
          ) : (
            <Clock3 size={42} />
          )}
        </div>

        <span className="section-eyebrow">
          {isConfirmed
            ? "RESERVATION COMPLETE"
            : isCancelled
            ? "BOOKING CANCELLED"
            : "BOOKING UPDATE"}
        </span>

        {/* Main Heading */}
        <h1>
          {isConfirmed
            ? "Your Booking is Confirmed!"
            : isCancelled
            ? "Your Booking Has Been Cancelled"
            : "Your Booking is Being Processed"}
        </h1>

        <p>
          {isConfirmed
            ? "Thank you for choosing Venuza. Your reservation has been successfully confirmed."
            : isCancelled
            ? "This booking has been cancelled. Please contact support if you need assistance."
            : "Your booking is not yet confirmed. Please check your payment and booking status."}
        </p>

        {/* Booking Reference */}
        <div className="booking-reference">
          <span>BOOKING REFERENCE</span>

          <strong>
            {booking.bookingReference || booking._id}
          </strong>
        </div>

        {/* Event Information */}
        <div className="confirmation-event-card">
          {eventImage && (
            <img
              src={eventImage}
              alt={event.title || "Event"}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <div>
            <span className="section-eyebrow">
              {event.category || "EVENT"}
            </span>

            <h2>
              {event.title || "Event"}
            </h2>

            <p>
              <CalendarDays size={15} />

              {formatDate(event.date)}

              {event.startTime
                ? ` · ${event.startTime}`
                : ""}
            </p>

            <p>
              <MapPin size={15} />

              {event.venue
                ? `${event.venue}, `
                : ""}

              {event.location || "Location unavailable"}
            </p>
          </div>
        </div>

        {/* Ticket Details */}
        {booking.tickets?.length > 0 && (
          <div className="confirmation-ticket-list">
            <h3>
              <Ticket size={18} />
              Ticket Details
            </h3>

            {booking.tickets.map((ticket, index) => (
              <div
                className="summary-row"
                key={index}
              >
                <span>
                  {ticket.ticketName} × {ticket.quantity}
                </span>

                <strong>
                  {formatPrice(
                    ticket.price * ticket.quantity
                  )}
                </strong>
              </div>
            ))}
          </div>
        )}

        {/* Booking Summary */}
        <div className="confirmation-details-grid">
          <div>
            <span>Total Tickets</span>

            <strong>
              {totalTickets}
            </strong>
          </div>

          <div>
            <span>Total Amount</span>

            <strong>
              {formatPrice(total)}
            </strong>
          </div>

          <div>
            <span>Booking Status</span>

            <strong
              className={
                isConfirmed
                  ? "confirmation-green"
                  : "confirmation-amber"
              }
            >
              {bookingStatus.toUpperCase()}
            </strong>
          </div>

          <div>
            <span>Payment Status</span>

            <strong
              className={
                paymentStatus === "paid"
                  ? "confirmation-green"
                  : "confirmation-amber"
              }
            >
              {paymentStatus.toUpperCase()}
            </strong>
          </div>
        </div>

        {/* Payment Confirmation Notice */}
        {isConfirmed && (
          <div className="confirmation-payment-notice">
            <ShieldCheck size={19} />

            <span>
              Your payment has been successfully recorded.
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="confirmation-actions">
          <Link
            to="/my-bookings"
            className="admin-primary-btn"
          >
            View My Bookings
            <ArrowRight size={16} />
          </Link>

          {!isConfirmed &&
            !isCancelled &&
            paymentStatus !== "paid" && (
              <Link
                to={`/payment/${booking._id}`}
                className="booking-secondary-btn"
              >
                Complete Payment
              </Link>
            )}

          <Link
            to="/events"
            className="booking-secondary-btn"
          >
            Explore More Events
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
