
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Ticket,
  Heart,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import bookingService from "../../services/bookingService";
import Loading from "../../components/common/Loading";

function Dashboard() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
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
          error.response?.data?.message || "Unable to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const upcomingBookings = bookings.filter((booking) => {
    const eventDate = new Date(
      booking.event?.date || booking.eventDate || booking.date
    );

    return (
      !Number.isNaN(eventDate.getTime()) &&
      eventDate >= new Date() &&
      booking.status !== "cancelled"
    );
  });

  const totalBookings = bookings.length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: Ticket,
    },
    {
      label: "Upcoming Events",
      value: upcomingBookings.length,
      icon: CalendarDays,
    },
    {
      label: "Completed Events",
      value: completedBookings,
      icon: Heart,
    },
  ];

  if (loading) return <Loading />;

  return (
    <div className="customer-dashboard">

      <div className="customer-welcome">
        <div>
          <span className="section-eyebrow">CUSTOMER OVERVIEW</span>
          <h1>Welcome back, {user?.name || "Guest"}!</h1>
          <p>
            Here's what's happening with your events and bookings.
          </p>
        </div>

        <Link to="/events" className="dashboard-explore-btn">
          Explore Events <ArrowRight size={17} />
        </Link>
      </div>

      <div className="customer-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="customer-stat-card" key={stat.label}>
              <div className="customer-stat-icon">
                <Icon size={22} />
              </div>

              <div>
                <h2>{stat.value}</h2>
                <p>{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <section className="customer-section">
        <div className="customer-section-heading">
          <div>
            <span className="section-eyebrow">YOUR SCHEDULE</span>
            <h2>Upcoming bookings</h2>
          </div>

          <Link to="/my-bookings" className="customer-view-link">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="customer-empty-state">
            <CalendarDays size={38} />
            <h3>No upcoming events</h3>
            <p>Your next memorable experience is waiting for you.</p>
            <Link to="/events" className="dashboard-explore-btn">
              Discover Events
            </Link>
          </div>
        ) : (
          <div className="customer-booking-list">
            {upcomingBookings.slice(0, 4).map((booking) => {
              const event = booking.event || {};

              return (
                <Link
                  to={`/my-bookings/${booking._id}`}
                  className="customer-booking-row"
                  key={booking._id}
                >
                  <div className="customer-booking-date">
                    <CalendarDays size={21} />
                  </div>

                  <div className="customer-booking-info">
                    <h3>{event.title || booking.eventName || "Event"}</h3>
                    <p>
                      <MapPin size={14} />
                      {event.location || booking.location || "Location unavailable"}
                    </p>
                  </div>

                  <span className={`booking-status ${booking.status || "pending"}`}>
                    {booking.status || "Pending"}
                  </span>

                  <ArrowRight size={17} className="customer-row-arrow" />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="customer-quick-links">
        <Link to="/my-bookings" className="customer-quick-card">
          <Ticket size={24} />
          <h3>My Bookings</h3>
          <p>Manage your event reservations.</p>
          <ArrowRight size={17} />
        </Link>

        <Link to="/wishlist" className="customer-quick-card">
          <Heart size={24} />
          <h3>My Wishlist</h3>
          <p>Explore the events you've saved.</p>
          <ArrowRight size={17} />
        </Link>

        <Link to="/profile" className="customer-quick-card">
          <CalendarDays size={24} />
          <h3>My Profile</h3>
          <p>Keep your personal details updated.</p>
          <ArrowRight size={17} />
        </Link>
      </section>

    </div>
  );
}

export default Dashboard;
