
import api from "./api";

const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

const getAdminEvents = async (params = {}) => {
  const response = await api.get("/admin/events", { params });
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await api.post("/admin/events", eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const updateEvent = async (id, eventData) => {
  const response = await api.put(`/admin/events/${id}`, eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const deleteEvent = async (id) => {
  const response = await api.delete(`/admin/events/${id}`);
  return response.data;
};

const getAdminUsers = async (params = {}) => {
  const response = await api.get("/admin/users", { params });
  return response.data;
};

const updateUserStatus = async (id, isActive) => {
  const response = await api.patch(`/admin/users/${id}/status`, {
    isActive,
  });
  return response.data;
};

const getAdminBookings = async (params = {}) => {
  const response = await api.get("/admin/bookings", { params });
  return response.data;
};

const updateBookingStatus = async (id, status) => {
  const response = await api.patch(`/admin/bookings/${id}/status`, {
    status,
  });
  return response.data;
};
const getAdminEventById = async (id) => {
  const response = await api.get(`/admin/events/${id}`);
  return response.data;
};
const adminService = {
  getDashboardStats,
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAdminUsers,
  updateUserStatus,
  getAdminBookings,
  updateBookingStatus,
  getAdminEventById,
};

export default adminService;
