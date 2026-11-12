import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiCalendar, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          <FiCalendar />
          <span>Venuza</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Explore Events</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="nav-user">
                <FiUser /> {user?.name}
              </span>

              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="btn btn-outline"
              >
                Dashboard
              </Link>

              <button onClick={handleLogout} className="btn btn-dark">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;