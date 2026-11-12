
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
}

export default ManageEvents;
