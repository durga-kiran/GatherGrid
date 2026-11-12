import { Link } from "react-router-dom";
import { FiMapPin, FiCalendar, FiArrowUpRight } from "react-icons/fi";

const EventCard = ({ event }) => {
  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "Date to be announced";

  const imageUrl = event.image
    ? event.image.startsWith("http")
      ? event.image
      : `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
    : "https://images.unsplash.com/photo-1501386761578-eac5c94b800a";

  const lowestPrice = event.ticketTypes?.length
    ? Math.min(...event.ticketTypes.map((ticket) => ticket.price))
    : null;

  return (
    <article className="event-card">
      <Link to={`/events/${event._id}`} className="event-image-link">
        <img
          src={imageUrl}
          alt={event.title}
          className="event-image"
        />
        <span className="event-category">{event.category}</span>
      </Link>

      <div className="event-card-body">
        <p className="event-date">
          <FiCalendar /> {eventDate}
        </p>

        <h3>{event.title}</h3>

        <p className="event-location">
          <FiMapPin /> {event.location || event.venue}
        </p>

        <div className="event-card-bottom">
          <div>
            <small>Starting from</small>
            <strong>
              {lowestPrice !== null
                ? `₹${lowestPrice.toLocaleString("en-IN")}`
                : "Price unavailable"}
            </strong>
          </div>

          <Link
            to={`/events/${event._id}`}
            className="event-arrow"
            aria-label={`View ${event.title}`}
          >
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default EventCard;