import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Heart,
  User,
  Home,
} from "lucide-react";

const DashboardSidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={19} />,
    },
    {
      name: "My Bookings",
      path: "/my-bookings",
      icon: <Ticket size={19} />,
    },
    {
      name: "Explore Events",
      path: "/events",
      icon: <CalendarDays size={19} />,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: <Heart size={19} />,
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: <User size={19} />,
    },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand">
        <h2>Venuza</h2>
        <span>Customer Portal</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/dashboard"}
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
          <span>Back to Website</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;