
import React from "react";
import { Link } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {

    // Sample booking data. Backend integration will come later.
    const bookings = [
        {
            id: 1,
            eventName: "Music Concert",
            date: "15 December 2026",
            location: "Hyderabad",
            tickets: 2,
            amount: 1998,
            status: "Confirmed"
        },
        {
            id: 2,
            eventName: "Tech Conference",
            date: "20 December 2026",
            location: "Bangalore",
            tickets: 1,
            amount: 1499,
            status: "Pending"
        },
        {
            id: 3,
            eventName: "Wedding Expo",
            date: "25 December 2026",
            location: "Hyderabad",
            tickets: 2,
            amount: 998,
            status: "Cancelled"
        }
    ];

    return (
        <div className="bookings-page">

            <header className="bookings-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/customer/dashboard">Dashboard</Link>
                    <Link to="/events">Explore Events</Link>
                    <Link to="/customer/profile">My Profile</Link>
                </nav>
            </header>

            <main className="bookings-content">

                <div className="bookings-title">
                    <h1>My Bookings</h1>
                    <p>View and manage your event bookings.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="no-bookings">
                        <h3>No bookings yet!</h3>
                        <p>Explore events and book your first ticket.</p>
                        <Link to="/events">Explore Events</Link>
                    </div>
                ) : (
                    <div className="bookings-list">

                        {bookings.map((booking) => (
                            <div className="booking-card" key={booking.id}>

                                <div className="booking-details">
                                    <h3>{booking.eventName}</h3>

                                    <p>
                                        <strong>Date:</strong> {booking.date}
                                    </p>

                                    <p>
                                        <strong>Location:</strong> {booking.location}
                                    </p>

                                    <p>
                                        <strong>Tickets:</strong> {booking.tickets}
                                    </p>

                                    <p>
                                        <strong>Total Amount:</strong> ₹{booking.amount}
                                    </p>
                                </div>

                                <div className="booking-status">
                                    <span className={`status ${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>

                            </div>
                        ))}

                    </div>
                )}

                <Link to="/customer/dashboard" className="back-dashboard">
                    Back to Dashboard
                </Link>

            </main>

        </div>
    );
}

export default MyBookings;
