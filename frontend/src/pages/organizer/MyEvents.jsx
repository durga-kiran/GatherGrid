
import React from "react";
import { Link } from "react-router-dom";
import "./MyEvents.css";

function MyEvents() {

    // Sample events. Later, these will come from MongoDB.
    const events = [
        {
            id: 1,
            name: "Music Concert",
            category: "Music",
            date: "15 December 2026",
            location: "Hyderabad",
            price: 999,
            status: "Published"
        },
        {
            id: 2,
            name: "Tech Conference",
            category: "Technology",
            date: "20 December 2026",
            location: "Bangalore",
            price: 1499,
            status: "Published"
        },
        {
            id: 3,
            name: "Business Workshop",
            category: "Workshop",
            date: "05 January 2027",
            location: "Chennai",
            price: 799,
            status: "Draft"
        }
    ];

    return (
        <div className="my-events-page">

            <header className="my-events-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/organizer/dashboard">Dashboard</Link>
                    <Link to="/organizer/events">My Events</Link>
                    <Link to="/organizer/add-event">Add Event</Link>
                    <Link to="/organizer/bookings">Bookings</Link>
                </nav>
            </header>

            <main className="my-events-content">

                <div className="my-events-title">
                    <div>
                        <h1>My Events</h1>
                        <p>Manage all the events you have created.</p>
                    </div>

                    <Link
                        to="/organizer/add-event"
                        className="create-event-btn"
                    >
                        + Create Event
                    </Link>
                </div>

                {events.length === 0 ? (
                    <div className="no-events">
                        <h3>You haven't created any events yet.</h3>
                        <p>Create your first event and share it with customers.</p>
                        <Link to="/organizer/add-event">
                            Create Your First Event
                        </Link>
                    </div>
                ) : (

                    <div className="my-events-list">

                        {events.map((event) => (
                            <div className="my-event-card" key={event.id}>

                                <div className="my-event-details">
                                    <span className="event-category">
                                        {event.category}
                                    </span>

                                    <h3>{event.name}</h3>

                                    <p>
                                        <strong>Date:</strong> {event.date}
                                    </p>

                                    <p>
                                        <strong>Location:</strong> {event.location}
                                    </p>

                                    <p>
                                        <strong>Ticket Price:</strong> ₹{event.price}
                                    </p>
                                </div>

                                <div className="my-event-actions">
                                    <span className={`event-status ${event.status.toLowerCase()}`}>
                                        {event.status}
                                    </span>

                                    <Link
                                        to={`/events/${event.id}`}
                                        className="view-event-btn"
                                    >
                                        View Event
                                    </Link>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

                <Link
                    to="/organizer/dashboard"
                    className="back-organizer-dashboard"
                >
                    Back to Dashboard
                </Link>

            </main>

        </div>
    );
}

export default MyEvents;
