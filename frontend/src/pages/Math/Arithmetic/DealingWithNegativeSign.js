
// src/pages/math/arithmetic/DealingWithNegativeSign.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const DealingWithNegativeSign = () => {
  return (
    <div className="negative-sign-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Dealing With Negative Signs</h1>
                  <p className="mb-0">The guide and practice problems will help you to gain profound understanding of using negative signs and what common mistakes people do. So you can avoid making them and excel at dealing with negative signs.</p>
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
                <li className="current">DealingWithNegativeSign</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Learning Journey Section */}
        <section className="journey-section py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e74c3c'}}>
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>Your Negative Sign Mastery Journey!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Negative Sign Detective? By the end of this journey, you'll unlock these incredible superpowers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-search"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Error Detective!</strong><br />
                                  <small className="text-muted">Spot and fix negative sign mistakes instantly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-shield-check"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Sign Rules Master!</strong><br />
                                  <small className="text-muted">Apply multiplication and division rules perfectly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-calculator"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Expression Expert!</strong><br />
                                  <small className="text-muted">Handle complex expressions with confidence</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-thermometer"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Real-World Solver!</strong><br />
                                  <small className="text-muted">Apply negatives to temperature, debt, elevation</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-distribute-horizontal"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Distribution Pro!</strong><br />
                                  <small className="text-muted">Distribute negative signs flawlessly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-lightbulb"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Pattern Recognizer!</strong><br />
                                  <small className="text-muted">See patterns and avoid common traps</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-dash-circle fs-1 text-danger"></i>
                          </div>
                          <h5 className="text-danger mb-2">Conquer Negative Signs!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-danger" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Confused to Confident!</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="adventure-callout bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #e74c3c, #c0392b)'}}>
                        <span className="text-white fs-5">🕵️ Ready to solve the negative sign mysteries? Let's investigate! 🔍</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Introduction */}
        <section className="intro-section py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #8e44ad'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#8e44ad'}}>
                      <i className="bi bi-exclamation-diamond me-2"></i>Understanding the Negative Sign Challenge!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What Makes Negatives Tricky? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-question-circle fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e74c3c'}}>Why Are Negatives Tricky?</h5>
                              <p className="mb-3">Negative signs are like <strong>Mathematical Chameleons!</strong> They change meaning based on where they appear and what they're doing! 🦎</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="mb-3">
                                <h6 className="text-primary">Same Symbol, Different Jobs!</h6>
                              </div>
                              <div className="job-examples">
                                <div className="job-item mb-2">
                                  <span className="badge bg-primary">−5</span> = Negative number 📊
                                </div>
                                <div className="job-item mb-2">
                                  <span className="badge bg-success">8 − 3</span> = Subtraction operation ➖
                                </div>
                                <div className="job-item mb-2">
                                  <span className="badge bg-warning">−(−4)</span> = Opposite operation 🔄
                                </div>
                                <div className="job-item">
                                  <span className="badge bg-info">−3²</span> vs <span className="badge bg-danger">(−3)²</span> = Different meanings! ⚠️
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Real-World Negatives */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-globe fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Negatives in Real Life!</h5>
                              <p className="mb-3">Negative numbers are everywhere around us! Understanding them gives you <strong>real-world superpowers</strong>! 🌍</p>
                            </div>
                          </div>
                          
                          <div className="real-examples">
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-thermometer-snow text-info fs-5 me-2"></i>
                              <span><strong>Temperature:</strong> −5°C (5 degrees below freezing)</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-bank text-warning fs-5 me-2"></i>
                              <span><strong>Banking:</strong> −₹200 (₹200 debt or overdraft)</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-geo-alt text-danger fs-5 me-2"></i>
                              <span><strong>Elevation:</strong> −86m (below sea level)</span>
                            </div>
                            <div className="example-item d-flex align-items-center">
                              <i className="bi bi-speedometer text-primary fs-5 me-2"></i>
                              <span><strong>Sports:</strong> −3 points (penalty or loss)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mind-Blowing Fact */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #f39c12'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-lightbulb fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#f39c12'}}>Mind-Blowing Fact! 🤯</h5>
                            </div>
                          </div>
                          
                          <div className="fact-display bg-white border rounded p-3">
                            <div className="text-center">
                              <h6 className="text-primary mb-3">The Double Negative Mystery!</h6>
                              <div className="mystery-math">
                                <div className="mystery-item mb-2">
                                  <span className="badge bg-info me-2">English:</span> "I don't have no money" = I have money! 💰
                                </div>
                                <div className="mystery-item mb-2">
                                  <span className="badge bg-success me-2">Math:</span> −(−5) = +5 ✨
                                </div>
                                <div className="mystery-item mb-2">
                                  <span className="badge bg-warning me-2">Rule:</span> Two negatives make a positive! ➕
                                </div>
                                <hr />
                                <div className="revelation">
                                  <span className="badge bg-danger fs-6">Both follow the same logic!</span> 🎯
                                </div>
                              </div>
                              <small className="text-muted">Language and math use the same double negative rule!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Challenge */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-puzzle fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#3498db'}}>Quick Detective Challenge! 🔍</h5>
                            </div>
                          </div>
                          
                          <div className="challenge-box bg-white border rounded p-3">
                            <h6 className="text-center text-primary mb-3">🎯 Spot the Difference! 🎯</h6>
                            <div className="challenge-items">
                              <div className="challenge-item bg-light rounded p-2 mb-2">
                                <strong>Case A:</strong> <span className="text-danger">−4²</span> = ?
                              </div>
                              <div className="challenge-item bg-light rounded p-2 mb-2">
                                <strong>Case B:</strong> <span className="text-success">(−4)²</span> = ?
                              </div>
                              <div className="text-center mt-3">
                                <button className="btn btn-primary btn-sm" onClick={(e) => {
                                  e.target.nextElementSibling.style.display = 'block';
                                  e.target.style.display = 'none';
                                }}>Reveal the Secret!</button>
                                <div className="revelation mt-2" style={{display: 'none'}}>
                                  <div className="alert alert-info">
                                    <strong>Case A:</strong> −4² = −16 (negative of 4 squared)<br/>
                                    <strong>Case B:</strong> (−4)² = +16 (negative 4, squared)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Call-to-Action */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="cta-box text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #8e44ad, #e74c3c)', color: 'white'}}>
                          <h5 className="mb-2">🕵️ Ready to Become a Negative Sign Detective? 🔍</h5>
                          <p className="mb-3">Let's uncover the secrets and master the most common mistakes!</p>
                          <i className="bi bi-arrow-down-circle fs-2 text-warning" style={{animation: 'bounce 2s infinite'}}></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="common-mistakes py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#e74c3c'}}>
                  <i className="bi bi-exclamation-triangle me-2"></i>Top 5 Negative Sign Traps
                </h2>
                <p className="lead">Learn from these common mistakes and become mistake-proof! 🛡️</p>
              </div>
            </div>

            {/* Mistake 1: Misplaced Negative Signs */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e74c3c'}}>
                      <i className="bi bi-1-circle me-2"></i>Trap 1: The Exponent Placement Puzzle
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Order of Operations Matters! ⚡</h5>
                        
                        <div className="mistake-demo">
                          <div className="wrong-way bg-danger text-white p-3 rounded mb-3">
                            <h6 className="text-center mb-3">❌ Common Mistake</h6>
                            <div className="math-display text-center">
                              <div className="fs-3 mb-2">−5² = 25</div>
                              <small>Student thinks: "Negative 5 squared equals 25"</small>
                            </div>
                          </div>
                          
                          <div className="right-way bg-success text-white p-3 rounded">
                            <h6 className="text-center mb-3">✅ Correct Understanding</h6>
                            <div className="math-display text-center">
                              <div className="fs-3 mb-2">−5² = −25</div>
                              <small>Actually means: "Negative of (5 squared)"</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="explanation-box bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Why This Happens 🧠</h6>
                          
                          <div className="order-explanation">
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header mb-2">
                                <span className="badge bg-primary me-2">Step 1</span>
                                <strong>Without Parentheses: −5²</strong>
                              </div>
                              <div className="step-process">
                                <div>First: 5² = 25</div>
                                <div>Then: −25</div>
                                <div className="text-primary">Result: −25</div>
                              </div>
                            </div>
                            
                            <div className="step-item bg-white border rounded p-3">
                              <div className="step-header mb-2">
                                <span className="badge bg-success me-2">Step 2</span>
                                <strong>With Parentheses: (−5)²</strong>
                              </div>
                              <div className="step-process">
                                <div>First: −5 × −5</div>
                                <div>Then: +25</div>
                                <div className="text-success">Result: +25</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-warning text-dark text-center mt-4">
                      <i className="bi bi-lightbulb me-2"></i>
                      <strong>Memory Trick:</strong> Parentheses = "Include the negative in the operation!" 🎯
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mistake 2: Subtraction Confusion */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#f39c12'}}>
                      <i className="bi bi-2-circle me-2"></i>Trap 2: The Double Negative Confusion
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Subtracting Negatives! 🔄</h5>
                        
                        <div className="subtraction-demo">
                          <div className="problem-setup text-center mb-3">
                            <h6 className="text-primary">Problem: 5 − (−3) = ?</h6>
                          </div>
                          
                          <div className="wrong-thinking bg-danger text-white p-3 rounded mb-3">
                            <h6>❌ Incorrect Thinking</h6>
                            <div>"5 minus negative 3... that's 5 minus 3 = 2"</div>
                          </div>
                          
                          <div className="correct-thinking bg-success text-white p-3 rounded">
                            <h6>✅ Correct Thinking</h6>
                            <div>"Subtracting a negative = Adding a positive!"</div>
                            <div className="mt-2">5 − (−3) = 5 + 3 = 8</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="visual-number-line bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Number Line Visualization 📊</h6>
                          
                          <div className="number-line-demo">
                            <div className="line-explanation mb-3">
                              <div className="step-by-step">
                                <div className="line-step mb-2">
                                  <strong>Start at 5:</strong>
                                  <div className="mini-line bg-primary text-white p-2 rounded">
                                    ... 3 — 4 — <span className="bg-warning text-dark">5</span> — 6 — 7 ...
                                  </div>
                                </div>
                                <div className="line-step mb-2">
                                  <strong>Subtract negative 3 = Move right 3:</strong>
                                  <div className="mini-line bg-success text-white p-2 rounded">
                                    ... 5 — 6 — 7 — <span className="bg-warning text-dark">8</span> — 9 ...
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="rule-box bg-info text-white p-3 rounded text-center">
                              <strong>Golden Rule:</strong><br/>
                              Minus a Negative = Plus a Positive! ➕
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mistake 3: Multiplication Sign Rules */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#9b59b6'}}>
                      <i className="bi bi-3-circle me-2"></i>Trap 3: Multiplication Sign Mix-ups
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="rules-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-x-lg me-2"></i>The Sign Rules Chart
                          </h5>
                          
                          <div className="rules-chart">
                            <div className="rule-item bg-success text-white p-3 rounded mb-2">
                              <div className="text-center">
                                <div className="fs-4 mb-1">+ × + = +</div>
                                <small>Positive × Positive = Positive</small>
                              </div>
                            </div>
                            
                            <div className="rule-item bg-danger text-white p-3 rounded mb-2">
                              <div className="text-center">
                                <div className="fs-4 mb-1">− × + = −</div>
                                <small>Negative × Positive = Negative</small>
                              </div>
                            </div>
                            
                            <div className="rule-item bg-danger text-white p-3 rounded mb-2">
                              <div className="text-center">
                                <div className="fs-4 mb-1">+ × − = −</div>
                                <small>Positive × Negative = Negative</small>
                              </div>
                            </div>
                            
                            <div className="rule-item bg-success text-white p-3 rounded">
                              <div className="text-center">
                                <div className="fs-4 mb-1">− × − = +</div>
                                <small>Negative × Negative = Positive</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="examples-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-calculator me-2"></i>Practice Examples
                          </h5>
                          
                          <div className="practice-examples">
                            <div className="example-group mb-3">
                              <h6 className="text-success">✅ Correct Examples</h6>
                              <div className="example bg-white border rounded p-2 mb-1">
                                −4 × −5 = +20
                              </div>
                              <div className="example bg-white border rounded p-2 mb-1">
                                −3 × 6 = −18
                              </div>
                              <div className="example bg-white border rounded p-2">
                                7 × −2 = −14
                              </div>
                            </div>
                            
                            <div className="example-group">
                              <h6 className="text-danger">❌ Common Mistakes</h6>
                              <div className="mistake bg-white border border-danger rounded p-2 mb-1">
                                −4 × −5 = −20 <span className="text-danger">(Wrong!)</span>
                              </div>
                              <div className="mistake bg-white border border-danger rounded p-2 mb-1">
                                −3 × 6 = 18 <span className="text-danger">(Wrong!)</span>
                              </div>
                              <div className="mistake bg-white border border-danger rounded p-2">
                                7 × −2 = 14 <span className="text-danger">(Wrong!)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="memory-trick bg-primary text-white p-3 rounded text-center">
                          <i className="bi bi-lightbulb me-2"></i>
                          <strong>Memory Trick:</strong> Same signs = Positive, Different signs = Negative! 🎯
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mistake 4: Distribution Errors */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-4-circle me-2"></i>Trap 4: The Distribution Disaster
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Don't Forget to Distribute! 📦</h5>
                        
                        <div className="distribution-demo">
                          <div className="problem-setup text-center mb-3">
                            <h6 className="text-primary">Problem: −(x + 2) = ?</h6>
                          </div>
                          
                          <div className="wrong-distribution bg-danger text-white p-3 rounded mb-3">
                            <h6>❌ Common Mistake</h6>
                            <div>−(x + 2) = −x + 2</div>
                            <small>Forgot to distribute the negative to ALL terms!</small>
                          </div>
                          
                          <div className="correct-distribution bg-success text-white p-3 rounded">
                            <h6>✅ Correct Distribution</h6>
                            <div>−(x + 2) = −x − 2</div>
                            <small>The negative affects EVERY term inside!</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="distribution-steps bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Step-by-Step Distribution 🔄</h6>
                          
                          <div className="steps-container">
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header mb-2">
                                <span className="badge bg-primary me-2">Step 1</span>
                                <strong>Identify the parentheses</strong>
                              </div>
                              <div>−(x + 2)</div>
                            </div>
                            
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header mb-2">
                                <span className="badge bg-warning me-2">Step 2</span>
                                <strong>Apply negative to first term</strong>
                              </div>
                              <div>−x</div>
                            </div>
                            
                            <div className="step-item bg-white border rounded p-3">
                              <div className="step-header mb-2">
                                <span className="badge bg-success me-2">Step 3</span>
                                <strong>Apply negative to second term</strong>
                              </div>
                              <div>−x − 2</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-primary text-white text-center mt-4">
                      <i className="bi bi-clipboard-check me-2"></i>
                      <strong>Remember:</strong> The negative sign affects ALL terms inside the parentheses! 📋
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mistake 5: Combining Like Terms */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-5-circle me-2"></i>Trap 5: The Combining Catastrophe
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Watch Those Signs When Combining! ➕</h5>
                        
                        <div className="combining-demo">
                          <div className="problem-setup text-center mb-3">
                            <h6 className="text-primary">Problem: 3x − (2x + 4) = ?</h6>
                          </div>
                          
                          <div className="wrong-combining bg-danger text-white p-3 rounded mb-3">
                            <h6>❌ Incorrect Approach</h6>
                            <div>3x − (2x + 4) = x + 4</div>
                            <small>Ignored the negative distribution!</small>
                          </div>
                          
                          <div className="correct-combining bg-success text-white p-3 rounded">
                            <h6>✅ Correct Process</h6>
                            <div>3x − 2x − 4 = x − 4</div>
                            <small>Properly distributed, then combined!</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="combining-process bg-light p-4 rounded">
                          <h6 className="text-center mb-3">The Correct Process 🔧</h6>
                          
                          <div className="process-steps">
                            <div className="process-step bg-white border rounded p-3 mb-2">
                              <strong>Original:</strong> 3x − (2x + 4)
                            </div>
                            <div className="process-step bg-white border rounded p-3 mb-2">
                              <strong>Distribute:</strong> 3x − 2x − 4
                            </div>
                            <div className="process-step bg-white border rounded p-3 mb-2">
                              <strong>Combine like terms:</strong> (3x − 2x) − 4
                            </div>
                            <div className="process-step bg-success text-white rounded p-3">
                              <strong>Final answer:</strong> x − 4
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-warning text-dark text-center mt-4">
                      <i className="bi bi-exclamation-octagon me-2"></i>
                      <strong>Pro Tip:</strong> Use parentheses when substituting negative values! 🎯
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Examples Section */}
        <section className="real-world-examples py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#27ae60'}}>
                  <i className="bi bi-globe me-2"></i>Real-World Negative Scenarios
                </h2>
                <p className="lead">See how negative numbers work in everyday life! 🌍</p>
              </div>
            </div>

            <div className="row">
              {/* Temperature Example */}
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow h-100" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-body text-center">
                    <div className="icon-circle bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-thermometer-snow fs-2"></i>
                    </div>
                    <h4 className="text-primary mb-3">Temperature Math</h4>
                    <div className="example-content">
                      <div className="example-item bg-light p-3 rounded mb-2">
                        <strong>Scenario:</strong> It's −5°C and drops 3°C<br/>
                        <span className="text-primary">−5 − 3 = −8°C ❄️</span>
                      </div>
                      <div className="example-item bg-light p-3 rounded">
                        <strong>Scenario:</strong> Temperature rises 7°C<br/>
                        <span className="text-success">−5 + 7 = 2°C 🌤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Example */}
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow h-100" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-body text-center">
                    <div className="icon-circle bg-warning text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-cash-coin fs-2"></i>
                    </div>
                    <h4 className="text-warning mb-3">Banking Math</h4>
                    <div className="example-content">
                      <div className="example-item bg-light p-3 rounded mb-2">
                        <strong>Account balance:</strong><br/>
                        <span className="text-success">₹500 − (−₹200) = ₹700 💰</span>
                      </div>
                      <div className="example-item bg-light p-3 rounded">
                        <small className="text-muted">(Forgiving ₹200 debt = Adding ₹200)</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Elevation Example */}
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow h-100" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-body text-center">
                    <div className="icon-circle bg-success text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-geo-alt fs-2"></i>
                    </div>
                    <h4 className="text-success mb-3">Elevation Math</h4>
                    <div className="example-content">
                      <div className="example-item bg-light p-3 rounded mb-2">
                        <strong>Death Valley:</strong> −86m 🏜️
                      </div>
                      <div className="example-item bg-light p-3 rounded">
                        <strong>Climbing 100m:</strong><br/>
                        <span className="text-success">−86 + 100 = 14m above sea level ⛰️</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Practice Section */}
        <section className="interactive-practice py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#e74c3c'}}>
                  <i className="bi bi-puzzle me-2"></i>Interactive Challenge: Spot the Mistakes!
                </h2>
                <p className="lead">Test your detective skills! 🔍</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow h-100">
                  <div className="card-body text-center">
                    <h5 className="text-danger mb-3">Challenge 1</h5>
                    <div className="problem-display bg-light p-3 rounded mb-3">
                      <div className="fs-4 mb-2">−4² = 16?</div>
                    </div>
                    <button 
                      className="btn btn-danger mb-3"
                      onClick={(e) => {
                        const answer = e.target.nextElementSibling;
                        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                      }}
                    >
                      Reveal Truth
                    </button>
                    <div className="answer bg-danger text-white p-3 rounded" style={{display: 'none'}}>
                      ❌ False! −4² = −16<br/>✅ (−4)² = 16
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow h-100">
                  <div className="card-body text-center">
                    <h5 className="text-warning mb-3">Challenge 2</h5>
                    <div className="problem-display bg-light p-3 rounded mb-3">
                      <div className="fs-4 mb-2">5 − (−3) = 2?</div>
                    </div>
                    <button 
                      className="btn btn-warning mb-3"
                      onClick={(e) => {
                        const answer = e.target.nextElementSibling;
                        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                      }}
                    >
                      Show Correct
                    </button>
                    <div className="answer bg-warning text-dark p-3 rounded" style={{display: 'none'}}>
                      ❌ Wrong! 5 − (−3) = 8<br/>✅ Two negatives make positive!
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow h-100">
                  <div className="card-body text-center">
                    <h5 className="text-success mb-3">Challenge 3</h5>
                    <div className="problem-display bg-light p-3 rounded mb-3">
                      <div className="fs-4 mb-2">−(x − 2) = −x − 2?</div>
                    </div>
                    <button 
                      className="btn btn-success mb-3"
                      onClick={(e) => {
                        const answer = e.target.nextElementSibling;
                        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                      }}
                    >
                      Fix It
                    </button>
                    <div className="answer bg-success text-white p-3 rounded" style={{display: 'none'}}>
                      ❌ Error!<br/>✅ −(x − 2) = −x + 2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Addition Quiz Component */}
        <section className="quiz-practice py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#8e44ad'}}>
                  <i className="bi bi-calculator me-2"></i>Practice Test: Master Your Skills!
                </h2>
                <p className="lead">Put your negative sign knowledge to the test! 🎯</p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <AdditionQuiz operationType="dealing-with-negative-sign" />
              </div>
            </div>
          </div>
        </section>

        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-warning text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#f39c12'}}>
                        🎉 Congratulations, Negative Sign Detective! 🕵️
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your journey through the world of negative signs! 
                        You now have the superpowers to tackle any negative sign challenge that comes your way.
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
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Skills Mastered</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Exponent placement rules</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Double negative operations</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Multiplication sign rules</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Distribution techniques</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Combining like terms</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Real-world applications</span>
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
                              <h5 className="mb-2" style={{color: '#3498db'}}>Next Steps</h5>
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #f39c12, #e67e22)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-rocket-takeoff fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🚀 Ready for the Next Adventure?</h5>
                          <p className="mb-0 lead">
                            Keep practicing and remember: every mathematician was once a beginner. 
                            You're now equipped with the tools to conquer negative signs anywhere they appear!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Learning Journey Progress</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #27ae60, #2ecc71)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>📚 Started Learning</span>
                            <span>🎯 Mastered Concepts</span>
                            <span>🏆 Mission Complete!</span>
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
      </main>
    </div>
  );
  
};
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
  box-shadow: 0 10px 30px rgba(243, 156, 18, 0.3);
}

.trophy-circle {
  box-shadow: 0 8px 25px rgba(243, 156, 18, 0.4);
}
`}
</style>
export default DealingWithNegativeSign;
