import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/main.css"; // Import main styles
import vocabularyImg from "../../assets/img/Vocabulary.png";
import writingImg from "../../assets/img/Writing.png";
import readingComprehensionImg from "../../assets/img/ReadingComprehension.png";


const English = () => {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 style={{ animation: "none", caretColor: "transparent" }}>English</h1>
                <p className="mb-0" style={{ animation: "none", caretColor: "transparent" }}>
                  Welcome to our English Learning Hub, where language mastery meets personalized learning. Whether you're a beginner or an advanced learner, our comprehensive resources and interactive lessons are designed to enhance your English proficiency. Join our community of learners and embark on an enriching journey towards fluency and confidence in English communication.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">English</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Courses List Section */}
      <section id="courses-list" className="section courses-list">
        <div className="container">
          <div className="row">
            {/* Vocabulary */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch" >
              <div className="course-item">
                <img src={vocabularyImg} className="img-fluid" alt="Vocabulary" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/vocabulary">
                      <button className="category">Vocabulary</button>
                    </Link>
                  </div>
                  <p className="description">
                    Welcome to our Vocabulary section, where precision meets proficiency. Explore our comprehensive resources and interactive exercises designed to sharpen your language skills in terms of vocabulary. From mastering the basics to refining advanced words, empower yourself with the tools you need to elevate your writing and communication.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Comprehension */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="course-item">
                <img src={readingComprehensionImg} className="img-fluid" alt="Reading Comprehension" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/RC">
                      <button className="category">Reading Comprehension</button>
                    </Link>
                  </div>
                  <p className="description">
                    Welcome to our Reading Comprehension module, where understanding meets excellence. Dive into expertly crafted passages and interactive exercises that enhance your ability to analyze, interpret, and infer. Whether you're identifying key ideas or uncovering subtle meanings, our resources equip you with the skills needed to excel in academics and competitive exams. Empower your reading with precision and confidence!
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Writing */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
              <div className="course-item">
                <img src={writingImg} className="img-fluid" alt="Writing" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/writing">
                      <button className="category">Writing</button>
                    </Link>
                  </div>
                  <p className="description">
                    Welcome to our Writing Workshop, where creativity knows no bounds. Unleash your imagination and hone your craft with our expert guidance and inspiring resources. From storytelling to essay writing, embark on a journey of self-expression and mastery of the written word.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;75
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

export default English;
