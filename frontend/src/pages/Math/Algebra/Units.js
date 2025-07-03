// src/pages/math/algebra/Units.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../../../assets/css/main.css";
import AdditionQuiz from "../../../components/AdditionQuiz";

const Units = () => {
  return (
    <div className="units-container">
      <main className="main">
        {/* Page Title */}
        <div className="page-title" data-aos="fade" style={{marginBottom: '2rem'}}>
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1>Units & Measurement</h1>
                  <p className="mb-0">Master the language of measurement! From tiny millimeters to massive kilometers, discover how units help us understand and describe our world with precision.</p>
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
                <li className="current">Units</li>
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
                      <i className="bi bi-rulers me-2"></i>Your Measurement Master Journey!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <p className="lead mb-4">Ready to become a Measurement Master? By the end of this journey, you'll gain these incredible abilities:</p>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-arrows-angle-expand"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Unit Converter Pro!</strong><br />
                                  <small className="text-muted">Convert between any units effortlessly</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-globe"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Metric Master!</strong><br />
                                  <small className="text-muted">Navigate the metric system like a pro</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-calculator"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Dimension Detective!</strong><br />
                                  <small className="text-muted">Check unit compatibility instantly</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-speedometer2"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Rate Calculator!</strong><br />
                                  <small className="text-muted">Master speed, density, and rates</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-bullseye"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Precision Expert!</strong><br />
                                  <small className="text-muted">Choose the right unit for any task</small>
                                </div>
                              </li>
                              <li className="mb-3 d-flex align-items-start">
                                <div className="power-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                  <i className="bi bi-tools"></i>
                                </div>
                                <div>
                                  <strong className="text-primary">Real-World Problem Solver!</strong><br />
                                  <small className="text-muted">Apply units to solve practical problems</small>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className="adventure-visual bg-light rounded p-4">
                          <div className="mb-3">
                            <i className="bi bi-rulers fs-1 text-primary"></i>
                          </div>
                          <h5 className="text-primary mb-2">Measure Your World!</h5>
                          <div className="progress mb-3" style={{height: '8px'}}>
                            <div className="progress-bar bg-primary" style={{width: '0%', animation: 'fillProgress 3s ease-in-out forwards'}}></div>
                          </div>
                          <p className="small text-muted mb-0">From Measurement Novice to Unit Expert!</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <div className="adventure-callout bg-gradient p-3 rounded" style={{background: 'linear-gradient(135deg, #3498db, #5dade2)'}}>
                        <span className="text-white fs-5">📏 Ready to unlock the power of measurement? Let's explore! 🚀</span>
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
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-lightbulb me-2"></i>What Are Units?
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What are Units? */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-rulers fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#3498db'}}>The Language of Measurement!</h5>
                              <p className="mb-3">Units are <strong>standard amounts</strong> we use to measure things. They're like the "words" that help us describe <strong>how much</strong> or <strong>how big</strong> something is! 📐</p>
                            </div>
                          </div>
                          
                          <div className="visual-example bg-white border rounded p-3">
                            <div className="text-center">
                              <div className="mb-3">
                                <div className="fs-5 text-primary">5 _____</div>
                                <small className="text-muted">What does 5 mean? 🤔</small>
                              </div>
                              <div className="unit-examples mt-3">
                                <span className="badge bg-info me-2">5 meters</span>
                                <span className="badge bg-success me-2">5 kilograms</span>
                                <span className="badge bg-warning">5 seconds</span>
                                <div className="mt-2">
                                  <small className="text-muted">Units give numbers meaning!</small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Why Units Matter */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-exclamation-triangle fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#e74c3c'}}>Units Save the Day!</h5>
                              <p className="mb-3">Without units, we'd have <strong>chaos!</strong> Imagine mixing up meters and miles, or grams and pounds! 😱</p>
                            </div>
                          </div>
                          
                          <div className="real-examples">
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-airplane text-primary fs-5 me-2"></i>
                              <span><strong>NASA Mars Orbiter:</strong> Lost due to unit mix-up!</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-cup-hot text-warning fs-5 me-2"></i>
                              <span><strong>Recipes:</strong> Cup vs. milliliter confusion</span>
                            </div>
                            <div className="example-item d-flex align-items-center mb-2">
                              <i className="bi bi-thermometer text-danger fs-5 me-2"></i>
                              <span><strong>Medicine:</strong> mg vs. g can be dangerous!</span>
                            </div>
                            <div className="example-item d-flex align-items-center">
                              <i className="bi bi-speedometer2 text-success fs-5 me-2"></i>
                              <span><strong>Speed limits:</strong> mph vs. km/h matters!</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unit Systems */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #f39c12'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-globe2 fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#f39c12'}}>Two Major Systems! 🌍</h5>
                            </div>
                          </div>
                          
                          <div className="systems-comparison bg-white border rounded p-3">
                            <div className="row">
                              <div className="col-6">
                                <h6 className="text-primary text-center">Metric System</h6>
                                <div className="system-details">
                                  <div className="badge bg-primary mb-2 w-100">Used by 95% of world!</div>
                                  <ul className="list-unstyled small">
                                    <li>• Base 10 (easy!)</li>
                                    <li>• Meter, kilogram, liter</li>
                                    <li>• Scientific standard</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-6">
                                <h6 className="text-warning text-center">Imperial System</h6>
                                <div className="system-details">
                                  <div className="badge bg-warning mb-2 w-100">USA, UK (partial)</div>
                                  <ul className="list-unstyled small">
                                    <li>• Various bases</li>
                                    <li>• Foot, pound, gallon</li>
                                    <li>• Traditional use</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fun Fact */}
                      <div className="col-md-6 mb-4">
                        <div className="intro-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #9b59b6'}}>
                          <div className="d-flex align-items-start mb-3">
                            <div className="icon-box text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', backgroundColor: '#9b59b6'}}>
                              <i className="bi bi-emoji-smile fs-4"></i>
                            </div>
                            <div>
                              <h5 className="mb-2" style={{color: '#9b59b6'}}>Unit History Fun! 🏛️</h5>
                            </div>
                          </div>
                          
                          <div className="history-facts bg-white border rounded p-3">
                            <div className="fact mb-3">
                              <h6 className="text-info">The Foot 👣</h6>
                              <small>Originally based on the length of a human foot! King's foot = standard.</small>
                            </div>
                            <div className="fact mb-3">
                              <h6 className="text-success">The Meter 🌍</h6>
                              <small>Originally 1/10,000,000 of distance from equator to North Pole!</small>
                            </div>
                            <div className="fact">
                              <h6 className="text-warning">The Second ⏰</h6>
                              <small>Based on Earth's rotation, now defined by atomic vibrations!</small>
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
                  <i className="bi bi-gear me-2"></i>Unit Fundamentals
                </h2>
                <p className="lead">Master these core concepts to become a measurement expert! 📊</p>
              </div>
            </div>

            {/* Basic Unit Types */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #e74c3c'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#e74c3c'}}>
                      <i className="bi bi-collection me-2"></i>1. The Seven Basic Quantities
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Length */}
                      <div className="col-md-4 mb-4">
                        <div className="quantity-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#3498db'}}>
                            <i className="bi bi-arrows-expand me-2"></i>Length
                          </h5>
                          
                          <div className="unit-info bg-white border rounded p-3 mb-3">
                            <div className="text-center mb-3">
                              <div className="fs-1">📏</div>
                              <div className="badge bg-primary">How long or far?</div>
                            </div>
                            <div className="units-list">
                              <h6 className="text-primary">Metric:</h6>
                              <ul className="list-unstyled">
                                <li>• millimeter (mm)</li>
                                <li>• centimeter (cm)</li>
                                <li>• meter (m) ⭐</li>
                                <li>• kilometer (km)</li>
                              </ul>
                              <h6 className="text-warning mt-2">Imperial:</h6>
                              <ul className="list-unstyled">
                                <li>• inch (in)</li>
                                <li>• foot (ft)</li>
                                <li>• yard (yd)</li>
                                <li>• mile (mi)</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="conversion-tip bg-info bg-opacity-10 p-2 rounded text-center">
                            <small><strong>Quick Tip:</strong> 1 meter ≈ 3.3 feet</small>
                          </div>
                        </div>
                      </div>
                      
                      {/* Mass */}
                      <div className="col-md-4 mb-4">
                        <div className="quantity-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-box me-2"></i>Mass
                          </h5>
                          
                          <div className="unit-info bg-white border rounded p-3 mb-3">
                            <div className="text-center mb-3">
                              <div className="fs-1">⚖️</div>
                              <div className="badge bg-success">How much matter?</div>
                            </div>
                            <div className="units-list">
                              <h6 className="text-success">Metric:</h6>
                              <ul className="list-unstyled">
                                <li>• milligram (mg)</li>
                                <li>• gram (g)</li>
                                <li>• kilogram (kg) ⭐</li>
                                <li>• metric ton (t)</li>
                              </ul>
                              <h6 className="text-warning mt-2">Imperial:</h6>
                              <ul className="list-unstyled">
                                <li>• ounce (oz)</li>
                                <li>• pound (lb)</li>
                                <li>• ton</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="conversion-tip bg-success bg-opacity-10 p-2 rounded text-center">
                            <small><strong>Quick Tip:</strong> 1 kg ≈ 2.2 pounds</small>
                          </div>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="col-md-4 mb-4">
                        <div className="quantity-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#f39c12'}}>
                            <i className="bi bi-clock me-2"></i>Time
                          </h5>
                          
                          <div className="unit-info bg-white border rounded p-3 mb-3">
                            <div className="text-center mb-3">
                              <div className="fs-1">⏰</div>
                              <div className="badge bg-warning">When or how long?</div>
                            </div>
                            <div className="units-list">
                              <h6 className="text-warning">Universal Units:</h6>
                              <ul className="list-unstyled">
                                <li>• millisecond (ms)</li>
                                <li>• second (s) ⭐</li>
                                <li>• minute (min)</li>
                                <li>• hour (h)</li>
                                <li>• day (d)</li>
                                <li>• year (y)</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="conversion-tip bg-warning bg-opacity-10 p-2 rounded text-center">
                            <small><strong>Remember:</strong> 60s = 1min, 60min = 1h</small>
                          </div>
                        </div>
                      </div>

                      {/* Temperature */}
                      <div className="col-md-4 mb-4">
                        <div className="quantity-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-thermometer-half me-2"></i>Temperature
                          </h5>
                          
                          <div className="unit-info bg-white border rounded p-3 mb-3">
                            <div className="text-center mb-3">
                              <div className="fs-1">🌡️</div>
                              <div className="badge bg-danger">How hot or cold?</div>
                            </div>
                            <div className="units-list">
                              <ul className="list-unstyled">
                                <li>• Celsius (°C) - Water freezes at 0°</li>
                                <li>• Fahrenheit (°F) - Water freezes at 32°</li>
                                <li>• Kelvin (K) ⭐ - Absolute zero at 0</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="conversion-tip bg-danger bg-opacity-10 p-2 rounded text-center">
                            <small><strong>Formula:</strong> °F = (°C × 9/5) + 32</small>
                          </div>
                        </div>
                      </div>

                      {/* Volume */}
                      <div className="col-md-4 mb-4">
                        <div className="quantity-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-droplet me-2"></i>Volume
                          </h5>
                          
                          <div className="unit-info bg-white border rounded p-3 mb-3">
                            <div className="text-center mb-3">
                              <div className="fs-1">🧪</div>
                              <div className="badge" style={{backgroundColor: '#9b59b6', color: 'white'}}>How much space?</div>
                            </div>
                            <div className="units-list">
                              <h6 style={{color: '#9b59b6'}}>Metric:</h6>
                              <ul className="list-unstyled">
                                <li>• milliliter (mL)</li>
                                <li>• liter (L)</li>
                                <li>• cubic meter (m³)</li>
                              </ul>
                              <h6 className="text-warning mt-2">Imperial:</h6>
                              <ul className="list-unstyled">
                                <li>• teaspoon, tablespoon</li>
                                <li>• cup, pint, quart</li>
                                <li>• gallon</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="conversion-tip bg-opacity-10 p-2 rounded text-center" style={{backgroundColor: '#9b59b6'}}>
                            <small><strong>Note:</strong> 1 L = 1000 mL = 1000 cm³</small>
                          </div>
                        </div>
                      </div>

                      {/* Area */}
                      <div className="col-md-4 mb-4">
                        <div className="quantity-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#16a085'}}>
                            <i className="bi bi-square me-2"></i>Area
                          </h5>
                          
                          <div className="unit-info bg-white border rounded p-3 mb-3">
                            <div className="text-center mb-3">
                              <div className="fs-1">📐</div>
                              <div className="badge" style={{backgroundColor: '#16a085', color: 'white'}}>Surface size?</div>
                            </div>
                            <div className="units-list">
                              <ul className="list-unstyled">
                                <li>• square meter (m²)</li>
                                <li>• square kilometer (km²)</li>
                                <li>• hectare (ha)</li>
                                <li>• square foot (ft²)</li>
                                <li>• acre</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="conversion-tip bg-opacity-10 p-2 rounded text-center" style={{backgroundColor: '#16a085'}}>
                            <small><strong>Remember:</strong> Area = Length × Width</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert bg-primary text-white text-center mt-4">
                      <i className="bi bi-lightbulb me-2"></i>
                      <strong>Pro Tip:</strong> The ⭐ marks the base unit in the International System of Units (SI)!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unit Conversions */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #27ae60'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#27ae60'}}>
                      <i className="bi bi-arrow-left-right me-2"></i>2. Unit Conversion Magic!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Metric Conversions */}
                      <div className="col-md-6 mb-4">
                        <div className="conversion-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#27ae60'}}>
                            <i className="bi bi-ladder me-2"></i>Metric System - Powers of 10!
                          </h5>
                          
                          <div className="metric-ladder bg-white border rounded p-3 mb-3">
                            <h6 className="text-center text-success mb-3">The Metric Staircase</h6>
                            <div className="ladder-visual text-center">
                              <div className="step mb-2">
                                <span className="badge bg-danger">kilo (k)</span>
                                <span className="ms-2">× 1000</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-warning">hecto (h)</span>
                                <span className="ms-2">× 100</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-info">deka (da)</span>
                                <span className="ms-2">× 10</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-success fs-5">BASE UNIT</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-info">deci (d)</span>
                                <span className="ms-2">÷ 10</span>
                              </div>
                              <div className="step mb-2">
                                <span className="badge bg-warning">centi (c)</span>
                                <span className="ms-2">÷ 100</span>
                              </div>
                              <div className="step">
                                <span className="badge bg-danger">milli (m)</span>
                                <span className="ms-2">÷ 1000</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="conversion-example bg-success bg-opacity-10 p-3 rounded">
                            <h6 className="text-success">Example: Convert 5 km to m</h6>
                            <div className="calculation">
                              <div>5 km = 5 × 1000 m = 5000 m</div>
                              <small className="text-muted">Move decimal 3 places right!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Conversion Methods */}
                      <div className="col-md-6 mb-4">
                        <div className="conversion-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#3498db'}}>
                            <i className="bi bi-calculator me-2"></i>Conversion Strategies
                          </h5>
                          
                          <div className="strategy-steps bg-white border rounded p-3 mb-3">
                            <h6 className="text-primary mb-3">The Universal Method</h6>
                            <ol className="mb-0">
                              <li className="mb-2">
                                <strong>Write what you have</strong>
                                <div className="example-text text-muted">12 inches</div>
                              </li>
                              <li className="mb-2">
                                <strong>Find the conversion factor</strong>
                                <div className="example-text text-muted">1 foot = 12 inches</div>
                              </li>
                              <li className="mb-2">
                                <strong>Set up the fraction</strong>
                                <div className="example-text text-muted">12 inches × (1 foot/12 inches)</div>
                              </li>
                              <li>
                                <strong>Cancel and calculate</strong>
                                <div className="example-text text-muted">= 1 foot ✓</div>
                              </li>
                            </ol>
                          </div>
                          
                          <div className="conversion-trick bg-primary bg-opacity-10 p-3 rounded">
                            <h6 className="text-primary">Pro Trick: Unit Cancellation</h6>
                            <div className="text-center">
                              <div className="fraction-demo">
                                <span>60 miles</span> × <span className="fraction">
                                  <span className="numerator">5280 feet</span>
                                  <span className="denominator">1 mile</span>
                                </span> = 316,800 feet
                              </div>
                              <small className="text-muted d-block mt-2">Miles cancel out!</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Common Conversions */}
                      <div className="col-md-12 mb-4">
                        <div className="common-conversions bg-light p-4 rounded">
                          <h5 className="text-center mb-4" style={{color: '#e67e22'}}>
                            <i className="bi bi-bookmark-star me-2"></i>Must-Know Conversions
                          </h5>
                          
                          <div className="row">
                            <div className="col-md-3 mb-3">
                              <div className="conversion-card bg-white border rounded p-3 text-center">
                                <h6 className="text-primary">Length</h6>
                                <ul className="list-unstyled mb-0">
                                  <li>1 inch = 2.54 cm</li>
                                  <li>1 foot = 30.48 cm</li>
                                  <li>1 mile = 1.609 km</li>
                                  <li>1 meter = 3.28 feet</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-3 mb-3">
                              <div className="conversion-card bg-white border rounded p-3 text-center">
                                <h6 className="text-success">Mass</h6>
                                <ul className="list-unstyled mb-0">
                                  <li>1 oz = 28.35 g</li>
                                  <li>1 lb = 453.6 g</li>
                                  <li>1 kg = 2.205 lb</li>
                                  <li>1 ton = 907.2 kg</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-3 mb-3">
                              <div className="conversion-card bg-white border rounded p-3 text-center">
                                <h6 className="text-warning">Volume</h6>
                                <ul className="list-unstyled mb-0">
                                  <li>1 tsp = 5 mL</li>
                                  <li>1 cup = 237 mL</li>
                                  <li>1 gallon = 3.785 L</li>
                                  <li>1 L = 0.264 gallon</li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-3 mb-3">
                              <div className="conversion-card bg-white border rounded p-3 text-center">
                                <h6 className="text-danger">Temperature</h6>
                                <ul className="list-unstyled mb-0">
                                  <li>°C to °F: ×9/5 + 32</li>
                                  <li>°F to °C: -32 ×5/9</li>
                                  <li>K = °C + 273.15</li>
                                  <li>0°C = 32°F = 273K</li>
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

            {/* Dimensional Analysis */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #9b59b6'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#9b59b6'}}>
                      <i className="bi bi-grid-3x3 me-2"></i>3. Dimensional Analysis - The Ultimate Tool!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* What is Dimensional Analysis? */}
                      <div className="col-md-6 mb-4">
                        <div className="analysis-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#9b59b6'}}>
                            <i className="bi bi-diagram-3 me-2"></i>The Power of Units!
                          </h5>
                          
                          <div className="concept-explanation bg-white border rounded p-3 mb-3">
                            <h6 className="text-center mb-3" style={{color: '#9b59b6'}}>What is it?</h6>
                            <p className="mb-2">Dimensional analysis uses units to:</p>
                            <ul className="mb-0">
                              <li>Check if equations make sense</li>
                              <li>Convert between complex units</li>
                              <li>Solve multi-step problems</li>
                              <li>Catch calculation errors</li>
                            </ul>
                          </div>
                          
                          <div className="simple-example bg-purple bg-opacity-10 p-3 rounded" style={{backgroundColor: '#f3e5f5'}}>
                            <h6 style={{color: '#9b59b6'}}>Example: Speed Check</h6>
                            <div className="calculation">
                              <div>Distance = Speed × Time</div>
                              <div className="mt-2">[meters] = [meters/second] × [seconds]</div>
                              <div className="mt-2">[m] = [m/s] × [s] = [m] ✓</div>
                              <small className="text-success">Units match! Equation is correct.</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Multi-Step Conversions */}
                      <div className="col-md-6 mb-4">
                        <div className="analysis-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e67e22'}}>
                            <i className="bi bi-layers me-2"></i>Multi-Step Magic!
                          </h5>
                          
                          <div className="multi-step-example bg-white border rounded p-3">
                            <h6 className="text-warning mb-3">Convert: 60 mph to m/s</h6>
                            <div className="step-by-step">
                              <div className="step mb-2">
                                <strong>Step 1:</strong> Write what you have
                                <div className="calculation">60 miles/hour</div>
                              </div>
                              <div className="step mb-2">
                                <strong>Step 2:</strong> Set up conversions
                                <div className="calculation">
                                  60 mi/hr × (1.609 km/1 mi) × (1000 m/1 km) × (1 hr/3600 s)
                                </div>
                              </div>
                              <div className="step mb-2">
                                <strong>Step 3:</strong> Cancel units
                                <div className="calculation text-muted">
                                  <del>mi</del>, <del>km</del>, <del>hr</del> cancel out
                                </div>
                              </div>
                              <div className="step">
                                <strong>Result:</strong>
                                <div className="calculation text-success">26.8 m/s</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unit Compatibility */}
                      <div className="col-md-12">
                        <div className="compatibility-section bg-light p-4 rounded">
                          <h5 className="text-center mb-4" style={{color: '#2c3e50'}}>
                            <i className="bi bi-check2-circle me-2"></i>Unit Compatibility Rules
                          </h5>
                          
                          <div className="row">
                            <div className="col-md-6">
                              <div className="rule-card bg-white border border-success rounded p-3 mb-3">
                                <h6 className="text-success">✓ Can Add/Subtract</h6>
                                <ul className="mb-0">
                                  <li>5 meters + 3 meters = 8 meters ✓</li>
                                  <li>10 kg - 2 kg = 8 kg ✓</li>
                                  <li>2 hours + 30 minutes = 2.5 hours ✓</li>
                                </ul>
                                <div className="mt-2 text-muted small">Same units only!</div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="rule-card bg-white border border-danger rounded p-3 mb-3">
                                <h6 className="text-danger">✗ Cannot Add/Subtract</h6>
                                <ul className="mb-0">
                                  <li>5 meters + 3 kilograms ✗</li>
                                  <li>10 seconds - 2 meters ✗</li>
                                  <li>2 liters + 30 degrees ✗</li>
                                </ul>
                                <div className="mt-2 text-muted small">Different unit types!</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="alert bg-info text-white text-center mt-3">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>Remember:</strong> You CAN multiply/divide different units to create new ones (like m/s for speed)!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Derived Units and Rates */}
            <div className="row mb-5">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #f39c12'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#f39c12'}}>
                      <i className="bi bi-speedometer2 me-2"></i>4. Derived Units & Rates
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {/* Common Derived Units */}
                      <div className="col-md-6 mb-4">
                        <div className="derived-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#f39c12'}}>
                            <i className="bi bi-layers-half me-2"></i>Units from Units!
                          </h5>
                          
                          <div className="derived-examples">
                            <div className="example-card bg-white border rounded p-3 mb-3">
                              <h6 className="text-primary">Speed/Velocity</h6>
                              <div className="formula">Distance ÷ Time</div>
                              <div className="units">
                                <span className="badge bg-primary me-2">m/s</span>
                                <span className="badge bg-info me-2">km/h</span>
                                <span className="badge bg-warning">mph</span>
                              </div>
                            </div>
                            
                            <div className="example-card bg-white border rounded p-3 mb-3">
                              <h6 className="text-success">Density</h6>
                              <div className="formula">Mass ÷ Volume</div>
                              <div className="units">
                                <span className="badge bg-success me-2">g/cm³</span>
                                <span className="badge bg-success me-2">kg/m³</span>
                                <span className="badge bg-success">lb/ft³</span>
                              </div>
                            </div>
                            
                            <div className="example-card bg-white border rounded p-3">
                              <h6 className="text-warning">Pressure</h6>
                              <div className="formula">Force ÷ Area</div>
                              <div className="units">
                                <span className="badge bg-warning me-2">N/m² (Pa)</span>
                                <span className="badge bg-warning me-2">psi</span>
                                <span className="badge bg-warning">atm</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Rates in Daily Life */}
                      <div className="col-md-6 mb-4">
                        <div className="rates-card bg-light p-4 rounded h-100">
                          <h5 className="text-center mb-3" style={{color: '#e74c3c'}}>
                            <i className="bi bi-graph-up-arrow me-2"></i>Rates Everywhere!
                          </h5>
                          
                          <div className="rate-examples">
                            <div className="rate-item bg-white border rounded p-3 mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-0 text-danger">Heart Rate</h6>
                                  <small>beats per minute</small>
                                </div>
                                <div className="badge bg-danger">bpm</div>
                              </div>
                            </div>
                            
                            <div className="rate-item bg-white border rounded p-3 mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-0 text-primary">Internet Speed</h6>
                                  <small>megabits per second</small>
                                </div>
                                <div className="badge bg-primary">Mbps</div>
                              </div>
                            </div>
                            
                            <div className="rate-item bg-white border rounded p-3 mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-0 text-success">Fuel Economy</h6>
                                  <small>miles per gallon</small>
                                </div>
                                <div className="badge bg-success">mpg</div>
                              </div>
                            </div>
                            
                            <div className="rate-item bg-white border rounded p-3">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 className="mb-0 text-warning">Hourly Wage</h6>
                                  <small>dollars per hour</small>
                                </div>
                                <div className="badge bg-warning">$/hr</div>
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

        {/* Common Mistakes and Misconceptions Section */}
        <section className="mistakes-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#e74c3c'}}>
                  <i className="bi bi-exclamation-triangle me-2"></i>Common Unit Mistakes & Misconceptions
                </h2>
                <p className="lead">Learn from these common errors to become a unit expert! 🎯</p>
              </div>
            </div>

            <div className="row">
              {/* Mistake 1: Weight vs Mass */}
              <div className="col-md-6 mb-4">
                <div className="mistake-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e74c3c'}}>
                  <div className="mistake-header mb-3">
                    <h5 style={{color: '#e74c3c'}}>
                      <i className="bi bi-x-circle me-2"></i>Mistake #1: Weight = Mass
                    </h5>
                  </div>
                  
                  <div className="misconception bg-white border border-danger rounded p-3 mb-3">
                    <h6 className="text-danger">Common Misconception:</h6>
                    <p className="mb-0">"I weigh 70 kilograms"</p>
                  </div>
                  
                  <div className="correction bg-success bg-opacity-10 rounded p-3">
                    <h6 className="text-success">The Truth:</h6>
                    <ul className="mb-0">
                      <li><strong>Mass</strong> (kg) = amount of matter (stays same everywhere)</li>
                      <li><strong>Weight</strong> (N) = force of gravity (changes with location)</li>
                      <li>On the Moon, your mass is the same but weight is 1/6!</li>
                    </ul>
                    <div className="mt-2 text-center">
                      <small className="text-muted">Weight = Mass × Gravity (W = mg)</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 2: Mixing Unit Systems */}
              <div className="col-md-6 mb-4">
                <div className="mistake-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #f39c12'}}>
                  <div className="mistake-header mb-3">
                    <h5 style={{color: '#f39c12'}}>
                      <i className="bi bi-x-circle me-2"></i>Mistake #2: Mixing Systems
                    </h5>
                  </div>
                  
                  <div className="misconception bg-white border border-warning rounded p-3 mb-3">
                    <h6 className="text-warning">Common Error:</h6>
                    <p className="mb-0">"The room is 10 feet by 3 meters"</p>
                  </div>
                  
                  <div className="correction bg-primary bg-opacity-10 rounded p-3">
                    <h6 className="text-primary">Better Practice:</h6>
                    <ul className="mb-0">
                      <li>Stick to one system throughout a problem</li>
                      <li>Convert all measurements to the same system first</li>
                      <li>Example: 10 ft × 3.28 = 32.8 ft by 9.84 ft</li>
                    </ul>
                    <div className="mt-2 alert alert-warning mb-0">
                      <small><strong>Real Disaster:</strong> NASA lost a $125 million Mars orbiter due to metric/imperial mix-up!</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 3: Temperature Scales */}
              <div className="col-md-6 mb-4">
                <div className="mistake-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #9b59b6'}}>
                  <div className="mistake-header mb-3">
                    <h5 style={{color: '#9b59b6'}}>
                      <i className="bi bi-x-circle me-2"></i>Mistake #3: Temperature Confusion
                    </h5>
                  </div>
                  
                  <div className="misconception bg-white border rounded p-3 mb-3" style={{borderColor: '#9b59b6'}}>
                    <h6 style={{color: '#9b59b6'}}>Common Errors:</h6>
                    <ul className="mb-0">
                      <li>"Twice as hot" doesn't work with °C or °F</li>
                      <li>"0°C means no temperature"</li>
                      <li>Adding temperatures directly</li>
                    </ul>
                  </div>
                  
                  <div className="correction bg-opacity-10 rounded p-3" style={{backgroundColor: '#f3e5f5'}}>
                    <h6 style={{color: '#9b59b6'}}>Understanding Temperature:</h6>
                    <ul className="mb-0">
                      <li>Only Kelvin scale starts at absolute zero</li>
                      <li>20°C is NOT twice as hot as 10°C</li>
                      <li>Must convert to Kelvin for ratios: 293K vs 283K</li>
                      <li>Temperature differences work in any scale</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mistake 4: Square and Cubic Units */}
              <div className="col-md-6 mb-4">
                <div className="mistake-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #27ae60'}}>
                  <div className="mistake-header mb-3">
                    <h5 style={{color: '#27ae60'}}>
                      <i className="bi bi-x-circle me-2"></i>Mistake #4: Area & Volume Conversions
                    </h5>
                  </div>
                  
                  <div className="misconception bg-white border border-success rounded p-3 mb-3">
                    <h6 className="text-success">Common Error:</h6>
                    <p className="mb-0">"1 meter = 3.28 feet, so 1 m² = 3.28 ft²"</p>
                  </div>
                  
                  <div className="correction bg-success bg-opacity-10 rounded p-3">
                    <h6 className="text-success">Correct Method:</h6>
                    <ul className="mb-0">
                      <li><strong>Length:</strong> 1 m = 3.28 ft</li>
                      <li><strong>Area:</strong> 1 m² = (3.28)² = 10.76 ft²</li>
                      <li><strong>Volume:</strong> 1 m³ = (3.28)³ = 35.3 ft³</li>
                    </ul>
                    <div className="mt-2 text-center">
                      <small className="badge bg-success">Remember: Square the conversion for area, cube it for volume!</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 5: Precision Overkill */}
              <div className="col-md-6 mb-4">
                <div className="mistake-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #3498db'}}>
                  <div className="mistake-header mb-3">
                    <h5 style={{color: '#3498db'}}>
                      <i className="bi bi-x-circle me-2"></i>Mistake #5: False Precision
                    </h5>
                  </div>
                  
                  <div className="misconception bg-white border border-info rounded p-3 mb-3">
                    <h6 className="text-info">Common Problem:</h6>
                    <p className="mb-0">"The table is 2.54137926 meters long"</p>
                  </div>
                  
                  <div className="correction bg-info bg-opacity-10 rounded p-3">
                    <h6 className="text-info">Appropriate Precision:</h6>
                    <ul className="mb-0">
                      <li>Match precision to measurement tool</li>
                      <li>Ruler: ±1 mm → report to nearest mm</li>
                      <li>Digital scale: shows 2 decimals → use 2 decimals</li>
                      <li>More decimals ≠ more accurate!</li>
                    </ul>
                    <div className="mt-2 text-center">
                      <small className="text-muted">Rule: Your answer can't be more precise than your measurements</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mistake 6: Unit-less Numbers */}
              <div className="col-md-6 mb-4">
                <div className="mistake-card bg-light p-4 rounded h-100" style={{borderLeft: '4px solid #e67e22'}}>
                  <div className="mistake-header mb-3">
                    <h5 style={{color: '#e67e22'}}>
                      <i className="bi bi-x-circle me-2"></i>Mistake #6: Forgetting Units
                    </h5>
                  </div>
                  
                  <div className="misconception bg-white border rounded p-3 mb-3" style={{borderColor: '#e67e22'}}>
                    <h6 style={{color: '#e67e22'}}>Common in Homework:</h6>
                    <p className="mb-0">"The answer is 42"</p>
                  </div>
                  
                  <div className="correction bg-opacity-10 rounded p-3" style={{backgroundColor: '#fdf2e9'}}>
                    <h6 style={{color: '#e67e22'}}>Always Include Units:</h6>
                    <ul className="mb-0">
                      <li>42 what? Meters? Seconds? Bananas?</li>
                      <li>Units are part of the answer!</li>
                      <li>In science: no unit = wrong answer</li>
                      <li>Units help catch calculation errors</li>
                    </ul>
                    <div className="mt-2 text-center">
                      <span className="badge bg-warning">Golden Rule: Numbers need units to have meaning!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips to Avoid Mistakes */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="tips-card bg-primary text-white p-4 rounded">
                  <h4 className="text-center mb-4">
                    <i className="bi bi-lightbulb me-2"></i>Quick Tips to Avoid Unit Mistakes
                  </h4>
                  <div className="row">
                    <div className="col-md-3 text-center mb-3">
                      <div className="tip-item">
                        <i className="bi bi-check-circle fs-2 mb-2"></i>
                        <h6>Write Units Always</h6>
                        <small>Every number needs a unit</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-center mb-3">
                      <div className="tip-item">
                        <i className="bi bi-arrow-left-right fs-2 mb-2"></i>
                        <h6>Check Dimensions</h6>
                        <small>Make sure units match</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-center mb-3">
                      <div className="tip-item">
                        <i className="bi bi-calculator fs-2 mb-2"></i>
                        <h6>Show Your Work</h6>
                        <small>Track units in calculations</small>
                      </div>
                    </div>
                    <div className="col-md-3 text-center mb-3">
                      <div className="tip-item">
                        <i className="bi bi-question-circle fs-2 mb-2"></i>
                        <h6>Sanity Check</h6>
                        <small>Does the answer make sense?</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Applications */}
        <section className="applications-section py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-5">
                <h2 className="mb-3" style={{color: '#27ae60'}}>
                  <i className="bi bi-globe me-2"></i>Units in Action - Real World
                </h2>
                <p className="lead">See how proper unit use impacts our daily lives! 🌟</p>
              </div>
            </div>

            <div className="row">
              {/* Medicine & Health */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-white p-4 rounded shadow-sm h-100" style={{borderTop: '4px solid #e74c3c'}}>
                  <h5 className="mb-3" style={{color: '#e74c3c'}}>
                    <i className="bi bi-heart-pulse me-2"></i>Medicine & Health
                  </h5>
                
                  
                  <div className="medical-examples">
                    <div className="example bg-light border rounded p-3 mb-3">
                      <h6 className="text-danger">💊 Medication Dosing</h6>
                      <div className="dosage-info">
                        <div>Adult: 500 mg tablet</div>
                        <div>Child: 5 mL of 100 mg/mL syrup</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Precise units save lives! mg vs g matters!
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-light border rounded p-3 mb-3">
                      <h6 className="text-primary">🩺 Vital Signs</h6>
                      <div className="vitals-info">
                        <div>Blood pressure: 120/80 mmHg</div>
                        <div>Temperature: 98.6°F (37°C)</div>
                        <div>Heart rate: 72 bpm</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Standard units enable global medical care
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-light border rounded p-3">
                      <h6 className="text-success">🏃 Fitness Tracking</h6>
                      <div className="fitness-info">
                        <div>Steps: 10,000 per day</div>
                        <div>Distance: 5 km run</div>
                        <div>Calories: 2,000 kcal/day</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Units help track progress and set goals
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Engineering & Construction */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-white p-4 rounded shadow-sm h-100" style={{borderTop: '4px solid #3498db'}}>
                  <h5 className="mb-3" style={{color: '#3498db'}}>
                    <i className="bi bi-buildings me-2"></i>Engineering & Construction
                  </h5>
                  
                  <div className="engineering-examples">
                    <div className="example bg-light border rounded p-3 mb-3">
                      <h6 className="text-primary">🏗️ Building Design</h6>
                      <div className="building-info">
                        <div>Floor area: 1,000 m²</div>
                        <div>Steel beams: 10 cm × 20 cm</div>
                        <div>Concrete: 50 MPa strength</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Precision prevents building collapse!
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-light border rounded p-3 mb-3">
                      <h6 className="text-warning">⚡ Electrical Systems</h6>
                      <div className="electrical-info">
                        <div>Voltage: 120V (US) / 240V (UK)</div>
                        <div>Current: 15 amperes</div>
                        <div>Power: 1,800 watts</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Wrong units = fire hazard!
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-light border rounded p-3">
                      <h6 className="text-info">🌉 Bridge Engineering</h6>
                      <div className="bridge-info">
                        <div>Load capacity: 40 tonnes</div>
                        <div>Wind resistance: 200 km/h</div>
                        <div>Expansion joint: 5 cm gap</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Units ensure safety for millions
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooking & Baking */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-white p-4 rounded shadow-sm h-100" style={{borderTop: '4px solid #f39c12'}}>
                  <h5 className="mb-3" style={{color: '#f39c12'}}>
                    <i className="bi bi-egg-fried me-2"></i>Cooking & Baking
                  </h5>
                  
                  <div className="cooking-examples">
                    <div className="example bg-light border rounded p-3 mb-3">
                      <h6 className="text-warning">🍰 Baking Precision</h6>
                      <div className="baking-info">
                        <div className="row">
                          <div className="col-6">
                            <strong>US Recipe:</strong>
                            <ul className="list-unstyled small mb-0">
                              <li>2 cups flour</li>
                              <li>1 tbsp sugar</li>
                              <li>350°F oven</li>
                            </ul>
                          </div>
                          <div className="col-6">
                            <strong>Metric:</strong>
                            <ul className="list-unstyled small mb-0">
                              <li>250 g flour</li>
                              <li>15 mL sugar</li>
                              <li>175°C oven</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-light border rounded p-3">
                      <h6 className="text-success">⏲️ Cooking Times</h6>
                      <div className="timing-info">
                        <div>Pasta: 8-10 minutes</div>
                        <div>Roast: 20 min/pound at 350°F</div>
                        <div>Rice: 2:1 water ratio, 18 min</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Time and temp units = perfect meals!
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Science & Space */}
              <div className="col-md-6 mb-4">
                <div className="application-card bg-white p-4 rounded shadow-sm h-100" style={{borderTop: '4px solid #9b59b6'}}>
                  <h5 className="mb-3" style={{color: '#9b59b6'}}>
                    <i className="bi bi-rocket me-2"></i>Science & Space
                  </h5>
                  
                  <div className="science-examples">
                    <div className="example bg-light border rounded p-3 mb-3">
                      <h6 style={{color: '#9b59b6'}}>🚀 Space Exploration</h6>
                      <div className="space-info">
                        <div>ISS altitude: 408 km</div>
                        <div>Speed: 7.66 km/s</div>
                        <div>Moon distance: 384,400 km</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            Precise units guide us to the stars!
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="example bg-light border rounded p-3">
                      <h6 className="text-info">🔬 Scientific Research</h6>
                      <div className="research-info">
                        <div>Atom size: ~0.1 nanometers</div>
                        <div>Light speed: 299,792,458 m/s</div>
                        <div>Absolute zero: -273.15°C</div>
                        <div className="mt-2">
                          <small className="text-muted">
                            SI units unite global science
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
            <AdditionQuiz operationType="units" />
          </div>
        </section>

        {/* Quick Practice Problems */}
        <section className="quick-practice py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card shadow border-0" style={{borderTop: '4px solid #3498db'}}>
                  <div className="card-header bg-white">
                    <h3 className="mb-0" style={{color: '#3498db'}}>
                      <i className="bi bi-pencil-square me-2"></i>Test Your Unit Skills!
                    </h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="practice-problem bg-light p-3 rounded">
                          <h6 className="text-primary">Conversion Challenge</h6>
                          <p className="mb-2">Convert 72 km/h to m/s</p>
                          <button className="btn btn-primary btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Solution</button>
                          <div className="solution mt-2" style={{display: 'none'}}>
                            <div className="bg-white border rounded p-2">
                              <div>72 km/h × (1000 m/1 km) × (1 h/3600 s)</div>
                              <div>= 72 × 1000/3600</div>
                              <div className="text-success"><strong>= 20 m/s</strong></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-problem bg-light p-3 rounded">
                          <h6 className="text-success">Unit Check</h6>
                          <p className="mb-2">Can you add 5 meters + 300 cm?</p>
                          <button className="btn btn-success btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Solution</button>
                          <div className="solution mt-2" style={{display: 'none'}}>
                            <div className="bg-white border rounded p-2">
                              <div>Yes! Convert to same unit first:</div>
                              <div>300 cm = 3 m</div>
                              <div>5 m + 3 m = 8 m</div>
                              <div className="text-success"><strong>Or: 500 cm + 300 cm = 800 cm</strong></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="practice-problem bg-light p-3 rounded">
                          <h6 className="text-warning">Dimensional Analysis</h6>
                          <p className="mb-2">What's the unit of Force?</p>
                          <p className="small">Force = mass × acceleration</p>
                          <button className="btn btn-warning btn-sm" onClick={(e) => {
                            e.target.nextElementSibling.style.display = 'block';
                            e.target.style.display = 'none';
                          }}>Show Solution</button>
                          <div className="solution mt-2" style={{display: 'none'}}>
                            <div className="bg-white border rounded p-2">
                              <div>F = m × a</div>
                              <div>[F] = [kg] × [m/s²]</div>
                              <div className="text-success"><strong>= kg⋅m/s² = Newton (N)</strong></div>
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
                        🎉 Congratulations, Measurement Master! 📏
                      </h2>
                      <p className="lead text-muted mb-0">
                        You've mastered the language of measurement! From tiny millimeters to vast kilometers, 
                        from precise medical doses to massive engineering projects - you now understand how units 
                        make our world work with precision and safety.
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
                              <h5 className="mb-2" style={{color: '#27ae60'}}>Skills You've Mastered</h5>
                            </div>
                          </div>
                          
                          <div className="skills-grid">
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Understanding base and derived units</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Converting between unit systems</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Using dimensional analysis</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Avoiding common unit mistakes</span>
                            </div>
                            <div className="skill-item d-flex align-items-center mb-2">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Applying units in real situations</span>
                            </div>
                            <div className="skill-item d-flex align-items-center">
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              <span>Checking work with unit analysis</span>
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
                              <h5 className="mb-2" style={{color: '#3498db'}}>Continue Your Journey</h5>
                            </div>
                          </div>
                          
                          <div className="next-steps">
                            <div className="step-item mb-3">
                              <Link to="/math/algebra" className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-arrow-left me-2"></i>
                                Back to Algebra
                              </Link>
                            </div>
                            <div className="step-item mb-3">
                              <Link to="/math/algebra/equations" className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-plus-slash-minus me-2"></i>
                                Continue to Equations
                              </Link>
                            </div>
                            <div className="step-item">
                              <Link to="/math" className="btn btn-outline-success btn-lg w-100 d-flex align-items-center justify-content-center">
                                <i className="bi bi-grid-3x3 me-2"></i>
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
                        <div className="final-message-card text-center p-4 rounded" style={{background: 'linear-gradient(135deg, #3498db, #5dade2)', color: 'white'}}>
                          <div className="mb-3">
                            <i className="bi bi-rulers fs-2 text-white"></i>
                          </div>
                          <h5 className="mb-3">📐 Ready to Apply Your Unit Mastery?</h5>
                          <p className="mb-0 lead">
                            Units are the foundation of all scientific and mathematical work. With your new skills, 
                            you can tackle physics problems, engineering challenges, and real-world calculations with confidence!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Unit Mastery Badge */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="mastery-badge-card bg-light p-4 rounded text-center">
                          <h6 className="text-muted mb-3">Your Measurement Journey</h6>
                          <div className="progress mb-3" style={{height: '12px'}}>
                            <div 
                              className="progress-bar bg-gradient" 
                              style={{
                                width: '100%', 
                                background: 'linear-gradient(90deg, #3498db, #5dade2)',
                                animation: 'fillProgress 3s ease-in-out forwards'
                              }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-small text-muted">
                            <span>📏 Unit Basics</span>
                            <span>🔄 Conversions Mastered</span>
                            <span>🏆 Measurement Expert!</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fun Facts Summary */}
                    <div className="row mt-4">
                      <div className="col-12">
                        <div className="fun-facts-card bg-gradient p-4 rounded" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}}>
                          <h6 className="text-center mb-4" style={{color: '#2c3e50'}}>
                            <i className="bi bi-lightbulb me-2"></i>Amazing Unit Facts You Now Understand!
                          </h6>
                          <div className="row">
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">🌍</div>
                                <div className="small">
                                  <strong>Global Standard</strong><br/>
                                  SI units unite science worldwide!
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">⚖️</div>
                                <div className="small">
                                  <strong>Mass ≠ Weight</strong><br/>
                                  You'd weigh less on the Moon!
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">🔟</div>
                                <div className="small">
                                  <strong>Power of 10</strong><br/>
                                  Metric system makes math easy!
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-center mb-3">
                              <div className="fact-item">
                                <div className="fs-2 mb-2">🎯</div>
                                <div className="small">
                                  <strong>Precision Matters</strong><br/>
                                  Units save lives and missions!
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

        .quantity-card:hover,
        .conversion-card:hover,
        .analysis-card:hover,
        .derived-card:hover,
        .rates-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .practice-problem:hover {
          transform: scale(1.02);
          transition: transform 0.2s ease;
        }

        .mistake-card {
          transition: all 0.3s ease;
        }

        .mistake-card:hover {
          transform: translateX(-5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }

        .application-card {
          transition: all 0.3s ease;
        }

        .application-card:hover {
          transform: translateY(-3px);
        }

        .fraction {
          display: inline-block;
          text-align: center;
          vertical-align: middle;
          margin: 0 5px;
        }

        .fraction .numerator {
          display: block;
          border-bottom: 1px solid #333;
          padding-bottom: 2px;
        }

        .fraction .denominator {
          display: block;
          padding-top: 2px;
        }

        .trophy-circle {
          box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
        }

        .final-message-card {
          box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
        }

        .ladder-visual .step {
          transition: transform 0.2s ease;
        }

        .ladder-visual .step:hover {
          transform: scale(1.1);
        }
        `}
        </style>
      </main>
    </div>
  );
};

export default Units;