
import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    const stats = [
        {
            title: "Total Users",
            value: "1,250",
            icon: "👥"
        },
        {
            title: "Total Events",
            value: "85",
            icon: "🎉"
        },
        {
            title: "Total Bookings",
            value: "2,480",
            icon: "🎟️"
        },
        {
            title: "Total Revenue",
            value: "₹5,75,000",
            icon: "💰"
        }
    ];

    const recentEvents = [
        {
            id: 1,
            name: "Music Concert",
            organizer: "Star Events",
            date: "15 Dec 2026",
            status: "Approved"
        },
        {
            id: 2,
            name: "Technology Conference",
            organizer: "Tech Group",
            date: "20 Dec 2026",
            status: "Pending"
        },
        {
            id: 3,
            name: "Wedding Expo",
            organizer: "Dream Weddings",
            date: "25 Dec 2026",
            status: "Approved"
        }
    ];

    return (
        <div className="admin-dashboard">

            <aside className="admin-sidebar">
                <h2>GatherGrid</h2>
                <p className="admin-label">ADMIN PANEL</p>

                <nav>
                    <Link to="/admin/dashboard" className="active">
                        Dashboard
                    </Link>

                    <Link to="/admin/users">
                        Manage Users
                    </Link>

                    <Link to="/admin/events">
                        Manage Events
                    </Link>

                    <Link to="/admin/bookings">
                        Manage Bookings
                    </Link>

                    <Link to="/admin/profile">
                        My Profile
                    </Link>

                    <Link to="/">
                        Visit Website
                    </Link>
                </nav>
            </aside>

            <main className="admin-main">

                <header className="admin-topbar">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Welcome back, Admin!</p>
                    </div>

                    <Link to="/admin/profile" className="admin-profile-link">
                        Admin Profile
                    </Link>
                </header>

                <section className="admin-stats">

                    {stats.map((stat, index) => (
                        <div className="admin-stat-card" key={index}>
                            <div className="admin-stat-icon">
                                {stat.icon}
                            </div>

                            <div>
                                <p>{stat.title}</p>
                                <h2>{stat.value}</h2>
                            </div>
                        </div>
                    ))}

                </section>

                <section className="admin-recent-events">

                    <div className="admin-section-heading">
                        <h2>Recent Events</h2>

                        <Link to="/admin/events">
                            View All
                        </Link>
                    </div>

                    <div className="admin-table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Organizer</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {recentEvents.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.name}</td>
                                        <td>{event.organizer}</td>
                                        <td>{event.date}</td>
                                        <td>
                                            <span
                                                className={
                                                    event.status === "Approved"
                                                        ? "status-approved"
                                                        : "status-pending"
                                                }
                                            >
                                                {event.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;
