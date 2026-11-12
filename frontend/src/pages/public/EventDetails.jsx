
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  ArrowLeft,
} from "lucide-react";

import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/events/${id}`);

        const result = response.data;

        setEvent(
          result.event ||
          result.data?.event ||
          result.data ||
          result
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load event details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: `/checkout/${id}` },
      });
      return;
    }

    navigate(`/checkout/${id}`);
  };

  if (loading) {
    return <Loading />;
  }

  if (error || !event) {
    return (
      <div className="container event-error">
        <ErrorMessage message={error || "Event not found."} />
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  const imageUrl = event.image
    ? event.image.startsWith("http")
      ? event.image
      : `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
    : "https://images.unsplash.com/photo-1501386761578-eac5c94b800a";

  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date to be announced";

  const price = event.price ?? event.ticketPrice ?? 0;

  return (
    <div className="event-details-page">
      <div className="container">
        <Link to="/events" className="back-link">
          <ArrowLeft size={17} />
          Back to Events
        </Link>

        <div className="event-details-grid">
          <div className="event-details-main">
            <div className="event-details-image">
              <img src={imageUrl} alt={event.title || event.name} />

              <span className="event-category-label">
                {event.category || "Special Event"}
              </span>
            </div>

            <div className="event-details-content">
              <span className="section-eyebrow">
                DISCOVER THE EXPERIENCE
              </span>

              <h1>{event.title || event.name}</h1>

              <p className="event-description">
                {event.description || "More information coming soon."}
              </p>

              <div className="event-information">
                <div className="event-info-item">
                  <CalendarDays size={22} />
                  <div>
                    <span>Date</span>
                    <strong>{eventDate}</strong>
                  </div>
                </div>

                <div className="event-info-item">
                  <Clock size={22} />
                  <div>
                    <span>Time</span>
                    <strong>{event.time || "To be announced"}</strong>
                  </div>
                </div>

                <div className="event-info-item">
                  <MapPin size={22} />
                  <div>
                    <span>Location</span>
                    <strong>{event.location || "To be announced"}</strong>
                  </div>
                </div>

                <div className="event-info-item">
                  <Ticket size={22} />
                  <div>
                    <span>Category</span>
                    <strong>{event.category || "General"}</strong>
                  </div>
                </div>
              </div>

              <div className="event-about">
                <h2>About This Event</h2>

                <p>
                  {event.description ||
                    "Join us for this exciting experience. Book your tickets and be part of something special."}
                </p>
              </div>
            </div>
          </div>

          <aside className="event-booking-card">
            <span className="section-eyebrow">RESERVE YOUR SPOT</span>

            <h2>Book Your Tickets</h2>

            <div className="booking-price">
              <span>Starting from</span>
              <h3>₹{Number(price).toLocaleString("en-IN")}</h3>
              <span>per ticket</span>
            </div>

            <div className="booking-card-divider" />

            <p>
              Secure your place and enjoy an unforgettable event
              experience with Venuza.
            </p>

            <button
              type="button"
              className="btn btn-primary booking-button"
              onClick={handleBooking}
            >
              Book Tickets
            </button>

            <span className="booking-note">
              Secure your booking through Venuza.
            </span>
          </aside>
        </div>
      </div>
    </div>
  );
};
=======
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";

function EventDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    // Sample event data
    const events = [
        {
            id: 1,
            name: "Music Concert",
            category: "Music",
            date: "15 December 2026",
            time: "6:00 PM",
            location: "Hyderabad",
            venue: "Gachibowli Stadium",
            price: 999,
            organizer: "Music Events India",
            description:
                "Experience an amazing live music concert featuring talented artists, energetic performances and unforgettable entertainment.",
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
        },
        {
            id: 2,
            name: "Tech Conference",
            category: "Technology",
            date: "20 December 2026",
            time: "10:00 AM",
            location: "Bangalore",
            venue: "International Convention Centre",
            price: 1499,
            organizer: "Tech Community",
            description:
                "Join technology experts and developers to explore modern technologies, innovation and industry trends.",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
        },
        {
            id: 3,
            name: "Wedding Expo",
            category: "Wedding",
            date: "25 December 2026",
            time: "11:00 AM",
            location: "Hyderabad",
            venue: "Convention Hall",
            price: 499,
            organizer: "Wedding Planners",
            description:
                "Explore wedding decorations, photography, fashion, catering and professional wedding services.",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552"
        }
    ];

    const event = events.find(
        (item) => item.id === Number(id)
    );

    if (!event) {
        return (
            <div className="event-not-found">
                <h2>Event Not Found</h2>
                <button onClick={() => navigate("/events")}>
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="event-details-page">

            {/* Event Banner */}
            <div className="details-banner">
                <img src={event.image} alt={event.name} />
            </div>

            {/* Event Information */}
            <div className="details-container">

                <div className="details-main">

                    <span className="details-category">
                        {event.category}
                    </span>

                    <h1>{event.name}</h1>

                    <p className="details-description">
                        {event.description}
                    </p>

                    <div className="details-information">

                        <div className="detail-item">
                            <h3>📅 Date</h3>
                            <p>{event.date}</p>
                        </div>

                        <div className="detail-item">
                            <h3>🕒 Time</h3>
                            <p>{event.time}</p>
                        </div>

                        <div className="detail-item">
                            <h3>📍 Location</h3>
                            <p>{event.location}</p>
                        </div>

                        <div className="detail-item">
                            <h3>🏢 Venue</h3>
                            <p>{event.venue}</p>
                        </div>

                    </div>

                    <div className="organizer-info">
                        <h2>Organizer Information</h2>
                        <p>{event.organizer}</p>
                    </div>

                </div>

                {/* Booking Section */}
                <div className="booking-card">

                    <h2>Book Your Tickets</h2>

                    <p>Ticket Price</p>

                    <h1>₹{event.price}</h1>

                    <hr />

                    <p>Event: {event.name}</p>

                    <button
                        onClick={() => navigate("/login")}
                    >
                        Book Now
                    </button>

                </div>

            </div>

        </div>
    );
}
>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4

export default EventDetails;
