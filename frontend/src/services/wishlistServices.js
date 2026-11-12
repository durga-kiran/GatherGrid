
import api from "./api";

const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

const addToWishlist = async (eventId) => {
  const response = await api.post("/wishlist", { eventId });
  return response.data;
};

const removeFromWishlist = async (eventId) => {
  const response = await api.delete(`/wishlist/${eventId}`);
  return response.data;
};

const wishlistService = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};

export default wishlistService;
