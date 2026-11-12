import EventCard from "./EventCard";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

const EventGrid = ({
  events = [],
  loading = false,
  error = "",
  onRetry,
  emptyMessage = "No events found.",
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!events.length) {
    return (
      <div className="empty-state">
        <h3>No Events Available</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;