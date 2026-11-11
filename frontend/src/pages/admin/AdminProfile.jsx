
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminProfile.css";

function AdminProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        fullName: "Admin",
        email: "admin@gathergrid.com",
        phone: "",
        role: "Super Administrator"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Backend integration will be added later.
        console.log("Updated Admin Profile:", profile);

        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="admin-profile-page">

            <aside className="admin-profile-sidebar">
                <h2>GatherGrid</h2>
                <p>ADMIN PANEL</p>

                <nav>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users">Manage Users</Link>
                    <Link to="/admin/events">Manage Events</Link>
                    <Link to="/admin/bookings">Manage Bookings</Link>
                    <Link to="/admin/profile" className="active">
                        My Profile
                    </Link>
                    <Link to="/">Visit Website</Link>
                </nav>
            </aside>

            <main className="admin-profile-main">

                <div className="admin-profile-heading">
                    <h1>My Profile</h1>
                    <p>View and manage your administrator account.</p>
                </div>

                <div className="admin-profile-card">

                    <div className="admin-profile-avatar">
                        {profile.fullName.charAt(0).toUpperCase()}
                    </div>

                    {isEditing ? (

                        <form onSubmit={handleSubmit}>

                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={profile.fullName}
                                onChange={handleChange}
                                required
                            />

                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                required
                            />

                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                            />

                            <label>Role</label>
                            <input
                                type="text"
                                value={profile.role}
                                disabled
                            />

                            <div className="admin-profile-actions">
                                <button type="submit">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="admin-cancel-btn"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>

                    ) : (

                        <div className="admin-profile-details">

                            <h2>{profile.fullName}</h2>

                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {profile.phone || "Not provided"}
                            </p>

                            <p>
                                <strong>Role:</strong> {profile.role}
                            </p>

                            <button
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>

                        </div>

                    )}

                </div>

                <Link
                    to="/admin/dashboard"
                    className="admin-profile-back"
                >
                    Back to Dashboard
                </Link>

            </main>

        </div>
    );
}

export default AdminProfile;
