import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import HeroImage2 from '../assets/img/Index page Image2.png';

const HomeAbout = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    console.log("HomeAbout component mounted.");
  }, []);

  return (
    <section id="new-section" className="container py-5">
      <div className="row align-items-center">
        {/* Left Side - Text */}
        <div className="col-lg-6" data-aos="fade-right">
          <h2 className="fw-bold" style={{ animation: "none", caretColor: "transparent" }}>Empowering the Next Generation of Innovators</h2>
          <p className="fst-italic text-muted" style={{ animation: "none", caretColor: "transparent" }}>Providing hands-on learning experiences for future tech leaders.</p>
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> 
              <span className="ms-2" style={{ animation: "none", caretColor: "transparent" }}>Interactive learning experiences focused on technology and innovation.</span>
            </li>
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> 
              <span className="ms-2" style={{ animation: "none", caretColor: "transparent" }}>Hands-on projects that enhance problem-solving and critical thinking skills.</span>
            </li>
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> 
              <span className="ms-2" style={{ animation: "none", caretColor: "transparent" }}>Guided mentorship programs to help students excel in STEM fields.</span>
            </li>
          </ul>
          <a href="/about" className="btn btn-success mt-3" style={{ animation: "none", caretColor: "transparent" }}>
            Read More <i className="bi text-success"></i>
          </a>
        </div>

        {/* Right Side - Image */}
        <div className="col-lg-6 text-center" data-aos="fade-left">
          <img src={HeroImage2} className="img-fluid rounded shadow" alt="Students Learning" />
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
