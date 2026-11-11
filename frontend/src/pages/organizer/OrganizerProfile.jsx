
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./OrganizerProfile.css";

function OrganizerProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        organizationName: "Your Organization",
        contactPerson: "Organizer Name",
        email: "organizer@example.com",
        phone: "",
        location: "",
        description: ""
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

        // Backend API integration will be added later.
        console.log("Updated Organizer Profile:", profile);

        setIsEditing(false);
        alert("Organizer profile updated successfully!");
    };

    return (
        <div className="organizer-profile-page">

            <header className="organizer-profile-header">
                <h2>GatherGrid</h2>

                <nav>
                    <Link to="/organizer/dashboard">Dashboard</Link>
                    <Link to="/organizer/events">My Events</Link>
                    <Link to="/organizer/add-event">Add Event</Link>
                    <Link to="/organizer/bookings">Bookings</Link>
                </nav>
            </header>

            <main className="organizer-profile-content">

                <div className="organizer-profile-title">
                    <h1>Organizer Profile</h1>
                    <p>Manage your organization and contact information.</p>
                </div>

                <div className="organizer-profile-card">

                    <div className="organizer-profile-avatar">
                        {profile.organizationName.charAt(0).toUpperCase()}
                    </div>

                    {isEditing ? (

                        <form
                            className="organizer-profile-form"
                            onSubmit={handleSubmit}
                        >

                            <label>Organization Name</label>
                            <input
                                type="text"
                                name="organizationName"
                                value={profile.organizationName}
                                onChange={handleChange}
                                required
                            />

                            <label>Contact Person</label>
                            <input
                                type="text"
                                name="contactPerson"
                                value={profile.contactPerson}
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

                            <label>Organization Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={profile.description}
                                onChange={handleChange}
                            />

                            <div className="organizer-profile-actions">
                                <button type="submit" className="save-profile-btn">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="cancel-profile-btn"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>

                    ) : (

                        <div className="organizer-profile-details">

                            <h2>{profile.organizationName}</h2>

                            <p>
                                <strong>Contact Person:</strong>{" "}
                                {profile.contactPerson}
                            </p>

                            <p>
                                <strong>Email:</strong> {profile.email}
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {profile.phone || "Not provided"}
                            </p>

                            <p>
                                <strong>Location:</strong>{" "}
                                {profile.location || "Not provided"}
                            </p>

                            <p>
                                <strong>Description:</strong>{" "}
                                {profile.description || "Not provided"}
                            </p>

                            <button
                                className="edit-organizer-profile-btn"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit Profile
                            </button>

                        </div>

                    )}

                </div>

                <Link
                    to="/organizer/dashboard"
                    className="organizer-profile-back"
                >
                    Back to Dashboard
                </Link>

            </main>

        </div>
    );
}

export default OrganizerProfile;
