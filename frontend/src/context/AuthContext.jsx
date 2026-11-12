
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/authServices.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("event_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await authService.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Unable to load current user:", error.message);
        localStorage.removeItem("event_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (token, userData) => {
    if (!token || !userData) {
      throw new Error("Invalid login credentials received.");
    }

    localStorage.setItem("event_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("event_token");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Named export
export const useAuth = () => useContext(AuthContext);

// Default export
export default AuthProvider;
