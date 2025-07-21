// src/pages/math/arithmetic/RatioProportionPercentage.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const RatioProportionPercentage = () => {
  return (
    <div className="ratio-proportion-percentage-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Ratio, Proportion, and Percentage</h1>
                  <p className="mb-0">Welcome to our ratio, proportion, and percentage learning hub. Enhance your basics skills with our comprehensive resources and interactive lessons. Join our community and embark on an enriching journey towards mastering ratio, proportion, and percentage.</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/math">Math</Link></li>
                <li><Link to="/math/arithmetic">Arithmetic</Link></li>
                <li className="current">RatioProportionPercentage</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Concepts Section */}
        <section className="concepts-section py-5">
          <div className="container">
            {/* Ratio Section */}
            <div className="card mb-4 shadow">
              <div className="card-header bg-primary text-white">
                <h3><i className="bi bi-collection"></i> Ratio Fundamentals</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="concept-box bg-light p-3 mb-3">
                      <h5 className="text-primary">Definition</h5>
                      <p>Comparison of quantities showing how much of one exists per unit of another</p>
                      <div className="ratio-example">
                        <span className="badge bg-success">4:2</span> → 
                        <span className="badge bg-success">2:1</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="concept-box bg-light p-3 mb-3">
                      <h5 className="text-primary">Real-World Applications</h5>
                      <ul>
                        <li>Cooking: Idli batter 4:1</li>
                        <li>Construction: Cement 1:4</li>
                        <li>Medicine: 5mg/kg doses</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="concept-box bg-light p-3 mb-3">
                      <h5 className="text-primary">Equivalent Ratios</h5>
                      <p>2:8 samosas = 1:4 = 6:24<br/>
                      <code>2/8 = 6/24 = 1/4</code></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proportion Section */}
            <div className="card mb-4 shadow">
              <div className="card-header bg-success text-white">
                <h3><i className="bi bi-arrow-left-right"></i> Proportional Relationships</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="math-problem bg-light p-3">
                      <h5>Train Travel Problem</h5>
                      <p>360 km/6 hrs = 60 km/h<br/>
                      <span className="text-success">10 hrs × 60 = 600 km</span></p>
                      <div className="formula-box bg-primary text-white p-2">
                        a/b = c/d → a×d = b×c
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="real-world-box bg-light p-3">
                      <h5>Critical Applications</h5>
                      <ul>
                        <li>Recipe scaling (3 cups → 15 people)</li>
                        <li>Construction mixtures</li>
                        <li>Financial calculations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Percentage Section */}
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h3><i className="bi bi-percent"></i> Percentage Mastery</h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="conversion-box bg-light p-3">
                      <h5 className="text-success">Conversions</h5>
                      <p>25% = 0.25 = ¼<br/>
                      75% = 0.75 = ¾</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="calculation-box bg-light p-3">
                      <h5 className="text-success">Key Formula</h5>
                      <p>Percentage = (Part/Whole) × 100<br/>
                      <code>45/60 × 100 = 75%</code></p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="application-box bg-light p-3">
                      <h5 className="text-success">Real Uses</h5>
                      <ul>
                        <li>Discounts (30% off ₹1500)</li>
                        <li>Exam scores (45/60 = 75%)</li>
                        <li>Tax calculations (18% GST)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Section */}
        <section className="practice-section py-5 bg-light">
          <div className="container">
            <h3 className="text-center mb-4">📝 Practice Problems</h3>
            <div className="row g-4">
              {/* Ratio Problems */}
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-header bg-success text-white">
                    Ratio Challenges
                  </div>
                  <div className="card-body">
                    <p>Class has 45 cyclists and 30 bus riders:</p>
                    <ol>
                      <li>Simplify bicycle:bus ratio</li>
                      <li>Find bus riders percentage</li>
                    </ol>
                    <button 
                      className="btn btn-primary"
                      onClick={(e) => {
                        const solutions = e.target.nextElementSibling;
                        solutions.hidden = !solutions.hidden;
                        e.target.textContent = solutions.hidden ? 'Show Solutions' : 'Hide Solutions';
                      }}
                    >
                      Show Solutions
                    </button>
                    <div className="solutions" hidden>
                      <p>1. 3:2 &nbsp; 2. 40%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proportion Problems */}
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-header bg-primary text-white">
                    Proportion Puzzles
                  </div>
                  <div className="card-body">
                    <p>240 km needs 12L petrol:</p>
                    <ol>
                      <li>Fuel for 500km?</li>
                      <li>Cost for 275 plants?</li>
                    </ol>
                    <button 
                      className="btn btn-success"
                      onClick={(e) => {
                        const solutions = e.target.nextElementSibling;
                        solutions.hidden = !solutions.hidden;
                        e.target.textContent = solutions.hidden ? 'Show Solutions' : 'Hide Solutions';
                      }}
                    >
                      Show Solutions
                    </button>
                    <div className="solutions" hidden>
                      <p>1. 25L &nbsp; 2. 11kg</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Percentage Problems */}
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-header bg-success text-white">
                    Percentage Problems
                  </div>
                  <div className="card-body">
                    <p>Rainfall increased 200→240cm:</p>
                    <ol>
                      <li>Percentage increase</li>
                      <li>Class gender ratio</li>
                    </ol>
                    <button 
                      className="btn btn-primary"
                      onClick={(e) => {
                        const solutions = e.target.nextElementSibling;
                        solutions.hidden = !solutions.hidden;
                        e.target.textContent = solutions.hidden ? 'Show Solutions' : 'Hide Solutions';
                      }}
                    >
                      Show Solutions
                    </button>
                    <div className="solutions" hidden>
                      <p>1. 20% &nbsp; 2. 53.33%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Practice Section */}
        <section className="quiz-practice py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#8e44ad'}}>
                  <i className="bi bi-calculator me-2"></i>Practice Test: Master Your Skills!
                </h2>
                <p className="lead">Put your ratio, proportion, and percentage knowledge to the test! 🎯</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <AdditionQuiz operationType="ratio-proportion-percentage" />
              </div>
            </div>
          </div>
        </section>
        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #8e44ad'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-purple text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite', backgroundColor: '#8e44ad'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#8e44ad'}}>
                        🎉 Congratulations, Ratio & Percentage Master! 📊
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your journey through the world of ratios, proportions, and percentages! 
                        You now have the analytical skills to compare quantities, solve proportional problems, and calculate percentages like a pro.
                      </p>
                    </div>

                    {/* Achievement Cards */}
                    <div className="row mt-5">
                      <div className="col-md-6 mb-4">
                        <div className="achievement-card bg-light p-4 rounded shadow-sm h-100" style={{borderLeft: '4px solid #27ae60'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-check-circle fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Master Skills Achieved</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Ratio comparison and simplification</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Proportional relationship solving</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Percentage calculations and conversions</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Cross-multiplication techniques</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Real-world problem applications</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Financial and analytical thinking</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="achievement-card bg-light p-4 rounded shadow-sm h-100" style={{borderLeft: '4px solid #3498db'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-star fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#3498db'}}>Next Mathematical Explorations</h5>
                            </div>
                          </div>
                          
                          <div className="next-steps">
                            <div className="step-item mb-3">
                              <Link to="/math/arithmetic" className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Arithmetic
                              </Link>
                            </div>
                            <div className="step-item">
                              <Link to="/math" className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-mortarboard me-2"></i>
                                Explore More Math Topics
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Final Message */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #8e44ad, #9b59b6)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-graph-up fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">📈 Ready for Your Next Analytical Adventure?</h5>
                          <p className="mb-0 lead">
                            Keep practicing and remember: every data analyst started with ratios and percentages! 
                            You're now equipped with the tools to analyze, compare, and calculate your way through any mathematical challenge!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Ratio & Percentage Mastery Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #8e44ad, #9b59b6)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>📊 Basic Comparisons</span>
                            <span>⚖️ Proportional Thinking</span>
                            <span>🏆 Analysis Master!</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Achievement Badges */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="achievement-badges bg-light p-4 rounded">
                          <h6 className="text-center text-muted mb-3">Special Achievement Badges Earned</h6>
                          <div className="row text-center">
                            <div className="col-md-4 mb-3">
                              <div className="badge-item">
                                <div className="badge-icon bg-primary text-white rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                  <i className="bi bi-collection fs-3"></i>
                                </div>
                                <h6 className="text-primary">Ratio Expert</h6>
                                <small className="text-muted">Master of comparing quantities</small>
                              </div>
                            </div>
                            <div className="col-md-4 mb-3">
                              <div className="badge-item">
                                <div className="badge-icon bg-success text-white rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                  <i className="bi bi-arrow-left-right fs-3"></i>
                                </div>
                                <h6 className="text-success">Proportion Pro</h6>
                                <small className="text-muted">Cross-multiplication champion</small>
                              </div>
                            </div>
                            <div className="col-md-4 mb-3">
                              <div className="badge-item">
                                <div className="badge-icon text-white rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px', backgroundColor: '#8e44ad'}}>
                                  <i className="bi bi-percent fs-3"></i>
                                </div>
                                <h6 style={{color: '#8e44ad'}}>Percentage Wizard</h6>
                                <small className="text-muted">Calculator of all percentages</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>
        {`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        .achievement-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .achievement-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
        }

        .skill-item {
          transition: transform 0.2s ease;
        }

        .skill-item:hover {
          transform: translateX(5px);
        }

        .final-message-card {
          box-shadow: 0 10px 30px rgba(142, 68, 173, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(142, 68, 173, 0.4);
        }

        .badge-item {
          transition: transform 0.3s ease;
        }

        .badge-item:hover {
          transform: translateY(-3px);
        }

        .badge-icon {
          transition: transform 0.3s ease;
        }

        .badge-item:hover .badge-icon {
          transform: scale(1.1);
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default RatioProportionPercentage;
