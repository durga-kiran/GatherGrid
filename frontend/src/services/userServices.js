
import api from "./api";

const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

const updateProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);
  return response.data;
};

const changePassword = async (passwordData) => {
  const response = await api.put("/users/change-password", passwordData);
  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
  changePassword,
};

export default userService;
