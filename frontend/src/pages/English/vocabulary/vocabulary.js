import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/main.css";
import diagnosticTestImg from "../../../assets/img/DignosticVocabTest.png";
import vocabGuideImg from "../../../assets/img/VocabGuide.png";
import vocabJourneyImg from "../../../assets/img/VocabJourney.png";

const VocabularyLearning = () => {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 style={{ animation: "none", caretColor: "transparent" }}>
                  Vocabulary Learning
                </h1>
                <p className="mb-0" style={{ animation: "none", caretColor: "transparent" }}>
                  A strong vocabulary is the foundation of effective communication and critical thinking. It helps students express ideas clearly, understand complex concepts, and excel academically and professionally. By building a rich vocabulary, you unlock the ability to learn faster, connect deeper, and stand out in every field. Empower your future by mastering words—they're your most powerful tool!
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
              <li className="current">Vocabulary Learning</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Courses List Section */}
      <section id="courses-list" className="section courses-list">
        <div className="container">
          <div className="row">
            {/* Diagnostic Test */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="course-item">
                <img src={diagnosticTestImg} className="img-fluid" alt="Vocabulary Diagnostic Test" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/vocabulary/vocabulary-diagnostic-test">
                      <button className="category">Diagnostic Test</button>
                    </Link>
                  </div>
                  <p className="description">
                    Our Vocabulary Diagnostic Test follows the CEFR—an internationally recognized standard for evaluating language proficiency. Assess your current level to plan effective steps for growth. Master words—unlock your potential.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vocabulary Guide */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="course-item">
                <img src={vocabGuideImg} className="img-fluid" alt="Vocabulary Guide" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/vocabulary/guide">
                      <button className="category">Vocabulary Guide</button>
                    </Link>
                  </div>
                  <p className="description">
                    Explore our step-by-step vocabulary guide with strategic methods, tips, and curated word lists. Build a strong language base from beginner to expert levels at your own pace.
                  </p>
                  <div className="trainer d-flex justify-content-between align-items-center">
                    <div className="trainer-rank d-flex align-items-center">
                      <i className="bi bi-heart heart-icon"></i>&nbsp;52
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vocabulary Journey */}
            <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
              <div className="course-item">
                <img src={vocabJourneyImg} className="img-fluid" alt="Vocabulary Journey" />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/english/vocabulary/main-page">
                      <button className="category">Vocabulary Endeavour</button>
                    </Link>
                  </div>
                  <p className="description">
                    Track your progress through interactive lessons and level-wise challenges. This learning journey turns vocabulary building into a fun and goal-driven adventure.
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

export default VocabularyLearning;
