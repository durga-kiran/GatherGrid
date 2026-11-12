
import { useEffect, useState } from "react";
import { UserRound, Mail, Phone, Save } from "lucide-react";
import { toast } from "react-toastify";

import userService from "../../services/userServices.js";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/common/Loading";

function Profile() {
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
        // Use the authenticated user details if profile API is unavailable.
        setFormData({
          name: user?.name || "",
          email: user?.email || "",
          phone: user?.phone || "",
        });

        toast.error(
          error.response?.data?.message || "Unable to load profile details."
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

      const response = await userService.updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
      });

      const updatedUser =
        response.user ||
        response.data?.user ||
        response.data;

      if (updatedUser) {
        setFormData((previous) => ({
          ...previous,
          name: updatedUser.name || previous.name,
          phone: updatedUser.phone || previous.phone,
        }));
      }

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="customer-page">

      <div className="customer-page-heading">
        <div>
          <span className="section-eyebrow">ACCOUNT SETTINGS</span>
          <h1>My Profile</h1>
          <p>Manage your personal information.</p>
        </div>
      </div>

      <div className="profile-layout">

        <div className="profile-summary-card">
          <div className="profile-avatar-large">
            {formData.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h2>{formData.name || "User"}</h2>
          <p>{formData.email}</p>
          <span className="profile-member-label">Venuza Member</span>
        </div>

        <div className="profile-form-card">
          <h2>Personal information</h2>
          <p>Update the information associated with your account.</p>

          <form onSubmit={handleSubmit} className="profile-form">

            <div className="form-group">
              <label htmlFor="profile-name">Full name</label>

              <div className="profile-input-wrapper">
                <UserRound size={18} />
                <input
                  id="profile-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">Email address</label>

              <div className="profile-input-wrapper">
                <Mail size={18} />
                <input
                  id="profile-email"
                  type="email"
                  value={formData.email}
                  readOnly
                />
              </div>

              <small className="profile-help-text">
                Your verified email address cannot be changed here.
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="profile-phone">Phone number</label>

              <div className="profile-input-wrapper">
                <Phone size={18} />
                <input
                  id="profile-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="dashboard-explore-btn profile-save-btn"
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
}

export default Profile;
