// src/pages/math/arithmetic/Division.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Division = () => {
  return (
    <div className="division-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Division</h1>
                  <p className="mb-0">Welcome to our division learning hub. Master the art of fair sharing and equal grouping with our comprehensive resources and interactive lessons.</p>
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
                <li className="current">Division</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Learning Journey Section */}
<section className="journey-section py-3">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
          <div className="card-header bg-white">
            <h3 className="mb-0" style={{color: '#f39c12'}}>
              <i className="bi bi-pie-chart-fill me-2"></i>Your Division Mastery Adventure!
            </h3>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-8">
                <p className="lead mb-4">Ready to become a Fair Sharing Champion? By the end of this exciting journey, you'll unlock these incredible superpowers:</p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex align-items-start">
                        <div className="power-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-diagram-3"></i>
                        </div>
                        <div>
                          <strong className="text-warning">Fair Sharing Expert!</strong><br />
                          <small className="text-muted">Divide things equally among groups perfectly</small>
                        </div>
                      </li>
                      <li className="mb-3 d-flex align-items-start">
                        <div className="power-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-scissors"></i>
                        </div>
                        <div>
                          <strong className="text-warning">Split Master!</strong><br />
                          <small className="text-muted">Break big numbers into smaller parts easily</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex align-items-start">
                        <div className="power-icon bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-currency-exchange"></i>
                        </div>
                        <div>
                          <strong className="text-warning">Money Splitter!</strong><br />
                          <small className="text-muted">Share money and costs fairly among friends</small>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="adventure-visual bg-light rounded p-4">
                  <div className="mb-3">
                    <i className="bi bi-pie-chart fs-1 text-warning"></i>
                  </div>
                  <h5 className="text-warning mb-2">Divide & Conquer!</h5>
                  <div className="progress mb-3" style={{height: '8px'}}>
                    <div className="progress-bar bg-warning" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                  </div>
                  <p className="small text-muted mb-0">From Beginner to Division Champion!</p>
                </div>
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
              <i className="bi bi-share me-2"></i>Discover the Division Magic!
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              {/* What is Division? */}
              <div className="col-md-6 mb-4">
                <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #f39c12'}}>
                  <div className="d-flex align-items-start mb-3">
                    <div className="icon-box bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                      <i className="bi bi-distribute-horizontal fs-4"></i>
                    </div>
                    <div>
                      <h5 className="mb-2" style={{color: '#f39c12'}}>What's Division?</h5>
                      <p className="mb-3">Division is like being a <strong>Fair Sharing Champion!</strong> You take a big group and split it into equal smaller groups! 🎯</p>
                    </div>
                  </div>
                  
                  <div className="visual-example bg-white border rounded p-3">
                    <div className="text-center">
                      <div className="mb-2">
                        <span className="fs-3">🍎🍎🍎🍎🍎🍎🍎🍎</span>
                      </div>
                      <div className="equation-display">
                        <span className="badge bg-primary fs-6">8</span> ÷ 
                        <span className="badge bg-success fs-6">4</span> = 
                        <span className="badge bg-warning fs-6">2</span>
                      </div>
                      <small className="text-muted d-block mt-2">8 apples shared among 4 friends = 2 apples each!</small>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Add more intro cards here as needed */}
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
        <h2 className="mb-3" style={{color: '#f39c12'}}>
          <i className="bi bi-tools me-2"></i>Division Champion Toolkit
        </h2>
        <p className="lead">Master these powerful concepts and division becomes super easy! 🛠️</p>
      </div>
    </div>

    {/* Long Division Process */}
    <div className="row mb-5">
      <div className="col-lg-12">
        <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
          <div className="card-header bg-white">
            <h3 className="mb-0" style={{color: '#3498db'}}>
              <i className="bi bi-ladder me-2"></i>3. Long Division - Step by Step!
            </h3>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                {/* Your existing DMSB content goes here */}
                        <h5 className="text-center mb-4">The DMSB Method! 📝</h5>
                        
                        <div className="long-division-demo">
                          <div className="method-acronym bg-white border rounded p-3 mb-3">
                            <h6 className="text-center text-primary mb-3">Remember: D-M-S-B</h6>
                            <div className="acronym-breakdown">
                              <div className="step-letter d-flex align-items-center mb-2">
                                <span className="badge bg-primary me-2">D</span>
                                <strong>Divide</strong> - How many times does divisor go into dividend?
                              </div>
                              <div className="step-letter d-flex align-items-center mb-2">
                                <span className="badge bg-success me-2">M</span>
                                <strong>Multiply</strong> - Multiply the quotient by divisor
                              </div>
                              <div className="step-letter d-flex align-items-center mb-2">
                                <span className="badge bg-warning me-2">S</span>
                                <strong>Subtract</strong> - Subtract from the dividend
                              </div>
                              <div className="step-letter d-flex align-items-center">
                                <span className="badge bg-info me-2">B</span>
                                <strong>Bring down</strong> - Bring down the next digit
                              </div>
                            </div>
                          </div>
                          
                          <div className="example-problem text-center">
                            <h6 className="text-success">Example: 84 ÷ 4</h6>
                            <div className="long-division-visual bg-light border rounded p-3">
                              <div className="division-setup fs-4">
                                <div className="mb-2">   21</div>
                                <div className="mb-2">4 | 84</div>
                                <div className="mb-2">   -8↓</div>
                                <div className="mb-2">   ---</div>
                                <div className="mb-2">    04</div>
                                <div className="mb-2">    -4</div>
                                <div className="mb-2">    --</div>
                                <div>     0</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="step-by-step bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Step-by-Step Breakdown! 🔍</h6>
                          
                          <div className="steps-breakdown">
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header d-flex align-items-center mb-2">
                                <span className="badge bg-primary me-2">1</span>
                                <strong className="text-primary">Divide: 8 ÷ 4</strong>
                              </div>
                              <div className="step-content">
                                <p className="small mb-1">How many times does 4 go into 8?</p>
                                <div className="calculation">4 × 2 = 8, so the answer is 2!</div>
                              </div>
                            </div>
                            
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header d-flex align-items-center mb-2">
                                <span className="badge bg-success me-2">2</span>
                                <strong className="text-success">Multiply: 2 × 4 = 8</strong>
                              </div>
                              <div className="step-content">
                                <p className="small mb-1">Write 8 under the first 8</p>
                              </div>
                            </div>
                            
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header d-flex align-items-center mb-2">
                                <span className="badge bg-warning me-2">3</span>
                                <strong className="text-warning">Subtract: 8 - 8 = 0</strong>
                              </div>
                              <div className="step-content">
                                <p className="small mb-1">Subtract and get 0</p>
                              </div>
                            </div>
                            
                            <div className="step-item bg-white border rounded p-3 mb-3">
                              <div className="step-header d-flex align-items-center mb-2">
                                <span className="badge bg-info me-2">4</span>
                                <strong className="text-info">Bring down: Bring down 4</strong>
                              </div>
                              <div className="step-content">
                                <p className="small mb-1">Now we have 04 (which is just 4)</p>
                              </div>
                            </div>
                            
                            <div className="step-item bg-success text-white rounded p-3">
                              <div className="step-header mb-2">
                                <strong>Repeat: 4 ÷ 4 = 1</strong>
                              </div>
                              <div className="step-content">
                                <p className="small mb-1">Final answer: 21! ✅</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-primary text-white text-center mt-4">
                      <i className="bi bi-lightbulb me-2"></i>
                      <strong>Memory Trick:</strong> "Dad, Mom, Sister, Brother" for D-M-S-B! 👨‍👩‍👧‍👦
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Division Strategies */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#9b59b6'}}>
                      <i className="bi bi-lightning me-2"></i>4. Quick Division Tricks!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Dividing by 10, 100, 1000 */}
                      <div className="col-md-6 mb-4">
                        <div className="trick-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-speedometer me-2"></i>Super Speed Tricks!
                          </h5>
                          
                          <div className="speed-tricks">
                            <div className="trick-section mb-3">
                              <h6 className="text-primary">Dividing by 10</h6>
                              <div className="trick-examples">
                                <div className="example bg-white border rounded p-2 mb-2">
                                  <strong>350 ÷ 10 = 35</strong> (Remove one zero!)
                                </div>
                                <div className="example bg-white border rounded p-2 mb-2">
                                  <strong>4,780 ÷ 10 = 478</strong> (Remove one zero!)
                                </div>
                                <div className="pattern-explanation">
                                  <small className="text-primary"><strong>Pattern:</strong> Just remove one zero from the end!</small>
                                </div>
                              </div>
                            </div>
                            
                            <div className="trick-section mb-3">
                              <h6 className="text-success">Dividing by 100</h6>
                              <div className="trick-examples">
                                <div className="example bg-white border rounded p-2 mb-2">
                                  <strong>3,500 ÷ 100 = 35</strong> (Remove two zeros!)
                                </div>
                                <div className="example bg-white border rounded p-2 mb-2">
                                  <strong>47,800 ÷ 100 = 478</strong> (Remove two zeros!)
                                </div>
                                <div className="pattern-explanation">
                                  <small className="text-success"><strong>Pattern:</strong> Remove two zeros from the end!</small>
                                </div>
                              </div>
                            </div>
                            
                            <div className="trick-section">
                              <h6 className="text-warning">Dividing by 5</h6>
                              <div className="trick-examples">
                                <div className="example bg-white border rounded p-2 mb-2">
                                  <strong>45 ÷ 5 = 9</strong> (45 × 2 = 90, then ÷ 10 = 9)
                                </div>
                                <div className="example bg-white border rounded p-2 mb-2">
                                  <strong>85 ÷ 5 = 17</strong> (85 × 2 = 170, then ÷ 10 = 17)
                                </div>
                                <div className="pattern-explanation">
                                  <small className="text-warning"><strong>Trick:</strong> Multiply by 2, then divide by 10!</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Estimation and Checking */}
                      <div className="col-md-6 mb-4">
                        <div className="trick-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-bullseye me-2"></i>Smart Estimation!
                          </h5>
                          
                          <div className="estimation-strategies">
                            <div className="strategy-section mb-3">
                              <h6 className="text-info">Round & Estimate</h6>
                              <div className="estimation-example bg-white border rounded p-3">
                                <div className="problem mb-2">
                                  <strong>Problem:</strong> 387 ÷ 19
                                </div>
                                <div className="estimation-steps">
                                  <div className="step mb-1">
                                    <span className="badge bg-info me-2">1</span>
                                    Round: 387 ≈ 400, 19 ≈ 20
                                  </div>
                                  <div className="step mb-1">
                                    <span className="badge bg-info me-2">2</span>
                                    Estimate: 400 ÷ 20 = 20
                                  </div>
                                  <div className="step mb-1">
                                    <span className="badge bg-success me-2">3</span>
                                    Actual answer should be close to 20!
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="strategy-section mb-3">
                              <h6 className="text-danger">Check Your Work</h6>
                              <div className="checking-method bg-white border rounded p-3">
                                <div className="check-steps">
                                  <div className="step mb-2">
                                    <strong>Method:</strong> Multiply your answer by the divisor
                                  </div>
                                  <div className="example">
                                    <div>If 84 ÷ 4 = 21</div>
                                    <div>Check: 21 × 4 = 84 ✅</div>
                                    <div className="text-success"><strong>Perfect! Our answer is correct!</strong></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="strategy-section">
                              <h6 className="text-warning">Compatible Numbers</h6>
                              <div className="compatible-example bg-white border rounded p-3">
                                <div className="problem mb-2">
                                  <strong>Problem:</strong> 245 ÷ 48
                                </div>
                                <div className="compatible-steps">
                                  <div className="step mb-1">Think: 48 is close to 50</div>
                                  <div className="step mb-1">And 245 is close to 250</div>
                                  <div className="step mb-1">250 ÷ 50 = 5</div>
                                  <div className="step text-success">So answer should be around 5!</div>
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
                <div className="card shadow border-0" style={{borderTop: '4px solid #16a085'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#16a085'}}>
                      <i className="bi bi-check-circle me-2"></i>Quick Champion Training!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Fair Sharing Challenge</h6>
                          <div className="sharing-visual mb-2">
                            <div className="fs-5">🎈🎈🎈🎈🎈🎈🎈🎈</div>
                            <div className="mt-2">Share among 4 friends</div>
                          </div>
                          <p>8 ÷ 4 = ?</p>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">2 balloons each!</span><br/>
                            <small>🎈🎈 🎈🎈 🎈🎈 🎈🎈</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Speed Trick Challenge</h6>
                          <p>What's the pattern?</p>
                          <div className="pattern-sequence mb-2">
                            <div>80 ÷ 10 = 8</div>
                            <div>800 ÷ 100 = 8</div>
                            <div>8000 ÷ ? = 8</div>
                          </div>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">1000!</span><br/>
                            <small>Remove zeros = same number of zeros!</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Word Problem Champion</h6>
                          <p>🍕 A pizza has 24 slices. If 6 friends share equally, how many slices each?</p>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">4 slices each!</span><br/>
                            <small>24 ÷ 6 = 4</small>
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

        {/* Real-World Applications Section */}
        <section className="applications-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#f39c12'}}>
                  <i className="bi bi-globe me-2"></i>Division in the Real World
                </h2>
                <p className="lead">See how division helps us solve everyday problems! 🌍</p>
              </div>
            </div>

            <div className="row">
              {/* Money & Shopping */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                  <h5 className="mb-3" style={{color: '#e74c3c'}}>
                    <i className="bi bi-cart me-2"></i>Money & Fair Sharing
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">🍕 Pizza Party Bill</h6>
                      <div className="scenario-math">
                        <div>Total bill: ₹480</div>
                        <div>Friends: 6 people</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">₹480 ÷ 6 = ₹80 per person</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">🎁 Gift Money Sharing</h6>
                      <div className="scenario-math">
                        <div>Gift money: ₹1,200</div>
                        <div>Cousins: 4 people</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">₹1,200 ÷ 4 = ₹300 each</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">🛒 Bulk Shopping</h6>
                      <div className="scenario-math">
                        <div>24 apples in a box</div>
                        <div>Cost: ₹120</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">₹120 ÷ 24 = ₹5 per apple</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Time & Planning */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                  <h5 className="mb-3" style={{color: '#3498db'}}>
                    <i className="bi bi-clock me-2"></i>Time & Planning
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">📚 Study Schedule</h6>
                      <div className="scenario-math">
                        <div>Total study time: 120 minutes</div>
                        <div>Subjects: 4</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">120 ÷ 4 = 30 minutes per subject</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">🚗 Road Trip Planning</h6>
                      <div className="scenario-math">
                        <div>Distance: 240 km</div>
                        <div>Time: 4 hours</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">240 ÷ 4 = 60 km/hour average speed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">🎮 Gaming Time</h6>
                      <div className="scenario-math">
                        <div>Weekly gaming: 14 hours</div>
                        <div>Days: 7</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">14 ÷ 7 = 2 hours per day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Division Techniques Section */}
        <section className="advanced-techniques py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#f39c12'}}>
                  <i className="bi bi-gem me-2"></i>Advanced Division Mastery
                </h2>
                <p className="lead">Master these advanced techniques and become a division expert! 🏆</p>
              </div>
            </div>

            {/* Decimal Division */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e67e22'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e67e22'}}>
                      <i className="bi bi-currency-dollar me-2"></i>Dividing with Decimals
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Money Problems Made Easy! 💰</h5>
                        
                        <div className="decimal-division-demo">
                          <div className="example-problem bg-white border rounded p-3 mb-3">
                            <h6 className="text-center text-primary">Example: ₹12.50 ÷ 5</h6>
                            <div className="decimal-steps">
                              <div className="step-item bg-light border rounded p-2 mb-2">
                                <strong>Step 1:</strong> Ignore the decimal for now
                                <div className="small text-muted">1250 ÷ 5 = 250</div>
                              </div>
                              <div className="step-item bg-light border rounded p-2 mb-2">
                                <strong>Step 2:</strong> Count decimal places in dividend
                                <div className="small text-muted">12.50 has 2 decimal places</div>
                              </div>
                              <div className="step-item bg-success text-white rounded p-2">
                                <strong>Step 3:</strong> Put decimal back in answer
                                <div>250 becomes ₹2.50</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="real-world-example bg-light border rounded p-3">
                            <h6 className="text-info">🛒 Shopping Example</h6>
                            <div className="shopping-scenario">
                              <p><strong>Problem:</strong> 4 friends buy snacks for ₹23.60. How much does each pay?</p>
                              <div className="solution">
                                <div>₹23.60 ÷ 4</div>
                                <div>= 2360 ÷ 4 (ignore decimal)</div>
                                <div>= 590</div>
                                <div className="text-success">= ₹5.90 each person!</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="decimal-tips bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Pro Tips for Decimals! 💡</h6>
                          
                          <div className="tips-list">
                            <div className="tip-item bg-white border rounded p-3 mb-3">
                              <div className="tip-header d-flex align-items-center mb-2">
                                <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                                <strong className="text-primary">Tip 1: Line up the decimal</strong>
                              </div>
                              <div className="tip-content">
                                <p className="small mb-0">Always keep track of where the decimal point goes in your answer.</p>
                              </div>
                            </div>
                            
                            <div className="tip-item bg-white border rounded p-3 mb-3">
                              <div className="tip-header d-flex align-items-center mb-2">
                                <i className="bi bi-calculator-fill text-success me-2"></i>
                                <strong className="text-success">Tip 2: Check with multiplication</strong>
                              </div>
                              <div className="tip-content">
                                <p className="small mb-0">₹5.90 × 4 should equal ₹23.60 - that's how you know it's right!</p>
                              </div>
                            </div>
                            
                            <div className="tip-item bg-white border rounded p-3">
                              <div className="tip-header d-flex align-items-center mb-2">
                                <i className="bi bi-currency-rupee text-info me-2"></i>
                                <strong className="text-info">Tip 3: Money always has 2 decimals</strong>
                              </div>
                              <div className="tip-content">
                                <p className="small mb-0">₹5.9 should be written as ₹5.90 for money problems.</p>
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

            {/* Word Problem Strategies */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #8e44ad'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#8e44ad'}}>
                      <i className="bi bi-book me-2"></i>Word Problem Detective Skills
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="strategy-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#8e44ad'}}>
                            <i className="bi bi-search me-2"></i>Detective Keywords!
                          </h5>
                          
                          <div className="keywords-section">
                            <div className="keyword-group mb-3">
                              <h6 className="text-primary">🔍 Look for these words:</h6>
                              <div className="keywords-list">
                                <span className="badge bg-primary me-1 mb-1">shared equally</span>
                                <span className="badge bg-success me-1 mb-1">divided among</span>
                                <span className="badge bg-warning me-1 mb-1">split into groups</span>
                                <span className="badge bg-info me-1 mb-1">each person gets</span>
                                <span className="badge bg-danger me-1 mb-1">how many groups</span>
                                <span className="badge bg-secondary me-1 mb-1">average</span>
                                <span className="badge bg-dark me-1 mb-1">per</span>
                              </div>
                            </div>
                            
                            <div className="example-problems">
                              <div className="problem-example bg-white border rounded p-3 mb-2">
                                <p className="mb-2"><strong>Problem:</strong> "72 students are <span className="text-primary">divided equally</span> into 8 classrooms."</p>
                                <div className="solution text-success">
                                  <strong>Solution:</strong> 72 ÷ 8 = 9 students per classroom
                                </div>
                              </div>
                              
                              <div className="problem-example bg-white border rounded p-3">
                                <p className="mb-2"><strong>Problem:</strong> "A rope 45m long is cut into pieces of 5m <span className="text-primary">each</span>."</p>
                                <div className="solution text-success">
                                  <strong>Solution:</strong> 45 ÷ 5 = 9 pieces
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="strategy-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#8e44ad'}}>
                            <i className="bi bi-list-check me-2"></i>Problem-Solving Steps!
                          </h5>
                          
                          <div className="solving-steps">
                            <div className="step-process">
                              <div className="process-step bg-white border rounded p-3 mb-3">
                                <div className="step-header d-flex align-items-center mb-2">
                                  <span className="badge bg-primary me-2">1</span>
                                  <strong className="text-primary">Read & Understand</strong>
                                </div>
                                <ul className="small mb-0">
                                  <li>What is the total amount?</li>
                                  <li>What are we dividing by?</li>
                                  <li>What are we looking for?</li>
                                </ul>
                              </div>
                              
                              <div className="process-step bg-white border rounded p-3 mb-3">
                                <div className="step-header d-flex align-items-center mb-2">
                                  <span className="badge bg-success me-2">2</span>
                                  <strong className="text-success">Identify the Operation</strong>
                                </div>
                                <ul className="small mb-0">
                                  <li>Look for division keywords</li>
                                  <li>Is it sharing or grouping?</li>
                                  <li>Write the division sentence</li>
                                </ul>
                              </div>
                              
                              <div className="process-step bg-white border rounded p-3 mb-3">
                                <div className="step-header d-flex align-items-center mb-2">
                                  <span className="badge bg-warning me-2">3</span>
                                  <strong className="text-warning">Solve & Check</strong>
                                </div>
                                <ul className="small mb-0">
                                  <li>Use long division if needed</li>
                                  <li>Check by multiplying</li>
                                  <li>Does the answer make sense?</li>
                                </ul>
                              </div>
                              
                              <div className="process-step bg-success text-white rounded p-3">
                                <div className="step-header d-flex align-items-center mb-2">
                                  <span className="badge bg-light text-dark me-2">4</span>
                                  <strong>Write Complete Answer</strong>
                                </div>
                                <p className="small mb-0">Include units and answer the question asked!</p>
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

        {/* Final Challenge Section */}
        <section className="final-challenge py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-trophy me-2"></i>Division Champion Challenge!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <h5 className="text-success">🏆 Test Your Division Superpowers! 🏆</h5>
                      <p className="lead">You've learned all the skills - now show what you can do!</p>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-lightning-fill fs-1 text-warning"></i>
                          </div>
                          <h6 className="text-warning">Speed Challenge</h6>
                          <p className="small">Can you solve 10 division problems in 2 minutes?</p>
                          <div className="challenge-button">
                            <span className="badge bg-warning">Coming Soon!</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-puzzle-fill fs-1 text-info"></i>
                          </div>
                          <h6 className="text-info">Word Problem Master</h6>
                          <p className="small">Solve real-world problems using your division skills!</p>
                          <div className="challenge-button">
                            <span className="badge bg-info">Ready Below!</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-star-fill fs-1 text-success"></i>
                          </div>
                          <h6 className="text-success">Division Expert</h6>
                          <p className="small">Mix of all division types - from basic to advanced!</p>
                          <div className="challenge-button">
                            <span className="badge bg-success">Let's Go!</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4">
                      <div className="motivational-message bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #27ae60, #2ecc71)'}}>
                        <span className="text-white fs-5">🌟 Remember: Every expert was once a beginner. You've got this! 🌟</span>
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
            <AdditionQuiz operationType="division" />
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
                        🎉 Congratulations, Fair Sharing Champion! 🏆
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your journey through the world of division! 
                        You now have the champion skills to divide fairly, share equally, and solve any splitting challenge with confidence.
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
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Champion Skills Mastered</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Fair sharing and equal grouping</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Long division (DMSB method)</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Quick division tricks and shortcuts</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Decimal division mastery</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Word problem solving strategies</span>
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
                              <h5 className="mb-2" style={{color: '#3498db'}}>Next Champion Challenges</h5>
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
                            <i className="bi bi-diagram-3 fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🎯 Ready for Your Next Mathematical Challenge?</h5>
                          <p className="mb-0 lead">
                            Keep practicing and remember: every great champion started by learning to share fairly! 
                            You're now equipped with the tools to divide and conquer any mathematical challenge!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Division Champion Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #f39c12, #e67e22)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>🎯 Started Learning</span>
                            <span>⚡ Mastered Techniques</span>
                            <span>🏆 Fair Sharing Champion!</span>
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
          box-shadow: 0 10px 30px rgba(243, 156, 18, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(243, 156, 18, 0.4);
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default Division;
