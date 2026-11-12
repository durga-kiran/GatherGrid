
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If the user is not logged in, redirect to Login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Read the logged-in user's information
    let user = null;

    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Invalid user data:", error);
    }

    // Allow only administrators
    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
