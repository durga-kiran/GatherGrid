
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardSidebar from "../components/DashboardSidebar";
import "./DashboardLayout.css";

function DashboardLayout() {
    const storedUser = localStorage.getItem("user");

    let user = null;

    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Invalid user data:", error);
    }

    const role = user?.role === "organizer"
        ? "organizer"
        : "customer";

    return (
        <div className="dashboard-layout">
            <DashboardNavbar />

            <div className="dashboard-body">
                <DashboardSidebar role={role} />

                <main className="dashboard-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
