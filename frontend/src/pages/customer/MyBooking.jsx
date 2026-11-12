
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

import bookingService from "../../services/bookingService";
import Loading from "../../components/common/Loading";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.getMyBookings();

        const data =
          response.bookings ||
          response.data?.bookings ||
          response.data ||
          [];

        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status?.toLowerCase() === filter
        );

  const getEvent = (booking) => booking.event || {};

  if (loading) return <Loading />;

  return (
    <div className="customer-page">

      <div className="customer-page-heading">
        <div>
          <span className="section-eyebrow">YOUR EXPERIENCES</span>
          <h1>My Bookings</h1>
          <p>All your event reservations in one place.</p>
        </div>

        <Link to="/events" className="dashboard-explore-btn">
          Explore Events <ArrowRight size={16} />
        </Link>
      </div>

      <div className="booking-filter-tabs">
        {["all", "confirmed", "pending", "cancelled", "completed"].map(
          (status) => (
            <button
              key={status}
              type="button"
              className={filter === status ? "active" : ""}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          )
        )}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="customer-empty-state">
          <CalendarDays size={38} />
          <h3>No bookings found</h3>
          <p>
            {filter === "all"
              ? "You haven't booked any events yet."
              : `You don't have any ${filter} bookings.`}
          </p>
          <Link to="/events" className="dashboard-explore-btn">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="my-bookings-list">
          {filteredBookings.map((booking) => {
            const event = getEvent(booking);

            const image = event.image
              ? event.image.startsWith("http")
                ? event.image
                : `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
              : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30";

            return (
              <div className="my-booking-card" key={booking._id}>

                <img
                  src={image}
                  alt={event.title || "Booked event"}
                  className="my-booking-image"
                />

                <div className="my-booking-content">
                  <div className="my-booking-top">
                    <span className="booking-category">
                      {event.category || "Event"}
                    </span>

                    <span className={`booking-status ${booking.status || "pending"}`}>
                      {booking.status || "Pending"}
                    </span>
                  </div>

                  <h3>{event.title || booking.eventName || "Event"}</h3>

                  <p>
                    <CalendarDays size={15} />
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "Date unavailable"}
                  </p>

                  <p>
                    <MapPin size={15} />
                    {event.location || booking.location || "Location unavailable"}
                  </p>

                  <div className="my-booking-bottom">
                    <span>
                      Booking ID: {booking.bookingId || booking._id}
                    </span>

                    <Link to={`/my-bookings/${booking._id}`}>
                      View Details <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default MyBookings;
