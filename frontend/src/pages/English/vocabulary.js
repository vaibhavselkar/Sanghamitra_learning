import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import diagnosticTestImg from "../../assets/img/DiagnosticVocabTest.png";
import vocabGuideImg from "../../assets/img/VocabGuide.png";
import vocabJourneyImg from "../../assets/img/VocabJourney.png";

const VocabularyLearning = () => {
  // Course items data for cleaner JSX
  const courseItems = [
    {
      id: 1,
      title: "Diagnostic Test",
      img: diagnosticTestImg,
      alt: "Vocabulary Diagnostic Test",
      path: "/english/vocabulary/vocabulary-diagnostic-test",
      description: "Our Vocabulary Diagnostic Test follows the CEFR—an internationally recognized standard for evaluating language proficiency. Assess your current level to plan effective steps for growth. Master words—unlock your potential.",
      likes: 52
    },
    {
      id: 2,
      title: "Vocabulary Guide",
      img: vocabGuideImg,
      alt: "Vocabulary Guide",
      path: "/english/vocabulary/guide",
      description: "Explore our step-by-step vocabulary guide with strategic methods, tips, and curated word lists. Build a strong language base from beginner to expert levels at your own pace.",
      likes: 52
    },
    {
      id: 3,
      title: "Vocabulary Endeavour",
      img: vocabJourneyImg,
      alt: "Vocabulary Journey",
      path: "/english/vocabulary/main-page",
      description: "Track your progress through interactive lessons and level-wise challenges. This learning journey turns vocabulary building into a fun and goal-driven adventure.",
      likes: 52
    }
  ];

  return (
    <main className="main" aria-labelledby="vocabulary-learning-title">
      {/* Page Header Section */}
      <header className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1 
                  id="vocabulary-learning-title"
                  style={{ animation: "none", caretColor: "transparent" }}
                >
                  Vocabulary Learning
                </h1>
                <p className="mb-0" style={{ animation: "none", caretColor: "transparent" }}>
                  A strong vocabulary is the foundation of effective communication and critical thinking. 
                  It helps students express ideas clearly, understand complex concepts, and excel academically 
                  and professionally. By building a rich vocabulary, you unlock the ability to learn faster, 
                  connect deeper, and stand out in every field. Empower your future by mastering words—they're 
                  your most powerful tool!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <div className="container">
            <ol itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link itemProp="item" to="/"><span itemProp="name">Home</span></Link>
                <meta itemProp="position" content="1" />
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link itemProp="item" to="/english"><span itemProp="name">English</span></Link>
                <meta itemProp="position" content="2" />
              </li>
              <li className="current" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name">Vocabulary Learning</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </div>
        </nav>
      </header>

      {/* Courses Grid Section */}
      <section id="courses-list" className="section courses-list" aria-labelledby="courses-heading">
        <div className="container">
          <h2 id="courses-heading" className="visually-hidden">Vocabulary Learning Options</h2>
          <div className="row g-4">
            {courseItems.map((course) => (
              <div key={course.id} className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <article className="course-item h-100">
                  <figure className="course-figure mb-0">
                    <img 
                      src={course.img} 
                      className="img-fluid" 
                      alt={course.alt}
                      loading="lazy"
                    />
                  </figure>
                  <div className="course-content d-flex flex-column h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Link to={course.path}>
                        <button className="category" aria-label={`Go to ${course.title}`}>
                          {course.title}
                        </button>
                      </Link>
                    </div>
                    <p className="description flex-grow-1">
                      {course.description}
                    </p>
                    <div className="trainer d-flex justify-content-between align-items-center mt-auto">
                      <div className="trainer-rank d-flex align-items-center">
                        <i className="bi bi-heart heart-icon" aria-hidden="true"></i>
                        <span className="ms-1">{course.likes}</span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default VocabularyLearning;
