
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    CalendarDays,
    LayoutDashboard,
    UserRound,
    LogOut
} from "lucide-react";
import "./DashboardNavbar.css";

function DashboardNavbar() {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    let user = null;

    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Invalid user data:", error);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <header className="dashboard-navbar">
            <Link to="/" className="dashboard-brand">
                <CalendarDays size={27} />
                <span>GatherGrid</span>
            </Link>

            <nav className="dashboard-nav-links">
                <Link to="/customer/dashboard">
                    <LayoutDashboard size={18} />
                    Dashboard
                </Link>

                <Link to="/customer/profile">
                    <UserRound size={18} />
                    Profile
                </Link>
            </nav>

            <div className="dashboard-user-section">
                <div className="dashboard-user-info">
                    <span className="dashboard-user-name">
                        {user?.name || "User"}
                    </span>
                    <span className="dashboard-user-role">
                        {user?.role || "Customer"}
                    </span>
                </div>

                <button
                    type="button"
                    className="dashboard-logout-btn"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </header>
    );
}

export default DashboardNavbar;
