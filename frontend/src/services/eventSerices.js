import api from "./api";

const getEvents = async (params = {}) => {
  const response = await api.get("/events", { params });
  return response.data;
};

const getFeaturedEvents = async () => {
  const response = await api.get("/events/featured");
  return response.data;
};

const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

const getEventsByCategory = async (category) => {
  const response = await api.get(
    `/events/category/${encodeURIComponent(category)}`
  );

  return response.data;
};

const eventService = {
  getEvents,
  getFeaturedEvents,
  getEventById,
  getEventsByCategory
};

export default eventService;