
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Ticket,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";
import Loading from "../../components/common/Loading";

function BookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingService.getBookingById(id);

        setBooking(
          response.booking ||
          response.data?.booking ||
          response.data ||
          response
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) return <Loading />;

  if (!booking) {
    return (
      <div className="customer-empty-state">
        <h3>Booking not found</h3>
        <p>We couldn't find the requested booking.</p>
        <Link to="/my-bookings" className="dashboard-explore-btn">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  const event = booking.event || {};

  return (
    <div className="customer-page">

      <Link to="/my-bookings" className="customer-back-link">
        <ArrowLeft size={17} /> Back to My Bookings
      </Link>

      <div className="customer-page-heading">
        <div>
          <span className="section-eyebrow">RESERVATION INFORMATION</span>
          <h1>Booking Details</h1>
          <p>Review your reservation and event information.</p>
        </div>

        <span className={`booking-status ${booking.status || "pending"}`}>
          {booking.status || "Pending"}
        </span>
      </div>

      <div className="booking-details-layout">

        <div className="booking-details-main">

          <div className="booking-details-event">
            {event.image && (
              <img
                src={
                  event.image.startsWith("http")
                    ? event.image
                    : `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
                }
                alt={event.title || "Event"}
              />
            )}

            <div>
              <span className="booking-category">
                {event.category || "Event"}
              </span>

              <h2>{event.title || booking.eventName || "Event"}</h2>

              <p>
                <CalendarDays size={16} />
                {event.date
                  ? new Date(event.date).toLocaleString()
                  : "Date unavailable"}
              </p>

              <p>
                <MapPin size={16} />
                {event.location || booking.location || "Location unavailable"}
              </p>
            </div>
          </div>

          <div className="booking-info-card">
            <h3>Reservation summary</h3>

            <div className="booking-info-row">
              <span>Booking reference</span>
              <strong>{booking.bookingId || booking._id}</strong>
            </div>

            <div className="booking-info-row">
              <span>Number of tickets</span>
              <strong>{booking.quantity || booking.ticketQuantity || 1}</strong>
            </div>

            <div className="booking-info-row">
              <span>Booking date</span>
              <strong>
                {booking.createdAt
                  ? new Date(booking.createdAt).toLocaleDateString()
                  : "Not available"}
              </strong>
            </div>

            <div className="booking-info-row">
              <span>Payment status</span>
              <strong>{booking.paymentStatus || "Not available"}</strong>
            </div>

            <div className="booking-info-row booking-total-row">
              <span>Total amount</span>
              <strong>
                ₹{Number(booking.totalAmount || booking.amount || 0).toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

        </div>

        <aside className="booking-details-sidebar">
          <div className="booking-sidebar-card">
            <Ticket size={25} />
            <h3>Your reservation</h3>
            <p>Keep your booking reference available when attending the event.</p>

            <div className="booking-reference">
              {booking.bookingId || booking._id}
            </div>

            <div className="booking-sidebar-divider" />

            <div className="booking-sidebar-row">
              <CreditCard size={17} />
              <span>{booking.paymentStatus || "Payment information unavailable"}</span>
            </div>

            <Link to="/events" className="dashboard-explore-btn">
              Discover More Events
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default BookingDetails;
