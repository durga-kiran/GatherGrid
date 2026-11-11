
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

export default EventDetails;
