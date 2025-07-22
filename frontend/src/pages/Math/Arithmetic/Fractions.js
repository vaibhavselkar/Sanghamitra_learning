// src/pages/math/arithmetic/Fractions.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Fractions = () => {
  return (
    <div className="fractions-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Fractions</h1>
                  <p className="mb-0">Explore the amazing world of fractions! Learn to represent parts of a whole, perform operations, and solve real-world problems with confidence.</p>
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
                <li className="current">Fractions</li>
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
                      <i className="bi bi-pie-chart-fill me-2"></i>Your Fraction Mastery Adventure!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Part-of-Whole Champion? By the end of this exciting journey, you'll unlock these incredible superpowers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-pie-chart"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Part-Whole Master!</strong><br />
                                  <small className="text-muted">Understand what fractions represent perfectly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-arrow-repeat"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Equivalent Expert!</strong><br />
                                  <small className="text-muted">Find equivalent fractions effortlessly</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-calculator-fill"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Operations Wizard!</strong><br />
                                  <small className="text-muted">Add, subtract, multiply, and divide fractions</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-puzzle"></i>
                                </div>
                                <div>
                                  <strong className="text-danger">Problem Solver!</strong><br />
                                  <small className="text-muted">Apply fractions to real-world situations</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-pie-chart-fill fs-1 text-danger"></i>
                          </div>
                          <h5 className="text-danger mb-2">Parts of the Whole!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-danger" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Beginner to Fraction Champion!</p>
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
                      <i className="bi bi-lightbulb me-2"></i>Discover the Fraction Magic!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What are Fractions? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-pie-chart-fill fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e74c3c'}}>What are Fractions?</h5>
                              <p className="mb-3">Fractions represent <strong>parts of a whole!</strong> We write them as p/q, where p and q are integers, to represent 'p parts out of q'! 🎯</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="fraction-visual mb-3">
                                <div className="fraction-display d-flex justify-content-center align-items-center">
                                  <div className="fraction-layout text-center">
                                    <div className="numerator text-success fs-2">3</div>
                                    <div className="fraction-line bg-dark" style={{height: '3px', width: '40px', margin: '5px auto'}}></div>
                                    <div className="denominator text-warning fs-2">5</div>
                                  </div>
                                </div>
                              </div>
                              <div className="fraction-labels">
                                <div className="mb-2">
                                  <span className="badge bg-success me-2">3</span> = Numerator (parts we have)
                                </div>
                                <div>
                                  <span className="badge bg-warning me-2">5</span> = Denominator (total parts)
                                </div>
                              </div>
                              <small className="text-muted d-block mt-2">3/5 = "Three parts out of five"</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Representation */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-circle-half fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#27ae60'}}>See It Visually!</h5>
                              <p className="mb-3">Fractions come to life when we see them! Each circle shows different fractions of the same whole! 🔍</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="circle-fractions mb-3">
                                <div className="row">
                                  <div className="col-3">
                                    <div className="circle-fraction mb-2">
                                      <div className="circle bg-warning rounded-circle mx-auto" style={{width: '40px', height: '40px'}}></div>
                                      <small>1</small>
                                    </div>
                                  </div>
                                  <div className="col-3">
                                    <div className="circle-fraction mb-2">
                                      <div className="circle-half mx-auto" style={{width: '40px', height: '40px', background: 'linear-gradient(90deg, #ffc107 50%, #e9ecef 50%)', borderRadius: '50%'}}></div>
                                      <small>1/2</small>
                                    </div>
                                  </div>
                                  <div className="col-3">
                                    <div className="circle-fraction mb-2">
                                      <div className="circle-quarter mx-auto" style={{width: '40px', height: '40px', background: 'linear-gradient(90deg, #ffc107 25%, #e9ecef 25%)', borderRadius: '50%'}}></div>
                                      <small>1/4</small>
                                    </div>
                                  </div>
                                  <div className="col-3">
                                    <div className="circle-fraction mb-2">
                                      <div className="circle-three-quarters mx-auto" style={{width: '40px', height: '40px', background: 'linear-gradient(90deg, #ffc107 75%, #e9ecef 75%)', borderRadius: '50%'}}></div>
                                      <small>3/4</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="understanding-note">
                                <small className="text-success"><strong>Remember:</strong> Same whole, different parts!</small>
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
                <h2 className="mb-3" style={{color: '#e74c3c'}}>
                  <i className="bi bi-tools me-2"></i>Fraction Champion Toolkit
                </h2>
                <p className="lead">Master these powerful concepts and fractions become super easy! 🛠️</p>
              </div>
            </div>

            {/* Equivalent Fractions */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-arrow-repeat me-2"></i>1. Equivalent Fractions Power!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">The Golden Rule! ✨</h5>
                        
                        <div className="equivalent-demo">
                          <div className="rule-box bg-primary text-white rounded p-3 mb-3 text-center">
                            <h6 className="mb-2">Multiply top and bottom by the same number!</h6>
                            <div className="rule-formula">
                              <div className="fraction-math">
                                <span className="fs-5">n × p</span>
                                <div className="fraction-line bg-white mx-auto" style={{width: '60px', height: '2px'}}></div>
                                <span className="fs-5">n × q</span>
                                <span className="mx-3">=</span>
                                <span className="fs-5">p</span>
                                <div className="fraction-line bg-white mx-auto" style={{width: '30px', height: '2px'}}></div>
                                <span className="fs-5">q</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="examples bg-white border rounded p-3">
                            <h6 className="text-center text-success mb-3">Magic in Action!</h6>
                            
                            <div className="example-row mb-3">
                              <div className="text-center">
                                <div className="equivalent-chain d-flex justify-content-center align-items-center">
                                  <div className="fraction">
                                    <div className="num text-success">1</div>
                                    <div className="line"></div>
                                    <div className="den text-warning">2</div>
                                  </div>
                                  <span className="mx-2">=</span>
                                  <div className="fraction">
                                    <div className="num text-success">2</div>
                                    <div className="line"></div>
                                    <div className="den text-warning">4</div>
                                  </div>
                                  <span className="mx-2">=</span>
                                  <div className="fraction">
                                    <div className="num text-success">3</div>
                                    <div className="line"></div>
                                    <div className="den text-warning">6</div>
                                  </div>
                                  <span className="mx-2">=</span>
                                  <div className="fraction">
                                    <div className="num text-success">4</div>
                                    <div className="line"></div>
                                    <div className="den text-warning">8</div>
                                  </div>
                                </div>
                                <div className="multipliers mt-2">
                                  <small className="text-muted">×2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;×3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;×4</small>
                                </div>
                              </div>
                            </div>
                            
                            <div className="visual-proof bg-light rounded p-3">
                              <div className="text-center">
                                <div className="proof-explanation">
                                  <strong>Why it works:</strong>
                                  <div className="proof-steps mt-2">
                                    <div>p/q = p × (1/q)</div>
                                    <div>So: 3 × (2/7) = 3 × 2 × (1/7) = 6/7</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Fraction × Fraction */}
                      <div className="col-md-6 mb-4">
                        <div className="multiplication-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-grid me-2"></i>Fraction × Fraction
                          </h5>
                          
                          <div className="fraction-mult-demo">
                            <div className="concept-box bg-orange text-white rounded p-3 mb-3 text-center" style={{backgroundColor: '#e67e22'}}>
                              <strong>Multiply Across!</strong>
                              <div className="formula mt-2">
                                (m/n) × (p/q) = (m × p)/(n × q)
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-warning">Example: (2/3) × (4/5)</h6>
                              <div className="multiplication-steps">
                                <div className="step mb-2">
                                  <span className="badge bg-warning me-2">1</span>
                                  <strong>Multiply numerators:</strong> 2 × 4 = 8
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-warning me-2">2</span>
                                  <strong>Multiply denominators:</strong> 3 × 5 = 15
                                </div>
                                <div className="visual-multiplication text-center my-3">
                                  <div className="fraction-calc">
                                    <span className="fs-5">2/3 × 4/5 = (2×4)/(3×5) = 8/15</span>
                                  </div>
                                </div>
                                <div className="result bg-success text-white rounded p-2 text-center">
                                  <strong>Answer: 8/15</strong>
                                </div>
                              </div>
                            </div>
                            
                            <div className="understanding bg-info text-white rounded p-3">
                              <strong>What does it mean?</strong>
                              <div className="meaning mt-2">
                                <div>2/3 of 4/5 = taking 2/3 of something that's already 4/5</div>
                                <small>Think: 2/3 of a 4/5 pizza slice!</small>
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

            {/* Division */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#f39c12'}}>
                      <i className="bi bi-slash me-2"></i>4. Division Mastery!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Division by Whole Number */}
                      <div className="col-md-6 mb-4">
                        <div className="division-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#f39c12'}}>
                            <i className="bi bi-arrow-down me-2"></i>Division by Whole Number
                          </h5>
                          
                          <div className="whole-div-demo">
                            <div className="concept-box bg-warning text-dark rounded p-3 mb-3 text-center">
                              <strong>Multiply by Reciprocal!</strong>
                              <div className="formula mt-2">
                                (p/q) ÷ m = (p/q) × (1/m) = p/(q×m)
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-primary">Example: (3/4) ÷ 2</h6>
                              <div className="division-steps">
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">1</span>
                                  <strong>Rewrite as multiplication:</strong>
                                  <div className="rewrite mt-1">(3/4) ÷ 2 = (3/4) × (1/2)</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">2</span>
                                  <strong>Multiply:</strong>
                                  <div className="multiply mt-1">(3/4) × (1/2) = (3×1)/(4×2) = 3/8</div>
                                </div>
                                <div className="visual-check bg-light rounded p-2 text-center">
                                  <strong>Check:</strong> 3/8 × 2 = 6/8 = 3/4 ✓
                                </div>
                              </div>
                            </div>
                            
                            <div className="intuition bg-success text-white rounded p-3">
                              <strong>What's happening?</strong>
                              <div className="intuition-text mt-2">
                                Dividing by 2 means splitting into 2 equal parts.
                                <br />Each part is half the original size!
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Division by Fraction */}
                      <div className="col-md-6 mb-4">
                        <div className="division-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-arrow-repeat me-2"></i>Division by Fraction
                          </h5>
                          
                          <div className="fraction-div-demo">
                            <div className="concept-box bg-danger text-white rounded p-3 mb-3 text-center">
                              <strong>Flip and Multiply!</strong>
                              <div className="formula mt-2">
                                (p/q) ÷ (m/n) = (p/q) × (n/m)
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-danger">Example: (2/3) ÷ (4/5)</h6>
                              <div className="division-steps">
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">1</span>
                                  <strong>Flip the second fraction:</strong>
                                  <div className="flip mt-1">4/5 becomes 5/4</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">2</span>
                                  <strong>Multiply instead:</strong>
                                  <div className="multiply mt-1">(2/3) × (5/4) = (2×5)/(3×4) = 10/12</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">3</span>
                                  <strong>Simplify:</strong>
                                  <div className="simplify mt-1">10/12 = 5/6</div>
                                </div>
                                <div className="result bg-success text-white rounded p-2 text-center">
                                  <strong>Final Answer: 5/6</strong>
                                </div>
                              </div>
                            </div>
                            
                            <div className="memory-trick bg-info text-white rounded p-3">
                              <strong>Memory Trick:</strong>
                              <div className="trick mt-2">
                                "Keep, Change, Flip"
                                <div className="trick-steps mt-1">
                                  <div>• <strong>Keep</strong> the first fraction</div>
                                  <div>• <strong>Change</strong> ÷ to ×</div>
                                  <div>• <strong>Flip</strong> the second fraction</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Division Cases */}
                    <div className="row mt-4">
                      <div className="col-lg-12">
                        <div className="special-division bg-light p-4 rounded">
                          <h5 className="text-center mb-3" style={{color: '#f39c12'}}>
                            <i className="bi bi-gear me-2"></i>Special Division Insights!
                          </h5>
                          
                          <div className="row">
                            {/* Division by Reciprocal */}
                            <div className="col-md-6 mb-3">
                              <div className="special-card bg-white border rounded p-3">
                                <h6 className="text-warning">Division by Reciprocal (1/n)</h6>
                                <div className="special-formula mb-2">
                                  <strong>(p/q) ÷ (1/n) = (p/q) × n</strong>
                                </div>
                                <div className="special-example">
                                  <div className="example-calc">
                                    Example: (3/7) ÷ (1/4) = (3/7) × 4 = 12/7
                                  </div>
                                  <div className="interpretation mt-2">
                                    <small className="text-muted">Dividing by 1/4 means "how many quarters fit?"</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Why Flip and Multiply Works */}
                            <div className="col-md-6 mb-3">
                              <div className="special-card bg-white border rounded p-3">
                                <h6 className="text-info">Why "Flip and Multiply" Works</h6>
                                <div className="proof-explanation">
                                  <div className="proof-step mb-1">
                                    <strong>Proof:</strong> (p/q) ÷ (m/n)
                                  </div>
                                  <div className="proof-step mb-1">
                                    = (p/q) × (n/m) / [(m/n) × (n/m)]
                                  </div>
                                  <div className="proof-step mb-1">
                                    = (p/q) × (n/m) / 1
                                  </div>
                                  <div className="proof-result">
                                    = (p/q) × (n/m) ✓
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
          </div>
        </section>

        {/* Real-World Applications Section */}
        <section className="applications-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#f39c12'}}>
                  <i className="bi bi-globe me-2"></i>Fractions in the Real World
                </h2>
                <p className="lead">See how fractions help us solve everyday problems! 🌍</p>
              </div>
            </div>

            <div className="row">
              {/* Cooking & Recipes */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                  <h5 className="mb-3" style={{color: '#27ae60'}}>
                    <i className="bi bi-egg-fried me-2"></i>Cooking & Recipes
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">🍰 Recipe Scaling</h6>
                      <div className="scenario-math">
                        <div>Recipe needs: 3/4 cup flour</div>
                        <div>Making double batch:</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">2 × 3/4 = 6/4 = 1½ cups</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">🥛 Ingredient Portions</h6>
                      <div className="scenario-math">
                        <div>Pizza dough: 2/3 cup water</div>
                        <div>Half recipe needed:</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">(2/3) ÷ 2 = 2/6 = 1/3 cup</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">🍪 Sharing Treats</h6>
                      <div className="scenario-math">
                        <div>Made 2/3 of brownies</div>
                        <div>Share equally among 4 friends:</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">(2/3) ÷ 4 = 2/12 = 1/6 each</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Time & Money */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                  <h5 className="mb-3" style={{color: '#3498db'}}>
                    <i className="bi bi-clock me-2"></i>Time & Money
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">⏰ Time Management</h6>
                      <div className="scenario-math">
                        <div>Study time: 1¼ hours</div>
                        <div>Converting to minutes:</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">5/4 × 60 = 300/4 = 75 minutes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">💰 Money Sharing</h6>
                      <div className="scenario-math">
                        <div>₹150 to share</div>
                        <div>You get 2/5 of the money:</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">2/5 × ₹150 = ₹300/5 = ₹60</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">📊 Progress Tracking</h6>
                      <div className="scenario-math">
                        <div>Completed 3/8 of project</div>
                        <div>Remaining work:</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">1 - 3/8 = 8/8 - 3/8 = 5/8</span>
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
                  <i className="bi bi-gem me-2"></i>Advanced Fraction Mastery
                </h2>
                <p className="lead">Take your fraction skills to the next level! 🚀</p>
              </div>
            </div>

            {/* Simplifying Fractions */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e67e22'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e67e22'}}>
                      <i className="bi bi-arrow-down-up me-2"></i>Simplifying Fractions
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="simplify-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-gear me-2"></i>Find the GCD Method
                          </h5>
                          
                          <div className="gcd-method">
                            <div className="method-box bg-orange text-white rounded p-3 mb-3 text-center" style={{backgroundColor: '#e67e22'}}>
                              <strong>Divide both by their GCD!</strong>
                              <div className="formula mt-2">
                                If GCD(a,b) = d, then a/b = (a÷d)/(b÷d)
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-primary">Example: Simplify 12/18</h6>
                              <div className="simplify-steps">
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">1</span>
                                  <strong>Find factors:</strong>
                                  <div className="factors mt-1">
                                    <div>12: 1, 2, 3, 4, 6, 12</div>
                                    <div>18: 1, 2, 3, 6, 9, 18</div>
                                  </div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">2</span>
                                  <strong>GCD = 6</strong>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">3</span>
                                  <strong>Divide both:</strong>
                                  <div className="division mt-1">12÷6 = 2, 18÷6 = 3</div>
                                </div>
                                <div className="result bg-success text-white rounded p-2 text-center">
                                  <strong>Answer: 2/3</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6 mb-4">
                        <div className="simplify-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-lightning me-2"></i>Quick Simplification Tricks
                          </h5>
                          
                          <div className="quick-tricks">
                            <div className="trick-box bg-success text-white rounded p-3 mb-3">
                              <strong>Common Patterns:</strong>
                              <div className="patterns mt-2">
                                <div>• Even numbers: Try ÷2 first</div>
                                <div>• End in 0 or 5: Try ÷5</div>
                                <div>• Sum of digits ÷3: Try ÷3</div>
                              </div>
                            </div>
                            
                            <div className="quick-examples bg-white border rounded p-3">
                              <h6 className="text-success mb-3">Quick Examples:</h6>
                              <div className="examples-grid">
                                <div className="example-row mb-2">
                                  <span className="fw-bold">10/15:</span> Both ÷5 → 2/3
                                </div>
                                <div className="example-row mb-2">
                                  <span className="fw-bold">9/12:</span> Both ÷3 → 3/4
                                </div>
                                <div className="example-row mb-2">
                                  <span className="fw-bold">6/8:</span> Both ÷2 → 3/4
                                </div>
                                <div className="example-row">
                                  <span className="fw-bold">20/25:</span> Both ÷5 → 4/5
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

            {/* Mixed Numbers and Improper Fractions */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#9b59b6'}}>
                      <i className="bi bi-stack me-2"></i>Mixed Numbers & Improper Fractions
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Mixed to Improper */}
                      <div className="col-md-6 mb-4">
                        <div className="conversion-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-arrow-right me-2"></i>Mixed → Improper
                          </h5>
                          
                          <div className="mixed-to-improper">
                            <div className="method-box bg-purple text-white rounded p-3 mb-3 text-center" style={{backgroundColor: '#9b59b6'}}>
                              <strong>Multiply & Add!</strong>
                              <div className="formula mt-2">
                                a(b/c) = (a×c + b)/c
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-primary">Example: Convert 2¾ to improper</h6>
                              <div className="conversion-steps">
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">1</span>
                                  <strong>Identify parts:</strong>
                                  <div className="parts mt-1">Whole: 2, Fraction: 3/4</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">2</span>
                                  <strong>Multiply:</strong>
                                  <div className="multiply mt-1">2 × 4 = 8</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-primary me-2">3</span>
                                  <strong>Add:</strong>
                                  <div className="add mt-1">8 + 3 = 11</div>
                                </div>
                                <div className="result bg-success text-white rounded p-2 text-center">
                                  <strong>Answer: 11/4</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Improper to Mixed */}
                      <div className="col-md-6 mb-4">
                        <div className="conversion-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-arrow-left me-2"></i>Improper → Mixed
                          </h5>
                          
                          <div className="improper-to-mixed">
                            <div className="method-box bg-danger text-white rounded p-3 mb-3 text-center">
                              <strong>Divide & Find Remainder!</strong>
                              <div className="formula mt-2">
                                a/b = (a÷b) with remainder (a%b)/b
                              </div>
                            </div>
                            
                            <div className="example bg-white border rounded p-3 mb-3">
                              <h6 className="text-center text-danger">Example: Convert 13/5 to mixed</h6>
                              <div className="conversion-steps">
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">1</span>
                                  <strong>Divide:</strong>
                                  <div className="divide mt-1">13 ÷ 5 = 2 remainder 3</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">2</span>
                                  <strong>Whole number:</strong>
                                  <div className="whole mt-1">2</div>
                                </div>
                                <div className="step mb-2">
                                  <span className="badge bg-danger me-2">3</span>
                                  <strong>Fraction part:</strong>
                                  <div className="fraction-part mt-1">3/5</div>
                                </div>
                                <div className="result bg-success text-white rounded p-2 text-center">
                                  <strong>Answer: 2³⁄₅</strong>
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

        {/* Interactive Practice Section */}
        <section className="practice-challenges py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-trophy me-2"></i>Fraction Champion Challenges!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="text-center mb-4">
                      <h5 className="text-success">🏆 Test Your Fraction Superpowers! 🏆</h5>
                      <p className="lead">You've learned all the skills - now show what you can do!</p>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-pie-chart-fill fs-1 text-danger"></i>
                          </div>
                          <h6 className="text-danger">Equivalent Master</h6>
                          <p className="small">Find equivalent fractions and simplify like a pro!</p>
                          <div className="quick-challenge bg-white border rounded p-3">
                            <p className="mb-2"><strong>Quick Challenge:</strong></p>
                            <p>Is 6/9 equivalent to 2/3?</p>
                            <button className="btn btn-danger btn-sm" onClick={(e) => {
                              e.target.nextElementSibling.style.display = 'block';
                              e.target.style.display = 'none';
                            }}>Show Answer</button>
                            <div className="answer mt-2" style={{display: 'none'}}>
                              <span className="badge bg-success">Yes! 6/9 = (6÷3)/(9÷3) = 2/3</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-plus-circle-fill fs-1 text-success"></i>
                          </div>
                          <h6 className="text-success">Operations Expert</h6>
                          <p className="small">Add, subtract, multiply, and divide fractions!</p>
                          <div className="quick-challenge bg-white border rounded p-3">
                            <p className="mb-2"><strong>Quick Challenge:</strong></p>
                            <p>1/4 + 1/6 = ?</p>
                            <button className="btn btn-success btn-sm" onClick={(e) => {
                              e.target.nextElementSibling.style.display = 'block';
                              e.target.style.display = 'none';
                            }}>Show Answer</button>
                            <div className="answer mt-2" style={{display: 'none'}}>
                              <span className="badge bg-success">5/12</span><br/>
                              <small>Common denominator: 12. 3/12 + 2/12 = 5/12</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="challenge-card bg-light p-4 rounded text-center h-100">
                          <div className="challenge-icon mb-3">
                            <i className="bi bi-egg-fried fs-1 text-warning"></i>
                          </div>
                          <h6 className="text-warning">Real-World Solver</h6>
                          <p className="small">Apply fractions to cooking, time, and money problems!</p>
                          <div className="quick-challenge bg-white border rounded p-3">
                            <p className="mb-2"><strong>Quick Challenge:</strong></p>
                            <p>Recipe needs 3/4 cup sugar. Making 1/2 recipe?</p>
                            <button className="btn btn-warning btn-sm" onClick={(e) => {
                              e.target.nextElementSibling.style.display = 'block';
                              e.target.style.display = 'none';
                            }}>Show Answer</button>
                            <div className="answer mt-2" style={{display: 'none'}}>
                              <span className="badge bg-success">3/8 cup</span><br/>
                              <small>(3/4) × (1/2) = 3/8 cup sugar</small>
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
            <AdditionQuiz operationType="fractions" />
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
                        🎉 Congratulations, Fraction Champion! 🏆
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully mastered the wonderful world of fractions! 
                        You now have the powerful skills to work with parts of wholes, perform operations, and solve real-world problems with fraction confidence.
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
                              <span>Understanding parts of a whole (p/q)</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Equivalent fractions mastery</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Addition with same and different denominators</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Subtraction techniques</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Multiplication across and with whole numbers</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Division using "flip and multiply" method</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Simplifying and converting between forms</span>
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
                              <Link to="/math/arithmetic" className="btn btn-danger btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Arithmetic
                              </Link>
                            </div>
                            <div className="step-item">
                              <Link to="/math" className="btn btn-outline-danger btn-lg w-100 d-flex align-items-center justify-content-center">
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
                            <i className="bi bi-pie-chart-fill fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🎯 Ready for Your Next Mathematical Adventure?</h5>
                          <p className="mb-0 lead">
                            Keep practicing with fractions in everyday life! Every time you cook, measure, or share things equally, 
                            you're using your new fraction superpowers!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Fraction Champion Journey</h6>
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
                            <span>🎯 Started Learning</span>
                            <span>⚡ Mastered Operations</span>
                            <span>🏆 Fraction Champion!</span>
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

        .fraction-display {
          font-family: 'Times New Roman', serif;
          font-size: 1.2em;
        }

        .fraction-line {
          background-color: #333;
          height: 2px;
          margin: 2px auto;
        }

        .fraction {
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          margin: 0 5px;
        }

        .fraction .num, .fraction .den {
          display: block;
          line-height: 1;
          font-weight: bold;
        }

        .fraction .line {
          height: 1px;
          background: #333;
          margin: 2px 0;
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

        .operation-card, .multiplication-card, .division-card, .application-card, .simplify-card, .conversion-card {
          transition: transform 0.3s ease;
        }

        .operation-card:hover, .multiplication-card:hover, .division-card:hover, .application-card:hover, .simplify-card:hover, .conversion-card:hover {
          transform: translateY(-3px);
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-1px);
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

        .step {
          transition: all 0.2s ease;
        }

        .step:hover {
          background-color: #f8f9fa !important;
          border-radius: 4px;
          padding: 4px;
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
          background-color: #ffebee !important;
        }

        .equivalent-chain {
          gap: 10px;
        }

        .circle-fraction {
          transition: transform 0.3s ease;
        }

        .circle-fraction:hover {
          transform: scale(1.1);
        }

        .fraction-calc {
          font-family: 'Times New Roman', serif;
          font-weight: bold;
        }

        .visual-addition {
          font-family: 'Times New Roman', serif;
        }

        .divider {
          margin: 0 2px;
        }

        .num {
          font-weight: bold;
        }

        .den {
          font-weight: bold;
        }

        .parts-visual .badge {
          transition: transform 0.2s ease;
        }

        .parts-visual .badge:hover {
          transform: scale(1.2);
        }

        .rule-box {
          transition: transform 0.3s ease;
        }

        .rule-box:hover {
          transform: scale(1.02);
        }

        .concept-box {
          transition: transform 0.3s ease;
        }

        .concept-box:hover {
          transform: scale(1.02);
        }

        .method-box {
          transition: transform 0.3s ease;
        }

        .method-box:hover {
          transform: scale(1.02);
        }

        .quick-challenge {
          transition: background-color 0.3s ease;
        }

        .quick-challenge:hover {
          background-color: #f8f9fa !important;
        }

        .badge {
          font-size: 0.85em;
        }

        .formula {
          font-family: 'Times New Roman', serif;
          font-weight: bold;
          font-size: 1.1em;
        }

        .circle-half-visual, .circle-quarters-visual {
          transition: transform 0.3s ease;
        }

        .circle-half-visual:hover, .circle-quarters-visual:hover {
          transform: rotate(45deg);
        }

        .multiplication-steps .step, .division-steps .step, .simplify-steps .step, .conversion-steps .step {
          transition: background-color 0.2s ease;
          padding: 4px;
          border-radius: 4px;
        }

        .multiplication-steps .step:hover, .division-steps .step:hover, .simplify-steps .step:hover, .conversion-steps .step:hover {
          background-color: rgba(0,0,0,0.05);
        }

        .equivalent-circles .circle-demo {
          transition: transform 0.3s ease;
        }

        .equivalent-circles .circle-demo:hover {
          transform: scale(1.1);
        }

        .special-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .special-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        .factors {
          font-family: monospace;
          font-size: 0.9em;
        }

        .examples-grid .example-row {
          transition: background-color 0.2s ease;
          padding: 2px 4px;
          border-radius: 3px;
        }

        .examples-grid .example-row:hover {
          background-color: #e8f5e8;
        }

        .trick-box {
          transition: transform 0.3s ease;
        }

        .trick-box:hover {
          transform: scale(1.02);
        }

        .parts {
          font-family: monospace;
        }

        .patterns {
          font-size: 0.9em;
        }

        .proof-step {
          font-family: 'Times New Roman', serif;
          font-size: 0.9em;
        }

        .proof-result {
          font-weight: bold;
          color: #27ae60;
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default Fractions;
