
import React from "react";
import { Link } from "react-router-dom";
import "./OrganizerBookings.css";

function OrganizerBookings() {

    // Sample booking records. Backend integration will come later.
    const bookings = [
        {
            id: 1,
            customerName: "Rahul Kumar",
            eventName: "Music Concert",
            bookingDate: "10 November 2026",
            tickets: 2,
            amount: 1998,
            status: "Confirmed"
        },
        {
            id: 2,
            customerName: "Priya Sharma",
            eventName: "Tech Conference",
            bookingDate: "11 November 2026",
            tickets: 1,
            amount: 1499,
            status: "Pending"
        },
        {
            id: 3,
            customerName: "Arjun Reddy",
            eventName: "Business Workshop",
            bookingDate: "11 November 2026",
            tickets: 3,
            amount: 2397,
            status: "Cancelled"
        }
    ];

    return (
        <div className="organizer-bookings-page">

            <header className="organizer-bookings-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/organizer/dashboard">Dashboard</Link>
                    <Link to="/organizer/events">My Events</Link>
                    <Link to="/organizer/add-event">Add Event</Link>
                    <Link to="/organizer/bookings">Bookings</Link>
                </nav>
            </header>

            <main className="organizer-bookings-content">

                <div className="organizer-bookings-title">
                    <h1>Manage Bookings</h1>
                    <p>View customer bookings for your events.</p>
                </div>

                <div className="organizer-bookings-summary">
                    <div className="booking-summary-card">
                        <h3>Total Bookings</h3>
                        <p>{bookings.length}</p>
                    </div>

                    <div className="booking-summary-card">
                        <h3>Confirmed</h3>
                        <p>
                            {bookings.filter(
                                booking => booking.status === "Confirmed"
                            ).length}
                        </p>
                    </div>

                    <div className="booking-summary-card">
                        <h3>Pending</h3>
                        <p>
                            {bookings.filter(
                                booking => booking.status === "Pending"
                            ).length}
                        </p>
                    </div>
                </div>

                {bookings.length === 0 ? (
                    <div className="no-organizer-bookings">
                        <h3>No bookings available</h3>
                        <p>Customer bookings will appear here.</p>
                    </div>
                ) : (

                    <div className="organizer-bookings-table-wrapper">
                        <table className="organizer-bookings-table">

                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Event</th>
                                    <th>Booking Date</th>
                                    <th>Tickets</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.customerName}</td>
                                        <td>{booking.eventName}</td>
                                        <td>{booking.bookingDate}</td>
                                        <td>{booking.tickets}</td>
                                        <td>₹{booking.amount}</td>
                                        <td>
                                            <span className={`organizer-booking-status ${booking.status.toLowerCase()}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                )}

                <Link
                    to="/organizer/dashboard"
                    className="organizer-bookings-back"
                >
                    Back to Dashboard
                </Link>

            </main>

        </div>
    );
}

export default OrganizerBookings;
