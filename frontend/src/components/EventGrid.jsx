
import React from "react";
import EventCard from "./EventCard";
import "./EventGrid.css";

function EventGrid({ events = [] }) {
    if (events.length === 0) {
        return (
            <div className="event-grid-empty">
                <h3>No Events Found</h3>
                <p>We couldn't find any events. Please check back later!</p>
            </div>
        );
    }

    return (
        <div className="event-grid">
            {events.map((event) => (
                <EventCard
                    key={event._id || event.id}
                    event={event}
                />
            ))}
        </div>
    );
}

export default EventGrid;
