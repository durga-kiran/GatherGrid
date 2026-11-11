
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageBookings.css";

function ManageBookings() {
    const [bookings, setBookings] = useState([
        {
            id: 1,
            customer: "Rahul Sharma",
            email: "rahul@example.com",
            event: "Music Concert",
            date: "2026-12-15",
            tickets: 2,
            amount: 1998,
            status: "Confirmed"
        },
        {
            id: 2,
            customer: "Priya Reddy",
            email: "priya@example.com",
            event: "Technology Conference",
            date: "2026-12-20",
            tickets: 1,
            amount: 1499,
            status: "Pending"
        },
        {
            id: 3,
            customer: "Arjun Kumar",
            email: "arjun@example.com",
            event: "Wedding Expo",
            date: "2026-12-25",
            tickets: 3,
            amount: 1497,
            status: "Cancelled"
        },
        {
            id: 4,
            customer: "Sneha Patel",
            email: "sneha@example.com",
            event: "Business Workshop",
            date: "2027-01-05",
            tickets: 2,
            amount: 1598,
            status: "Confirmed"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const filteredBookings = bookings.filter((booking) => {
        const matchesSearch =
            booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.event.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const updateBookingStatus = (id, newStatus) => {
        setBookings((previousBookings) =>
            previousBookings.map((booking) =>
                booking.id === id
                    ? { ...booking, status: newStatus }
                    : booking
            )
        );
    };

    const totalRevenue = bookings
        .filter((booking) => booking.status === "Confirmed")
        .reduce((total, booking) => total + booking.amount, 0);

    return (
        <div className="manage-bookings-page">

            <aside className="manage-bookings-sidebar">
                <h2>GatherGrid</h2>
                <p>ADMIN PANEL</p>

                <nav>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users">Manage Users</Link>
                    <Link to="/admin/events">Manage Events</Link>
                    <Link to="/admin/bookings" className="active">
                        Manage Bookings
                    </Link>
                    <Link to="/admin/profile">My Profile</Link>
                    <Link to="/">Visit Website</Link>
                </nav>
            </aside>

            <main className="manage-bookings-main">

                <header className="manage-bookings-header">
                    <h1>Manage Bookings</h1>
                    <p>View and manage customer event bookings.</p>
                </header>

                <section className="bookings-summary">

                    <div className="booking-summary-card">
                        <h3>{bookings.length}</h3>
                        <p>Total Bookings</p>
                    </div>

                    <div className="booking-summary-card">
                        <h3>
                            {bookings.filter(
                                (booking) => booking.status === "Confirmed"
                            ).length}
                        </h3>
                        <p>Confirmed Bookings</p>
                    </div>

                    <div className="booking-summary-card">
                        <h3>
                            {bookings.filter(
                                (booking) => booking.status === "Pending"
                            ).length}
                        </h3>
                        <p>Pending Bookings</p>
                    </div>

                    <div className="booking-summary-card">
                        <h3>₹{totalRevenue.toLocaleString("en-IN")}</h3>
                        <p>Confirmed Revenue</p>
                    </div>

                </section>

                <section className="manage-bookings-card">

                    <div className="bookings-toolbar">

                        <input
                            type="text"
                            placeholder="Search customer, email or event..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                    </div>

                    <div className="manage-bookings-table-wrapper">

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Tickets</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredBookings.length > 0 ? (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>#{booking.id}</td>

                                            <td>
                                                <strong>{booking.customer}</strong>
                                                <small>{booking.email}</small>
                                            </td>

                                            <td>{booking.event}</td>
                                            <td>{booking.date}</td>
                                            <td>{booking.tickets}</td>
                                            <td>₹{booking.amount}</td>

                                            <td>
                                                <span
                                                    className={`booking-status ${booking.status.toLowerCase()}`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </td>

                                            <td>
                                                {booking.status === "Pending" && (
                                                    <button
                                                        className="confirm-booking-btn"
                                                        onClick={() =>
                                                            updateBookingStatus(
                                                                booking.id,
                                                                "Confirmed"
                                                            )
                                                        }
                                                    >
                                                        Confirm
                                                    </button>
                                                )}

                                                {booking.status !== "Cancelled" && (
                                                    <button
                                                        className="cancel-booking-btn"
                                                        onClick={() =>
                                                            updateBookingStatus(
                                                                booking.id,
                                                                "Cancelled"
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="no-bookings">
                                            No bookings found.
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

export default ManageBookings;
