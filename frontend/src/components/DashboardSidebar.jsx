
import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    CalendarDays,
    Ticket,
    UserRound,
    PlusCircle,
    ClipboardList,
    Users,
    Settings
} from "lucide-react";
import "./DashboardSidebar.css";

function DashboardSidebar({ role = "customer" }) {
    const customerLinks = [
        {
            name: "Dashboard",
            path: "/customer/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "My Bookings",
            path: "/customer/bookings",
            icon: Ticket
        },
        {
            name: "My Profile",
            path: "/customer/profile",
            icon: UserRound
        }
    ];

    const organizerLinks = [
        {
            name: "Dashboard",
            path: "/organizer/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "My Events",
            path: "/organizer/events",
            icon: CalendarDays
        },
        {
            name: "Add Event",
            path: "/organizer/add-event",
            icon: PlusCircle
        },
        {
            name: "Bookings",
            path: "/organizer/bookings",
            icon: ClipboardList
        },
        {
            name: "My Profile",
            path: "/organizer/profile",
            icon: UserRound
        }
    ];

    const links = role === "organizer"
        ? organizerLinks
        : customerLinks;

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-heading">
                <h3>
                    {role === "organizer"
                        ? "Organizer Panel"
                        : "Customer Panel"}
                </h3>
                <p>Manage your GatherGrid account</p>
            </div>

            <nav className="sidebar-menu">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Icon size={19} />
                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="sidebar-bottom">
                <div className="sidebar-help">
                    <Settings size={18} />
                    <span>Account Management</span>
                </div>
            </div>
        </aside>
    );
}

export default DashboardSidebar;
