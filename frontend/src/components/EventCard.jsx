
import React from "react";
import { Link } from "react-router-dom";
import {
    CalendarDays,
    MapPin,
    ArrowRight
} from "lucide-react";

import "./EventCard.css";

function EventCard({ event }) {
    if (!event) return null;

    const eventName = event.name || event.title || "Untitled Event";
    const eventImage = event.image || event.imageUrl;

    return (
        <div className="event-card">

            {/* Event Image */}
            <div className="event-card-image">
                <img
                    src={eventImage || "https://placehold.co/600x400?text=Event"}
                    alt={eventName}
                />

                <span className="event-category">
                    {event.category || "General"}
                </span>
            </div>

            {/* Event Information */}
            <div className="event-card-content">

                <h3>{eventName}</h3>

                <div className="event-card-details">

                    <p>
                        <CalendarDays size={16} />
                        {event.date || "Date to be announced"}
                    </p>

                    <p>
                        <MapPin size={16} />
                        {event.location || "Location to be announced"}
                    </p>

                </div>

                {/* Price and Details */}
                <div className="event-card-footer">

                    <div className="event-price">
                        <span>Starting from</span>
                        <strong>
                            ₹{event.price ?? event.ticketPrice ?? 0}
                        </strong>
                    </div>

                    <Link
                        to={`/events/${event._id || event.id}`}
                        className="event-details-btn"
                    >
                        View Details
                        <ArrowRight size={16} />
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default EventCard;
