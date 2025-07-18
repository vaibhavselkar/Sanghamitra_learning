// src/pages/Math/Arithmetic/Arithmetic.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/main.css";

const Arithmetic = () => {
  const [userData, setUserData] = useState({ email: null });
  const [testStatus, setTestStatus] = useState("Loading status...");
  const [progressData, setProgressData] = useState({
    addition: 0,
    subtraction: 0,
    multiplication: 0,
    division: 0,
    negativeSigns: 0,
    ratioPercentage: 0,
    decimals: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch session info
        const sessionResponse = await fetch(
          "http://3.111.49.131:4000/api/session-info",
          { credentials: 'include' }
        );
        
        if (!sessionResponse.ok) {
          throw new Error("Failed to fetch session");
        }
        
        const sessionData = await sessionResponse.json();
        const { email } = sessionData;
        setUserData({ email });

        if (!email) return;

        // Fetch test attempts
        const testResponse = await fetch(
          `http://3.111.49.131:4000/api/testresponses?email=${encodeURIComponent(email)}&all=true`,
          { credentials: 'include' }
        );
        
        if (!testResponse.ok) {
          throw new Error("Failed to fetch test attempts");
        }
        
        const testData = await testResponse.json();
        const attempts = testData.length;
        setTestStatus(
          attempts > 0
            ? `${attempts} attempt${attempts > 1 ? "s" : ""} completed`
            : "Not yet attempted"
        );

        // Topic configuration with mapping to progressData keys
        const topics = [
          { id: "addition", total: 30, progressKey: "addition" },
          { id: "subtraction", total: 30, progressKey: "subtraction" },
          { id: "multiplication", total: 30, progressKey: "multiplication" },
          { id: "division", total: 29, progressKey: "division" },
          { id: "dealing-with-negative-sign", total: 34, progressKey: "negativeSigns" },
          { id: "ratio-proportion-percentage", total: 30, progressKey: "ratioPercentage" },
          { id: "decimals", total: 30, progressKey: "decimals" },

        ];

        const progressUpdates = {};
        
        // Fetch progress for each topic
        for (const topic of topics) {
          try {
            const response = await fetch(
              `http://3.111.49.131:4000/api/arithmetic-scores?userEmail=${encodeURIComponent(email)}&operationType=${topic.id}`,
              { credentials: 'include' }
            );
            
            if (response.ok) {
              const scores = await response.json();
              const attempted = scores.questionsAttempted?.length || 0;
              const progressPercentage = topic.total > 0 ? 
                Math.round((attempted / topic.total) * 100) : 0;
              
              // Use the mapped progressKey instead of the topic id
              progressUpdates[topic.progressKey] = progressPercentage;
            } else {
              progressUpdates[topic.progressKey] = 0;
            }
          } catch (error) {
            console.error(`Error fetching progress for ${topic.id}:`, error);
            progressUpdates[topic.progressKey] = 0;
          }
        }

        setProgressData(prevData => ({
          ...prevData,
          ...progressUpdates
        }));
      } catch (error) {
        console.error("Initialization error:", error);
        setTestStatus("Status unavailable");
      }
    };

    fetchData();
  }, []);

  const courses = [
    {
      id: "pre-diagnostic",
      title: "PreDiagnosticTest",
      description: "Assess your current arithmetic skills",
      icon: "bi-clipboard-check",
      color: "info",
      link: "/math/arithmetic/pre-diagnostic-test", // ← UPDATED ROUTE
      isTest: true
    },
    {
      id: "addition",
      title: "Addition",
      description: "Master fundamental number combination",
      icon: "bi-plus-lg",
      color: "primary",
      link: "/math/arithmetic/addition",
      progress: progressData.addition
    },
    {
      id: "subtraction",
      title: "Subtraction",
      description: "Learn to subtract numbers effectively with visual aids",
      icon: "bi-dash-lg",
      color: "primary",
      link: "/math/arithmetic/subtraction",
      progress: progressData.subtraction
    },
    {
      id: "multiplication",
      title: "Multiplication",
      description: "Discover efficient multiplication strategies",
      icon: "bi-x-lg",
      color: "primary",
      link: "/math/arithmetic/multiplication",
      progress: progressData.multiplication
    },
    {
      id: "division",
      title: "Division",
      description: "Understand division concepts and methods",
      icon: "bi-slash",
      color: "primary",
      link: "/math/arithmetic/division",
      progress: progressData.division
    },
    {
      id: "decimals",
      title: "Decimals",
      description: "Understand decimals concepts and methods",
      icon: "bi-slash",
      color: "primary",
      link: "/math/arithmetic/decimals",
      progress: progressData.decimals
    },
    {
      id: "dealingwithnegativesign",
      title: "Dealing With Negative Signs",
      description: "Master positive and negative number operations",
      icon: "bi-dash-lg",
      color: "primary",
      link: "/math/arithmetic/dealingwithnegativesign",
      progress: progressData.negativeSigns
    },
    {
      id: "ratioproportionpercentage",
      title: "Ratio, Proportion, and Percentage",
      description: "Master Ratio, Proportion, and Percentage",
      icon: "bi-percent",
      color: "primary",
      link: "/math/arithmetic/ratioproportionpercentage",
      progress: progressData.ratioPercentage
    },
  ];

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title" data-aos="fade" style={{ marginBottom: "2rem" }}>
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Arithmetic</h1>
                <p className="mb-0">
                  Welcome to our arithmetic Learning Hub. Enhance your arithmetic skills with our
                  comprehensive resources and interactive lessons. Join our community and embark on
                  an enriching journey towards mastering arithmetic.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/math">Math</Link>
              </li>
              <li className="current">Arithmetic</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Courses List */}
      <div className="course-list" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 15px" }}>
        {courses.map((course) => (
          <div key={course.id} className="course-item mb-3" data-operation-type={course.id}>
            <div
              className="card course-card h-100 border-0 shadow-sm hover-shadow"
              style={{
                transition: "all 0.3s ease",
                borderRadius: "12px"
              }}
            >
              <div className="card-body p-3">
                <div className="row align-items-center">
                  <div className="col-lg-1 col-md-2 text-center">
                    <div
                      className={`icon-box bg-${course.color} text-white rounded-circle p-2`}
                      style={{ 
                        width: "40px", 
                        height: "40px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}
                    >
                      <i className={`bi ${course.icon} fs-5`}></i>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6">
                    <h4 className="mb-1 fs-5">{course.title}</h4>
                    <p className="text-muted mb-2 fs-6">{course.description}</p>
                    {course.isTest ? (
                      <div id="test-status-container">
                        <span
                          className={`test-status ${
                            testStatus.includes("completed")
                              ? "status-taken"
                              : "status-not-taken"
                          }`}
                          style={{
                            fontSize: "0.9rem",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "20px",
                            display: "inline-block",
                            backgroundColor: testStatus.includes("completed")
                              ? "#e7f4e4"
                              : "#f8f9fa",
                            color: testStatus.includes("completed")
                              ? "#2a7a1b"
                              : "#6c757d",
                            border: testStatus.includes("completed")
                              ? "1px solid #c3e6cb"
                              : "1px solid #dee2e6"
                          }}
                        >
                          {testStatus}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div 
                          className="progress" 
                          style={{ 
                            height: "6px", 
                            backgroundColor: "#f0f0f0" 
                          }}
                        >
                          <div
                            className={`progress-bar bg-${course.color}`}
                            role="progressbar"
                            style={{ width: `${course.progress}%` }}
                            aria-valuenow={course.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <small 
                          className="text-muted fs-7" 
                          style={{ fontSize: "0.85rem" }}
                        >
                          {course.progress}% Complete
                        </small>
                      </>
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 text-end">
                    <Link
                      to={course.link}
                      className="btn btn-primary btn-sm"
                      style={{
                        minWidth: "120px",
                        padding: "0.4rem 1rem",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>{course.isTest ? "Start Test" : "Continue"}</span>
                      <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Arithmetic;
