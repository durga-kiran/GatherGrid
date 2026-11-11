
import React from "react";
import { Link } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
    return (
        <div className="customer-dashboard">

            <header className="customer-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/events">Explore Events</Link>
                    <Link to="/customer/bookings">My Bookings</Link>
                    <Link to="/customer/profile">My Profile</Link>
                    <Link to="/login">Logout</Link>
                </nav>
            </header>

            <main className="customer-content">
                <section className="customer-welcome">
                    <h1>Welcome to GatherGrid!</h1>
                    <p>
                        Discover exciting events, book your tickets,
                        and create unforgettable memories.
                    </p>

                    <Link to="/events" className="explore-btn">
                        Explore Events
                    </Link>
                </section>

                <section className="customer-options">
                    <div className="customer-card">
                        <h3>Explore Events</h3>
                        <p>Find concerts, workshops, conferences and more.</p>
                        <Link to="/events">Browse Events</Link>
                    </div>

                    <div className="customer-card">
                        <h3>My Bookings</h3>
                        <p>View and manage your event bookings.</p>
                        <Link to="/customer/bookings">View Bookings</Link>
                    </div>

                    <div className="customer-card">
                        <h3>My Profile</h3>
                        <p>View and update your personal information.</p>
                        <Link to="/customer/profile">Manage Profile</Link>
                    </div>
                </section>
            </main>

            <footer className="customer-footer">
                <p>© 2026 GatherGrid. All rights reserved.</p>
            </footer>

        </div>
    );
}

export default CustomerDashboard;
