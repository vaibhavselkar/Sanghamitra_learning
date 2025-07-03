// src/pages/math/arithmetic/Decimals.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Decimals = () => {
  return (
    <div className="decimals-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Decimals</h1>
                  <p className="mb-0">Discover the fascinating world of decimal numbers! Master place values, operations, and real-world applications with our comprehensive learning journey.</p>
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
                <li className="current">Decimals</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Learning Journey Section */}
        <section className="journey-section py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-bullseye me-2"></i>Your Decimal Mastery Adventure!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Decimal Champion? By the end of this exciting journey, you'll unlock these incredible superpowers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-calculator"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Place Value Master!</strong><br />
                                  <small className="text-muted">Understand decimal place values perfectly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-plus-circle"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Operations Expert!</strong><br />
                                  <small className="text-muted">Add, subtract, multiply, and divide decimals</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-currency-rupee"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Money Math Wizard!</strong><br />
                                  <small className="text-muted">Handle money calculations with confidence</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-graph-up"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Real-World Solver!</strong><br />
                                  <small className="text-muted">Apply decimals to everyday situations</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-bullseye fs-1 text-primary"></i>
                          </div>
                          <h5 className="text-primary mb-2">Decimal Precision!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-primary" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Beginner to Decimal Champion!</p>
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
                      <i className="bi bi-lightbulb me-2"></i>Discover the Decimal Magic!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What are Decimals? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-dot fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#3498db'}}>What are Decimals?</h5>
                              <p className="mb-3">Decimals are special numbers that help us express parts of a whole! The <strong>decimal point (.)</strong> separates whole numbers from fractional parts! 🎯</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="decimal-visual mb-3">
                                <span className="fs-2 text-success">24</span>
                                <span className="fs-2 text-danger">.</span>
                                <span className="fs-2 text-warning">36</span>
                              </div>
                              <div className="decimal-labels d-flex justify-content-around">
                                <div>
                                  <span className="badge bg-success">Whole Number</span>
                                </div>
                                <div>
                                  <span className="badge bg-danger">Decimal Point</span>
                                </div>
                                <div>
                                  <span className="badge bg-warning">Fractional Part</span>
                                </div>
                              </div>
                              <small className="text-muted d-block mt-2">24.36 = Twenty-four and thirty-six hundredths</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* The Mystery Question */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-question-circle fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e74c3c'}}>The Big Question!</h5>
                              <p className="mb-3">Is there a number between 1 and 2? 🤔</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="number-line mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="badge bg-primary fs-6">1</span>
                                  <span className="badge bg-success fs-6">1.5</span>
                                  <span className="badge bg-primary fs-6">2</span>
                                </div>
                                <div className="line bg-secondary mt-2" style={{height: '3px'}}></div>
                              </div>
                              <div className="answer-reveal">
                                <p className="text-success mb-2"><strong>Yes! There are infinite numbers!</strong></p>
                                <div className="examples">
                                  <span className="badge bg-success me-1">1.1</span>
                                  <span className="badge bg-success me-1">1.5</span>
                                  <span className="badge bg-success me-1">1.75</span>
                                  <span className="badge bg-success me-1">1.99</span>
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

        {/* Fundamental Concepts Section */}
        <section className="fundamental-concepts py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#3498db'}}>
                  <i className="bi bi-tools me-2"></i>Decimal Champion Toolkit
                </h2>
                <p className="lead">Master these powerful concepts and decimals become super easy! 🛠️</p>
              </div>
            </div>

            {/* Place Value Mastery */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-grid me-2"></i>1. Place Value Power!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Understanding Place Values! 📊</h5>
                        
                        <div className="place-value-demo">
                          <div className="decimal-breakdown bg-white border rounded p-3 mb-3">
                            <h6 className="text-center text-success mb-3">Example: 17.591</h6>
                            <div className="place-value-grid">
                              <div className="row text-center mb-2">
                                <div className="col">
                                  <span className="badge bg-primary">Tens</span>
                                </div>
                                <div className="col">
                                  <span className="badge bg-success">Units</span>
                                </div>
                                <div className="col">
                                  <span className="badge bg-danger">•</span>
                                </div>
                                <div className="col">
                                  <span className="badge bg-warning">Tenths</span>
                                </div>
                                <div className="col">
                                  <span className="badge bg-info">Hundredths</span>
                                </div>
                                <div className="col">
                                  <span className="badge bg-secondary">Thousandths</span>
                                </div>
                              </div>
                              <div className="row text-center">
                                <div className="col">
                                  <span className="fs-4 text-primary">1</span>
                                </div>
                                <div className="col">
                                  <span className="fs-4 text-success">7</span>
                                </div>
                                <div className="col">
                                  <span className="fs-4 text-danger">.</span>
                                </div>
                                <div className="col">
                                  <span className="fs-4 text-warning">5</span>
                                </div>
                                <div className="col">
                                  <span className="fs-4 text-info">9</span>
                                </div>
                                <div className="col">
                                  <span className="fs-4 text-secondary">1</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="value-explanation bg-light border rounded p-3">
                            <h6 className="text-center mb-3">Breaking it Down!</h6>
                            <div className="breakdown-items">
                              <div className="item mb-2">
                                <span className="badge bg-primary me-2">1</span> × 10 = 10
                              </div>
                              <div className="item mb-2">
                                <span className="badge bg-success me-2">7</span> × 1 = 7
                              </div>
                              <div className="item mb-2">
                                <span className="badge bg-warning me-2">5</span> × 0.1 = 0.5
                              </div>
                              <div className="item mb-2">
                                <span className="badge bg-info me-2">9</span> × 0.01 = 0.09
                              </div>
                              <div className="item mb-2">
                                <span className="badge bg-secondary me-2">1</span> × 0.001 = 0.001
                              </div>
                              <div className="total-box bg-success text-white rounded p-2 mt-3 text-center">
                                <strong>Total: 10 + 7 + 0.5 + 0.09 + 0.001 = 17.591</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="memory-tricks bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Memory Tricks! 💡</h6>
                          
                          <div className="tricks-list">
                            <div className="trick-item bg-white border rounded p-3 mb-3">
                              <div className="trick-header d-flex align-items-center mb-2">
                                <i className="bi bi-lightbulb-fill text-warning me-2"></i>
                                <strong className="text-primary">Powers of 10 Pattern</strong>
                              </div>
                              <div className="pattern-demo">
                                <div>1/10 = 0.1</div>
                                <div>1/100 = 0.01</div>
                                <div>1/1000 = 0.001</div>
                                <small className="text-muted">Each place is 10 times smaller!</small>
                              </div>
                            </div>
                            
                            <div className="trick-item bg-white border rounded p-3 mb-3">
                              <div className="trick-header d-flex align-items-center mb-2">
                                <i className="bi bi-arrow-left-right text-success me-2"></i>
                                <strong className="text-success">Left vs Right</strong>
                              </div>
                              <div className="direction-guide">
                                <div>← Left of decimal: <span className="text-success">10× bigger</span></div>
                                <div>→ Right of decimal: <span className="text-warning">10× smaller</span></div>
                              </div>
                            </div>
                            
                            <div className="trick-item bg-white border rounded p-3">
                              <div className="trick-header d-flex align-items-center mb-2">
                                <i className="bi bi-translate text-info me-2"></i>
                                <strong className="text-info">Say it Right!</strong>
                              </div>
                              <div className="pronunciation-guide">
                                <div>24.36 = "Twenty-four <strong>point</strong> three six"</div>
                                <div><small className="text-muted">Not "Twenty-four and thirty-six"</small></div>
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

            {/* Addition and Subtraction */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#f39c12'}}>
                      <i className="bi bi-plus-circle me-2"></i>2. Addition & Subtraction Magic!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Addition Method */}
                      <div className="col-md-6 mb-4">
                        <div className="method-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#f39c12'}}>
                            <i className="bi bi-plus me-2"></i>Line Up & Add!
                          </h5>
                          
                          <div className="addition-demo">
                            <div className="example-problem bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-success">Example: 4.3 + 8.92</h6>
                              <div className="step-by-step">
                                <div className="step mb-2">
                                  <strong>Step 1:</strong> Line up decimal points
                                </div>
                                <div className="visual-calculation text-center bg-light p-2 rounded">
                                  <div className="calculation-layout">
                                    <div style={{fontFamily: 'monospace', fontSize: '1.2em'}}>
                                      <div>  4.30</div>
                                      <div>+ 8.92</div>
                                      <div>------</div>
                                      <div> 13.22</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="step mt-2">
                                  <strong>Step 2:</strong> Add column by column
                                  <ul className="small mt-1">
                                    <li>Hundredths: 0 + 2 = 2</li>
                                    <li>Tenths: 3 + 9 = 12 (carry 1)</li>
                                    <li>Units: 4 + 8 + 1 = 13</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Subtraction Method */}
                      <div className="col-md-6 mb-4">
                        <div className="method-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-dash me-2"></i>Smart Subtraction!
                          </h5>
                          
                          <div className="subtraction-demo">
                            <div className="example-problem bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-danger">Example: 20 - 13.45</h6>
                              <div className="step-by-step">
                                <div className="step mb-2">
                                  <strong>Step 1:</strong> Add zeros to match decimal places
                                </div>
                                <div className="visual-calculation text-center bg-light p-2 rounded">
                                  <div className="calculation-layout">
                                    <div style={{fontFamily: 'monospace', fontSize: '1.2em'}}>
                                      <div> 20.00</div>
                                      <div>-13.45</div>
                                      <div>------</div>
                                      <div>  6.55</div>
                                    </div>
                                  </div>
                                </div>
                                <div className="step mt-2">
                                  <strong>Step 2:</strong> Subtract column by column
                                  <ul className="small mt-1">
                                    <li>Borrow when needed</li>
                                    <li>Keep decimal points aligned</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pro-tips mt-4">
                      <div className="alert bg-warning text-dark">
                        <i className="bi bi-lightbulb me-2"></i>
                        <strong>Pro Tip:</strong> Always line up the decimal points first! Add zeros if needed to make calculations easier.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multiplication by Powers of 10 */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#9b59b6'}}>
                      <i className="bi bi-arrow-right me-2"></i>3. Decimal Point Movement Magic!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Multiplication by 10 */}
                      <div className="col-md-6 mb-4">
                        <div className="movement-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-x me-2"></i>Multiply by 10, 100, 1000
                          </h5>
                          
                          <div className="multiplication-demo">
                            <div className="rule-box bg-success text-white rounded p-3 mb-3 text-center">
                              <strong>Rule: Move decimal point RIGHT!</strong>
                            </div>
                            
                            <div className="examples">
                              <div className="example bg-white border rounded p-3 mb-2">
                                <div className="calculation">
                                  <strong>23.25 × 10 = 232.5</strong>
                                </div>
                                <div className="movement-visual text-center mt-2">
                                  <span>23.25 → 232.5</span>
                                  <div className="small text-success">Decimal moves 1 place right</div>
                                </div>
                              </div>
                              
                              <div className="example bg-white border rounded p-3 mb-2">
                                <div className="calculation">
                                  <strong>23.25 × 100 = 2325</strong>
                                </div>
                                <div className="movement-visual text-center mt-2">
                                  <span>23.25 → 2325.0</span>
                                  <div className="small text-success">Decimal moves 2 places right</div>
                                </div>
                              </div>
                              
                              <div className="pattern-explanation bg-primary text-white rounded p-2 text-center">
                                <small><strong>Pattern:</strong> Number of zeros = Places to move right</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Division by 10 */}
                      <div className="col-md-6 mb-4">
                        <div className="movement-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-slash me-2"></i>Divide by 10, 100, 1000
                          </h5>
                          
                          <div className="division-demo">
                            <div className="rule-box bg-danger text-white rounded p-3 mb-3 text-center">
                              <strong>Rule: Move decimal point LEFT!</strong>
                            </div>
                            
                            <div className="examples">
                              <div className="example bg-white border rounded p-3 mb-2">
                                <div className="calculation">
                                  <strong>78.64 ÷ 10 = 7.864</strong>
                                </div>
                                <div className="movement-visual text-center mt-2">
                                  <span>78.64 → 7.864</span>
                                  <div className="small text-danger">Decimal moves 1 place left</div>
                                </div>
                              </div>
                              
                              <div className="example bg-white border rounded p-3 mb-2">
                                <div className="calculation">
                                  <strong>78.64 ÷ 100 = 0.7864</strong>
                                </div>
                                <div className="movement-visual text-center mt-2">
                                  <span>78.64 → 0.7864</span>
                                  <div className="small text-danger">Decimal moves 2 places left</div>
                                </div>
                              </div>
                              
                              <div className="pattern-explanation bg-warning text-dark rounded p-2 text-center">
                                <small><strong>Pattern:</strong> Number of zeros = Places to move left</small>
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

            {/* Comparing and Rounding */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #16a085'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#16a085'}}>
                      <i className="bi bi-sort-numeric-down me-2"></i>4. Comparing & Rounding Like a Pro!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Comparing Decimals */}
                      <div className="col-md-6 mb-4">
                        <div className="comparison-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#16a085'}}>
                            <i className="bi bi-arrows-collapse me-2"></i>Comparing Decimals
                          </h5>
                          
                          <div className="comparison-method">
                            <div className="steps-box bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-info mb-3">Step-by-Step Method</h6>
                              <div className="steps">
                                <div className="step mb-2">
                                  <span className="badge bg-info me-2">1</span>
                                  Compare whole number parts first
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-info me-2">2</span>
                                  If equal, compare tenths place
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-info me-2">3</span>
                                  Continue with hundredths, thousandths...
                                </div>
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3">
                              <h6 className="text-success">Example: Compare 2.45 and 2.5</h6>
                              <div className="comparison-process">
                                <div>Whole parts: 2 = 2 ✓</div>
                                <div>Tenths: 4 &lt; 5</div>
                                <div className="result text-success mt-2">
                                  <strong>Therefore: 2.45 &lt; 2.5</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Rounding Decimals */}
                      <div className="col-md-6 mb-4">
                        <div className="rounding-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-bullseye me-2"></i>Rounding Decimals
                          </h5>
                          
                          <div className="rounding-method">
                            <div className="rule-box bg-warning text-dark rounded p-3 mb-3">
                              <h6 className="text-center mb-2">The Rounding Rule!</h6>
                              <div className="rules">
                                <div>Look at the digit after rounding place:</div>
                                <div>• If ≥ 5: Round UP</div>
                                <div>• If &lt; 5: Round DOWN</div>
                              </div>
                            </div>
                            
                            <div className="rounding-examples">
                              <div className="example bg-white border rounded p-3 mb-2">
                                <h6 className="text-primary">Round 1.362 to nearest hundredth</h6>
                                <div className="rounding-process">
                                  <div>Look at thousandths: <span className="text-danger">2</span></div>
                                  <div>Since 2 &lt; 5: Round DOWN</div>
                                  <div className="result text-success"><strong>Answer: 1.36</strong></div>
                                </div>
                              </div>
                              
                              <div className="example bg-white border rounded p-3">
                                <h6 className="text-primary">Round 25.378 to nearest tenth</h6>
                                <div className="rounding-process">
                                  <div>Look at hundredths: <span className="text-danger">7</span></div>
                                  <div>Since 7 ≥ 5: Round UP</div>
                                  <div className="result text-success"><strong>Answer: 25.4</strong></div>
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

        {/* Real-World Applications Section */}
        <section className="applications-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#f39c12'}}>
                  <i className="bi bi-globe me-2"></i>Decimals in the Real World
                </h2>
                <p className="lead">See how decimals help us solve everyday problems! 🌍</p>
              </div>
            </div>

            <div className="row">
              {/* Money & Shopping */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                  <h5 className="mb-3" style={{color: '#27ae60'}}>
                    <i className="bi bi-currency-rupee me-2"></i>Money & Shopping
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">🛒 Shopping Bill</h6>
                      <div className="scenario-math">
                        <div>Apples: ₹12.50</div>
                        <div>Milk: ₹23.75</div>
                        <div>Bread: ₹15.25</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">Total: ₹12.50 + ₹23.75 + ₹15.25 = ₹51.50</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">💰 Change Calculation</h6>
                      <div className="scenario-math">
                        <div>Amount paid: ₹100.00</div>
                        <div>Bill amount: ₹87.45</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">Change: ₹100.00 - ₹87.45 = ₹12.55</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">📊 Unit Price</h6>
                      <div className="scenario-math">
                        <div>5 kg apples for ₹125.00</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">Price per kg: ₹125.00 ÷ 5 = ₹25.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Measurements & Science */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                  <h5 className="mb-3" style={{color: '#3498db'}}>
                    <i className="bi bi-rulers me-2"></i>Measurements & Science
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">📏 Length Measurements</h6>
                      <div className="scenario-math">
                        <div>Height: 1.65 meters</div>
                        <div>= 165 centimeters</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">1.65 × 100 = 165 cm</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">🌡️ Temperature</h6>
                      <div className="scenario-math">
                        <div>Body temperature: 98.6°F</div>
                        <div>Normal range: 97.8°F to 99.1°F</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">Within normal range ✓</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">⚖️ Weight</h6>
                      <div className="scenario-math">
                        <div>Baby's weight: 3.2 kg</div>
                        <div>= 3200 grams</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">3.2 × 1000 = 3200 g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Concepts Section */}
        <section className="advanced-concepts py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#8e44ad'}}>
                  <i className="bi bi-gem me-2"></i>Advanced Decimal Mastery
                </h2>
                <p className="lead">Take your decimal skills to the next level! 🚀</p>
              </div>
            </div>

            {/* Decimals and Fractions */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e74c3c'}}>
                      <i className="bi bi-shuffle me-2"></i>Decimals ↔ Fractions Connection
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="conversion-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-arrow-right me-2"></i>Fraction to Decimal
                          </h5>
                          
                          <div className="conversion-examples">
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-primary">Common Conversions</h6>
                              <div className="conversion-grid">
                                <div className="row mb-2">
                                  <div className="col-6">1/2 =</div>
                                  <div className="col-6 text-success">0.5</div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-6">1/4 =</div>
                                  <div className="col-6 text-success">0.25</div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-6">3/4 =</div>
                                  <div className="col-6 text-success">0.75</div>
                                </div>
                                <div className="row mb-2">
                                  <div className="col-6">1/5 =</div>
                                  <div className="col-6 text-success">0.2</div>
                                </div>
                                <div className="row">
                                  <div className="col-6">1/10 =</div>
                                  <div className="col-6 text-success">0.1</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="method bg-info text-white rounded p-3">
                              <strong>Method:</strong> Divide numerator by denominator
                              <div className="example-calc mt-2">
                                3/4 = 3 ÷ 4 = 0.75
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="conversion-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-arrow-left me-2"></i>Decimal to Fraction
                          </h5>
                          
                          <div className="conversion-examples">
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-success">Step-by-Step Method</h6>
                              <div className="conversion-steps">
                                <div className="step mb-2">
                                  <strong>Example: 0.75</strong>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">1</span>
                                  Write as fraction: 75/100
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-success me-2">2</span>
                                  Find GCD of 75 and 100 = 25
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-warning me-2">3</span>
                                  Divide both by 25: 75÷25 = 3, 100÷25 = 4
                                </div>
                                <div className="result bg-success text-white rounded p-2">
                                  <strong>Answer: 3/4</strong>
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

            {/* Common Mistakes */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#f39c12'}}>
                      <i className="bi bi-exclamation-triangle me-2"></i>Avoid These Common Mistakes!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="mistake-card bg-light p-4 rounded text-center h-100">
                          <div className="mistake-icon mb-3">
                            <i className="bi bi-x-circle fs-1 text-danger"></i>
                          </div>
                          <h6 className="text-danger">Mistake #1</h6>
                          <p className="small mb-3">Not lining up decimal points</p>
                          <div className="wrong-example bg-danger text-white rounded p-2 mb-2">
                            <div>4.3</div>
                            <div>+ 8.92</div>
                            <div>Wrong!</div>
                          </div>
                          <div className="correct-example bg-success text-white rounded p-2">
                            <div>  4.30</div>
                            <div>+ 8.92</div>
                            <div>Correct!</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="mistake-card bg-light p-4 rounded text-center h-100">
                          <div className="mistake-icon mb-3">
                            <i className="bi bi-x-circle fs-1 text-danger"></i>
                          </div>
                          <h6 className="text-danger">Mistake #2</h6>
                          <p className="small mb-3">Confusing thousand vs thousandth</p>
                          <div className="clarification">
                            <div className="wrong bg-danger text-white rounded p-2 mb-2">
                              1000 = thousand
                            </div>
                            <div className="correct bg-success text-white rounded p-2">
                              0.001 = thousandth
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="mistake-card bg-light p-4 rounded text-center h-100">
                          <div className="mistake-icon mb-3">
                            <i className="bi bi-x-circle fs-1 text-danger"></i>
                          </div>
                          <h6 className="text-danger">Mistake #3</h6>
                          <p className="small mb-3">Wrong decimal movement direction</p>
                          <div className="direction-reminder">
                            <div className="multiply bg-success text-white rounded p-2 mb-2">
                              × 10: Move RIGHT →
                            </div>
                            <div className="divide bg-warning text-dark rounded p-2">
                              ÷ 10: Move LEFT ←
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

        {/* Interactive Practice Section */}
        <section className="practice-challenges py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-trophy me-2"></i>Decimal Champion Challenges!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <h5 className="text-success">🏆 Test Your Decimal Superpowers! 🏆</h5>
                      <p className="lead">You've learned all the skills - now show what you can do!</p>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-calculator-fill fs-1 text-primary"></i>
                          </div>
                          <h6 className="text-primary">Place Value Master</h6>
                          <p className="small">Identify place values and write decimals in expanded form!</p>
                          <div className="quick-challenge bg-white border rounded p-3">
                            <p className="mb-2"><strong>Quick Challenge:</strong></p>
                            <p>What's the value of 7 in 45.739?</p>
                            <button className="btn btn-primary btn-sm" onClick={(e) => {
                              e.target.nextElementSibling.style.display = 'block';
                              e.target.style.display = 'none';
                            }}>Show Answer</button>
                            <div className="answer mt-2" style={{display: 'none'}}>
                              <span className="badge bg-success">7 hundredths = 0.07</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-plus-circle-fill fs-1 text-warning"></i>
                          </div>
                          <h6 className="text-warning">Operations Expert</h6>
                          <p className="small">Add, subtract, and move decimal points like a pro!</p>
                          <div className="quick-challenge bg-white border rounded p-3">
                            <p className="mb-2"><strong>Quick Challenge:</strong></p>
                            <p>12.75 + 3.8 = ?</p>
                            <button className="btn btn-warning btn-sm" onClick={(e) => {
                              e.target.nextElementSibling.style.display = 'block';
                              e.target.style.display = 'none';
                            }}>Show Answer</button>
                            <div className="answer mt-2" style={{display: 'none'}}>
                              <span className="badge bg-success">16.55</span><br/>
                              <small>Line up: 12.75 + 3.80 = 16.55</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-currency-rupee fs-1 text-success"></i>
                          </div>
                          <h6 className="text-success">Real-World Solver</h6>
                          <p className="small">Apply decimals to money and measurement problems!</p>
                          <div className="quick-challenge bg-white border rounded p-3">
                            <p className="mb-2"><strong>Quick Challenge:</strong></p>
                            <p>₹50 note for ₹37.25 purchase. Change?</p>
                            <button className="btn btn-success btn-sm" onClick={(e) => {
                              e.target.nextElementSibling.style.display = 'block';
                              e.target.style.display = 'none';
                            }}>Show Answer</button>
                            <div className="answer mt-2" style={{display: 'none'}}>
                              <span className="badge bg-success">₹12.75</span><br/>
                              <small>₹50.00 - ₹37.25 = ₹12.75</small>
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

        {/* Practice Section with Quiz */}
        <section className="practice-section py-5">
          <div className="container">
            <AdditionQuiz operationType="decimals" />
          </div>
        </section>

        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#3498db'}}>
                        🎉 Congratulations, Decimal Champion! 🏆
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully mastered the fascinating world of decimals! 
                        You now have the precision skills to handle place values, perform operations, and solve real-world problems with decimal confidence.
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
                              <span>Decimal place value understanding</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Addition and subtraction with alignment</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Decimal point movement rules</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Comparing and rounding decimals</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Decimal-fraction conversions</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Real-world money and measurement applications</span>
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #3498db, #2980b9)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-bullseye fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🎯 Ready for Your Next Mathematical Adventure?</h5>
                          <p className="mb-0 lead">
                            Keep practicing with decimals in everyday life! Every time you handle money, measurements, or precise calculations, 
                            you're using your new decimal superpowers!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Decimal Champion Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #3498db, #2980b9)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>🎯 Started Learning</span>
                            <span>⚡ Mastered Operations</span>
                            <span>🏆 Decimal Champion!</span>
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
          box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
        }

        .decimal-visual {
          font-family: 'Courier New', monospace;
        }

        .place-value-grid {
          font-family: 'Courier New', monospace;
        }

        .calculation-layout {
          font-family: 'Courier New', monospace;
          line-height: 1.4;
        }

        .movement-visual {
          font-family: 'Courier New', monospace;
          font-weight: bold;
        }

        .conversion-grid {
          font-family: 'Courier New', monospace;
        }

        .challenge-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .challenge-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1) !important;
        }

        .intro-card {
          transition: transform 0.3s ease;
        }

        .intro-card:hover {
          transform: translateY(-2px);
        }

        .method-card, .movement-card, .comparison-card, .rounding-card, .conversion-card, .application-card {
          transition: transform 0.3s ease;
        }

        .method-card:hover, .movement-card:hover, .comparison-card:hover, .rounding-card:hover, .conversion-card:hover, .application-card:hover {
          transform: translateY(-3px);
        }

        .mistake-card {
          transition: all 0.3s ease;
        }

        .mistake-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .quick-challenge {
          transition: background-color 0.3s ease;
        }

        .quick-challenge:hover {
          background-color: #f8f9fa !important;
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .badge {
          font-size: 0.85em;
        }

        .scenario {
          transition: transform 0.2s ease;
        }

        .scenario:hover {
          transform: translateX(3px);
        }

        .example {
          transition: transform 0.2s ease;
        }

        .example:hover {
          transform: scale(1.02);
        }

        .step-item {
          transition: all 0.2s ease;
        }

        .step-item:hover {
          background-color: #e9ecef !important;
        }

        .power-icon, .icon-box {
          transition: transform 0.3s ease;
        }

        .power-icon:hover, .icon-box:hover {
          transform: rotate(5deg) scale(1.1);
        }

        .adventure-visual {
          transition: all 0.3s ease;
        }

        .adventure-visual:hover {
          background-color: #e3f2fd !important;
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default Decimals;