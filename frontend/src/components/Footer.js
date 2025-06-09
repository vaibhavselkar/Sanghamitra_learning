import React from "react";
import { Link } from "react-router-dom"; // Use Link for navigation if needed
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer position-relative">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* Left Section - About */}
          <div className="col-lg-4 col-md-6 footer-about">
            <Link to="/" className="logo d-flex align-items-center" style={{ textDecoration: "none" }}>
              <span className="">Sanghamitra Learning</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>GacchiBowli</p>
              <p>Hyderabad, TS 500032</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+91 7020102729</span></p>
              <p><strong>Email:</strong> <span>sanghamitra.learnworlds@gmail.com</span></p>
            </div>
            {/* Social Links */}
            <div className="social-links d-flex mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Middle Section - Newsletter (Can be expanded) */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            {/* Optional: Add newsletter form if needed */}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container copyright text-center mt-4">
        <p>© <span>Copyright</span> <strong className="px-1">Sanghamitra Learning</strong> <span>All Rights Reserved</span></p>
        <div className="credits">
          Designed by <Link to="/">Sanghamitra</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
