
import React from "react";
import { Link } from "react-router-dom";
import "./OrganizerDashboard.css";

function OrganizerDashboard() {
    // Sample dashboard statistics.
    // Actual values will come from the backend later.
    const stats = [
        {
            title: "Total Events",
            value: 8
        },
        {
            title: "Total Bookings",
            value: 125
        },
        {
            title: "Upcoming Events",
            value: 4
        },
        {
            title: "Total Revenue",
            value: "₹45,000"
        }
    ];

    return (
        <div className="organizer-dashboard">

            <header className="organizer-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/organizer/dashboard">Dashboard</Link>
                    <Link to="/organizer/events">My Events</Link>
                    <Link to="/organizer/add-event">Add Event</Link>
                    <Link to="/organizer/bookings">Bookings</Link>
                    <Link to="/organizer/profile">Profile</Link>
                    <Link to="/login">Logout</Link>
                </nav>
            </header>

            <main className="organizer-content">

                <section className="organizer-welcome">
                    <h1>Welcome, Organizer!</h1>
                    <p>
                        Manage your events, track bookings,
                        and grow your audience with GatherGrid.
                    </p>

                    <Link
                        to="/organizer/add-event"
                        className="add-event-btn"
                    >
                        + Create New Event
                    </Link>
                </section>

                <section className="organizer-stats">
                    {stats.map((stat, index) => (
                        <div className="organizer-stat-card" key={index}>
                            <h3>{stat.title}</h3>
                            <p>{stat.value}</p>
                        </div>
                    ))}
                </section>

                <section className="organizer-quick-links">
                    <h2>Quick Actions</h2>

                    <div className="organizer-actions">

                        <div className="organizer-action-card">
                            <h3>Manage Events</h3>
                            <p>View and update your published events.</p>
                            <Link to="/organizer/events">
                                View My Events
                            </Link>
                        </div>

                        <div className="organizer-action-card">
                            <h3>Manage Bookings</h3>
                            <p>Check customer registrations and bookings.</p>
                            <Link to="/organizer/bookings">
                                View Bookings
                            </Link>
                        </div>

                        <div className="organizer-action-card">
                            <h3>My Profile</h3>
                            <p>Manage your organizer account information.</p>
                            <Link to="/organizer/profile">
                                View Profile
                            </Link>
                        </div>

                    </div>
                </section>

            </main>

            <footer className="organizer-footer">
                <p>© 2026 GatherGrid. All rights reserved.</p>
            </footer>

        </div>
    );
}

export default OrganizerDashboard;
