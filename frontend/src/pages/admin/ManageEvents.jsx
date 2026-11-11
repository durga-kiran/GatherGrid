
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageEvents.css";

function ManageEvents() {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: "Music Concert",
            organizer: "Star Events",
            category: "Music",
            date: "2026-12-15",
            location: "Hyderabad",
            price: 999,
            status: "Approved"
        },
        {
            id: 2,
            name: "Technology Conference",
            organizer: "Tech Group",
            category: "Technology",
            date: "2026-12-20",
            location: "Bangalore",
            price: 1499,
            status: "Pending"
        },
        {
            id: 3,
            name: "Wedding Expo",
            organizer: "Dream Weddings",
            category: "Wedding",
            date: "2026-12-25",
            location: "Hyderabad",
            price: 499,
            status: "Pending"
        },
        {
            id: 4,
            name: "Business Workshop",
            organizer: "Business Network",
            category: "Workshop",
            date: "2027-01-05",
            location: "Chennai",
            price: 799,
            status: "Rejected"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredEvents = events.filter((event) => {
        const matchesSearch =
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || event.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const updateEventStatus = (id, newStatus) => {
        setEvents((previousEvents) =>
            previousEvents.map((event) =>
                event.id === id
                    ? { ...event, status: newStatus }
                    : event
            )
        );
    };

    const deleteEvent = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (confirmed) {
            setEvents((previousEvents) =>
                previousEvents.filter((event) => event.id !== id)
            );
        }
    };

    return (
        <div className="manage-events-page">

            <aside className="manage-events-sidebar">
                <h2>GatherGrid</h2>
                <p>ADMIN PANEL</p>

                <nav>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users">Manage Users</Link>
                    <Link to="/admin/events" className="active">
                        Manage Events
                    </Link>
                    <Link to="/admin/bookings">Manage Bookings</Link>
                    <Link to="/admin/profile">My Profile</Link>
                    <Link to="/">Visit Website</Link>
                </nav>
            </aside>

            <main className="manage-events-main">

                <header className="manage-events-header">
                    <div>
                        <h1>Manage Events</h1>
                        <p>Review and manage events submitted by organizers.</p>
                    </div>
                </header>

                <section className="events-summary">

                    <div className="events-summary-card">
                        <h3>{events.length}</h3>
                        <p>Total Events</p>
                    </div>

                    <div className="events-summary-card">
                        <h3>
                            {events.filter(e => e.status === "Approved").length}
                        </h3>
                        <p>Approved Events</p>
                    </div>

                    <div className="events-summary-card">
                        <h3>
                            {events.filter(e => e.status === "Pending").length}
                        </h3>
                        <p>Pending Events</p>
                    </div>

                    <div className="events-summary-card">
                        <h3>
                            {events.filter(e => e.status === "Rejected").length}
                        </h3>
                        <p>Rejected Events</p>
                    </div>

                </section>

                <section className="manage-events-card">

                    <div className="events-toolbar">

                        <input
                            type="text"
                            placeholder="Search event, organizer or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>

                    </div>

                    <div className="manage-events-table-wrapper">

                        <table>
                            <thead>
                                <tr>
                                    <th>Event</th>
                                    <th>Organizer</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEvents.length > 0 ? (
                                    filteredEvents.map((event) => (
                                        <tr key={event.id}>
                                            <td>{event.name}</td>
                                            <td>{event.organizer}</td>
                                            <td>{event.category}</td>
                                            <td>{event.date}</td>
                                            <td>{event.location}</td>
                                            <td>₹{event.price}</td>

                                            <td>
                                                <span className={`event-status ${event.status.toLowerCase()}`}>
                                                    {event.status}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="event-action-buttons">

                                                    {event.status !== "Approved" && (
                                                        <button
                                                            className="approve-event-btn"
                                                            onClick={() =>
                                                                updateEventStatus(event.id, "Approved")
                                                            }
                                                        >
                                                            Approve
                                                        </button>
                                                    )}

                                                    {event.status !== "Rejected" && (
                                                        <button
                                                            className="reject-event-btn"
                                                            onClick={() =>
                                                                updateEventStatus(event.id, "Rejected")
                                                            }
                                                        >
                                                            Reject
                                                        </button>
                                                    )}

                                                    <button
                                                        className="delete-event-btn"
                                                        onClick={() => deleteEvent(event.id)}
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="no-events">
                                            No events found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default ManageEvents;
