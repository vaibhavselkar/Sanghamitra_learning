// src/pages/math/arithmetic/Addition.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Addition = () => {
  return (
    <div className="addition-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Addition</h1>
                  <p className="mb-0">Welcome to our addition learning hub. Enhance your basic skills with our comprehensive resources and interactive lessons.</p>
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
                <li className="current">Addition</li>
              </ol>
            </div>
          </nav>
        </div>

        {/* Learning Journey Section */}
        <section className="journey-section py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #20c997'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#20c997'}}>
                      <i className="bi bi-rocket-takeoff-fill me-2"></i>Your Math Adventure Awaits!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become an Addition Champion? By the end of this quest, you'll unlock these superpowers:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-plus-circle"></i>
                                </div>
                                <div>
                                  <strong className="text-teal">Number Teamwork!</strong><br />
                                  <small className="text-muted">Discover how numbers join forces to create bigger numbers</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-lightning-charge"></i>
                                </div>
                                <div>
                                  <strong className="text-teal">Lightning Speed!</strong><br />
                                  <small className="text-muted">Solve number challenges faster than ever</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-shuffle"></i>
                                </div>
                                <div>
                                  <strong className="text-teal">Number Magic!</strong><br />
                                  <small className="text-muted">Master the art of moving and carrying numbers</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-globe"></i>
                                </div>
                                <div>
                                  <strong className="text-teal">Real-World Hero!</strong><br />
                                  <small className="text-muted">Use your powers to solve everyday puzzles</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-trophy"></i>
                                </div>
                                <div>
                                  <strong className="text-teal">Confidence Boost!</strong><br />
                                  <small className="text-muted">Feel proud tackling any math challenge</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-brain"></i>
                                </div>
                                <div>
                                  <strong className="text-teal">Brain Power!</strong><br />
                                  <small className="text-muted">Think like a mathematician</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-award-fill fs-1 text-warning"></i>
                          </div>
                          <h5 className="text-teal mb-2">Level Up Your Math!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-teal" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Math Beginner to Addition Champion!</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="adventure-callout bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #20c997, #17a2b8)'}}>
                        <span className="text-white fs-5">🚀 Ready to blast off into the world of numbers? Let's go! 🚀</span>
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
                <div className="card shadow border-0" style={{borderTop: '4px solid #ff6b6b'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#ff6b6b'}}>
                      <i className="bi bi-puzzle-fill me-2"></i>Let's Crack the Addition Code!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What is Addition? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #ff6b6b'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-plus-lg fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#ff6b6b'}}>What's Addition?</h5>
                              <p className="mb-3">Addition is like being a <strong>Number Team Captain!</strong> You bring different groups together to make one big, happy family! 👨‍👩‍👧‍👦</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="mb-2">
                                <span className="fs-3">🍎🍎</span> + <span className="fs-3">🍎🍎🍎</span> = <span className="fs-3">🍎🍎🍎🍎🍎</span>
                              </div>
                              <div className="equation-display">
                                <span className="badge bg-primary fs-6">2</span> + 
                                <span className="badge bg-success fs-6">3</span> = 
                                <span className="badge bg-warning fs-6">5</span>
                              </div>
                              <small className="text-muted d-block mt-2">Two apple friends meet three apple friends = Five apple friends!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Daily Life Usage */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #4ecdc4'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-house-heart fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#4ecdc4'}}>Your Daily Superpower!</h5>
                              <p className="mb-3">We use addition everywhere in India! It's like having a <strong>math superpower</strong> in your pocket! 🦸‍♂️</p>
                            </div>
                          </div>
                          
                          <div className="daily-examples">
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-currency-rupee text-success fs-5 me-2"></i>
                              <span><strong>Kirana Shop:</strong> ₹10 + ₹15 = ₹25 total</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-basket text-warning fs-5 me-2"></i>
                              <span><strong>Market Visit:</strong> 5 tomatoes + 3 onions</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-gift text-danger fs-5 me-2"></i>
                              <span><strong>Festival Fun:</strong> 8 ladoos + 6 jalebis</span>
                            </div>
                            <div className="example-item d-flex align-items-center">
                              <i className="bi bi-people text-primary fs-5 me-2"></i>
                              <span><strong>Family Count:</strong> 4 cousins + 2 siblings</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Fact */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #ff9f43'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-lightbulb fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#ff9f43'}}>Mind-Blowing Fact! 🤯</h5>
                            </div>
                          </div>
                          
                          <div className="fact-display bg-white border rounded p-3">
                            <div className="text-center">
                              <h6 className="text-primary mb-3">Daily Chapati Count Challenge!</h6>
                              <div className="chapati-math">
                                <div className="meal-count mb-2">
                                  <span className="badge bg-info me-2">Breakfast: 2</span> 🫓🫓
                                </div>
                                <div className="meal-count mb-2">
                                  <span className="badge bg-success me-2">Lunch: 3</span> 🫓🫓🫓
                                </div>
                                <div className="meal-count mb-2">
                                  <span className="badge bg-danger me-2">Dinner: 3</span> 🫓🫓🫓
                                </div>
                                <hr />
                                <div className="total-count">
                                  <span className="badge bg-warning fs-5">Total: 8 chapatis!</span> 🎉
                                </div>
                              </div>
                              <small className="text-muted">That's like eating a whole chapati village every day!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Activity */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #a55eea'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-purple text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', backgroundColor: '#a55eea'}}>
                              <i className="bi bi-controller fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#a55eea'}}>Let's Play Right Now! 🎯</h5>
                            </div>
                          </div>
                          
                          <div className="activity-box bg-white border rounded p-3">
                            <h6 className="text-center text-primary mb-3">👥 Buddy Step Challenge! 👣</h6>
                            <ol className="list-steps text-start">
                              <li>Find your favorite study buddy or sibling</li>
                              <li>Both of you take exactly <strong>10 steps</strong> forward</li>
                              <li>Count together: "10 + 10 = ?"</li>
                              <li>Shout the answer: <strong>"TWENTY!"</strong></li>
                              <li>Do a victory dance! 💃🕺</li>
                            </ol>
                            <div className="text-center mt-3">
                              <div className="celebration bg-gradient p-2 rounded" style={{background: 'linear-gradient(45deg, #a55eea, #ff6b6b)'}}>
                                <span className="text-white small">🎉 Congratulations! You just did addition with your feet! 🎉</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Call-to-Action */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="cta-box text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)', color: 'white'}}>
                          <h5 className="mb-2">🚀 Ready to Become an Addition Expert? 🚀</h5>
                          <p className="mb-3">Let's dive deeper and unlock the secrets that make addition super easy and fun!</p>
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
                <h2 className="mb-3" style={{color: '#20c997'}}>
                  <i className="bi bi-building-blocks me-2"></i>Building Blocks You Need to Know
                </h2>
                <p className="lead">Master these basics and addition becomes super easy! 🚀</p>
              </div>
            </div>

            {/* Place Value Understanding */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #ff6b6b'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#ff6b6b'}}>
                      <i className="bi bi-123 me-2"></i>1. Place Value Magic
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">Every Digit Has Its Special Place! 🏠</h5>
                        
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
                          
                          {/* Example Number */}
                          <div className="row text-center mt-3">
                            <div className="col-4">
                              <div className="number-box bg-light border p-3 rounded">
                                <h3 className="text-danger">2</h3>
                                <small>2 hundreds = 200</small>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="number-box bg-light border p-3 rounded">
                                <h3 className="text-warning">3</h3>
                                <small>3 tens = 30</small>
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
                            <h4 className="text-primary">200 + 30 + 5 = 235</h4>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="visual-example bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Think of it like organizing toys! 🧸</h6>
                          
                          {/* Visual representation with blocks */}
                          <div className="blocks-container text-center">
                            <div className="mb-3">
                              <span className="badge bg-danger me-1">100</span>
                              <span className="badge bg-danger me-1">100</span>
                              <span className="fs-5">= 2 hundreds</span>
                            </div>
                            <div className="mb-3">
                              <span className="badge bg-warning me-1">10</span>
                              <span className="badge bg-warning me-1">10</span>
                              <span className="badge bg-warning me-1">10</span>
                              <span className="fs-5">= 3 tens</span>
                            </div>
                            <div className="mb-3">
                              <span className="badge bg-success me-1">1</span>
                              <span className="badge bg-success me-1">1</span>
                              <span className="badge bg-success me-1">1</span>
                              <span className="badge bg-success me-1">1</span>
                              <span className="badge bg-success me-1">1</span>
                              <span className="fs-5">= 5 ones</span>
                            </div>
                          </div>
                          
                          <div className="alert bg-info text-center">
                            <i className="bi bi-lightbulb text-warning me-2"></i>
                            <strong>Remember:</strong> Same place values stick together!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Number Sense */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #4ecdc4'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#4ecdc4'}}>
                      <i className="bi bi-eye me-2"></i>2. Number Sense - See the Story!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 text-center mb-4">
                        <div className="story-card bg-light p-4 rounded h-100">
                          <h5 className="text-info">🐶 Story Time!</h5>
                          <div className="visual-story">
                            <p className="mb-3">I have <span className="badge bg-primary fs-6">3</span> puppies</p>
                            <div className="mb-3">🐶 🐶 🐶</div>
                            <p className="mb-3">My friend gives me <span className="badge bg-success fs-6">2</span> more</p>
                            <div className="mb-3">🐶 🐶</div>
                            <hr />
                            <p className="mb-2"><strong>Total puppies:</strong></p>
                            <div className="mb-2">🐶 🐶 🐶 🐶 🐶</div>
                            <h4 className="text-primary">3 + 2 = 5</h4>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 text-center mb-4">
                        <div className="story-card bg-light p-4 rounded h-100">
                          <h5 className="text-info">🍎 Fruit Market!</h5>
                          <div className="visual-story">
                            <p className="mb-3">Morning: <span className="badge bg-warning fs-6">15</span> apples</p>
                            <div className="mb-3">
                              <div className="d-flex justify-content-center">
                                <span className="fs-4">🍎🍎🍎🍎🍎</span>
                              </div>
                              <div className="d-flex justify-content-center">
                                <span className="fs-4">🍎🍎🍎🍎🍎</span>
                              </div>
                              <div className="d-flex justify-content-center">
                                <span className="fs-4">🍎🍎🍎🍎🍎</span>
                              </div>
                            </div>
                            <p className="mb-3">Afternoon: <span className="badge bg-info fs-6">8</span> more apples</p>
                            <div className="mb-3">
                              <span className="fs-4">🍎🍎🍎🍎</span><br />
                              <span className="fs-4">🍎🍎🍎🍎</span>
                            </div>
                            <h4 className="text-primary">15 + 8 = 23</h4>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 text-center mb-4">
                        <div className="story-card bg-light p-4 rounded h-100">
                          <h5 className="text-info">💰 Shopping Fun!</h5>
                          <div className="visual-story">
                            <p className="mb-3">Pencil: <span className="badge bg-success fs-6">₹5</span></p>
                            <div className="mb-2">✏️ = 💰💰💰💰💰</div>
                            <p className="mb-3">Eraser: <span className="badge bg-danger fs-6">₹3</span></p>
                            <div className="mb-3">🧹 = 💰💰💰</div>
                            <hr />
                            <p className="mb-2"><strong>Total cost:</strong></p>
                            <div className="mb-2">💰💰💰💰💰💰💰💰</div>
                            <h4 className="text-primary">₹5 + ₹3 = ₹8</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-warning text-center">
                      <i className="bi bi-star-fill text-warning me-2"></i>
                      <strong>Pro Tip:</strong> Always imagine the story behind numbers! 📖
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Addition Properties */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #ff9f43'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#ff9f43'}}>
                      <i className="bi bi-magic me-2"></i>3. Addition Super Powers!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Commutative Property */}
                      <div className="col-md-6 mb-4">
                        <div className="property-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#ff9f43'}}>
                            <i className="bi bi-arrow-left-right me-2"></i>Flip & Switch Power!
                          </h5>
                          
                          <div className="visual-demo text-center">
                            <div className="mb-3">
                              <div className="equation-box bg-white border rounded p-3">
                                <span className="fs-4">🟦🟦🟦 + 🟨🟨</span>
                                <div className="mt-2">
                                  <span className="badge bg-primary">3</span> + 
                                  <span className="badge bg-warning">2</span> = 
                                  <span className="badge bg-success">5</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flip-arrow">
                              <i className="bi bi-arrow-down-up fs-2 text-muted"></i>
                              <p className="small text-muted">FLIP IT!</p>
                            </div>
                            
                            <div className="mb-3">
                              <div className="equation-box bg-white border rounded p-3">
                                <span className="fs-4">🟨🟨 + 🟦🟦🟦</span>
                                <div className="mt-2">
                                  <span className="badge bg-warning">2</span> + 
                                  <span className="badge bg-primary">3</span> = 
                                  <span className="badge bg-success">5</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-info text-center">
                            <strong>Magic Rule:</strong> Order doesn't matter! ✨
                          </div>
                        </div>
                      </div>
                      
                      {/* Identity Property */}
                      <div className="col-md-6 mb-4">
                        <div className="property-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#ff9f43'}}>
                            <i className="bi bi-0-circle me-2"></i>Zero Hero Power!
                          </h5>
                          
                          <div className="visual-demo text-center">
                            <div className="mb-4">
                              <div className="equation-box bg-white border rounded p-3">
                                <span className="fs-3">🎈🎈🎈🎈🎈</span>
                                <div className="mt-2">
                                  <span className="badge bg-primary fs-5">5</span> balloons
                                </div>
                              </div>
                            </div>
                            
                            <div className="plus-sign">
                              <span className="fs-2 text-success">+</span>
                            </div>
                            
                            <div className="mb-4">
                              <div className="equation-box bg-white border rounded p-3">
                                <span className="fs-3">❌</span>
                                <div className="mt-2">
                                  <span className="badge bg-danger fs-5">0</span> new balloons
                                </div>
                              </div>
                            </div>
                            
                            <div className="equals-sign">
                              <span className="fs-2 text-info">=</span>
                            </div>
                            
                            <div className="mb-3">
                              <div className="equation-box bg-white border rounded p-3">
                                <span className="fs-3">🎈🎈🎈🎈🎈</span>
                                <div className="mt-2">
                                  <span className="badge bg-success fs-5">5</span> balloons
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-success text-center">
                            <strong>Zero Rule:</strong> Adding 0 changes nothing! 🤷‍♂️
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regrouping/Carrying */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #a55eea'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#a55eea'}}>
                      <i className="bi bi-arrow-up-circle me-2"></i>4. The Carry-Over Trick!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="text-center mb-4">When Numbers Get Too Big for Their Home! 🏠➡️🏠</h5>
                        
                        {/* Step by step visual */}
                        <div className="carry-demo">
                          <div className="step-box bg-light border rounded p-3 mb-3">
                            <h6 className="text-center text-primary">Step 1: Add the Ones</h6>
                            <div className="math-visual text-center">
                              <div className="number-line">
                                <span className="tens-place">2</span>
                                <span className="ones-place bg-warning p-2 rounded">8</span>
                              </div>
                              <div className="operator">+</div>
                              <div className="number-line">
                                <span className="tens-place">1</span>
                                <span className="ones-place bg-warning p-2 rounded">7</span>
                              </div>
                              <hr />
                              <div className="result">
                                <span className="text-danger">8 + 7 = 15</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="step-box bg-light border rounded p-3 mb-3">
                            <h6 className="text-center text-success">Step 2: 15 is Too Big!</h6>
                            <div className="visual-breakdown text-center">
                              <div className="big-number bg-danger text-white p-3 rounded d-inline-block">
                                <span className="fs-4">15</span>
                              </div>
                              <div className="arrow-down mt-2">
                                <i className="bi bi-arrow-down fs-3"></i>
                              </div>
                              <div className="breakdown mt-2">
                                <span className="badge bg-warning fs-5 me-2">10</span>
                                <span className="fs-4">+</span>
                                <span className="badge bg-success fs-5 ms-2">5</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="step-box bg-light border rounded p-3">
                            <h6 className="text-center text-info">Step 3: Move the 10!</h6>
                            <div className="final-result text-center">
                              <div className="carry-visual">
                                <div className="carry-number text-danger small">¹</div>
                                <div className="number-line">
                                  <span className="tens-place bg-info p-2 rounded text-white">2</span>
                                  <span className="ones-place">8</span>
                                </div>
                                <div className="operator">+</div>
                                <div className="number-line">
                                  <span className="tens-place bg-info p-2 rounded text-white">1</span>
                                  <span className="ones-place">7</span>
                                </div>
                                <hr />
                                <div className="final-answer">
                                  <span className="tens-place bg-success p-2 rounded text-white">4</span>
                                  <span className="ones-place bg-success p-2 rounded text-white">5</span>
                                </div>
                              </div>
                              <div className="explanation mt-3">
                                <small className="text-muted">1 + 2 + 1 = 4 (tens) | 5 (ones)</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="analogy-box bg-light p-4 rounded">
                          <h6 className="text-center mb-3">Think of it Like Moving Houses! 🏠</h6>
                          
                          <div className="house-analogy">
                            <div className="mb-4 text-center">
                              <div className="house bg-warning p-3 rounded d-inline-block">
                                <h6>Ones House</h6>
                                <div className="occupants">
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                </div>
                                <div className="occupants mt-2">
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                  <span className="badge bg-white text-dark me-1">1</span>
                                </div>
                                <div className="occupants mt-2">
                                  <span className="badge bg-danger text-white me-1">1</span>
                                  <span className="badge bg-danger text-white me-1">1</span>
                                  <span className="badge bg-danger text-white me-1">1</span>
                                  <span className="badge bg-danger text-white me-1">1</span>
                                  <span className="badge bg-danger text-white me-1">1</span>
                                </div>
                                <small className="text-danger d-block mt-1">Too crowded! (15 people)</small>
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <i className="bi bi-arrow-right fs-2 text-success"></i>
                              <p className="text-success small"><strong>Move 10 people to Tens House!</strong></p>
                            </div>
                            
                            <div className="row text-center">
                              <div className="col-6">
                                <div className="house bg-info text-white p-3 rounded">
                                  <h6>Tens House</h6>
                                  <div className="occupants">
                                    <span className="badge bg-success me-1">10</span>
                                    <span className="badge bg-success me-1">10</span>
                                    <span className="badge bg-success me-1">10</span>
                                    <span className="badge bg-success me-1">10</span>
                                  </div>
                                  <small className="d-block mt-1">4 tens = 40</small>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="house bg-warning p-3 rounded">
                                  <h6>Ones House</h6>
                                  <div className="occupants">
                                    <span className="badge bg-white text-dark me-1">1</span>
                                    <span className="badge bg-white text-dark me-1">1</span>
                                    <span className="badge bg-white text-dark me-1">1</span>
                                    <span className="badge bg-white text-dark me-1">1</span>
                                    <span className="badge bg-white text-dark me-1">1</span>
                                  </div>
                                  <small className="d-block mt-1">5 ones = 5</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-primary text-white text-center mt-4">
                      <i className="bi bi-lightbulb me-2"></i>
                      <strong>Golden Rule:</strong> When you get 10 or more, send 1 to the next house! 🏠➡️🏠
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Practice */}
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #26de81'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#26de81'}}>
                      <i className="bi bi-check-circle me-2"></i>Quick Practice!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Place Value Challenge</h6>
                          <p className="fs-4">What place is the <span className="text-danger">7</span> in <span className="badge bg-primary fs-5">472</span>?</p>
                          <button className="btn btn-teal btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">Tens place!</span> 🎉
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Story Problem</h6>
                          <p>🐱🐱🐱 + 🐱🐱 = ?</p>
                          <button className="btn btn-teal btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">5 cats!</span> 🐱🐱🐱🐱🐱
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-card bg-light p-3 rounded text-center">
                          <h6>Carry-Over Practice</h6>
                          <div className="fs-5">
                            <div>  17</div>
                            <div>+ 26</div>
                            <div>____</div>
                          </div>
                          <button className="btn btn-teal btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Answer</button>
                          <div className="answer mt-2" style={{display: 'none'}}>
                            <span className="badge bg-success">43!</span><br />
                            <small>7+6=13 (write 3, carry 1)<br />1+2+1=4</small>
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
            <AdditionQuiz operationType="addition" />
          </div>
        </section>

        {/* Final Mastery Section */}
        <section className="mastery-completion py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #20c997'}}>
                  <div className="card-body">
                    {/* Trophy Header */}
                    <div className="text-center mb-5">
                      <div className="trophy-container mb-4">
                        <div className="trophy-circle bg-success text-white rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{width: '120px', height: '120px', animation: 'pulse 2s infinite'}}>
                          <i className="bi bi-trophy fs-1"></i>
                        </div>
                      </div>
                      <h2 className="mb-3" style={{color: '#20c997'}}>
                        🎉 Congratulations, Addition Champion! 🏆
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've successfully completed your journey through the world of addition! 
                        You now have the mathematical superpowers to tackle any addition challenge that comes your way.
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
                              <span>Place value understanding</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Number sense and visualization</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Addition properties mastery</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Carry-over techniques</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Real-world problem solving</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Mathematical confidence</span>
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #20c997, #17a2b8)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-rocket-takeoff fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">🚀 Ready for the Next Mathematical Adventure?</h5>
                          <p className="mb-0 lead">
                            Keep practicing and remember: every mathematician started with addition! 
                            You're now equipped with the tools to conquer any number combination that comes your way!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Celebration */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="progress-celebration bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Addition Mastery Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #20c997, #17a2b8)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>🔢 Basic Numbers</span>
                            <span>➕ Addition Skills</span>
                            <span>🏆 Math Champion!</span>
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
          box-shadow: 0 10px 30px rgba(32, 201, 151, 0.3);
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(32, 201, 151, 0.4);
        }
        `}
        </style>
      </main>
    </div>
  );
  
};

export default Addition;