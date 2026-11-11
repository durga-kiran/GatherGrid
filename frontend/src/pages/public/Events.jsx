
import React, { useState } from "react";
import "./Events.css";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";

function Events() {
    // State management
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Pagination settings
    const eventsPerPage = 3;

    // Sample event data
    const events = [
        {
            id: 1,
            name: "Music Concert",
            category: "Music",
            date: "2026-12-15",
            location: "Hyderabad",
            price: 999,
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
        },
        {
            id: 2,
            name: "Tech Conference",
            category: "Technology",
            date: "2026-12-20",
            location: "Bangalore",
            price: 1499,
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
        },
        {
            id: 3,
            name: "Wedding Expo",
            category: "Wedding",
            date: "2026-12-25",
            location: "Hyderabad",
            price: 499,
            image: "https://images.unsplash.com/photo-1519741497674-611481863552"
        },
        {
            id: 4,
            name: "Business Workshop",
            category: "Workshop",
            date: "2027-01-05",
            location: "Chennai",
            price: 799,
            image: "https://images.unsplash.com/photo-1556761175-b413da4baf72"
        },
        {
            id: 5,
            name: "Dance Festival",
            category: "Music",
            date: "2027-01-10",
            location: "Mumbai",
            price: 599,
            image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e"
        },
        {
            id: 6,
            name: "Startup Meetup",
            category: "Technology",
            date: "2027-01-15",
            location: "Hyderabad",
            price: 299,
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
        }
    ];

    // Search and category filtering
    const filteredEvents = events.filter((event) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.location.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText);

        const matchesCategory =
            category === "All" || event.category === category;

        return matchesSearch && matchesCategory;
    });

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredEvents.length / eventsPerPage
    );

    const startIndex = (currentPage - 1) * eventsPerPage;

    const currentEvents = filteredEvents.slice(
        startIndex,
        startIndex + eventsPerPage
    );

    return (
        <div className="events-page">

            {/* Events Header */}
            <section className="events-header">
                <h1>Explore Events</h1>
                <p>
                    Discover exciting events and book your next experience.
                </p>
            </section>

            {/* Search and Category Filter */}
            <section className="events-search">

                <input
                    type="text"
                    placeholder="Search events or locations..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />

                <select
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="All">All Categories</option>
                    <option value="Music">Music</option>
                    <option value="Technology">Technology</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Workshop">Workshop</option>
                </select>

            </section>

            {/* Events List */}
            <section className="events-list">

                {currentEvents.length > 0 ? (

                    currentEvents.map((event) => (

                        <div className="event-card" key={event.id}>

                            <img
                                src={event.image}
                                alt={event.name}
                            />

                            <div className="event-info">

                                <span className="event-category">
                                    {event.category}
                                </span>

                                <h2>{event.name}</h2>

                                <p>📅 {event.date}</p>

                                <p>📍 {event.location}</p>

                                <h3>₹{event.price}</h3>

                                <button
                                    type="button"
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    View Details
                                </button>

                            </div>

                        </div>

                    ))

                ) : (

                    <h2 className="no-events">
                        No events found.
                    </h2>

                )}

            </section>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            {/* Event Details Modal */}
            <Modal
                isOpen={Boolean(selectedEvent)}
                onClose={() => setSelectedEvent(null)}
                title={selectedEvent?.name || "Event Details"}
            >

                {selectedEvent && (

                    <div className="event-modal-details">

                        <img
                            src={selectedEvent.image}
                            alt={selectedEvent.name}
                            className="event-modal-image"
                        />

                        <h3>{selectedEvent.name}</h3>

                        <p>
                            <strong>Category:</strong>{" "}
                            {selectedEvent.category}
                        </p>

                        <p>
                            <strong>Date:</strong>{" "}
                            {selectedEvent.date}
                        </p>

                        <p>
                            <strong>Location:</strong>{" "}
                            {selectedEvent.location}
                        </p>

                        <h3>Price: ₹{selectedEvent.price}</h3>

                        <button
                            type="button"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Close
                        </button>

                    </div>

                )}

            </Modal>

        </div>
    );
}

export default Events;
