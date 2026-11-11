
import React, { useState } from "react";
import "./Contact.css";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setSuccess("Your message has been submitted successfully!");

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    return (
        <div className="contact-page">

            {/* Contact Header */}
            <section className="contact-header">
                <h1>Contact Us</h1>
                <p>
                    Have questions or need assistance?
                    We are here to help you.
                </p>
            </section>

            {/* Contact Content */}
            <section className="contact-container">

                {/* Contact Information */}
                <div className="contact-info">

                    <h2>Get In Touch</h2>

                    <p>
                        We would love to hear from you.
                        Contact us for event bookings,
                        partnerships, or general enquiries.
                    </p>

                    <div className="contact-item">
                        <span>📍</span>
                        <div>
                            <h3>Our Platform</h3>
                            <p>GatherGrid - Event Discovery & Booking</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span>📧</span>
                        <div>
                            <h3>Email Support</h3>
                            <p>Contact us through the form.</p>
                        </div>
                    </div>

                    <div className="contact-item">
                        <span>🤝</span>
                        <div>
                            <h3>Partnerships</h3>
                            <p>Connect with us for event collaborations.</p>
                        </div>
                    </div>

                </div>

                {/* Contact Form */}
                <div className="contact-form">

                    <h2>Send Us a Message</h2>

                    <form onSubmit={handleSubmit}>

                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Subject</label>
                        <input
                            type="text"
                            name="subject"
                            placeholder="Enter subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <label>Message</label>
                        <textarea
                            name="message"
                            placeholder="Write your message..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit">
                            Send Message
                        </button>

                        {success && (
                            <p className="success-message">
                                {success}
                            </p>
                        )}

                    </form>

                </div>

            </section>

        </div>
    );
}

export default Contact;
