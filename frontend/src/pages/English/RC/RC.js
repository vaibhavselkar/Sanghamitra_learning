import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/main.css";
import rcPracticeImg from "../../../assets/img/ReadingComprehension2-Practice.png";
import rcGuideImg from "../../../assets/img/ReadingComprehension2-Guide.png";

const RC = () => {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 style={{ animation: "none", caretColor: "transparent" }}>
                  Reading Comprehension
                </h1>
                <p className="mb-0" style={{ animation: "none", caretColor: "transparent" }}>
                  Welcome to our Reading Comprehension Hub. Develop your ability to understand, analyze, and interpret texts with our interactive lessons and engaging resources. Join our community and embark on a rewarding journey to becoming a confident and skilled reader.
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
              <li className="current">Reading Comprehension</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Courses List Section */}
      <section id="courses-list" className="section courses-list">
        <div className="container">
          <div className="row">
            {/* Practice Section */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
              <div className="course-item">
                <img src={rcPracticeImg} className="img-fluid" alt="RC Practice" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/reading-comprehension/topics">
                      <button className="category">Practice</button>
                    </Link>
                  </div>
                  <p className="description">
                    Hone your reading comprehension skills with our tailored practice sessions. Explore diverse exercises designed to challenge your understanding and improve critical thinking. Whether you're a beginner or looking to refine your skills, our practice section has something for everyone.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RC Guide Section */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in">
              <div className="course-item">
                <img src={rcGuideImg} className="img-fluid" alt="RC Guide" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/reading-comprehension/guide">
                      <button className="category">RC Guide</button>
                    </Link>
                  </div>
                  <p className="description">
                    Navigate the world of reading comprehension with our step-by-step guide. Discover essential strategies, tips, and techniques to approach any text with confidence. This guide is your go-to resource for mastering comprehension skills at your own pace.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default RC;
