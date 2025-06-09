// src/pages/Programming/ProgrammingCourses.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Programming = () => {
  useEffect(() => {
    // Optional: initialize AOS or fetch progress data here
  }, []);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade" style={{ marginBottom: '2rem' }}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Programming</h1>
                <p className="mb-0">
                  Welcome to our Programming Learning Hub. Enhance your coding skills with our comprehensive resources
                  and interactive lessons. Join our community and embark on an enriching journey towards mastering
                  programming.
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Programming</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Course List */}
      <div className="container">
        <div className="course-list">
          {[
            {
              icon: "bi-cpu",
              title: "CT Foundation",
              desc: "Develop problem-solving skills using computational methods",
              bg: "bg-primary",
              href: "/programming/ct-foundation",
              progressId: "CT_foundation"
            },
            {
              icon: "bi-cpu-fill",
              title: "CT Foundation 1",
              desc: "Advance your computational thinking skills",
              bg: "bg-primary",
              href: "/programming/ct-foundation-1",
              progressId: "CT_foundation_1"
            },
            {
              icon: "bi-layers",
              title: "CT Foundation 2",
              desc: "Master complex computational problem-solving",
              bg: "bg-primary",
              href: "/programming/ct-foundation-2",
              progressId: "CT_foundation_2"
            },
            {
              icon: "bi-code-slash",
              title: "Python Basics",
              desc: "Master fundamental Python syntax and concepts",
              bg: "bg-success",
              href: "/programming/python-basics",
              progressId: "python_basics"
            },
            {
              icon: "bi-diagram-3",
              title: "Python Conditionals",
              desc: "Implement decision-making in your code",
              bg: "bg-success",
              href: "/programming/python-conditionals",
              progressId: "python_conditionals"
            },
            {
              icon: "bi-arrow-repeat",
              title: "Python Loops",
              desc: "Automate repetitive tasks efficiently",
              bg: "bg-success",
              href: "/programming/python-loops",
              progressId: "python_loops"
            },
            {
              icon: "bi-box",
              title: "Python Functions",
              desc: "Create reusable code components",
              bg: "bg-success",
              href: "/programming/python-functions",
              progressId: "python_functions"
            },
            {
              icon: "bi-clipboard-check",
              title: "Programming Diagnostic",
              desc: "Assess your programming knowledge",
              bg: "bg-secondary",
              href: "/programming/programming-diagnostic",
              progressId: "programming_diagnostic"
            }
          ].map(({ icon, title, desc, bg, href, progressId }) => (
            <div key={title} className="course-item mb-3">
              <div className="card course-card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body p-3">
                  <div className="row align-items-center">
                    <div className="col-lg-1 col-md-2 text-center">
                      <div className={`icon-box ${bg} text-white rounded-circle p-2`} style={{ width: 40, height: 40 }}>
                        <i className={`bi ${icon} fs-5`}></i>
                      </div>
                    </div>
                    <div className="col-lg-7 col-md-6">
                      <h4 className="mb-1 fs-5">{title}</h4>
                      <p className="text-muted mb-2 fs-6">{desc}</p>
                      <div className="progress" style={{ height: 6 }}>
                        <div className={`progress-bar ${bg}`} role="progressbar" style={{ width: "0%" }}
                          aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                          id={`${progressId}-progress`}
                        ></div>
                      </div>
                      <small className="text-muted fs-7" id={`${progressId}-text`}>0/20 Complete</small>
                    </div>
                    <div className="col-lg-4 col-md-4 text-end">
                      <Link to={href} className={`btn ${bg} btn-sm`}>
                        <span>Continue</span>
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Programming;
