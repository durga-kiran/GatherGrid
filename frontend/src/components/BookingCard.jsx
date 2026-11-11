
import React from "react";
import {
    CalendarDays,
    MapPin,
    Ticket,
    IndianRupee
} from "lucide-react";

import "./BookingCard.css";

function BookingCard({ booking }) {
    if (!booking) return null;

    const status = (booking.status || "Pending").toLowerCase();

    return (
        <div className="booking-card">

            <div className="booking-card-header">
                <div>
                    <span className="booking-id">
                        Booking ID: {booking.bookingId || booking._id || booking.id || "N/A"}
                    </span>

                    <h3>{booking.eventName || booking.event?.name || "Event"}</h3>
                </div>

                <span className={`booking-card-status ${status}`}>
                    {booking.status || "Pending"}
                </span>
            </div>

            <div className="booking-card-details">

                <p>
                    <CalendarDays size={17} />
                    {booking.eventDate || booking.date || "Date not available"}
                </p>

                <p>
                    <MapPin size={17} />
                    {booking.location || "Location not available"}
                </p>

                <p>
                    <Ticket size={17} />
                    {booking.tickets ?? booking.numberOfTickets ?? 1} Tickets
                </p>

                <p>
                    <IndianRupee size={17} />
                    {booking.amount ?? booking.totalAmount ?? 0}
                </p>

            </div>

        </div>
    );
}

export default BookingCard;
