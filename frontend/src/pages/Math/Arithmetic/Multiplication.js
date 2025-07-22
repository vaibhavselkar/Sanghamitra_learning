// src/pages/math/arithmetic/Multiplication.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Multiplication = () => {
  return (
    <div className="multiplication-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Multiplication</h1>
                  <p className="mb-0">Welcome to our multiplication learning hub. Master the power of repeated addition with our comprehensive resources and interactive lessons.</p>
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
                <li className="current">Multiplication</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Learning Journey Section */}
        <section className="journey-section py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #2980b9'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#2980b9'}}>
                      <i className="bi bi-x-lg me-2"></i>Your Multiplication Power-Up Journey!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Multiplication Wizard? By the end of this magical journey, you'll unlock these incredible powers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-lightning-charge"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Speed Calculator!</strong><br />
                                  <small className="text-muted">Solve problems faster than a computer</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-grid-3x3"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Pattern Master!</strong><br />
                                  <small className="text-muted">See amazing patterns in numbers everywhere</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-arrows-fullscreen"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Size Multiplier!</strong><br />
                                  <small className="text-muted">Make things bigger instantly with math magic</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-shop"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Shopping Genius!</strong><br />
                                  <small className="text-muted">Calculate total costs like a pro</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-graph-up"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Growth Predictor!</strong><br />
                                  <small className="text-muted">Predict how things grow and expand</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-stars"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Math Magician!</strong><br />
                                  <small className="text-muted">Amaze friends with multiplication tricks</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-x-diamond-fill fs-1 text-primary"></i>
                          </div>
                          <h5 className="text-primary mb-2">Multiply Your Skills!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-primary" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Beginner to Multiplication Wizard!</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="adventure-callout bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #2980b9, #3498db)'}}>
                        <span className="text-white fs-5">🧙‍♂️ Ready to multiply your math powers? Let the magic begin! ✨</span>
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
                <div className="card shadow border-0" style={{borderTop: '4px solid #16a085'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#16a085'}}>
                      <i className="bi bi-magic me-2"></i>Discover the Multiplication Magic!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What is Multiplication? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #2980b9'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-x-lg fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#2980b9'}}>What's Multiplication?</h5>
                              <p className="mb-3">Multiplication is like being a <strong>Super Addition Wizard!</strong> Instead of adding the same number many times, you use magic shortcuts! 🧙‍♂️</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="mb-2">
                                <div className="fs-5">🍕🍕🍕</div>
                                <div className="fs-5">🍕🍕🍕</div>
                                <div className="fs-5">🍕🍕🍕</div>
                                <div className="fs-5">🍕🍕🍕</div>
                              </div>
                              <div className="equation-display">
                                <span className="badge bg-primary fs-6">4</span> groups × 
                                <span className="badge bg-success fs-6">3</span> pizzas = 
                                <span className="badge bg-warning fs-6">12</span> pizzas
                              </div>
                              <small className="text-muted d-block mt-2">Instead of 3+3+3+3, just say 4×3!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Daily Life Usage */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-house-heart fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Your Daily Superpower!</h5>
                              <p className="mb-3">Multiplication is everywhere in Indian life! It's like having <strong>counting superpowers</strong> for everything! 🦸‍♀️</p>
                            </div>
                          </div>
                          
                          <div className="daily-examples">
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-currency-rupee text-success fs-5 me-2"></i>
                              <span><strong>Shopping:</strong> 6 pens × ₹15 each = ₹90</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-grid-3x3 text-warning fs-5 me-2"></i>
                              <span><strong>Tiles:</strong> 8 rows × 12 tiles per row</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-calendar-week text-danger fs-5 me-2"></i>
                              <span><strong>Days:</strong> 4 weeks × 7 days = 28 days</span>
                            </div>
                            <div className="example-item d-flex align-items-center">
                              <i className="bi bi-people text-primary fs-5 me-2"></i>
                              <span><strong>Groups:</strong> 5 teams × 6 players each</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Fact */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e67e22'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-lightbulb fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e67e22'}}>Mind-Blowing Fact! 🤯</h5>
                            </div>
                          </div>
                          
                          <div className="fact-display bg-white border rounded p-3">
                            <div className="text-center">
                              <h6 className="text-primary mb-3">Festival Lights Calculator!</h6>
                              <div className="diwali-math">
                                <div className="light-count mb-2">
                                  <span className="badge bg-warning me-2">12 strings</span> 🎄
                                </div>
                                <div className="light-count mb-2">
                                  <span class="badge bg-success me-2">25 bulbs each</span> 💡
                                </div>
                                <div className="calculation mb-2">
                                  <span className="fs-5">12 × 25 = ?</span>
                                </div>
                                <hr />
                                <div className="total-count">
                                  <span className="badge bg-danger fs-5">300 lights!</span> ✨
                                </div>
                              </div>
                              <small className="text-muted">That's enough to light up the whole neighborhood!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Activity */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #9b59b6'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', backgroundColor: '#9b59b6'}}>
                              <i className="bi bi-controller fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#9b59b6'}}>Let's Multiply Fun! 🎮</h5>
                            </div>
                          </div>
                          
                          <div className="activity-box bg-white border rounded p-3">
                            <h6 className="text-center text-primary mb-3">🍪 Cookie Factory Challenge! 🏭</h6>
                            <ol className="list-steps text-start">
                              <li>Draw <strong>3 plates</strong> on paper</li>
                              <li>Put <strong>4 cookie drawings</strong> on each plate</li>
                              <li>Count all cookies: <strong>"4 + 4 + 4"</strong></li>
                              <li>Now try the magic: <strong>"3 × 4"</strong></li>
                              <li>Both give you <strong>12 cookies!</strong></li>
                            </ol>
                            <div className="text-center mt-3">
                              <div className="celebration bg-gradient p-2 rounded" style={{background: 'linear-gradient(45deg, #9b59b6, #8e44ad)'}}>
                                <span className="text-white small">🎉 You just discovered multiplication magic! 🎉</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Call-to-Action */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="cta-box text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #16a085, #2980b9)', color: 'white'}}>
                          <h5 className="mb-2">🧙‍♂️ Ready to Become a Multiplication Wizard? ✨</h5>
                          <p className="mb-3">Let's unlock the magical secrets that make multiplication super easy and fun!</p>
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
                <h2 className="mb-3" style={{color: '#2980b9'}}>
                  <i className="bi bi-gem me-2"></i>Magic Multiplication Gems
                </h2>
                <p className="lead">Master these magical concepts and multiplication becomes super easy! 🪄</p>
              </div>
            </div>

            {/* Understanding Groups and Arrays */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e74c3c'}}>
                      <i className="bi bi-grid-3x3 me-2"></i>1. Arrays - The Building Blocks
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Think in Rows and Columns! 📐</h5>
                        
                        {/* Visual Array Demonstration */}
                        <div className="array-demo bg-white border rounded p-4">
                          <div className="example-array mb-4">
                            <h6 className="text-center text-primary mb-3">3 rows × 4 columns = 12 items</h6>
                            <div className="visual-array">
                              <div className="array-row d-flex justify-content-center gap-2 mb-2">
                                <div className="array-item bg-danger rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-danger rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-danger rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-danger rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                              </div>
                              <div className="array-row d-flex justify-content-center gap-2 mb-2">
                                <div className="array-item bg-warning rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-warning rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-warning rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-warning rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                              </div>
                              <div className="array-row d-flex justify-content-center gap-2">
                                <div className="array-item bg-success rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-success rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-success rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                                <div className="array-item bg-success rounded" style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>🎈</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="explanation text-center">
                            <div className="equation-display">
                              <span className="badge bg-primary fs-6">3</span> rows × 
                              <span className="badge bg-success fs-6">4</span> columns = 
                              <span className="badge bg-warning fs-6">12</span> balloons
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="visual-example bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Real-World Arrays! 🏠</h6>
                          
                          {/* Real world examples */}
                          <div className="real-examples">
                            <div className="example-item bg-white border rounded p-3 mb-3">
                              <h6 className="text-info">🏫 Classroom Desks</h6>
                              <div className="mini-array d-flex justify-content-center gap-1 mb-2">
                                <div className="desk-row">
                                  <div className="fs-6">🪑🪑🪑🪑🪑</div>
                                  <div className="fs-6">🪑🪑🪑🪑🪑</div>
                                  <div className="fs-6">🪑🪑🪑🪑🪑</div>
                                </div>
                              </div>
                              <small className="text-muted">3 rows × 5 desks = 15 students</small>
                            </div>
                            
                            <div className="example-item bg-white border rounded p-3 mb-3">
                              <h6 className="text-success">🍫 Chocolate Box</h6>
                              <div className="mini-array text-center mb-2">
                                <div className="fs-6">🟫🟫🟫🟫</div>
                                <div className="fs-6">🟫🟫🟫🟫</div>
                              </div>
                              <small className="text-muted">2 rows × 4 chocolates = 8 pieces</small>
                            </div>
                            
                            <div className="example-item bg-white border rounded p-3">
                              <h6 className="text-warning">🏗️ Building Blocks</h6>
                              <div className="mini-array text-center mb-2">
                                <div className="fs-6">🧱🧱🧱</div>
                                <div className="fs-6">🧱🧱🧱</div>
                                <div className="fs-6">🧱🧱🧱</div>
                                <div className="fs-6">🧱🧱🧱</div>
                              </div>
                              <small className="text-muted">4 rows × 3 blocks = 12 blocks</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-primary text-white text-center mt-4">
                      <i className="bi bi-lightbulb me-2"></i>
                      <strong>Magic Rule:</strong> Multiplication is just counting organized groups! 📊
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multiplication Properties */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-stars me-2"></i>2. Multiplication Super Powers!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Commutative Property */}
                      <div className="col-md-6 mb-4">
                        <div className="property-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-arrow-left-right me-2"></i>Flip & Switch Magic!
                          </h5>
                          
                          <div className="visual-demo text-center">
                            <div className="flip-demo mb-3">
                              <div className="equation-box bg-white border rounded p-3 mb-2">
                                <div className="array-visual mb-2">
                                  <div className="fs-5">🟦🟦🟦</div>
                                  <div className="fs-5">🟦🟦🟦</div>
                                </div>
                                <div className="equation">
                                  <span className="badge bg-primary">2</span> × 
                                  <span className="badge bg-warning">3</span> = 
                                  <span className="badge bg-success">6</span>
                                </div>
                              </div>
                              
                              <div className="flip-arrow">
                                <i className="bi bi-arrow-down-up fs-2 text-success"></i>
                                <p className="small text-success"><strong>FLIP IT!</strong></p>
                              </div>
                              
                              <div className="equation-box bg-white border rounded p-3">
                                <div className="array-visual mb-2">
                                  <div className="fs-5">🟨🟨</div>
                                  <div className="fs-5">🟨🟨</div>
                                  <div className="fs-5">🟨🟨</div>
                                </div>
                                <div className="equation">
                                  <span className="badge bg-warning">3</span> × 
                                  <span className="badge bg-primary">2</span> = 
                                  <span className="badge bg-success">6</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-success text-center">
                            <strong>Magic Rule:</strong> Order doesn't matter! ✨
                          </div>
                        </div>
                      </div>
                      
                      {/* Identity Property */}
                      <div className="col-md-6 mb-4">
                        <div className="property-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-1-circle me-2"></i>The Magic of One!
                          </h5>
                          
                          <div className="visual-demo text-center">
                            <div className="identity-demo">
                              <div className="example-box bg-white border rounded p-3 mb-3">
                                <div className="fs-3 mb-2">🎯🎯🎯🎯🎯</div>
                                <div className="equation">
                                  <span className="badge bg-primary fs-5">5</span> × 
                                  <span className="badge bg-warning fs-5">1</span> = 
                                  <span className="badge bg-success fs-5">5</span>
                                </div>
                                <small className="text-muted d-block mt-2">5 targets, taken 1 time each</small>
                              </div>
                              
                              <div className="example-box bg-white border rounded p-3">
                                <div className="fs-3 mb-2">🌟</div>
                                <div className="equation">
                                  <span className="badge bg-primary fs-5">1</span> × 
                                  <span className="badge bg-warning fs-5">7</span> = 
                                  <span className="badge bg-success fs-5">7</span>
                                </div>
                                <small className="text-muted d-block mt-2">1 star, taken 7 times</small>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-warning text-center">
                            <strong>One Rule:</strong> Any number × 1 stays the same! 🎯
                          </div>
                        </div>
                      </div>

                      {/* Zero Property */}
                      <div className="col-md-6 mb-4">
                        <div className="property-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-0-circle me-2"></i>The Zero Magic Trick!
                          </h5>
                          
                          <div className="visual-demo text-center">
                            <div className="zero-demo">
                              <div className="example-box bg-white border rounded p-3 mb-3">
                                <div className="fs-3 mb-2">❌</div>
                                <div className="equation">
                                  <span className="badge bg-primary fs-5">8</span> × 
                                  <span className="badge bg-danger fs-5">0</span> = 
                                  <span className="badge bg-secondary fs-5">0</span>
                                </div>
                                <small className="text-muted d-block mt-2">8 groups of nothing = nothing!</small>
                              </div>
                              
                              <div className="example-box bg-white border rounded p-3">
                                <div className="fs-3 mb-2">🫥</div>
                                <div className="equation">
                                  <span className="badge bg-danger fs-5">0</span> × 
                                  <span className="badge bg-primary fs-5">15</span> = 
                                  <span className="badge bg-secondary fs-5">0</span>
                                </div>
                                <small className="text-muted d-block mt-2">No groups of 15 = nothing!</small>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-secondary text-white text-center">
                            <strong>Zero Rule:</strong> Anything × 0 = 0! 🕳️
                          </div>
                        </div>
                      </div>

                      {/* Distributive Property */}
                      <div className="col-md-6 mb-4">
                        <div className="property-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-diagram-3 me-2"></i>Break Apart Magic!
                          </h5>
                          
                          <div className="visual-demo text-center">
                            <div className="distributive-demo">
                              <div className="example-box bg-white border rounded p-3 mb-3">
                                <h6 className="text-info">Original Problem:</h6>
                                <div className="equation mb-2">
                                  <span className="badge bg-primary fs-5">6</span> × 
                                  <span className="badge bg-warning fs-5">13</span> = ?
                                </div>
                                <small className="text-muted">This looks hard! Let's break it apart...</small>
                              </div>
                              
                              <div className="break-apart bg-light border rounded p-2 mb-3">
                                <div className="fs-6 text-success">13 = 10 + 3</div>
                              </div>
                              
                              <div className="example-box bg-white border rounded p-3">
                                <h6 className="text-success">Broken Apart:</h6>
                                <div className="equation mb-2">
                                  6 × (10 + 3) = (6 × 10) + (6 × 3)
                                </div>
                                <div className="calculation">
                                  = 60 + 18 = <span className="badge bg-success fs-5">78</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-info text-center">
                            <strong>Break Rule:</strong> Split big numbers into easy pieces! 🧩
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Times Tables and Patterns */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #8e44ad'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#8e44ad'}}>
                      <i className="bi bi-table me-2"></i>3. Times Tables - The Magic Patterns!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Easy Tables */}
                      <div className="col-md-4 mb-4">
                        <div className="table-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#8e44ad'}}>
                            <i className="bi bi-emoji-smile me-2"></i>Super Easy Tables!
                          </h5>
                          
                          <div className="easy-tables">
                            <div className="table-section mb-3">
                              <h6 className="text-success">2 Times Table 🚀</h6>
                              <div className="table-items">
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  2 × 1 = 2 (👯)
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  2 × 2 = 4 (👯👯)
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  2 × 3 = 6 (👯👯👯)
                                </div>
                                <div className="table-item bg-white border rounded p-2">
                                  2 × 4 = 8 (👯👯👯👯)
                                </div>
                              </div>
                              <small className="text-success"><strong>Pattern:</strong> Just count by 2s!</small>
                            </div>
                            
                            <div className="table-section">
                              <h6 className="text-info">5 Times Table ✋</h6>
                              <div className="table-items">
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  5 × 1 = 5 ✋
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  5 × 2 = 10 ✋✋
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  5 × 3 = 15 ✋✋✋
                                </div>
                                <div className="table-item bg-white border rounded p-2">
                                  5 × 4 = 20 ✋✋✋✋
                                </div>
                              </div>
                              <small className="text-info"><strong>Pattern:</strong> Always ends in 0 or 5!</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Pattern Tables */}
                      <div className="col-md-4 mb-4">
                        <div className="table-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#8e44ad'}}>
                            <i className="bi bi-magic me-2"></i>Pattern Magic!
                          </h5>
                          
                          <div className="pattern-tables">
                            <div className="table-section mb-3">
                              <h6 className="text-warning">9 Times Table 🌟</h6>
                              <div className="table-items">
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  9 × 1 = <span className="text-warning">09</span> (0+9=9)
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  9 × 2 = <span className="text-warning">18</span> (1+8=9)
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  9 × 3 = <span className="text-warning">27</span> (2+7=9)
                                </div>
                                <div className="table-item bg-white border rounded p-2">
                                  9 × 4 = <span className="text-warning">36</span> (3+6=9)
                                </div>
                              </div>
                              <small className="text-warning"><strong>Magic:</strong> Digits always add to 9!</small>
                            </div>
                            
                            <div className="table-section">
                              <h6 className="text-danger">11 Times Table 🎯</h6>
                              <div className="table-items">
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  11 × 1 = 11
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  11 × 2 = 22
                                </div>
                                <div className="table-item bg-white border rounded p-2 mb-1">
                                  11 × 3 = 33
                                </div>
                                <div className="table-item bg-white border rounded p-2">
                                  11 × 4 = 44
                                </div>
                              </div>
                              <small className="text-danger"><strong>Pattern:</strong> Repeat the digit!</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Finger Tricks */}
                      <div className="col-md-4 mb-4">
                        <div className="table-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#8e44ad'}}>
                            <i className="bi bi-hand-index me-2"></i>Finger Magic!
                          </h5>
                          
                          <div className="finger-tricks">
                            <div className="trick-section mb-3">
                              <h6 className="text-primary">9 Times on Fingers! 🖐️</h6>
                              <div className="trick-steps">
                                <div className="step-item bg-white border rounded p-2 mb-2">
                                  <strong>Step 1:</strong> Hold up 10 fingers
                                </div>
                                <div className="step-item bg-white border rounded p-2 mb-2">
                                  <strong>Step 2:</strong> For 9×3, put down 3rd finger
                                </div>
                                <div className="step-item bg-white border rounded p-2 mb-2">
                                  <strong>Step 3:</strong> Count: 2 fingers left, 7 fingers right
                                </div>
                                <div className="step-item bg-success text-white rounded p-2">
                                  <strong>Answer:</strong> 27! ✨
                                </div>
                              </div>
                            </div>
                            
                            <div className="visual-fingers text-center">
                              <div className="fs-5 mb-2">For 9 × 3:</div>
                              <div className="finger-demo">
                                <span className="fs-4">🖐️</span><span className="fs-4 text-danger">👇</span><span className="fs-4">🖐️</span>
                              </div>
                              <div className="result mt-2">
                                <span className="badge bg-primary">2</span>
                                <span className="badge bg-warning">7</span> = 27
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

            {/* Multi-digit Multiplication */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e67e22'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e67e22'}}>
                      <i className="bi bi-calculator me-2"></i>4. Big Number Multiplication!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Step-by-Step Magic! 📚</h5>
                        
                        <div className="big-multiplication-demo">
                          <div className="step-box bg-light border rounded p-3 mb-3">
                            <h6 className="text-center text-primary">Problem: 234 × 56</h6>
                            <div className="math-visual text-center">
                              <div className="traditional-layout fs-4">
                                <div>   234</div>
                                <div>×   56</div>
                                <div>_____</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="step-box bg-light border rounded p-3 mb-3">
                            <h6 className="text-center text-success">Step 1: Multiply by 6</h6>
                            <div className="calculation text-center">
                              <div className="fs-5 mb-2">234 × 6 = 1,404</div>
                              <div className="partial-result bg-white border rounded p-2">
                                <div>   234</div>
                                <div>×   56</div>
                                <div>_____</div>
                                <div> 1,404</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="step-box bg-light border rounded p-3 mb-3">
                            <h6 className="text-center text-warning">Step 2: Multiply by 50</h6>
                            <div className="calculation text-center">
                              <div className="fs-5 mb-2">234 × 50 = 11,700</div>
                              <div className="partial-result bg-white border rounded p-2">
                                <div>   234</div>
                                <div>×   56</div>
                                <div>_____</div>
                                <div> 1,404</div>
                                <div>11,700</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="step-box bg-light border rounded p-3">
                            <h6 className="text-center text-info">Step 3: Add them up!</h6>
                            <div className="final-calculation text-center">
                              <div className="fs-4 mb-2">1,404 + 11,700</div>
                              <div className="final-answer bg-success text-white p-2 rounded">
                                <strong>= 13,104</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="strategy-box bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Think Like a Pro! 🧠</h6>
                          
                          <div className="pro-strategies">
                            <div className="strategy-item bg-white border rounded p-3 mb-3">
                              <h6 className="text-primary">💡 Break It Down Strategy</h6>
                              <div className="strategy-demo">
                                <div className="fs-6 mb-2">234 × 56 becomes:</div>
                                <div className="breakdown">
                                  <div>234 × (50 + 6)</div>
                                  <div>= (234 × 50) + (234 × 6)</div>
                                  <div>= 11,700 + 1,404</div>
                                  <div className="text-success">= 13,104 ✅</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="strategy-item bg-white border rounded p-3 mb-3">
                              <h6 className="text-warning">🎯 Estimation First!</h6>
                              <div className="estimation-demo">
                                <div className="fs-6 mb-2">Round first to check:</div>
                                <div className="rounded-calc">
                                  <div>234 ≈ 200</div>
                                  <div>56 ≈ 60</div>
                                  <div>200 × 60 = 12,000</div>
                                  <div className="text-info">Our answer 13,104 is close! ✅</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="strategy-item bg-white border rounded p-3">
                              <h6 className="text-success">⚡ Quick Check Tricks</h6>
                              <div className="check-tricks">
                                <ul className="list-unstyled">
                                  <li>• If multiplying by even number, answer is even</li>
                                  <li>• If multiplying by 5, answer ends in 0 or 5</li>
                                  <li>• Use estimation to catch big mistakes</li>
                                </ul>
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
                      <i className="bi bi-check-circle me-2"></i>Quick Wizard Training!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Array Challenge</h6>
                          <div className="mini-array mb-2">
                            <div className="fs-5">🟦🟦🟦🟦</div>
                            <div className="fs-5">🟦🟦🟦🟦</div>
                            <div className="fs-5">🟦🟦🟦🟦</div>
                          </div>
                          <p>How many squares total?</p>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">12!</span><br/>
                            <small>3 rows × 4 columns = 12</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Pattern Detective</h6>
                          <p>What comes next?</p>
                          <div className="pattern-sequence mb-2">
                            <span className="badge bg-warning me-1">7</span>
                            <span className="badge bg-warning me-1">14</span>
                            <span className="badge bg-warning me-1">21</span>
                            <span className="badge bg-secondary">?</span>
                          </div>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">28!</span><br/>
                            <small>7 times table: 7×4=28</small>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Word Problem Wizard</h6>
                          <p>🎒 A school bag costs ₹450. How much for 8 bags?</p>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">₹3,600!</span><br/>
                            <small>450 × 8 = 3,600</small>
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
                <h2 className="mb-3" style={{color: '#2980b9'}}>
                  <i className="bi bi-globe me-2"></i>Multiplication in the Real World
                </h2>
                <p className="lead">See how multiplication powers everything around us! 🌍</p>
              </div>
            </div>

            <div className="row">
              {/* Shopping & Money */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                  <h5 className="mb-3" style={{color: '#e74c3c'}}>
                    <i className="bi bi-cart me-2"></i>Shopping & Money Magic
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">🍎 Fruit Market</h6>
                      <div className="scenario-math">
                        <div>Apples: ₹80 per kg</div>
                        <div>Need: 3 kg</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">₹80 × 3 = ₹240</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">📚 School Supplies</h6>
                      <div className="scenario-math">
                        <div>Notebooks: ₹25 each</div>
                        <div>Class needs: 35 notebooks</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">₹25 × 35 = ₹875</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">🎂 Party Planning</h6>
                      <div className="scenario-math">
                        <div>Cupcakes: ₹15 each</div>
                        <div>Guests: 24 people</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">₹15 × 24 = ₹360</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Time & Scheduling */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #9b59b6'}}>
                  <h5 className="mb-3" style={{color: '#9b59b6'}}>
                    <i className="bi bi-clock me-2"></i>Time & Space Calculations
                  </h5>
                  
                  <div className="real-scenarios">
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-primary">🏃‍♂️ Exercise Routine</h6>
                      <div className="scenario-math">
                        <div>Daily pushups: 15</div>
                        <div>Days in a week: 7</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-success">15 × 7 = 105 pushups/week</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3 mb-3">
                      <h6 className="text-warning">🏗️ Room Tiles</h6>
                      <div className="scenario-math">
                        <div>Room: 12 feet × 15 feet</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-info">12 × 15 = 180 square feet</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="scenario bg-white border rounded p-3">
                      <h6 className="text-success">🌱 Garden Planning</h6>
                      <div className="scenario-math">
                        <div>Rows: 8</div>
                        <div>Plants per row: 12</div>
                        <div className="calculation mt-2">
                          <span className="badge bg-danger">8 × 12 = 96 plants total</span>
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
            <AdditionQuiz operationType="multiplication" />
          </div>
        </section>

        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #2980b9'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#2980b9'}}>
                        🎉 Congratulations, Multiplication Wizard! 🧙‍♂️
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your magical journey through the world of multiplication! 
                        You now have the wizard powers to multiply any numbers and solve real-world challenges with ease.
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
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Wizard Powers Mastered</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Arrays and visual multiplication</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Multiplication properties magic</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Times tables and patterns</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Multi-digit multiplication</span>
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
                              <h5 className="mb-2" style={{color: '#3498db'}}>Next Magical Quests</h5>
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #2980b9, #3498db)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-stars fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">✨ Ready for Your Next Mathematical Adventure?</h5>
                          <p className="mb-0 lead">
                            Keep practicing and remember: every great wizard started with simple spells! 
                            You're now equipped with the magical tools to multiply your way through any challenge!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Multiplication Wizard Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #2980b9, #3498db)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>🧙‍♂️ Apprentice Started</span>
                            <span>✨ Spells Learned</span>
                            <span>🏆 Master Wizard!</span>
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
          box-shadow: 0 10px 30px rgba(41, 128, 185, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(41, 128, 185, 0.4);
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default Multiplication;
