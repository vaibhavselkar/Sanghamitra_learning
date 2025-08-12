// src/components/Hero.js
import React from "react";
import HeroImage from '../assets/img/Index Page Images.png';

const Hero = () => {
  return (
    <section id="hero" className="hero section">
      <img src = {HeroImage} alt="Hero" />
      <div className="container">
        <h2 data-aos="fade-up" style={{ animation: "none", caretColor: "transparent" }}>Learning Today, Leading Tomorrow</h2>
        <p data-aos="fade-up" style={{ animation: "none", caretColor: "transparent" }}>Educating Minds, Empowering Futures.</p>
        <div className="d-flex mt-4" >
          <a href="/about" className="btn-get-started" style={{ animation: "none", caretColor: "transparent" }}>Learn More</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
