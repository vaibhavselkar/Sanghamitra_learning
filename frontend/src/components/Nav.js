import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import sbiImage from "../assets/img/sbi.logo.png";

const Navbar = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    if (confirmLogout) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/logout`, {
          method: 'GET',
          credentials: 'include',
        });
        await checkAuth();
        navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={sbiImage} alt="Logo" height="40" />
          <span className="fw-bold" style={{ fontSize: "30px", color: "#5fcf80" }}>SANGHAMITRA LEARNING</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/"><b>Home</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about"><b>About</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact"><b>Contact</b></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard"><b>Dashboard</b></Link>
            </li>
            <li className="nav-item">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-danger ms-2"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="btn btn-success ms-2">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
