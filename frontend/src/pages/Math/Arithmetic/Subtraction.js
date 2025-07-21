// src/pages/math/arithmetic/Subtraction.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Subtraction = () => {
  return (
    <div className="subtraction-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Subtraction</h1>
                  <p className="mb-0">Welcome to our subtraction learning hub. Master the art of taking away with our comprehensive resources and interactive lessons.</p>
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
                <li className="current">Subtraction</li>
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
                      <i className="bi bi-dash-circle-fill me-2"></i>Your Subtraction Mastery Journey!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Subtraction Detective? By the end of this adventure, you'll unlock these amazing powers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-dash-lg"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Take-Away Master!</strong><br />
                                  <small className="text-muted">Find out what's left when things go away</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-arrows-expand"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Borrowing Wizard!</strong><br />
                                  <small className="text-muted">Master the magical art of regrouping numbers</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-calculator"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Quick Calculator!</strong><br />
                                  <small className="text-muted">Solve subtraction problems in seconds</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-cash-coin"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Money Detective!</strong><br />
                                  <small className="text-muted">Calculate change and savings like a pro</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-graph-down"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Difference Finder!</strong><br />
                                  <small className="text-muted">Compare quantities and find differences</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-lightbulb"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Problem Solver!</strong><br />
                                  <small className="text-muted">Think backwards to solve mysteries</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-dash-circle-fill fs-1 text-danger"></i>
                          </div>
                          <h5 className="text-danger mb-2">Master Subtraction!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-danger" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Beginner to Subtraction Champion!</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="adventure-callout bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #e74c3c, #c0392b)'}}>
                        <span className="text-white fs-5">🕵️ Ready to solve the subtraction mysteries? Let's investigate! 🔍</span>
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
                      <i className="bi bi-search me-2"></i>Let's Uncover the Subtraction Secrets!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What is Subtraction? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-dash-lg fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e74c3c'}}>What's Subtraction?</h5>
                              <p className="mb-3">Subtraction is like being a <strong>Number Detective!</strong> You find out what's left when some things disappear or go away! 🕵️‍♂️</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="mb-2">
                                <span className="fs-3">🍪🍪🍪🍪🍪</span> - <span className="fs-3">🍪🍪</span> = <span className="fs-3">🍪🍪🍪</span>
                              </div>
                              <div className="equation-display">
                                <span className="badge bg-primary fs-6">5</span> - 
                                <span className="badge bg-danger fs-6">2</span> = 
                                <span className="badge bg-success fs-6">3</span>
                              </div>
                              <small className="text-muted d-block mt-2">Five cookies, eat two = Three cookies left!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Daily Life Usage */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #9b59b6'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-purple text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', backgroundColor: '#9b59b6'}}>
                              <i className="bi bi-house-heart fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#9b59b6'}}>Your Daily Superpower!</h5>
                              <p className="mb-3">We use subtraction everywhere in India! It's like having <strong>change-finding magic</strong> in your pocket! 🪄</p>
                            </div>
                          </div>
                          
                          <div className="daily-examples">
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-currency-rupee text-success fs-5 me-2"></i>
                              <span><strong>Shopping:</strong> ₹50 - ₹35 = ₹15 change</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-clock text-warning fs-5 me-2"></i>
                              <span><strong>Time Left:</strong> 60 minutes - 25 minutes</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-balloon text-danger fs-5 me-2"></i>
                              <span><strong>Party Fun:</strong> 20 balloons - 8 popped</span>
                            </div>
                            <div className="example-item d-flex align-items-center">
                              <i className="bi bi-pencil text-primary fs-5 me-2"></i>
                              <span><strong>School:</strong> 12 pencils - 4 used</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Fact */}
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
                              <h6 className="text-primary mb-3">Cricket Score Detective!</h6>
                              <div className="cricket-math">
                                <div className="score-display mb-2">
                                  <span className="badge bg-info me-2">Target: 180</span> 🏏
                                </div>
                                <div className="score-display mb-2">
                                  <span className="badge bg-success me-2">Scored: 156</span> ⚡
                                </div>
                                <div className="score-display mb-2">
                                  <span className="badge bg-warning me-2">Balls Left: 12</span> 🔥
                                </div>
                                <hr />
                                <div className="total-count">
                                  <span className="badge bg-danger fs-5">Need: 24 runs!</span> 🎯
                                </div>
                              </div>
                              <small className="text-muted">Subtraction helps calculate what's needed to win!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Activity */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e67e22'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', backgroundColor: '#e67e22'}}>
                              <i className="bi bi-controller fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e67e22'}}>Let's Play Detective! 🔍</h5>
                            </div>
                          </div>
                          
                          <div className="activity-box bg-white border rounded p-3">
                            <h6 className="text-center text-primary mb-3">🍎 The Great Apple Mystery! 🕵️</h6>
                            <ol className="list-steps text-start">
                              <li>Get <strong>10 small objects</strong> (coins, candies, etc.)</li>
                              <li>Count them loudly: <strong>"1, 2, 3... 10!"</strong></li>
                              <li>Hide <strong>4 objects</strong> behind your back</li>
                              <li>Count what's left: <strong>"How many disappeared?"</strong></li>
                              <li>Reveal the answer: <strong>"10 - 4 = 6!"</strong></li>
                            </ol>
                            <div className="text-center mt-3">
                              <div className="celebration bg-gradient p-2 rounded" style={{background: 'linear-gradient(45deg, #e67e22, #d35400)'}}>
                                <span className="text-white small">🎉 You're a subtraction detective now! 🎉</span>
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
                          <h5 className="mb-2">🕵️ Ready to Become a Subtraction Detective? 🔍</h5>
                          <p className="mb-3">Let's discover the secret techniques that make subtraction super easy and fun!</p>
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

        {/* Fundamental Concepts Section */}
        <section className="fundamental-concepts py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#e74c3c'}}>
                  <i className="bi bi-tools me-2"></i>Detective Tools You Need to Master
                </h2>
                <p className="lead">Learn these secret techniques and subtraction becomes child's play! 🕵️‍♂️</p>
              </div>
            </div>

            {/* Place Value Understanding */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-123 me-2"></i>1. Place Value Detective Work
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Know Where Each Digit Lives! 🏠</h5>
                        
                        {/* Visual Place Value Chart */}
                        <div className="place-value-chart bg-white border rounded p-4">
                          <div className="row text-center">
                            <div className="col-4">
                              <div className="place-box bg-danger text-white p-3 rounded mb-2">
                                <h4>H</h4>
                                <small>Hundreds</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="place-box bg-warning text-white p-3 rounded mb-2">
                                <h4>T</h4>
                                <small>Tens</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="place-box bg-success text-white p-3 rounded mb-2">
                                <h4>O</h4>
                                <small>Ones</small>
                              </div>
                            </div>
                          </div>
                          
                          {/* Example Number for Subtraction */}
                          <div className="row text-center mt-3">
                            <div className="col-4">
                              <div className="number-box bg-light border p-3 rounded">
                                <h3 className="text-danger">4</h3>
                                <small>4 hundreds = 400</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="number-box bg-light border p-3 rounded">
                                <h3 className="text-warning">2</h3>
                                <small>2 tens = 20</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="number-box bg-light border p-3 rounded">
                                <h3 className="text-success">5</h3>
                                <small>5 ones = 5</small>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center mt-3">
                            <h4 className="text-primary">425 - 138 = ?</h4>
                            <small className="text-muted">Start from the ones place and work left!</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="visual-example bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Think of it like organizing books! 📚</h6>
                          
                          {/* Visual representation with blocks */}
                          <div className="blocks-container text-center">
                            <div className="subtraction-example mb-3">
                              <h6 className="text-primary">Before Subtraction:</h6>
                              <div className="mb-2">
                                <span className="badge bg-danger me-1">100</span>
                                <span className="badge bg-danger me-1">100</span>
                                <span className="badge bg-danger me-1">100</span>
                                <span className="badge bg-danger me-1">100</span>
                                <span className="fs-6">= 4 hundreds</span>
                              </div>
                              <div className="mb-2">
                                <span className="badge bg-warning me-1">10</span>
                                <span className="badge bg-warning me-1">10</span>
                                <span className="fs-6">= 2 tens</span>
                              </div>
                              <div className="mb-3">
                                <span className="badge bg-success me-1">1</span>
                                <span className="badge bg-success me-1">1</span>
                                <span className="badge bg-success me-1">1</span>
                                <span className="badge bg-success me-1">1</span>
                                <span className="badge bg-success me-1">1</span>
                                <span className="fs-6">= 5 ones</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-info text-center">
                            <i className="bi bi-lightbulb text-warning me-2"></i>
                            <strong>Detective Rule:</strong> Always subtract same place values!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Borrowing Technique */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div class="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div class="card-header bg-white">
                    <h3 class="mb-0" style={{color: '#e74c3c'}}>
                      <i class="bi bi-arrow-left-right me-2"></i>2. The Magic Borrowing Trick!
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-md-6">
                        <h5 class="text-center mb-4">When the Top Number is Smaller! 🎭</h5>
                        
                        {/* Step by step visual */}
                        <div class="borrowing-demo">
                          <div class="step-box bg-light border rounded p-3 mb-3">
                            <h6 class="text-center text-primary">Step 1: The Problem</h6>
                            <div class="math-visual text-center">
                              <div class="number-display fs-3">
                                <div>42</div>
                                <div>-17</div>
                                <div>___</div>
                              </div>
                              <small class="text-danger">Oh no! 2 is smaller than 7!</small>
                            </div>
                          </div>
                          
                          <div class="step-box bg-light border rounded p-3 mb-3">
                            <h6 class="text-center text-success">Step 2: Borrow Magic!</h6>
                            <div class="visual-borrowing text-center">
                              <div class="borrowing-visual mb-3">
                                <div class="fs-4">
                                  <span class="text-decoration-line-through text-danger">4</span>
                                  <span class="text-success fw-bold">3</span>
                                  <span class="text-success fw-bold">12</span>
                                </div>
                                <div class="fs-5">- 1 7</div>
                              </div>
                              <div class="explanation">
                                <small class="text-muted">
                                  Borrow 1 ten (10 ones) from tens place!<br/>
                                  4 becomes 3, and 2 becomes 12
                                </small>
                              </div>
                            </div>
                          </div>
                          
                          <div class="step-box bg-light border rounded p-3">
                            <h6 class="text-center text-info">Step 3: Now Subtract!</h6>
                            <div class="final-calculation text-center">
                              <div class="fs-4 mb-2">
                                12 - 7 = 5<br/>
                                3 - 1 = 2
                              </div>
                              <div class="answer fs-3 text-success fw-bold">
                                Answer: 25
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-6">
                        <div class="analogy-box bg-light p-4 rounded">
                          <h6 class="text-center mb-3">Think Like Money Exchange! 💰</h6>
                          
                          <div class="money-analogy">
                            <div class="mb-4 text-center">
                              <h6 class="text-primary">Before Borrowing:</h6>
                              <div class="money-display bg-white p-3 rounded border">
                                <div class="mb-2">
                                  <span class="badge bg-warning fs-6 me-2">₹10</span>
                                  <span class="badge bg-warning fs-6 me-2">₹10</span>
                                  <span class="badge bg-warning fs-6 me-2">₹10</span>
                                  <span class="badge bg-warning fs-6">₹10</span>
                                </div>
                                <div>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6">₹1</span>
                                </div>
                                <small class="d-block mt-2 text-muted">4 tens + 2 ones = ₹42</small>
                              </div>
                            </div>
                            
                            <div class="text-center mb-3">
                              <i class="bi bi-arrow-down fs-2 text-success"></i>
                              <p class="text-success small"><strong>Exchange 1 ten for 10 ones!</strong></p>
                            </div>
                            
                            <div class="text-center">
                              <h6 class="text-success">After Borrowing:</h6>
                              <div class="money-display bg-white p-3 rounded border">
                                <div class="mb-2">
                                  <span class="badge bg-warning fs-6 me-2">₹10</span>
                                  <span class="badge bg-warning fs-6 me-2">₹10</span>
                                  <span class="badge bg-warning fs-6">₹10</span>
                                </div>
                                <div>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                </div>
                                <div>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6 me-1">₹1</span>
                                  <span class="badge bg-success fs-6">₹1</span>
                                </div>
                                <small class="d-block mt-2 text-muted">3 tens + 12 ones = Still ₹42!</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="alert bg-danger text-white text-center mt-4">
                      <i class="bi bi-exclamation-triangle me-2"></i>
                      <strong>Golden Rule:</strong> When top digit is smaller, borrow from the left neighbor! 🏠➡️🏠
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtraction Strategies */}
            <div class="row mb-5">
              <div class="col-lg-12">
                <div class="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div class="card-header bg-white">
                    <h3 class="mb-0" style={{color: '#27ae60'}}>
                      <i class="bi bi-lightbulb me-2"></i>3. Smart Subtraction Strategies!
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      {/* Count Up Strategy */}
                      <div class="col-md-6 mb-4">
                        <div class="strategy-card bg-light p-4 rounded h-100">
                          <h5 class="text-center mb-3" style={{color: '#27ae60'}}>
                            <i class="bi bi-arrow-up-circle me-2"></i>Count Up Trick!
                          </h5>
                          
                          <div class="visual-demo text-center">
                            <div class="problem-display mb-3">
                              <h6 class="text-primary">Problem: 23 - 18 = ?</h6>
                              <small class="text-muted">Instead of borrowing, count up from 18 to 23!</small>
                            </div>
                            
                            <div class="counting-steps">
                              <div class="step-item bg-white border rounded p-2 mb-2">
                                <span class="badge bg-info me-2">18</span>
                                <i class="bi bi-arrow-right"></i>
                                <span class="badge bg-success ms-2">20</span>
                                <small class="d-block text-muted">+2 to reach 20</small>
                              </div>
                              <div class="step-item bg-white border rounded p-2 mb-2">
                                <span class="badge bg-success me-2">20</span>
                                <i class="bi bi-arrow-right"></i>
                                <span class="badge bg-warning ms-2">23</span>
                                <small class="d-block text-muted">+3 more to reach 23</small>
                              </div>
                              <div class="answer-box bg-success text-white p-2 rounded">
                                <strong>2 + 3 = 5</strong>
                              </div>
                            </div>
                          </div>
                          
                          <div class="alert bg-success text-center mt-3">
                            <strong>Smart Tip:</strong> Great for close numbers! 🎯
                          </div>
                        </div>
                      </div>
                      
                      {/* Break Apart Strategy */}
                      <div class="col-md-6 mb-4">
                        <div class="strategy-card bg-light p-4 rounded h-100">
                          <h5 class="text-center mb-3" style={{color: '#27ae60'}}>
                            <i class="bi bi-puzzle me-2"></i>Break Apart Magic!
                          </h5>
                          
                          <div class="visual-demo text-center">
                            <div class="problem-display mb-3">
                              <h6 class="text-primary">Problem: 85 - 27 = ?</h6>
                              <small class="text-muted">Break the second number into friendly parts!</small>
                            </div>
                            
                            <div class="breaking-steps">
                              <div class="step-item bg-white border rounded p-2 mb-2">
                                <span class="badge bg-danger">27</span> = 
                                <span class="badge bg-warning ms-1">20</span> + 
                                <span class="badge bg-info ms-1">7</span>
                              </div>
                              <div class="step-item bg-white border rounded p-2 mb-2">
                                <span class="badge bg-primary">85</span> - 
                                <span class="badge bg-warning">20</span> = 
                                <span class="badge bg-success">65</span>
                              </div>
                              <div class="step-item bg-white border rounded p-2 mb-2">
                                <span class="badge bg-success">65</span> - 
                                <span class="badge bg-info">7</span> = 
                                <span class="badge bg-success">58</span>
                              </div>
                              <div class="answer-box bg-success text-white p-2 rounded">
                                <strong>Final Answer: 58</strong>
                              </div>
                            </div>
                          </div>
                          
                          <div class="alert bg-info text-center mt-3">
                            <strong>Pro Move:</strong> Subtract tens first, then ones! 💪
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Word Problems */}
            <div class="row mb-5">
              <div class="col-lg-12">
                <div class="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div class="card-header bg-white">
                    <h3 class="mb-0" style={{color: '#f39c12'}}>
                      <i class="bi bi-book me-2"></i>4. Real-World Detective Cases!
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-4 text-center mb-4">
                        <div class="story-card bg-light p-4 rounded h-100">
                          <h5 class="text-warning">🛒 Shopping Detective!</h5>
                          <div class="visual-story">
                            <p class="mb-3">You have <span class="badge bg-success fs-6">₹500</span></p>
                            <div class="mb-3">💰💰💰💰💰</div>
                            <p class="mb-3">You spend <span class="badge bg-danger fs-6">₹375</span></p>
                            <div class="mb-3">
                              <span class="text-danger fs-4">💸💸💸</span>
                            </div>
                            <hr />
                            <p class="mb-2"><strong>Change left:</strong></p>
                            <div class="mb-2">💰💰</div>
                            <h4 class="text-primary">₹500 - ₹375 = ₹125</h4>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-4 text-center mb-4">
                        <div class="story-card bg-light p-4 rounded h-100">
                          <h5 class="text-warning">🎂 Birthday Party Mystery!</h5>
                          <div class="visual-story">
                            <p class="mb-3">Started with: <span class="badge bg-primary fs-6">24</span> balloons</p>
                            <div class="mb-3">
                              <span class="fs-4">🎈🎈🎈🎈🎈🎈</span><br/>
                              <span class="fs-4">🎈🎈🎈🎈🎈🎈</span><br/>
                              <span class="fs-4">🎈🎈🎈🎈🎈🎈</span><br/>
                              <span class="fs-4">🎈🎈🎈🎈🎈🎈</span>
                            </div>
                            <p class="mb-3">Popped: <span class="badge bg-danger fs-6">8</span> balloons</p>
                            <div class="mb-3">
                              <span class="fs-4">💥💥💥💥</span><br/>
                              <span class="fs-4">💥💥💥💥</span>
                            </div>
                            <h4 class="text-primary">24 - 8 = 16 left!</h4>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-4 text-center mb-4">
                        <div class="story-card bg-light p-4 rounded h-100">
                          <h5 class="text-warning">📚 Library Adventure!</h5>
                          <div class="visual-story">
                            <p class="mb-3">Books on shelf: <span class="badge bg-info fs-6">156</span></p>
                            <div class="mb-2">
                              <span class="fs-5">📚📚📚📚📚</span><br/>
                              <span class="fs-5">📚📚📚📚📚</span><br/>
                              <small class="text-muted">...and many more!</small>
                            </div>
                            <p class="mb-3">Students took: <span class="badge bg-success fs-6">89</span> books</p>
                            <div class="mb-3">
                              <span class="fs-4">👨‍🎓👩‍🎓📖📖📖</span>
                            </div>
                            <hr />
                            <p class="mb-2"><strong>Books remaining:</strong></p>
                            <h4 class="text-primary">156 - 89 = 67</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="alert bg-warning text-center">
                      <i class="bi bi-star-fill text-warning me-2"></i>
                      <strong>Detective Tip:</strong> Look for keywords like "left", "remaining", "change", "difference"! 🕵️‍♂️
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Practice */}
            <div class="row">
              <div class="col-lg-12">
                <div class="card shadow border-0" style={{borderTop: '4px solid #8e44ad'}}>
                  <div class="card-header bg-white">
                    <h3 class="mb-0" style={{color: '#8e44ad'}}>
                      <i class="bi bi-check-circle me-2"></i>Quick Detective Training!
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-4 mb-3">
                        <div class="practice-card bg-light p-3 rounded text-center">
                          <h6>Borrowing Challenge</h6>
                          <div class="fs-4 mb-2">
                            <div>  52</div>
                            <div>- 28</div>
                            <div>____</div>
                          </div>
                          <button class="btn btn-purple btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }} style={{backgroundColor: '#8e44ad', borderColor: '#8e44ad', color: 'white'}}>Show Answer</button>
                          <div class="answer mt-2" style={{display: 'none'}}>
                            <span class="badge bg-success">24!</span><br/>
                            <small>Borrow: 12-8=4, 4-2=2</small>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-4 mb-3">
                        <div class="practice-card bg-light p-3 rounded text-center">
                          <h6>Count Up Strategy</h6>
                          <p>How far from 47 to 63?</p>
                          <div class="mb-2">47 ➡️ ? ➡️ 63</div>
                          <button class="btn btn-purple btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }} style={{backgroundColor: '#8e44ad', borderColor: '#8e44ad', color: 'white'}}>Show Answer</button>
                          <div class="answer mt-2" style={{display: 'none'}}>
                            <span class="badge bg-success">16!</span><br/>
                            <small>47→50 (+3), 50→63 (+13)<br/>3+13=16</small>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-4 mb-3">
                        <div class="practice-card bg-light p-3 rounded text-center">
                          <h6>Word Problem Detective</h6>
                          <p>🍎 Ravi had 85 apples. He sold 37. How many are left?</p>
                          <button class="btn btn-purple btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }} style={{backgroundColor: '#8e44ad', borderColor: '#8e44ad', color: 'white'}}>Show Answer</button>
                          <div class="answer mt-2" style={{display: 'none'}}>
                            <span class="badge bg-success">48 apples!</span><br/>
                            <small>85 - 37 = 48</small>
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

        {/* Advanced Techniques Section */}
        <section class="advanced-techniques py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center mb-5">
                <h2 class="mb-3" style={{color: '#e74c3c'}}>
                  <i class="bi bi-lightning-fill me-2"></i>Advanced Detective Techniques
                </h2>
                <p class="lead">Master these and you'll be a subtraction superhero! 🦸‍♂️</p>
              </div>
            </div>

            {/* Multiple Borrowing */}
            <div class="row mb-5">
              <div class="col-lg-12">
                <div class="card shadow border-0" style={{borderTop: '4px solid #e67e22'}}>
                  <div class="card-header bg-white">
                    <h3 class="mb-0" style={{color: '#e67e22'}}>
                      <i class="bi bi-layers me-2"></i>Multiple Borrowing Mastery
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-md-6">
                        <h5 class="text-center mb-4">When You Need to Borrow Twice! 🎭🎭</h5>
                        
                        <div class="multi-borrow-demo">
                          <div class="step-box bg-light border rounded p-3 mb-3">
                            <h6 class="text-center text-primary">Problem: 500 - 287</h6>
                            <div class="math-visual text-center fs-4">
                              <div>500</div>
                              <div>-287</div>
                              <div>____</div>
                            </div>
                          </div>
                          
                          <div class="step-box bg-light border rounded p-3 mb-3">
                            <h6 class="text-center text-warning">Step 1: Borrow from tens to ones</h6>
                            <div class="visual-borrowing text-center">
                              <div class="fs-4 mb-2">
                                <span class="text-decoration-line-through text-danger">0</span>
                                <span class="text-success fw-bold">10</span>
                              </div>
                              <small class="text-muted">But wait! Tens place is 0, so borrow from hundreds!</small>
                            </div>
                          </div>
                          
                          <div class="step-box bg-light border rounded p-3">
                            <h6 class="text-center text-success">Step 2: Final borrowing</h6>
                            <div class="final-borrowing text-center">
                              <div class="fs-4 mb-2">
                                <span class="text-decoration-line-through text-danger">5</span>
                                <span class="text-success fw-bold">4</span>
                                <span class="text-decoration-line-through text-danger">0</span>
                                <span class="text-success fw-bold">9</span>
                                <span class="text-decoration-line-through text-danger">0</span>
                                <span class="text-success fw-bold">10</span>
                              </div>
                              <div class="fs-5">- 2 8 7</div>
                              <div class="fs-4 text-success fw-bold">= 2 1 3</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-6">
                        <div class="analogy-box bg-light p-4 rounded">
                          <h6 class="text-center mb-3">Think Like a Bank Chain! 🏦</h6>
                          
                          <div class="bank-analogy">
                            <div class="bank-step mb-3 text-center">
                              <div class="bank-box bg-danger text-white p-2 rounded mb-2">
                                <strong>Hundreds Bank</strong><br/>
                                Has: 5 × ₹100 = ₹500
                              </div>
                              <i class="bi bi-arrow-down fs-3 text-success"></i>
                              <small class="text-success d-block">Lends ₹100 to Tens Bank</small>
                            </div>
                            
                            <div class="bank-step mb-3 text-center">
                              <div class="bank-box bg-warning text-white p-2 rounded mb-2">
                                <strong>Tens Bank</strong><br/>
                                Gets: ₹100 = 10 × ₹10
                              </div>
                              <i class="bi bi-arrow-down fs-3 text-success"></i>
                              <small class="text-success d-block">Lends ₹10 to Ones Bank</small>
                            </div>
                            
                            <div class="bank-step text-center">
                              <div class="bank-box bg-success text-white p-2 rounded mb-2">
                                <strong>Ones Bank</strong><br/>
                                Gets: ₹10 = 10 × ₹1
                              </div>
                              <small class="text-info d-block">Now has enough to subtract!</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mental Math Tricks */}
            <div class="row mb-5">
              <div class="col-lg-12">
                <div class="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div class="card-header bg-white">
                    <h3 class="mb-0" style={{color: '#9b59b6'}}>
                      <i class="bi bi-brain me-2"></i>Lightning-Fast Mental Tricks
                    </h3>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      {/* Subtracting 9 */}
                      <div class="col-md-6 mb-4">
                        <div class="trick-card bg-light p-4 rounded h-100">
                          <h5 class="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i class="bi bi-9-circle me-2"></i>The Magic of 9!
                          </h5>
                          
                          <div class="visual-demo text-center">
                            <div class="trick-explanation mb-3">
                              <h6 class="text-primary">When subtracting 9:</h6>
                              <p class="small text-muted">Subtract 10, then add 1!</p>
                            </div>
                            
                            <div class="examples">
                              <div class="example-item bg-white border rounded p-2 mb-2">
                                <strong>47 - 9 = ?</strong><br/>
                                <small class="text-muted">47 - 10 + 1 = 37 + 1 = 38</small>
                              </div>
                              <div class="example-item bg-white border rounded p-2 mb-2">
                                <strong>83 - 9 = ?</strong><br/>
                                <small class="text-muted">83 - 10 + 1 = 73 + 1 = 74</small>
                              </div>
                              <div class="example-item bg-white border rounded p-2">
                                <strong>156 - 9 = ?</strong><br/>
                                <small class="text-muted">156 - 10 + 1 = 146 + 1 = 147</small>
                              </div>
                            </div>
                          </div>
                          
                          <div class="alert bg-info text-center mt-3">
                            <strong>Pattern:</strong> Last digit goes down by 1, tens digit goes down by 1! ✨
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtracting from Round Numbers */}
                      <div class="col-md-6 mb-4">
                        <div class="trick-card bg-light p-4 rounded h-100">
                          <h5 class="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i class="bi bi-circle me-2"></i>Round Number Shortcuts!
                          </h5>
                          
                          <div class="visual-demo text-center">
                            <div class="trick-explanation mb-3">
                              <h6 class="text-primary">From 100, 1000, etc.:</h6>
                              <p class="small text-muted">Use the complement rule!</p>
                            </div>
                            
                            <div class="examples">
                              <div class="example-item bg-white border rounded p-2 mb-2">
                                <strong>100 - 37 = ?</strong><br/>
                                <small class="text-muted">Think: What makes 37 become 100?</small><br/>
                                <span class="badge bg-success">63!</span>
                              </div>
                              <div class="example-item bg-white border rounded p-2 mb-2">
                                <strong>1000 - 246 = ?</strong><br/>
                                <small class="text-muted">9-2=7, 9-4=5, 10-6=4</small><br/>
                                <span class="badge bg-success">754!</span>
                              </div>
                              <div class="example-item bg-white border rounded p-2">
                                <strong>500 - 189 = ?</strong><br/>
                                <small class="text-muted">Think: 500 = 499 + 1</small><br/>
                                <span class="badge bg-success">311!</span>
                              </div>
                            </div>
                          </div>
                          
                          <div class="alert bg-success text-center mt-3">
                            <strong>Magic Formula:</strong> For each digit, subtract from 9 (except last from 10)! 🎩
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

        {/* Practice Section with Quiz */}
        <section class="practice-section py-5">
          <div class="container">
            <AdditionQuiz operationType="subtraction" />
          </div>
        </section>

        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-danger text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#e74c3c'}}>
                        🎉 Congratulations, Subtraction Detective! 🕵️‍♂️
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your journey through the mysteries of subtraction! 
                        You now have the detective skills to solve any take-away challenge that comes your way.
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
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Detective Skills Mastered</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Place value detective work</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Borrowing and regrouping magic</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Smart subtraction strategies</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Word problem solving</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Mental math shortcuts</span>
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
                              <h5 className="mb-2" style={{color: '#3498db'}}>Next Investigations</h5>
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #e74c3c, #c0392b)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-search fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🔍 Ready for Your Next Mathematical Mystery?</h5>
                          <p className="mb-0 lead">
                            Keep practicing and remember: every great detective started with simple cases! 
                            You're now equipped with the tools to solve any subtraction mystery that comes your way!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Subtraction Detective Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #e74c3c, #c0392b)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>🔍 Investigation Started</span>
                            <span>🕵️ Clues Discovered</span>
                            <span>🏆 Case Solved!</span>
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
          box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(231, 76, 60, 0.4);
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default Subtraction;
