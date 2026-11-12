import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Ticket,
  User,
  Home,
  LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth.js";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={19} />,
    },
    {
      name: "Manage Events",
      path: "/admin/events",
      icon: <CalendarDays size={19} />,
    },
    {
      name: "Manage Users",
      path: "/admin/users",
      icon: <Users size={19} />,
    },
    {
      name: "Manage Bookings",
      path: "/admin/bookings",
      icon: <Ticket size={19} />,
    },
    {
      name: "Admin Profile",
      path: "/admin/profile",
      icon: <User size={19} />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-layout admin-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <h2>Venuza</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink to="/" className="sidebar-link">
            <Home size={19} />
            <span>View Website</span>
          </NavLink>

          <button
            type="button"
            className="sidebar-link admin-logout-link"
            onClick={handleLogout}
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-navbar">
          <div>
            <h3>Admin Control Panel</h3>
            <p>Manage your Venuza platform.</p>
          </div>

          <div className="dashboard-user">
            <User size={25} />

            <div className="dashboard-user-info">
              <strong>{user?.name || "Administrator"}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;