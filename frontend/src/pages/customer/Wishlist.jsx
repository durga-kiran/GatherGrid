
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, CalendarDays, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import wishlistService from "../../services/wishlistServices.js";
import Loading from "../../components/common/Loading";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const fetchWishlist = async () => {
    try {
      const response = await wishlistService.getWishlist();

      const data =
        response.wishlist ||
        response.data?.wishlist ||
        response.data ||
        [];

      setWishlist(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load wishlist."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (eventId) => {
    try {
      setRemovingId(eventId);

      await wishlistService.removeFromWishlist(eventId);

      setWishlist((previous) =>
        previous.filter((item) => {
          const event = item.event || item;
          return event._id !== eventId;
        })
      );

      toast.success("Event removed from wishlist.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to remove event."
      );
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="customer-page">

      <div className="customer-page-heading">
        <div>
          <span className="section-eyebrow">SAVED EXPERIENCES</span>
          <h1>My Wishlist</h1>
          <p>Keep track of the events you don't want to miss.</p>
        </div>

        <span className="wishlist-count">
          {wishlist.length} Saved Events
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="customer-empty-state">
          <Heart size={40} />
          <h3>Your wishlist is empty</h3>
          <p>Save interesting events and find them here later.</p>
          <Link to="/events" className="dashboard-explore-btn">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            const event = item.event || item;
            const eventId = event._id;

            const image = event.image
              ? event.image.startsWith("http")
                ? event.image
                : `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
              : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30";

            return (
              <article className="wishlist-card" key={item._id || eventId}>

                <div className="wishlist-image-wrapper">
                  <img
                    src={image}
                    alt={event.title || "Saved event"}
                  />

                  <button
                    type="button"
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(eventId)}
                    disabled={removingId === eventId}
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="wishlist-card-content">
                  <span className="booking-category">
                    {event.category || "Event"}
                  </span>

                  <h3>{event.title || event.name || "Event"}</h3>

                  <p>
                    <CalendarDays size={15} />
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : "Date unavailable"}
                  </p>

                  <p>
                    <MapPin size={15} />
                    {event.location || "Location unavailable"}
                  </p>

                  <div className="wishlist-card-bottom">
                    <strong>
                      ₹{Number(event.price || event.ticketPrice || 0).toLocaleString("en-IN")}
                    </strong>

                    <Link to={`/events/${eventId}`}>
                      View Event
                    </Link>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default Wishlist;
