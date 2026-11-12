
import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "../src/components/layout/DashboardLayout.jsx";
import AdminLayout from "../src/components/layout/AdminLayout.jsx";

// Route protection
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AdminRoute from "./components/routes/AdminRoute";

// Public pages
import Home from "./pages/public/Home";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import Categories from "./pages/public/Categories";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Login from "../src/pages/public/Login.jsx";
import Register from "../src/pages/public/Register.jsx";
import VerifyEmail from "./pages/public/VerifyEmail.jsx";

// Customer pages
import Dashboard from "./pages/customer/Dashboard";
import MyBookings from "../src/pages/customer/MyBooking.jsx";
import BookingDetails from "./pages/customer/BookingDetails";
import Profile from "./pages/customer/Profile";
import Wishlist from "./pages/customer/Wishlist";

// Booking pages
import Checkout from "./pages/booking/Checkout";
import Payment from "./pages/booking/Payment";
import BookingConfirmation from "./pages/booking/BookingConfirmation";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import AddEvent from "./pages/admin/AddEvent";
import ManageUsers from "../src/pages/admin/ManageUser.jsx";
import ManageBookings from "../src/pages/admin/ManageBooking.jsx";
import AdminProfile from "./pages/admin/AdminProfile";


function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>


      {/* CUSTOMER ROUTES */}
      <Route element={<ProtectedRoute />}>
        
        {/* Customer Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/my-bookings/:id" element={<BookingDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        {/* Booking Process */}
        <Route path="/checkout/:eventId" element={<Checkout />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmation />}
        />

      </Route>


      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminRoute />}>
          
          {/* Admin Dashboard Layout */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<ManageEvents />} />
            <Route path="/admin/events/add" element={<AddEvent />} />
            <Route path="/admin/events/edit/:id" element={<AddEvent />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/bookings" element={<ManageBookings />} />
            <Route path="/admin/profile" element={<AdminProfile />} />
          </Route>

        </Route>
      </Route>

    </Routes>
  );
}

export default App;
