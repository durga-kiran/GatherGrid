
import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// Route protection
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Public Pages
import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import Categories from "./pages/public/Categories";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";

// Authentication Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Customer Pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import MyBookings from "./pages/customer/MyBookings";
import CustomerProfile from "./pages/customer/CustomerProfile";

// Organizer Pages
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import MyEvents from "./pages/organizer/MyEvents";
import AddEvent from "./pages/organizer/AddEvent";
import OrganizerBookings from "./pages/organizer/OrganizerBookings";
import OrganizerProfile from "./pages/organizer/OrganizerProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageBookings from "./pages/admin/ManageBookings";
import AdminProfile from "./pages/admin/AdminProfile";

// 404 Page
function NotFound() {
    return (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/">Go to Home</Link>
        </div>
    );
}

function App() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Customer and Organizer Routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>

                    {/* Customer Routes */}
                    <Route path="/customer/dashboard" element={<CustomerDashboard />} />
                    <Route path="/customer/bookings" element={<MyBookings />} />
                    <Route path="/customer/profile" element={<CustomerProfile />} />

                    {/* Organizer Routes */}
                    <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
                    <Route path="/organizer/events" element={<MyEvents />} />
                    <Route path="/organizer/add-event" element={<AddEvent />} />
                    <Route path="/organizer/bookings" element={<OrganizerBookings />} />
                    <Route path="/organizer/profile" element={<OrganizerProfile />} />

                </Route>
            </Route>

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/events" element={<ManageEvents />} />
                    <Route path="/admin/users" element={<ManageUsers />} />
                    <Route path="/admin/bookings" element={<ManageBookings />} />
                    <Route path="/admin/profile" element={<AdminProfile />} />
                </Route>
            </Route>

            {/* Redirect */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
}

export default App;
