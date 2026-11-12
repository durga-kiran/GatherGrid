
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import api from "../../services/api";

import EventGrid from "../../components/events/EventGrid";
import SearchBar from "../../components/events/SearchBar";
import FilterSidebar from "../../components/events/FilterSidebar";
import Pagination from "../../components/events/Pagination";

const EVENTS_PER_PAGE = 9;

const Events = () => {
  const [searchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    location: "",
    date: "",
    sortBy: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilters((previous) => ({
      ...previous,
      category: searchParams.get("category") || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/events");

        const result = response.data;

        const eventList = Array.isArray(result)
          ? result
          : result.events || result.data?.events || result.data || [];

        setEvents(Array.isArray(eventList) ? eventList : []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load events. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        events
          .map((event) => event.category)
          .filter(Boolean)
      ),
    ];
  }, [events]);

  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((event) =>
        [
          event.title,
          event.name,
          event.category,
          event.location,
          event.description,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(keyword)
          )
      );
    }

    if (filters.category) {
      result = result.filter(
        (event) => event.category === filters.category
      );
    }

    if (filters.location) {
      result = result.filter((event) =>
        event.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.date) {
      result = result.filter((event) => {
        const eventDate = event.date
          ? new Date(event.date).toISOString().slice(0, 10)
          : "";

        return eventDate === filters.date;
      });
    }

    if (filters.sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    if (filters.sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    if (filters.sortBy === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price || a.ticketPrice || 0) -
          Number(b.price || b.ticketPrice || 0)
      );
    }

    if (filters.sortBy === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price || b.ticketPrice || 0) -
          Number(a.price || a.ticketPrice || 0)
      );
    }

    return result;
  }, [events, search, filters]);

  const totalPages = Math.ceil(
    filteredEvents.length / EVENTS_PER_PAGE
  );

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setFilters({
      category: "",
      location: "",
      date: "",
      sortBy: "newest",
    });
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="events-page">
      <section className="page-banner">
        <div className="container">
          <span className="section-eyebrow">DISCOVER EXPERIENCES</span>
          <h1>Explore Amazing Events</h1>
          <p>
            Find unforgettable experiences, discover new interests,
            and create memories that last forever.
          </p>
        </div>
      </section>

      <section className="events-section container">
        <div className="events-heading">
          <div>
            <span className="section-eyebrow">OUR COLLECTION</span>
            <h2>Find Your Next Experience</h2>
            <p>
              Discover events that match your interests.
            </p>
          </div>

          <span className="events-count">
            {filteredEvents.length} Events Found
          </span>
        </div>

        <SearchBar
          value={search}
          onChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onSubmit={handleSearch}
          placeholder="Search by event name, category or location..."
        />

        <div className="events-layout">
          <FilterSidebar
            categories={categories}
            filters={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
          />

          <div className="events-results">
            <div className="events-results-heading">
              <h3>
                <SlidersHorizontal size={18} />
                Available Events
              </h3>
            </div>

            <EventGrid
              events={paginatedEvents}
              loading={loading}
              error={error}
              onRetry={() => window.location.reload()}
              emptyMessage="Try changing your search or filters."
            />

            {!loading && !error && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
