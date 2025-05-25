import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`navbar ${scrolled ? "scrolled" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="navbar-container">
          <Link
            to="/"
            className="navbar-logo"
            onClick={() => setMobileOpen(false)}
          >
            <RiRobot2Line className="logo-icon" />
            <span className="logo-text">
              Career<span className="logo-highlight">AI</span>
            </span>
          </Link>

          <div className="navbar-links">
            <NavLink
              to="/"
              currentPath={location.pathname}
              scrolled={scrolled}
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              currentPath={location.pathname}
              scrolled={scrolled}
              onClick={() => setMobileOpen(false)}
            >
              Features
            </NavLink>

            <Link
              to="/chat"
              className={`cta-button ${scrolled ? "scrolled" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              Start Chat
              <span className="button-pulse"></span>
            </Link>
          </div>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <NavLink
            to="/"
            currentPath={location.pathname}
            scrolled={true}
            onClick={() => setMobileOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/features"
            currentPath={location.pathname}
            scrolled={true}
            onClick={() => setMobileOpen(false)}
          >
            Features
          </NavLink>
          <NavLink
            to="/about"
            currentPath={location.pathname}
            scrolled={true}
            onClick={() => setMobileOpen(false)}
          >
            About
          </NavLink>
          <Link
            to="/chat"
            className="mobile-cta-button"
            onClick={() => setMobileOpen(false)}
          >
            Start Chat
          </Link>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ to, currentPath, scrolled, onClick, children }) => {
  const isActive = currentPath === to;

  return (
    <Link
      to={to}
      className={`nav-link ${isActive ? "active" : ""} ${
        scrolled ? "scrolled" : ""
      }`}
      onClick={onClick}
    >
      {children}
      <span className="link-underline"></span>
    </Link>
  );
};

export default Navbar;
