import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiMail
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>Venuza</h2>
          <p>
            Discover extraordinary experiences.
            Find events, connect with people, and make
            every moment memorable.
          </p>

          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="mailto:support@example.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <Link to="/events">All Events</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div>
          <h3>Account</h3>
          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </div>

        <div>
          <h3>Support</h3>
          <Link to="/contact">Contact Us</Link>
          <a href="mailto:support@example.com">Email Support</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Venuza. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;