import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

import eventService from "../../services/eventSerices.js";
import EventCard from "../../components/events/EventCard";
import Loading from "../../components/common/Loading";

const categories = [
  { name: "Music", icon: "🎵" },
  { name: "Technology", icon: "💻" },
  { name: "Business", icon: "💼" },
  { name: "Sports", icon: "⚽" },
  { name: "Art & Culture", icon: "🎨" },
  { name: "Education", icon: "📚" }
];

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getFeaturedEvents();
        setEvents(data.events || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load featured events"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    navigateToEvents();
  };

  const navigateToEvents = () => {
    window.location.href = search.trim()
      ? `/events?search=${encodeURIComponent(search.trim())}`
      : "/events";
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <span className="hero-label">
              DISCOVER EXPERIENCES THAT MATTER
            </span>

            <h1>
              Moments worth
              <br />
              <span>remembering.</span>
            </h1>

            <p>
              Discover concerts, conferences, festivals and
              unforgettable experiences happening around you.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <FiSearch />
              <input
                type="text"
                placeholder="Search events, locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit">Explore</button>
            </form>

            <Link to="/events" className="hero-link">
              Explore all events <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE BY INTEREST</span>
            <h2>Find your kind of experience</h2>
          </div>

          <Link to="/categories" className="text-link">
            All categories <FiArrowRight />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to={`/events?category=${encodeURIComponent(category.name)}`}
              className="category-tile"
              key={category.name}
            >
              <span>{category.icon}</span>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-container featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>Featured experiences</h2>
            <p>Explore events worth adding to your calendar.</p>
          </div>

          <Link to="/events" className="text-link">
            View all events <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : events.length > 0 ? (
          <div className="event-grid">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No featured events yet</h3>
            <p>Check back soon for upcoming experiences.</p>
          </div>
        )}
      </section>

      <section className="home-cta">
        <div>
          <span className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
          <h2>Make room for something memorable.</h2>
          <p>Find your next event and reserve your place.</p>
        </div>

        <Link to="/events" className="btn btn-light">
          Discover events <FiArrowRight />
        </Link>
      </section>
    </div>
  );
};

export default Home;