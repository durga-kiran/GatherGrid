<<<<<<< HEAD
  
import { useEffect, useState } from "react";
import { UserRound, Mail, Phone, Save, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

import userService from "../../services/userServices.js";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";

function AdminProfile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();

        const profile =
          response.user ||
          response.data?.user ||
          response.data ||
          response;

        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
        });
      } catch (error) {
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        });

        toast.error(
          error.response?.data?.message || "Unable to load admin profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await userService.updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
      });

      toast.success("Admin profile updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to update admin profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-page">

      <div className="admin-page-heading">
        <div>
          <span className="section-eyebrow">ACCOUNT SETTINGS</span>
          <h1>Admin Profile</h1>
          <p>Manage your administrator account information.</p>
        </div>
      </div>

      <div className="admin-profile-layout">

        <div className="admin-profile-summary">
          <div className="admin-profile-avatar">
            {formData.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <h2>{formData.name || "Administrator"}</h2>
          <p>{formData.email}</p>

          <span className="admin-role-label">
            <ShieldCheck size={14} /> Administrator
          </span>
        </div>

        <div className="admin-form-panel">
          <h2>Personal Information</h2>
          <p>Update your administrator account details.</p>

          <form onSubmit={handleSubmit} className="admin-profile-form">

            <div className="admin-form-group">
              <label htmlFor="admin-name">Full name</label>
              <div className="admin-input-with-icon">
                <UserRound size={18} />
                <input
                  id="admin-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-email">Email address</label>
              <div className="admin-input-with-icon">
                <Mail size={18} />
                <input
                  id="admin-email"
                  type="email"
                  value={formData.email}
                  readOnly
                />
              </div>
              <small>Email address is read-only.</small>
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-phone">Phone number</label>
              <div className="admin-input-with-icon">
                <Phone size={18} />
                <input
                  id="admin-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="admin-primary-btn"
              disabled={saving}
            >
              <Save size={17} />
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
=======

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
>>>>>>> dd602eb0851def5026d21d11e319dabab70c0ae4
}

export default AdminProfile;
