
import { useEffect, useState } from "react";
import { Search, Ticket, CalendarDays } from "lucide-react";
import { toast } from "react-toastify";

import adminService from "../../services/adminServices.js";
import Loading from "../../components/common/Loading";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await adminService.getAdminBookings();

      const data =
        response.bookings ||
        response.data?.bookings ||
        response.data ||
        [];

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);

      await adminService.updateBookingStatus(id, status);

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );

      toast.success("Booking status updated.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to update booking status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const value = search.toLowerCase();

    const bookingId = String(booking.bookingId || booking._id || "");
    const customerName =
      booking.user?.name || booking.customerName || "";
    const customerEmail =
      booking.user?.email || booking.customerEmail || "";
    const eventName =
      booking.event?.title || booking.eventName || "";

    return (
      bookingId.toLowerCase().includes(value) ||
      customerName.toLowerCase().includes(value) ||
      customerEmail.toLowerCase().includes(value) ||
      eventName.toLowerCase().includes(value)
    );
  });

  if (loading) return <Loading />;

  return (
    <div className="admin-page">

      <div className="admin-page-heading">
        <div>
          <span className="section-eyebrow">RESERVATION MANAGEMENT</span>
          <h1>Manage Bookings</h1>
          <p>Monitor customer reservations and booking statuses.</p>
        </div>

        <span className="admin-record-count">
          {bookings.length} Total Bookings
        </span>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search booking, customer or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="admin-panel">
        {filteredBookings.length === 0 ? (
          <div className="admin-empty-state">
            No bookings found.
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Event</th>
                  <th>Tickets</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Update status</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <strong>
                        {booking.bookingId || booking._id}
                      </strong>
                      <small>
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleDateString()
                          : "—"}
                      </small>
                    </td>

                    <td>
                      <strong>
                        {booking.user?.name ||
                          booking.customerName ||
                          "Customer"}
                      </strong>
                      <small>
                        {booking.user?.email ||
                          booking.customerEmail ||
                          ""}
                      </small>
                    </td>

                    <td>
                      {booking.event?.title ||
                        booking.eventName ||
                        "Event"}
                    </td>

                    <td>
                      {booking.quantity || booking.ticketQuantity || 1}
                    </td>

                    <td>
                      ₹{Number(
                        booking.totalAmount || booking.amount || 0
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span className={`admin-status ${booking.paymentStatus === "paid" ? "active" : "pending"}`}>
                        {booking.paymentStatus || "Unknown"}
                      </span>
                    </td>

                    <td>
                      <span className={`admin-status ${booking.status || "pending"}`}>
                        {booking.status || "Pending"}
                      </span>
                    </td>

                    <td>
                      <select
                        className="admin-status-select"
                        value={booking.status || "pending"}
                        disabled={updatingId === booking._id}
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

export default ManageBookings;
