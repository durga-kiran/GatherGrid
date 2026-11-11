
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerProfile.css";

function CustomerProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        fullName: "Customer Name",
        email: "customer@example.com",
        phone: "",
        location: ""
    });

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Profile will be saved to the backend later.
        console.log("Updated Profile:", profile);

        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-page">

            <header className="profile-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/customer/dashboard">Dashboard</Link>
                    <Link to="/events">Explore Events</Link>
                    <Link to="/customer/bookings">My Bookings</Link>
                </nav>
            </header>

            <main className="profile-content">

                <div className="profile-title">
                    <h1>My Profile</h1>
                    <p>View and manage your personal information.</p>
                </div>

                <div className="profile-card">

                    <div className="profile-avatar">
                        {profile.fullName.charAt(0).toUpperCase()}
                    </div>

                    {isEditing ? (

                        <form onSubmit={handleSubmit} className="profile-form">

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

                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={profile.location}
                                onChange={handleChange}
                            />

                            <div className="profile-actions">
                                <button type="submit" className="save-btn">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>

                    ) : (

                        <div className="profile-details">

                            <h2>{profile.fullName}</h2>

                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>

                            <p>
                                <strong>Phone:</strong> {profile.phone || "Not provided"}
                            </p>

                            <p>
                                <strong>Location:</strong> {profile.location || "Not provided"}
                            </p>

                            <button
                                className="edit-profile-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>

                        </div>

                    )}

                </div>

                <Link to="/customer/dashboard" className="profile-back">
                    Back to Dashboard
                </Link>

            </main>

        </div>
    );
}

export default CustomerProfile;
