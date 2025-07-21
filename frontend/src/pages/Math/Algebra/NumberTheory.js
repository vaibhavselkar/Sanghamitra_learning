// src/pages/math/algebra/NumberTheory.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const NumberTheory = () => {
  return (
    <div className="number-theory-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Number Theory</h1>
                  <p className="mb-0">Welcome to the fascinating world of numbers! Discover the hidden patterns, properties, and mysteries that make mathematics magical.</p>
                </div>
              </div>
            </div>
          </div>
          <nav className="breadcrumbs">
            <div className="container">
              <ol>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/math">Math</Link></li>
                <li><Link to="/math/algebra">Algebra</Link></li>
                <li className="current">Number Theory</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Learning Journey Section */}
        <section className="journey-section py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-123 me-2"></i>Your Number Detective Journey!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Number Detective? By the end of this incredible journey, you'll unlock these amazing powers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-search"></i>
                                </div>
                                <div>
                                  <strong className="text-success">Pattern Hunter!</strong><br />
                                  <small className="text-muted">Discover hidden patterns in any sequence</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-shield-check"></i>
                                </div>
                                <div>
                                  <strong className="text-success">Prime Detective!</strong><br />
                                  <small className="text-muted">Identify prime numbers instantly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-diagram-3"></i>
                                </div>
                                <div>
                                  <strong className="text-success">Factor Master!</strong><br />
                                  <small className="text-muted">Break numbers into their building blocks</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-infinity"></i>
                                </div>
                                <div>
                                  <strong className="text-success">Number Line Navigator!</strong><br />
                                  <small className="text-muted">Master positive, negative, and zero</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-calculator"></i>
                                </div>
                                <div>
                                  <strong className="text-success">Division Wizard!</strong><br />
                                  <small className="text-muted">Master divisibility like magic</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-gem"></i>
                                </div>
                                <div>
                                  <strong className="text-success">Number Scientist!</strong><br />
                                  <small className="text-muted">Understand the logic behind numbers</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-123 fs-1 text-success"></i>
                          </div>
                          <h5 className="text-success mb-2">Discover Number Secrets!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-success" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Number Novice to Number Detective!</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="adventure-callout bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #27ae60, #2ecc71)'}}>
                        <span className="text-white fs-5">🔍 Ready to uncover the mysteries of numbers? Let's investigate! 🕵️‍♂️</span>
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
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-lightbulb me-2"></i>What is Number Theory?
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What is Number Theory? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-123 fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#27ae60'}}>The Science of Numbers!</h5>
                              <p className="mb-3">Number Theory is like being a <strong>Number Detective!</strong> We study the amazing properties, patterns, and relationships between numbers! 🔍</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="mb-2">
                                <div className="fs-4 text-primary">1, 2, 3, 5, 8, 13...</div>
                                <small className="text-muted">What's the pattern? 🤔</small>
                              </div>
                              <div className="pattern-reveal mt-3">
                                <div className="fs-6 text-success">Fibonacci Sequence!</div>
                                <small className="text-muted">Each number is the sum of the two before it!</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Why Numbers Matter */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-heart fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e74c3c'}}>Numbers Are Everywhere!</h5>
                              <p className="mb-3">From your heartbeat to the stars above, numbers are the <strong>language of the universe!</strong> 🌟</p>
                            </div>
                          </div>
                          
                          <div className="daily-examples">
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-heart-pulse text-danger fs-5 me-2"></i>
                              <span><strong>Heartbeat:</strong> ~72 beats per minute</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-music-note text-warning fs-5 me-2"></i>
                              <span><strong>Music:</strong> Notes follow number ratios</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-flower1 text-success fs-5 me-2"></i>
                              <span><strong>Flowers:</strong> Petals often follow patterns</span>
                            </div>
                            <div className="example-item d-flex align-items-center">
                              <i className="bi bi-phone text-primary fs-5 me-2"></i>
                              <span><strong>Technology:</strong> Everything runs on numbers!</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Fact */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #f39c12'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-emoji-smile fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#f39c12'}}>Mind-Blowing Number Fact! 🤯</h5>
                            </div>
                          </div>
                          
                          <div className="fact-display bg-white border rounded p-3">
                            <div className="text-center">
                              <h6 className="text-primary mb-3">The Magic of 1089!</h6>
                              <div className="magic-demo">
                                <div className="step mb-2">
                                  <span className="badge bg-info me-2">Step 1:</span> Pick any 3-digit number (like 875)
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-warning me-2">Step 2:</span> Reverse it (578)
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-success me-2">Step 3:</span> Subtract: 875 - 578 = 297
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">Step 4:</span> Reverse result: 792
                                </div>
                                <div className="step">
                                  <span className="badge bg-primary me-2">Step 5:</span> Add: 297 + 792 = 1089!
                                </div>
                              </div>
                              <hr />
                              <div className="magic-result">
                                <span className="badge fs-5" style={{backgroundColor: '#9b59b6', color: 'white'}}>It's ALWAYS 1089!</span> ✨
                              </div>
                              <small className="text-muted">Try it with any 3-digit number!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Number Types Preview */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #9b59b6'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', backgroundColor: '#9b59b6'}}>
                              <i className="bi bi-collection fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#9b59b6'}}>Number Families! 👨‍👩‍👧‍👦</h5>
                            </div>
                          </div>
                          
                          <div className="number-families bg-white border rounded p-3">
                            <div className="family mb-2">
                              <span className="badge bg-primary me-2">Natural</span>
                              <span className="fs-6">1, 2, 3, 4, 5...</span>
                            </div>
                            <div className="family mb-2">
                              <span className="badge bg-success me-2">Whole</span>
                              <span className="fs-6">0, 1, 2, 3, 4...</span>
                            </div>
                            <div className="family mb-2">
                              <span className="badge bg-warning me-2">Even</span>
                              <span className="fs-6">2, 4, 6, 8, 10...</span>
                            </div>
                            <div className="family mb-2">
                              <span className="badge bg-danger me-2">Odd</span>
                              <span className="fs-6">1, 3, 5, 7, 9...</span>
                            </div>
                            <div className="family">
                              <span className="badge bg-info me-2">Prime</span>
                              <span className="fs-6">2, 3, 5, 7, 11...</span>
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

        {/* Fundamental Concepts Section */}
        <section className="fundamental-concepts py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#27ae60'}}>
                  <i className="bi bi-gem me-2"></i>Number Theory Foundations
                </h2>
                <p className="lead">Master these core concepts and numbers will reveal their secrets! 🔍</p>
              </div>
            </div>

            {/* Number Types and Classifications */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e74c3c'}}>
                      <i className="bi bi-collection me-2"></i>1. Number Families & Types
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Natural Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="number-type-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-1-circle me-2"></i>Natural Numbers
                          </h5>
                          
                          <div className="number-demo text-center">
                            <div className="number-line bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-primary">1, 2, 3, 4, 5, 6, 7, 8, 9, 10...</div>
                              <div className="visual-demo mb-2">
                                <div className="counting-visual">
                                  <span className="fs-3">👆 ✌️ 🤟 🖐️</span>
                                </div>
                              </div>
                              <small className="text-muted">The counting numbers we learned as kids!</small>
                            </div>
                          </div>
                          
                          <div className="properties bg-white border rounded p-3">
                            <h6 className="text-primary mb-2">Properties:</h6>
                            <ul className="list-unstyled mb-0">
                              <li>• Start from 1 and go to infinity</li>
                              <li>• Used for counting objects</li>
                              <li>• No fractions or negatives</li>
                              <li>• Also called "Counting Numbers"</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Whole Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="number-type-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-0-circle me-2"></i>Whole Numbers
                          </h5>
                          
                          <div className="number-demo text-center">
                            <div className="number-line bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-success">0, 1, 2, 3, 4, 5, 6, 7, 8, 9...</div>
                              <div className="visual-demo mb-2">
                                <div className="zero-demo">
                                  <span className="fs-3">⭕ 👆 ✌️ 🤟 🖐️</span>
                                </div>
                              </div>
                              <small className="text-muted">Natural numbers PLUS zero!</small>
                            </div>
                          </div>
                          
                          <div className="properties bg-white border rounded p-3">
                            <h6 className="text-success mb-2">Properties:</h6>
                            <ul className="list-unstyled mb-0">
                              <li>• Start from 0 and go to infinity</li>
                              <li>• Include "nothing" (zero)</li>
                              <li>• No fractions or negatives</li>
                              <li>• Perfect for measuring quantities</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Even Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="number-type-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#3498db'}}>
                            <i className="bi bi-pause me-2"></i>Even Numbers
                          </h5>
                          
                          <div className="number-demo text-center">
                            <div className="number-line bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-info">2, 4, 6, 8, 10, 12, 14...</div>
                              <div className="visual-demo mb-2">
                                <div className="even-visual">
                                  <div className="pair-demo">
                                    <span className="badge bg-info me-1">👫</span>
                                    <span className="badge bg-info me-1">👫</span>
                                    <span className="badge bg-info me-1">👫</span>
                                  </div>
                                </div>
                              </div>
                              <small className="text-muted">Numbers that can be split into equal pairs!</small>
                            </div>
                          </div>
                          
                          <div className="properties bg-white border rounded p-3">
                            <h6 className="text-info mb-2">Magic Rules:</h6>
                            <ul className="list-unstyled mb-0">
                              <li>• Always end in 0, 2, 4, 6, or 8</li>
                              <li>• Divisible by 2 with no remainder</li>
                              <li>• Even + Even = Even</li>
                              <li>• Even × Any Number = Even</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Odd Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="number-type-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#f39c12'}}>
                            <i className="bi bi-play me-2"></i>Odd Numbers
                          </h5>
                          
                          <div className="number-demo text-center">
                            <div className="number-line bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-warning">1, 3, 5, 7, 9, 11, 13...</div>
                              <div className="visual-demo mb-2">
                                <div className="odd-visual">
                                  <div className="single-demo">
                                    <span className="badge bg-warning me-1">👫</span>
                                    <span className="badge bg-danger">👤</span>
                                  </div>
                                </div>
                              </div>
                              <small className="text-muted">Numbers with one left over when paired!</small>
                            </div>
                          </div>
                          
                          <div className="properties bg-white border rounded p-3">
                            <h6 className="text-warning mb-2">Magic Rules:</h6>
                            <ul className="list-unstyled mb-0">
                              <li>• Always end in 1, 3, 5, 7, or 9</li>
                              <li>• Leave remainder 1 when divided by 2</li>
                              <li>• Odd + Odd = Even</li>
                              <li>• Odd × Odd = Odd</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-primary text-white text-center mt-4">
                      <i className="bi bi-lightbulb me-2"></i>
                      <strong>Detective Tip:</strong> Every whole number is either even OR odd - never both! 🔍
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prime Numbers and Factorization */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#9b59b6'}}>
                      <i className="bi bi-shield-check me-2"></i>2. Prime Numbers - The Building Blocks!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What are Primes? */}
                      <div className="col-md-6 mb-4">
                        <div className="prime-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-gem me-2"></i>Prime Number Detectives!
                          </h5>
                          
                          <div className="prime-demo text-center">
                            <div className="prime-definition bg-white border rounded p-3 mb-3">
                              <h6 className="text-primary">What makes a number PRIME?</h6>
                              <div className="prime-rules mb-3">
                                <div className="rule-item mb-2">
                                  <span className="badge bg-success me-2">✓</span>
                                  <span>Has exactly 2 factors</span>
                                </div>
                                <div className="rule-item mb-2">
                                  <span className="badge bg-success me-2">✓</span>
                                  <span>Divisible only by 1 and itself</span>
                                </div>
                                <div className="rule-item">
                                  <span className="badge bg-success me-2">✓</span>
                                  <span>Greater than 1</span>
                                </div>
                              </div>
                              <div className="prime-examples">
                                <div className="fs-5 mb-2" style={{color: '#9b59b6'}}>2, 3, 5, 7, 11, 13, 17, 19...</div>
                                <small className="text-muted">The "atoms" of mathematics!</small>
                              </div>
                            </div>
                          </div>
                          
                          <div className="prime-investigation bg-white border rounded p-3">
                            <h6 className="text-center text-info mb-3">🔍 Let's Investigate 7!</h6>
                            <div className="investigation-steps">
                              <div className="step mb-2">
                                <span className="badge bg-primary me-2">1</span>
                                <span>7 ÷ 1 = 7 ✓</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-warning me-2">2</span>
                                <span>7 ÷ 2 = 3.5 ✗</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-warning me-2">3</span>
                                <span>7 ÷ 3 = 2.33... ✗</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-primary me-2">7</span>
                                <span>7 ÷ 7 = 1 ✓</span>
                              </div>
                              <div className="conclusion mt-3">
                                <span className="badge bg-success">Verdict: 7 is PRIME!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Composite Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="composite-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-puzzle me-2"></i>Composite Numbers
                          </h5>
                          
                          <div className="composite-demo text-center">
                            <div className="composite-definition bg-white border rounded p-3 mb-3">
                              <h6 className="text-warning">What makes a number COMPOSITE?</h6>
                              <div className="composite-examples">
                                <div className="fs-5 mb-2" style={{color: '#e67e22'}}>4, 6, 8, 9, 10, 12, 14, 15...</div>
                                <small className="text-muted">Numbers that can be built from primes!</small>
                              </div>
                            </div>
                          </div>
                          
                          <div className="composite-investigation bg-white border rounded p-3">
                            <h6 className="text-center text-warning mb-3">🔍 Let's Break Down 12!</h6>
                            <div className="factorization-steps">
                              <div className="step mb-2">
                                <span className="badge bg-warning me-2">12</span>
                                <span>= 1 × 12</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-warning me-2">12</span>
                                <span>= 2 × 6</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-warning me-2">12</span>
                                <span>= 3 × 4</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-danger me-2">Prime:</span>
                                <span>12 = 2 × 2 × 3</span>
                              </div>
                              <div className="conclusion mt-3">
                                <span className="badge bg-warning">Verdict: 12 is COMPOSITE!</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Factorization */}
                      <div className="col-md-12 mb-4">
                        <div className="factorization-card bg-light p-4 rounded">
                          <h5 className="text-center mb-4" style={{color: '#2c3e50'}}>
                            <i className="bi bi-tree me-2"></i>Prime Factorization - Breaking Numbers Apart!
                          </h5>
                          
                          <div className="row">
                            <div className="col-md-6">
                              <div className="factor-tree bg-white border rounded p-3 mb-3">
                                <h6 className="text-center text-info mb-3">Factor Tree for 24</h6>
                                <div className="tree-visual text-center">
                                  <div className="tree-level mb-2">
                                    <span className="badge bg-primary fs-5">24</span>
                                  </div>
                                  <div className="tree-level mb-2">
                                    <span className="badge bg-info me-3">4</span>
                                    <span className="badge bg-info">6</span>
                                  </div>
                                  <div className="tree-level mb-2">
                                    <span className="badge bg-warning me-1">2</span>
                                    <span className="badge bg-warning me-3">2</span>
                                    <span className="badge bg-success me-1">2</span>
                                    <span className="badge bg-success">3</span>
                                  </div>
                                  <div className="final-factorization mt-3">
                                    <span className="fs-5">24 = 2³ × 3¹</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-md-6">
                              <div className="factor-steps bg-white border rounded p-3">
                                <h6 className="text-center text-success mb-3">Step-by-Step Method</h6>
                                <div className="division-steps">
                                  <div className="step mb-2">
                                    <span className="badge bg-primary me-2">1.</span>
                                    <span>24 ÷ 2 = 12</span>
                                  </div>
                                  <div className="step mb-2">
                                    <span className="badge bg-primary me-2">2.</span>
                                    <span>12 ÷ 2 = 6</span>
                                  </div>
                                  <div className="step mb-2">
                                    <span className="badge bg-primary me-2">3.</span>
                                    <span>6 ÷ 2 = 3</span>
                                  </div>
                                  <div className="step mb-2">
                                    <span className="badge bg-primary me-2">4.</span>
                                    <span>3 ÷ 3 = 1</span>
                                  </div>
                                  <div className="final-answer mt-3">
                                    <span className="badge bg-success">Prime factors: 2, 2, 2, 3</span>
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
            </div>

            {/* Divisibility Rules */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#f39c12'}}>
                      <i className="bi bi-calculator me-2"></i>3. Divisibility Magic Tricks!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Divisibility by 2, 5, 10 */}
                      <div className="col-md-4 mb-4">
                        <div className="divisibility-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#3498db'}}>
                            <i className="bi bi-2-circle me-2"></i>Easy Tricks!
                          </h5>
                          
                          <div className="trick-section mb-3">
                            <h6 className="text-primary">Divisible by 2:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Ends in 0, 2, 4, 6, or 8
                            </div>
                            <div className="examples">
                              <span className="badge bg-success me-1">24</span>
                              <span className="badge bg-success me-1">186</span>
                              <span className="badge bg-danger me-1">37</span>
                              <span className="badge bg-success">1000</span>
                            </div>
                          </div>

                          <div className="trick-section mb-3">
                            <h6 className="text-warning">Divisible by 5:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Ends in 0 or 5
                            </div>
                            <div className="examples">
                              <span className="badge bg-success me-1">25</span>
                              <span className="badge bg-success me-1">150</span>
                              <span className="badge bg-danger me-1">23</span>
                              <span className="badge bg-success">1005</span>
                            </div>
                          </div>

                          <div className="trick-section">
                            <h6 className="text-success">Divisible by 10:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Ends in 0
                            </div>
                            <div className="examples">
                              <span className="badge bg-success me-1">30</span>
                              <span className="badge bg-success me-1">1270</span>
                              <span className="badge bg-danger me-1">125</span>
                              <span className="badge bg-success">5000</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divisibility by 3, 9 */}
                      <div className="col-md-4 mb-4">
                        <div className="divisibility-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-3-circle me-2"></i>Sum Tricks!
                          </h5>
                          
                          <div className="trick-section mb-3">
                            <h6 className="text-purple" style={{color: '#9b59b6'}}>Divisible by 3:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Sum of digits divisible by 3
                            </div>
                            <div className="example-demo bg-white border rounded p-2 mb-2">
                              <div className="demo-number">123: 1+2+3 = 6</div>
                              <div className="result">6÷3 = 2 ✓</div>
                            </div>
                            <div className="examples">
                              <span className="badge bg-success me-1">12</span>
                              <span className="badge bg-success me-1">456</span>
                              <span className="badge bg-danger me-1">14</span>
                              <span className="badge bg-success">789</span>
                            </div>
                          </div>

                          <div className="trick-section">
                            <h6 className="text-purple" style={{color: '#9b59b6'}}>Divisible by 9:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Sum of digits divisible by 9
                            </div>
                            <div className="example-demo bg-white border rounded p-2 mb-2">
                              <div className="demo-number">432: 4+3+2 = 9</div>
                              <div className="result">9÷9 = 1 ✓</div>
                            </div>
                            <div className="examples">
                              <span className="badge bg-success me-1">18</span>
                              <span className="badge bg-success me-1">567</span>
                              <span className="badge bg-danger me-1">34</span>
                              <span className="badge bg-success">999</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Divisibility by 4, 6, 8 */}
                      <div className="col-md-4 mb-4">
                        <div className="divisibility-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-4-circle me-2"></i>Advanced Tricks!
                          </h5>
                          
                          <div className="trick-section mb-3">
                            <h6 className="text-danger">Divisible by 4:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Last 2 digits divisible by 4
                            </div>
                            <div className="example-demo bg-white border rounded p-2 mb-2">
                              <div className="demo-number">1324: Check 24</div>
                              <div className="result">24÷4 = 6 ✓</div>
                            </div>
                          </div>

                          <div className="trick-section mb-3">
                            <h6 className="text-warning">Divisible by 6:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Divisible by both 2 AND 3
                            </div>
                            <div className="example-demo bg-white border rounded p-2 mb-2">
                              <div className="demo-number">42: Even ✓ & 4+2=6÷3 ✓</div>
                            </div>
                          </div>

                          <div className="trick-section">
                            <h6 className="text-info">Divisible by 8:</h6>
                            <div className="rule bg-white border rounded p-2 mb-2">
                              <strong>Rule:</strong> Last 3 digits divisible by 8
                            </div>
                            <div className="example-demo bg-white border rounded p-2 mb-2">
                              <div className="demo-number">5816: Check 816</div>
                              <div className="result">816÷8 = 102 ✓</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-warning text-center mt-4">
                      <i className="bi bi-magic me-2"></i>
                      <strong>Magic Tip:</strong> These tricks save tons of time in calculations! 🎩
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Number Patterns and Sequences */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #16a085'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#16a085'}}>
                      <i className="bi bi-graph-up me-2"></i>4. Amazing Number Patterns!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Fibonacci Sequence */}
                      <div className="col-md-6 mb-4">
                        <div className="pattern-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#16a085'}}>
                            <i className="bi bi-flower1 me-2"></i>Fibonacci - Nature's Pattern!
                          </h5>
                          
                          <div className="fibonacci-demo text-center">
                            <div className="sequence bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-primary">1, 1, 2, 3, 5, 8, 13, 21, 34...</div>
                              <div className="rule-explanation">
                                <small className="text-muted">Each number = sum of the two before it!</small>
                              </div>
                            </div>
                            
                            <div className="fibonacci-math bg-white border rounded p-3 mb-3">
                              <h6 className="text-info mb-2">How it works:</h6>
                              <div className="math-steps">
                                <div className="step">1 + 1 = 2</div>
                                <div className="step">1 + 2 = 3</div>
                                <div className="step">2 + 3 = 5</div>
                                <div className="step">3 + 5 = 8</div>
                                <div className="step">5 + 8 = 13...</div>
                              </div>
                            </div>
                            
                            <div className="nature-examples">
                              <h6 className="text-success">Found in Nature! 🌿</h6>
                              <div className="examples">
                                <span className="badge bg-success me-1">🌻 Sunflower seeds</span>
                                <span className="badge bg-success me-1">🐚 Nautilus shells</span>
                                <span className="badge bg-success">🌸 Flower petals</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Square Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="pattern-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-square me-2"></i>Perfect Squares!
                          </h5>
                          
                          <div className="squares-demo text-center">
                            <div className="sequence bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-warning">1, 4, 9, 16, 25, 36, 49, 64...</div>
                              <div className="rule-explanation">
                                <small className="text-muted">Numbers multiplied by themselves!</small>
                              </div>
                            </div>
                            
                            <div className="visual-squares bg-white border rounded p-3 mb-3">
                              <h6 className="text-warning mb-2">Visual Squares:</h6>
                              <div className="square-visual">
                                <div className="square-demo mb-2">
                                  <span className="fs-6">2² = 4:</span>
                                  <div className="mini-grid">
                                    <span className="badge bg-warning me-1">⬜⬜</span>
                                    <div><span className="badge bg-warning">⬜⬜</span></div>
                                  </div>
                                </div>
                                <div className="square-demo">
                                  <span className="fs-6">3² = 9:</span>
                                  <div className="mini-grid">
                                    <span className="badge bg-warning me-1">⬜⬜⬜</span>
                                    <div><span className="badge bg-warning me-1">⬜⬜⬜</span></div>
                                    <div><span className="badge bg-warning">⬜⬜⬜</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="square-pattern">
                              <h6 className="text-warning">Pattern Discovery:</h6>
                              <div className="pattern-math">
                                <div>1² = 1</div>
                                <div>2² = 4</div>
                                <div>3² = 9</div>
                                <div>4² = 16</div>
                                <div>5² = 25</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Triangular Numbers */}
                      <div className="col-md-6 mb-4">
                        <div className="pattern-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#8e44ad'}}>
                            <i className="bi bi-triangle me-2"></i>Triangular Numbers!
                          </h5>
                          
                          <div className="triangular-demo text-center">
                            <div className="sequence bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2" style={{color: '#8e44ad'}}>1, 3, 6, 10, 15, 21, 28...</div>
                              <div className="rule-explanation">
                                <small className="text-muted">Numbers that form triangles!</small>
                              </div>
                            </div>
                            
                            <div className="triangle-visual bg-white border rounded p-3">
                              <h6 style={{color: '#8e44ad'}} className="mb-2">Triangle Patterns:</h6>
                              <div className="triangle-demos">
                                <div className="tri-demo mb-2">
                                  <div className="fs-6">T₁ = 1:</div>
                                  <div className="fs-4">●</div>
                                </div>
                                <div className="tri-demo mb-2">
                                  <div className="fs-6">T₂ = 3:</div>
                                  <div className="fs-4">●</div>
                                  <div className="fs-4">●●</div>
                                </div>
                                <div className="tri-demo">
                                  <div className="fs-6">T₃ = 6:</div>
                                  <div className="fs-4">●</div>
                                  <div className="fs-4">●●</div>
                                  <div className="fs-4">●●●</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Arithmetic Sequences */}
                      <div className="col-md-6 mb-4">
                        <div className="pattern-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-arrow-right me-2"></i>Arithmetic Sequences!
                          </h5>
                          
                          <div className="arithmetic-demo text-center">
                            <div className="sequence bg-white border rounded p-3 mb-3">
                              <div className="fs-4 mb-2 text-success">2, 5, 8, 11, 14, 17...</div>
                              <div className="rule-explanation">
                                <small className="text-muted">Add the same number each time!</small>
                              </div>
                            </div>
                            
                            <div className="arithmetic-pattern bg-white border rounded p-3">
                              <h6 className="text-success mb-2">Pattern Analysis:</h6>
                              <div className="pattern-steps">
                                <div className="step">2 + 3 = 5</div>
                                <div className="step">5 + 3 = 8</div>
                                <div className="step">8 + 3 = 11</div>
                                <div className="step">11 + 3 = 14</div>
                                <div className="common-diff mt-2">
                                  <span className="badge bg-success">Common Difference: +3</span>
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

            {/* Quick Practice */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-check-circle me-2"></i>Quick Detective Training!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Prime or Composite?</h6>
                          <div className="number-question mb-2">
                            <span className="fs-2 text-primary">17</span>
                          </div>
                          <p>Is this number prime or composite?</p>
                          <button className="btn btn-success btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">Prime!</span><br/>
                            <small>Only divisible by 1 and 17</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Divisibility Detective</h6>
                          <p>Is 456 divisible by 3?</p>
                          <div className="hint mb-2">
                            <small className="text-muted">Remember the sum rule!</small>
                          </div>
                          <button className="btn btn-success btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">Yes!</span><br/>
                            <small>4+5+6=15, and 15÷3=5</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Pattern Hunter</h6>
                          <p>What's next in this sequence?</p>
                          <div className="pattern-sequence mb-2">
                            <span className="badge bg-warning me-1">2</span>
                            <span className="badge bg-warning me-1">4</span>
                            <span className="badge bg-warning me-1">7</span>
                            <span className="badge bg-warning me-1">11</span>
                            <span className="badge bg-secondary">?</span>
                          </div>
                          <button className="btn btn-success btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">16!</span><br/>
                            <small>+2, +3, +4, +5... pattern</small>
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

        {/* Real-World Applications */}
        <section className="applications-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#27ae60'}}>
                  <i className="bi bi-globe me-2"></i>Number Theory in the Real World
                </h2>
                <p className="lead">See how number patterns power everything around us! 🌍</p>
              </div>
            </div>

            <div className="row">
              {/* Technology & Security */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                  <h5 className="mb-3" style={{color: '#3498db'}}>
                    <i className="bi bi-shield-lock me-2"></i>Technology & Security
                  </h5>
                  
                  <div className="tech-examples">
                    <div className="example bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">🔐 Internet Security</h6>
                      <div className="tech-explanation">
                        <div>Prime numbers protect your passwords!</div>
                        <div className="calculation mt-2">
                          <small className="text-muted">
                            Banks use huge primes (like 2^2048-1) to encrypt data
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-white border rounded p-3 mb-3">
                      <h6 className="text-success">📱 Phone Numbers</h6>
                      <div className="tech-explanation">
                        <div>Check digits use divisibility rules!</div>
                        <div className="calculation mt-2">
                          <small className="text-muted">
                            Credit cards use mod-10 algorithm
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-white border rounded p-3">
                      <h6 className="text-warning">💻 Computer Science</h6>
                      <div className="tech-explanation">
                        <div>Hash functions use number theory</div>
                        <div className="calculation mt-2">
                          <small className="text-muted">
                            Bitcoin mining involves prime factorization
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Nature & Art */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                  <h5 className="mb-3" style={{color: '#27ae60'}}>
                    <i className="bi bi-flower1 me-2"></i>Nature & Art
                  </h5>
                  
                  <div className="nature-examples">
                    <div className="example bg-white border rounded p-3 mb-3">
                      <h6 className="text-success">🌻 Golden Ratio</h6>
                      <div className="nature-explanation">
                        <div>Fibonacci creates the golden ratio (1.618...)</div>
                        <div className="calculation mt-2">
                          <small className="text-muted">
                            Found in sunflowers, shells, and human faces!
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">🎵 Music Theory</h6>
                      <div className="nature-explanation">
                        <div>Musical harmonies follow number ratios</div>
                        <div className="calculation mt-2">
                          <small className="text-muted">
                            Perfect fifth = 3:2 ratio
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-white border rounded p-3">
                      <h6 className="text-info">🏛️ Architecture</h6>
                      <div className="nature-explanation">
                        <div>Ancient buildings use perfect proportions</div>
                        <div className="calculation mt-2">
                          <small className="text-muted">
                            Parthenon uses golden ratio dimensions
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Section with Quiz */}
        <section className="practice-section py-5">
          <div className="container">
            <AdditionQuiz operationType="number-theory" />
          </div>
        </section>

        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-success text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#27ae60'}}>
                        🎉 Congratulations, Number Detective! 🕵️‍♂️
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your investigation into the fascinating world of numbers! 
                        You now have the detective skills to uncover patterns, identify primes, and understand the hidden secrets that numbers hold.
                      </p>
                    </div>

                    {/* Achievement Cards */}
                    <div className="row mt-5">
                      <div className="col-md-6 mb-4">
                        <div className="achievement-card bg-light p-4 rounded shadow-sm h-100" style={{borderLeft: '4px solid #3498db'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-check-circle fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#3498db'}}>Detective Powers Mastered</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Number types and classifications</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Prime and composite identification</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Prime factorization techniques</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Divisibility magic tricks</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Pattern recognition and sequences</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Real-world number applications</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="achievement-card bg-light p-4 rounded shadow-sm h-100" style={{borderLeft: '4px solid #27ae60'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-star fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Next Mathematical Adventures</h5>
                            </div>
                          </div>
                          
                          <div className="next-steps">
                            <div className="step-item mb-3">
                              <Link to="/math/algebra" className="btn btn-success btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Algebra
                              </Link>
                            </div>
                            <div className="step-item mb-3">
                              <Link to="/math/algebra/units" className="btn btn-outline-success btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-rulers me-2"></i>
                                Continue to Units
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #27ae60, #2ecc71)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-search fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🔍 Ready for Your Next Mathematical Mystery?</h5>
                          <p className="mb-0 lead">
                            You've unlocked the secrets of numbers! With your detective skills, you're now ready to tackle 
                            more advanced algebra concepts. Remember: every mathematician started by understanding numbers!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Number Detective Journey</h6>
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
                            <span>🔍 Novice Detective Started</span>
                            <span>🕵️‍♂️ Patterns Discovered</span>
                            <span>🏆 Master Detective!</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Number Theory Fun Facts */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="fun-facts-card bg-gradient p-4 rounded" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}}>
                          <h6 className="text-center mb-4" style={{color: '#2c3e50'}}>
                            <i className="bi bi-lightbulb me-2"></i>Amazing Number Facts You Now Know!
                          </h6>
                          <div className="row">
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">🔢</div>
                                <div className="small">
                                  <strong>Infinite Primes</strong><br/>
                                  There are infinitely many prime numbers!
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">🌻</div>
                                <div className="small">
                                  <strong>Fibonacci Everywhere</strong><br/>
                                  Appears in pinecones, pineapples, and galaxies!
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">🔐</div>
                                <div className="small">
                                  <strong>Security Shield</strong><br/>
                                  Large primes protect all internet communication!
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">✨</div>
                                <div className="small">
                                  <strong>1089 Magic</strong><br/>
                                  The mysterious number that always appears!
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

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
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
          box-shadow: 0 10px 30px rgba(39, 174, 96, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(39, 174, 96, 0.4);
        }

        .number-type-card:hover,
        .prime-card:hover,
        .composite-card:hover,
        .pattern-card:hover,
        .divisibility-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .practice-card:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease;
        }

        .application-card:hover {
          transform: translateY(-3px);
          transition: transform 0.3s ease;
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default NumberTheory;
