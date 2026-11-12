  
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
}

export default AdminProfile;
