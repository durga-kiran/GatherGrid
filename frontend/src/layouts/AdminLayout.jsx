
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminLayout() {
    return (
        <div className="admin-layout">
            <Navbar />

            <main className="admin-main">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default AdminLayout;
