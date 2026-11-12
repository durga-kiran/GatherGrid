import { useNavigate } from "react-router-dom";
import { Bell, LogOut, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="dashboard-navbar">
      <div className="dashboard-navbar-left">
        <div>
          <h3>Welcome back!</h3>
          <p>Manage your events and bookings here.</p>
        </div>
      </div>

      <div className="dashboard-navbar-right">
        <button
          type="button"
          className="dashboard-icon-button"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="dashboard-user">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="dashboard-avatar"
            />
          ) : (
            <UserCircle size={34} />
          )}

          <div className="dashboard-user-info">
            <strong>{user?.name || "User"}</strong>
            <span>{user?.role || "Customer"}</span>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardNavbar;