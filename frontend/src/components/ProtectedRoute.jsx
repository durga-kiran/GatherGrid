
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
    const location = useLocation();

    // Check whether the user is logged in
    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    // Allow logged-in users to access protected pages
    return <Outlet />;
}

export default ProtectedRoute;
