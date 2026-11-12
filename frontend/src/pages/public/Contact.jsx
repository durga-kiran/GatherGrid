
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      await api.post("/contact", formData);

      toast.success("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      <section className="page-banner">
        <div className="container">
          <span className="section-eyebrow">GET IN TOUCH</span>
          <h1>We Would Love to Hear From You</h1>
          <p>
            Have a question, suggestion or partnership enquiry?
            Our team is ready to help.
          </p>
        </div>
      </section>

      <section className="contact-section container">

        <div className="contact-information">
          <span className="section-eyebrow">CONTACT US</span>

          <h2>Let's Start a Conversation</h2>

          <p>
            Reach out to us for questions about events,
            bookings or using the Venuza platform.
          </p>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Mail size={22} />
            </div>

            <div>
              <h3>Email</h3>
              <p>support@venuza.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <Phone size={22} />
            </div>

            <div>
              <h3>Phone</h3>
              <p>Contact support through email</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">
              <MapPin size={22} />
            </div>

            <div>
              <h3>Location</h3>
              <p>India</p>
            </div>
          </div>
        </div>

        <div className="contact-form-card">
          <h2>Send Us a Message</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="contact-name">Full Name</label>

              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>

              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>

              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Enter message subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>

              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <Send size={17} />}
            </button>

          </form>
        </div>

      </section>
    </div>
  );
};

export default Contact;
