
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { toast } from "react-toastify";

import adminService from "../../services/adminServices.js";
import Loading from "../../components/common/Loading";

const initialForm = {
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  price: "",
  availableTickets: "",
};

function AddEvent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) return;

    const fetchEvent = async () => {
      try {
        const response = await adminService.getAdminEventById(id);

        const event =
          response.event ||
          response.data?.event ||
          response.data ||
          response;

        setFormData({
          title: event.title || event.name || "",
          description: event.description || "",
          category: event.category || "",
          date: event.date
            ? new Date(event.date).toISOString().slice(0, 10)
            : "",
          time: event.time || "",
          location: event.location || "",
          price: event.price ?? event.ticketPrice ?? "",
          availableTickets:
            event.availableTickets ?? event.totalTickets ?? "",
        });

        if (event.image) {
          setImagePreview(
            event.image.startsWith("http")
              ? event.image
              : `${import.meta.env.VITE_API_URL.replace("/api", "")}/${event.image.replace(/^\/+/, "")}`
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load event."
        );
        navigate("/admin/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, isEditing, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(formData.price) < 0) {
      toast.error("Price cannot be negative.");
      return;
    }

    if (Number(formData.availableTickets) < 0) {
      toast.error("Available tickets cannot be negative.");
      return;
    }

    try {
      setSaving(true);

      const eventData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        eventData.append(key, value);
      });

      if (image) {
        eventData.append("image", image);
      }

      if (isEditing) {
        await adminService.updateEvent(id, eventData);
        toast.success("Event updated successfully.");
      } else {
        await adminService.createEvent(eventData);
        toast.success("Event created successfully.");
      }

      navigate("/admin/events");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        `Unable to ${isEditing ? "update" : "create"} event.`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="admin-page">

      <Link to="/admin/events" className="admin-back-link">
        <ArrowLeft size={17} /> Back to Events
      </Link>

      <div className="admin-page-heading">
        <div>
          <span className="section-eyebrow">EVENT MANAGEMENT</span>
          <h1>{isEditing ? "Edit Event" : "Create New Event"}</h1>
          <p>
            {isEditing
              ? "Update your event information."
              : "Add a new experience to the Venuza platform."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form-panel">

        <div className="admin-form-grid">

          <div className="admin-form-group full">
            <label htmlFor="title">Event title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="admin-form-group full">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              rows="5"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Music">Music</option>
              <option value="Business">Business</option>
              <option value="Sports">Sports</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Food">Food</option>
              <option value="Education">Education</option>
              <option value="Photography">Photography</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event location"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="date">Event date *</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="time">Event time *</label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="price">Ticket price (₹) *</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter ticket price"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="availableTickets">Available tickets *</label>
            <input
              id="availableTickets"
              name="availableTickets"
              type="number"
              min="0"
              value={formData.availableTickets}
              onChange={handleChange}
              placeholder="Enter ticket quantity"
              required
            />
          </div>

          <div className="admin-form-group full">
            <label htmlFor="event-image">Event image</label>

            <label htmlFor="event-image" className="admin-upload-box">
              <Upload size={25} />
              <span>
                {image ? image.name : "Click to upload an event image"}
              </span>
              <small>Choose an image file</small>
            </label>

            <input
              id="event-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Event preview"
                className="admin-image-preview"
              />
            )}
          </div>

        </div>

        <div className="admin-form-actions">
          <Link to="/admin/events" className="admin-cancel-btn">
            Cancel
          </Link>

          <button
            type="submit"
            className="admin-primary-btn"
            disabled={saving}
          >
            <Save size={17} />
            {saving
              ? "Saving..."
              : isEditing
                ? "Update Event"
                : "Create Event"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddEvent;
