
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddEvent.css";

function AddEvent() {
    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        eventName: "",
        category: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        location: "",
        ticketPrice: "",
        totalTickets: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEventData({
            ...eventData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Backend API integration will be added later.
        console.log("New Event Details:", eventData);

        alert("Event details submitted successfully!");

        navigate("/organizer/events");
    };

    return (
        <div className="add-event-page">

            <header className="add-event-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/organizer/dashboard">Dashboard</Link>
                    <Link to="/organizer/events">My Events</Link>
                    <Link to="/organizer/bookings">Bookings</Link>
                </nav>
            </header>

            <main className="add-event-content">

                <div className="add-event-title">
                    <h1>Create New Event</h1>
                    <p>Fill in the details to publish your event on GatherGrid.</p>
                </div>

                <form className="add-event-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            id="eventName"
                            name="eventName"
                            placeholder="Enter event name"
                            value={eventData.eventName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Event Category</label>
                        <select
                            id="category"
                            name="category"
                            value={eventData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="Music">Music & Concerts</option>
                            <option value="Wedding">Weddings</option>
                            <option value="Technology">Technology</option>
                            <option value="Sports">Sports</option>
                            <option value="Education">Education</option>
                            <option value="Business">Business</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Food">Food & Lifestyle</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="description">Event Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe your event..."
                            rows="5"
                            value={eventData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Event Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={eventData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Event Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="venue">Venue Name</label>
                        <input
                            type="text"
                            id="venue"
                            name="venue"
                            placeholder="Enter venue name"
                            value={eventData.venue}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">City / Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter city"
                            value={eventData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ticketPrice">Ticket Price (₹)</label>
                        <input
                            type="number"
                            id="ticketPrice"
                            name="ticketPrice"
                            placeholder="Enter ticket price"
                            min="0"
                            value={eventData.ticketPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="totalTickets">Available Tickets</label>
                        <input
                            type="number"
                            id="totalTickets"
                            name="totalTickets"
                            placeholder="Enter ticket quantity"
                            min="1"
                            value={eventData.totalTickets}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="add-event-buttons full-width">
                        <button type="submit" className="publish-event-btn">
                            Create Event
                        </button>

                        <Link
                            to="/organizer/dashboard"
                            className="cancel-event-btn"
                        >
                            Cancel
                        </Link>
                    </div>

                </form>

            </main>

        </div>
    );
}

export default AddEvent;
