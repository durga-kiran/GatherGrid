
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Search,
    Music,
    Laptop,
    BriefcaseBusiness,
    Trophy,
    GraduationCap,
    Heart,
    ArrowRight,
    CalendarDays,
    MapPin,
    Users,
    Ticket
} from "lucide-react";

import Button from "../../components/Button";
import "./Home.css";

// Event Categories
const categories = [
    { name: "Music", icon: Music, color: "music" },
    { name: "Technology", icon: Laptop, color: "technology" },
    { name: "Business", icon: BriefcaseBusiness, color: "business" },
    { name: "Sports", icon: Trophy, color: "sports" },
    { name: "Education", icon: GraduationCap, color: "education" },
    { name: "Community", icon: Heart, color: "community" }
];

// Featured Events
const featuredEvents = [
    {
        id: 1,
        title: "Hyderabad Music Festival",
        category: "Music",
        date: "December 15, 2026",
        location: "Gachibowli, Hyderabad",
        price: "₹499",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900"
    },
    {
        id: 2,
        title: "Future Tech Summit",
        category: "Technology",
        date: "December 20, 2026",
        location: "HITEX, Hyderabad",
        price: "₹799",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900"
    },
    {
        id: 3,
        title: "Startup Networking Meetup",
        category: "Business",
        date: "December 25, 2026",
        location: "Hitech City, Hyderabad",
        price: "Free",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900"
    }
];

function Home() {
    const navigate = useNavigate();

    // Event Search
    const handleSearch = (e) => {
        e.preventDefault();

        const searchValue = e.target.elements.eventSearch.value.trim();

        if (searchValue) {
            navigate(`/events?search=${encodeURIComponent(searchValue)}`);
        } else {
            navigate("/events");
        }
    };

    return (
        <div className="home-page">

            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="hero-content container">

                    <span className="hero-badge">
                        <CalendarDays size={16} />
                        Discover. Connect. Celebrate.
                    </span>

                    <h1>
                        Find Your Next
                        <span> Unforgettable Event</span>
                    </h1>

                    <p>
                        Explore concerts, technology conferences, workshops,
                        sports events, and experiences happening around you.
                    </p>

                    <form className="hero-search" onSubmit={handleSearch}>
                        <Search size={22} />

                        <input
                            type="text"
                            name="eventSearch"
                            placeholder="Search events, categories, or locations..."
                            aria-label="Search events"
                        />

                        <button type="submit">Explore Events</button>
                    </form>

                    <div className="hero-stats">
                        <div>
                            <strong>500+</strong>
                            <span>Events</span>
                        </div>

                        <div>
                            <strong>100+</strong>
                            <span>Organizers</span>
                        </div>

                        <div>
                            <strong>10K+</strong>
                            <span>Happy Attendees</span>
                        </div>
                    </div>

                </div>
            </section>

            {/* CATEGORIES SECTION */}
            <section className="section categories-section">
                <div className="container">

                    <div className="section-title">
                        <span className="section-label">EXPLORE CATEGORIES</span>
                        <h2>Discover Events by Category</h2>
                        <p>Find experiences that match your interests.</p>
                    </div>

                    <div className="category-grid">
                        {categories.map((category) => {
                            const Icon = category.icon;

                            return (
                                <Link
                                    to={`/events?category=${encodeURIComponent(category.name)}`}
                                    className="home-category-card"
                                    key={category.name}
                                >
                                    <div className={`category-icon ${category.color}`}>
                                        <Icon size={28} />
                                    </div>

                                    <h3>{category.name}</h3>

                                    <span>
                                        Explore events <ArrowRight size={15} />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* FEATURED EVENTS SECTION */}
            <section className="section featured-section">
                <div className="container">

                    <div className="featured-heading">
                        <div>
                            <span className="section-label">DON'T MISS OUT</span>
                            <h2>Featured Events</h2>
                            <p>Explore some exciting upcoming experiences.</p>
                        </div>

                        <Link to="/events" className="view-all-link">
                            View All Events <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="featured-grid">
                        {featuredEvents.map((event) => (
                            <article className="featured-card" key={event.id}>

                                <div className="featured-image">
                                    <img src={event.image} alt={event.title} />

                                    <span className="event-category">
                                        {event.category}
                                    </span>
                                </div>

                                <div className="featured-info">
                                    <h3>{event.title}</h3>

                                    <div className="event-meta">
                                        <CalendarDays size={16} />
                                        <span>{event.date}</span>
                                    </div>

                                    <div className="event-meta">
                                        <MapPin size={16} />
                                        <span>{event.location}</span>
                                    </div>

                                    <div className="featured-card-bottom">
                                        <strong>{event.price}</strong>

                                        <Link to={`/events/${event.id}`}>
                                            View Details <ArrowRight size={15} />
                                        </Link>
                                    </div>
                                </div>

                            </article>
                        ))}
                    </div>

                </div>
            </section>

            {/* WHY GATHERGRID SECTION */}
            <section className="section why-section">
                <div className="container">

                    <div className="section-title">
                        <span className="section-label">WHY GATHERGRID?</span>
                        <h2>Everything You Need in One Place</h2>
                        <p>We make discovering and booking events simple.</p>
                    </div>

                    <div className="why-grid">

                        <div className="why-card">
                            <div className="why-icon">
                                <Search size={27} />
                            </div>

                            <h3>Easy Discovery</h3>
                            <p>
                                Discover different types of events from multiple
                                organizers on one platform.
                            </p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <Ticket size={27} />
                            </div>

                            <h3>Simple Booking</h3>
                            <p>
                                Explore event details and book your tickets through
                                a simple process.
                            </p>
                        </div>

                        <div className="why-card">
                            <div className="why-icon">
                                <Users size={27} />
                            </div>

                            <h3>Multiple Organizers</h3>
                            <p>
                                Find events hosted by different organizations
                                in one convenient place.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="cta-section">
                <div className="container cta-content">

                    <div>
                        <h2>Have an Event to Organize?</h2>
                        <p>
                            Bring your event to a wider audience with GatherGrid.
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => navigate("/register")}
                    >
                        Get Started <ArrowRight size={18} />
                    </Button>

                </div>
            </section>

        </div>
    );
}

export default Home;
