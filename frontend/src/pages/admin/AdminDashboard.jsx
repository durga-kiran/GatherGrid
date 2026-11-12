
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  Ticket,
  IndianRupee,
  ArrowUpRight,
  Plus,
  Settings,
} from "lucide-react";
import { toast } from "react-toastify";

import adminService from "../../services/adminServices.js";
import Loading from "../../components/common/Loading";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentBookings: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await adminService.getDashboardStats();

        const data =
          response.stats ||
          response.dashboard ||
          response.data?.stats ||
          response.data ||
          response;

        setStats({
          totalEvents: data.totalEvents || 0,
          totalUsers: data.totalUsers || 0,
          totalBookings: data.totalBookings || 0,
          totalRevenue: data.totalRevenue || 0,
          recentBookings: Array.isArray(data.recentBookings)
            ? data.recentBookings
            : [],
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Unable to load admin dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <Loading />;

  const cards = [
    {
      label: "Total Events",
      value: stats.totalEvents,
      icon: CalendarDays,
    },
    {
      label: "Registered Users",
      value: stats.totalUsers,
      icon: Users,
    },
    {
      label: "Total Bookings",
      value: stats.totalBookings,
      icon: Ticket,
    },
    {
      label: "Total Revenue",
      value: `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  return (
    <div className="admin-page">

      <div className="admin-page-heading">
        <div>
          <span className="section-eyebrow">ADMINISTRATION</span>
          <h1>Dashboard Overview</h1>
          <p>Monitor your Venuza platform and manage activities.</p>
        </div>

        <Link to="/admin/events/add" className="admin-primary-btn">
          <Plus size={17} /> Add New Event
        </Link>
      </div>

      <div className="admin-stats-grid">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div className="admin-stat-card" key={card.label}>
              <div className="admin-stat-icon">
                <Icon size={23} />
              </div>

              <div>
                <p>{card.label}</p>
                <h2>{card.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="admin-dashboard-grid">

        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="section-eyebrow">LATEST ACTIVITY</span>
              <h2>Recent Bookings</h2>
            </div>

            <Link to="/admin/bookings" className="admin-text-link">
              View all <ArrowUpRight size={15} />
            </Link>
          </div>

          {stats.recentBookings.length === 0 ? (
            <div className="admin-empty-state">
              No recent bookings available.
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        {booking.bookingId || booking._id}
                      </td>
                      <td>
                        {booking.user?.name ||
                          booking.customerName ||
                          "Customer"}
                      </td>
                      <td>
                        ₹{Number(
                          booking.totalAmount || booking.amount || 0
                        ).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span className={`admin-status ${booking.status || "pending"}`}>
                          {booking.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="admin-panel admin-shortcuts-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="section-eyebrow">QUICK ACTIONS</span>
              <h2>Manage Platform</h2>
            </div>
          </div>

          <Link to="/admin/events" className="admin-shortcut">
            <CalendarDays size={20} />
            <span>
              <strong>Manage Events</strong>
              <small>Create and update events</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/admin/users" className="admin-shortcut">
            <Users size={20} />
            <span>
              <strong>Manage Users</strong>
              <small>View registered customers</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/admin/bookings" className="admin-shortcut">
            <Ticket size={20} />
            <span>
              <strong>Manage Bookings</strong>
              <small>Review reservations</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>

          <Link to="/admin/profile" className="admin-shortcut">
            <Settings size={20} />
            <span>
              <strong>Admin Profile</strong>
              <small>Manage account details</small>
            </span>
            <ArrowUpRight size={16} />
          </Link>
        </section>

      </div>
    </div>
  );
=======
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
>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4
}

export default AdminDashboard;
