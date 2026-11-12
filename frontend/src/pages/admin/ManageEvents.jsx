
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { toast } from "react-toastify";

import adminService from "../../services/adminServices.js";
import Loading from "../../components/common/Loading";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await adminService.getAdminEvents();

      const data =
        response.events ||
        response.data?.events ||
        response.data ||
        [];

      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await adminService.deleteEvent(id);

      setEvents((previous) =>
        previous.filter((event) => event._id !== id)
      );

      toast.success("Event deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to delete event."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const filteredEvents = events.filter((event) =>
    (event.title || event.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div className="admin-page">

      <div className="admin-page-heading">
        <div>
          <span className="section-eyebrow">EVENT MANAGEMENT</span>
          <h1>Manage Events</h1>
          <p>Create, edit and organize platform events.</p>
        </div>

        <Link to="/admin/events/add" className="admin-primary-btn">
          <Plus size={17} /> Add Event
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search events by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <span className="admin-record-count">
          {filteredEvents.length} Events
        </span>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="admin-empty-state">
          No events found.
        </div>
      ) : (
        <div className="admin-panel">
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event._id}>
                    <td>
                      <div className="admin-event-cell">
                        <img
                          src={
                            event.image?.startsWith("http")
                              ? event.image
                              : event.image
                                ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
                                : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                          }
                          alt={event.title || "Event"}
                        />

                        <strong>{event.title || event.name}</strong>
                      </div>
                    </td>

                    <td>{event.category || "—"}</td>

                    <td>
                      {event.date
                        ? new Date(event.date).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <span className="admin-location-cell">
                        <MapPin size={14} />
                        {event.location || "—"}
                      </span>
                    </td>

                    <td>
                      ₹{Number(event.price || event.ticketPrice || 0).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <div className="admin-action-group">
                        <Link
                          to={`/admin/events/edit/${event._id}`}
                          className="admin-icon-btn edit"
                          title="Edit event"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          type="button"
                          className="admin-icon-btn delete"
                          title="Delete event"
                          disabled={deletingId === event._id}
                          onClick={() => handleDelete(event._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
=======
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
>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4
}

export default ManageEvents;
