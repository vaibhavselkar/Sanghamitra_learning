import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/main.css";
import writingGuideImg from "../../../assets/img/writing (8-10).png";
import analyticalWritingImg from "../../../assets/img/analytical writing.png";

const Writing = () => {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 style={{ animation: "none", caretColor: "transparent" }}>
                  Writing
                </h1>
                <p className="mb-0" style={{ animation: "none", caretColor: "transparent" }}>
                  Welcome to our Writing Mastery Corner, where creativity meets craftsmanship. Whether you're just starting out or honing your skills, our curated resources and engaging exercises are tailored to elevate your writing prowess. Join our vibrant community of writers and embark on a fulfilling journey toward expressing yourself with clarity, flair, and impact.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/english">English</Link></li>
              <li className="current">Writing</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Courses List Section */}
      <section id="courses-list" className="section courses-list">
        <div className="container">
          <div className="row">
            {/* Writing Guide */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="course-item">
                <img src={writingGuideImg} className="img-fluid" alt="Comprehensive Writing Guide" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/writing/guide">
                      <button className="category">Comprehensive Guide to Writing</button>
                    </Link>
                  </div>
                  <p className="description">
                    Many of you may want to start writing but can’t get over the notion of how to begin. This issue is common among a diverse range of people, preventing them from expressing their fascinating thoughts through writing. To resolve this, I’ve created a comprehensive guide based on my personal experience and knowledge from various authors.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;83
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytical Writing */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" >
              <div className="course-item">
                <img src={analyticalWritingImg} className="img-fluid" alt="Analytical Writing" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/writing/gre">
                      <button className="category">Analytical Writing</button>
                    </Link>
                  </div>
                  <p className="description">
                    Elevate your writing prowess with our analytical writing feature, designed to foster critical thinking and articulate expression. Engage in thought-provoking prompts, formulate coherent arguments, and present compelling evidence. Craft persuasive essays and insightful reflections with ease.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;62
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feedback Button */}
      <section id="feedback-section" className="section">
        <div className="container text-center">
          <a href="https://forms.gle/86sDMaDVhkWvw5Lt5" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary">Give Feedback on Writing Guide</button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Writing;
