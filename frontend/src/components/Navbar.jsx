
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  CalendarDays,
  Menu,
  X,
  Ticket,
  UserRound
} from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon">
            <CalendarDays size={25} />
          </div>

          <span>
            Gather<span className="logo-highlight">Grid</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
              onClick={closeMenu}
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Authentication Buttons */}
          <div className="mobile-auth">
            <Link to="/login" className="mobile-login" onClick={closeMenu}>
              Login
            </Link>

            <Link
              to="/register"
              className="mobile-register"
              onClick={closeMenu}
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Desktop Authentication */}
        <div className="navbar-actions">
          <Link to="/login" className="login-link">
            <UserRound size={17} />
            Login
          </Link>

          <Link to="/register" className="register-btn">
            <Ticket size={17} />
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;
