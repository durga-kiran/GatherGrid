
import React from "react";
import { Link } from "react-router-dom";

import {
    CalendarDays,
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Users,
    MessageCircle,
    Globe
} from "lucide-react";

import "./Footer.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    const handleNewsletter = (e) => {
        e.preventDefault();

        alert("Newsletter subscription will be connected to the backend soon!");

        e.target.reset();
    };

    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-main">

                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <div className="footer-logo-icon">
                                <CalendarDays size={25} />
                            </div>

                            <span>
                                Gather<span>Grid</span>
                            </span>
                        </Link>

                        <p>
                            Discover amazing events, connect with people,
                            and create unforgettable memories.
                            Everything happening around you, all in one place.
                        </p>

                        {/* Social Links */}
                        <div className="footer-socials">
                            <a href="https://www.instagram.com/"
                                target="_blank" rel="noreferrer"
                                aria-label="Instagram">
                                <Globe size={19} />
                            </a>

                            <a href="https://www.facebook.com/"
                                target="_blank" rel="noreferrer"
                                aria-label="Facebook">
                                <Users size={19} />
                            </a>

                            <a href="https://www.linkedin.com/"
                                target="_blank" rel="noreferrer"
                                aria-label="LinkedIn">
                                <MessageCircle size={19} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/events">Explore Events</Link></li>
                            <li><Link to="/categories">Categories</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="footer-column">
                        <h3>Popular Categories</h3>
                        <ul>
                            <li><Link to="/events?category=Music">Music Concerts</Link></li>
                            <li><Link to="/events?category=Technology">Technology</Link></li>
                            <li><Link to="/events?category=Business">Business</Link></li>
                            <li><Link to="/events?category=Sports">Sports</Link></li>
                            <li><Link to="/events?category=Education">Education</Link></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-column footer-contact">
                        <h3>Get In Touch</h3>

                        <div className="contact-item">
                            <MapPin size={18} />
                            <span>Hyderabad, Telangana, India</span>
                        </div>

                        <div className="contact-item">
                            <Mail size={18} />
                            <span>support@gathergrid.com</span>
                        </div>

                        <div className="contact-item">
                            <Phone size={18} />
                            <span>+91 98765 43210</span>
                        </div>
                    </div>

                </div>

                {/* Newsletter */}
                <div className="footer-newsletter">
                    <div className="newsletter-text">
                        <h3>Never Miss an Event!</h3>
                        <p>
                            Subscribe to receive updates about upcoming events
                            and exclusive offers.
                        </p>
                    </div>

                    <form
                        className="newsletter-form"
                        onSubmit={handleNewsletter}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            required
                            aria-label="Email address"
                        />

                        <button type="submit">
                            Subscribe
                            <ArrowRight size={17} />
                        </button>
                    </form>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>
                        © {currentYear} GatherGrid. All rights reserved.
                    </p>

                    <div className="footer-legal">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
