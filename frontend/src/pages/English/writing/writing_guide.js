import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WritingGuide() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePractice = () => {
    navigate('/english-writing-guide2');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .writing-guide-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', sans-serif;
          padding: 80px 20px 60px;
        }
        
        .writing-guide-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .guide-header {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        .guide-title {
          font-size: 3rem;
          font-weight: 800;
          color: white;
          margin-bottom: 20px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .guide-subtitle {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.95);
          font-weight: 400;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .progress-tracker {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
          animation: fadeIn 1s ease-out;
        }
        
        .progress-step {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }
        
        .progress-step.active {
          background: white;
          color: #667eea;
          box-shadow: 0 8px 20px rgba(255,255,255,0.3);
          transform: scale(1.1);
        }
        
        .progress-step.inactive {
          background: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.7);
        }
        
        .progress-connector {
          width: 60px;
          height: 4px;
          transition: all 0.4s ease;
        }
        
        .progress-connector.active {
          background: white;
        }
        
        .progress-connector.inactive {
          background: rgba(255,255,255,0.3);
        }
        
        .content-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: slideUp 0.6s ease-out;
          position: relative;
          overflow: hidden;
        }
        
        .content-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        
        .card-icon {
          width: 60px;
          height: 60px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          font-size: 28px;
        }
        
        .icon-blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .icon-amber { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
        .icon-green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
        .icon-purple { background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%); }
        .icon-emerald { background: linear-gradient(135deg, #10b981 0%, #047857 100%); }
        
        .card-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          line-height: 1.3;
        }
        
        .card-text {
          font-size: 1.1rem;
          color: #4b5563;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .info-box {
          border-radius: 15px;
          padding: 25px;
          margin: 25px 0;
          border-left: 5px solid;
        }
        
        .info-box-indigo {
          background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
          border-color: #6366f1;
        }
        
        .info-box-blue {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-color: #3b82f6;
        }
        
        .info-box-green {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border-color: #22c55e;
        }
        
        .info-box-purple {
          background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
          border-color: #a855f7;
        }
        
        .info-box-emerald {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-color: #10b981;
        }
        
        .info-box-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 15px;
        }
        
        .check-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .check-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 1.05rem;
          color: #374151;
          line-height: 1.6;
        }
        
        .check-icon {
          color: #10b981;
          margin-right: 12px;
          margin-top: 3px;
          flex-shrink: 0;
          font-size: 20px;
        }
        
        .sample-text {
          font-style: italic;
          color: #374151;
          font-size: 1.05rem;
          line-height: 1.8;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 16px 35px;
          border-radius: 12px;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }
        
        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 16px 35px;
          border-radius: 12px;
          border: none;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }
        
        .btn-success:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .guide-title { font-size: 2rem; }
          .card-title { font-size: 1.5rem; }
          .content-card { padding: 25px; }
          .progress-step { width: 40px; height: 40px; font-size: 1rem; }
          .progress-connector { width: 40px; }
        }
      `}</style>

      <div className="writing-guide-container">
        <div className="writing-guide-wrapper">
          {/* Header */}
          <div className="guide-header">
            <h1 className="guide-title">Comprehensive Guide to Writing</h1>
            <p className="guide-subtitle">
              This guide will help you start writing effectively. Follow the steps and tips to craft better essays!
            </p>
          </div>

          {/* Progress Tracker */}
          <div className="progress-tracker">
            {[1, 2, 3, 4, 5].map((step, idx) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`progress-step ${currentStep >= step ? 'active' : 'inactive'}`}>
                  {step}
                </div>
                {idx < 4 && (
                  <div className={`progress-connector ${currentStep > step ? 'active' : 'inactive'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: How to Start Writing */}
          {currentStep >= 1 && (
            <div className="content-card">
              <div className="card-icon icon-blue">📝</div>
              <h2 className="card-title">How to Start Writing</h2>
              <p className="card-text">
                Many people struggle with how to begin writing. This guide is based on personal experience and knowledge from various authors.
              </p>
              <p className="card-text">
                Though I only used to write exam answers, I now can write on various topics. Remember, you don't need to reinvent the wheel—challenges may differ, but we share common ones, and I can help you start your writing journey.
              </p>
              {currentStep === 1 && (
                <button onClick={handleNext} className="btn-primary">
                  Next: Example
                  <span>→</span>
                </button>
              )}
            </div>
          )}

          {/* Step 2: Example Writing */}
          {currentStep >= 2 && (
            <div className="content-card">
              <div className="card-icon icon-amber">💡</div>
              <h2 className="card-title">Example: Writing on "A Helpful Person I Have Met"</h2>
              <p className="card-text">
                Let's begin by writing a short essay on the topic "A Helpful Person I Have Met."
              </p>
              
              <div className="info-box info-box-indigo">
                <div className="info-box-title">Steps:</div>
                <ul className="check-list">
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Step 1:</strong> Brainstorming</span>
                  </li>
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span><strong>Step 2:</strong> Note Key Points</span>
                  </li>
                </ul>
              </div>

              <div className="info-box info-box-blue">
                <div className="info-box-title">Key Points for the topic:</div>
                <ul className="check-list">
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span>Initial impression (political gain or other gains)</span>
                  </li>
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span>Ready to help without expectations</span>
                  </li>
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span>Nature of the help (emotional support, practical assistance, advice, etc.)</span>
                  </li>
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span>Qualities: selflessness, patience, empathy</span>
                  </li>
                  <li className="check-item">
                    <span className="check-icon">✓</span>
                    <span>Long-lasting impact on my life</span>
                  </li>
                </ul>
              </div>

              {currentStep === 2 && (
                <button onClick={handleNext} className="btn-primary">
                  Next: Introduction
                  <span>→</span>
                </button>
              )}
            </div>
          )}

          {/* Step 3: Introduction */}
          {currentStep >= 3 && (
            <div className="content-card">
              <div className="card-icon icon-green">📄</div>
              <h2 className="card-title">Introduction Structure</h2>
              <p className="card-text">
                Start your introduction by explaining general features of a helpful person and the context in which you met them.
              </p>

              <div className="info-box info-box-green">
                <div className="info-box-title">Sample Introduction:</div>
                <p className="sample-text">
                  It always feels good to see someone helping others selflessly. While some leaders help others for political gain, my junior college teacher was always ready to help students under any circumstances.
                </p>
              </div>

              {currentStep === 3 && (
                <button onClick={handleNext} className="btn-primary">
                  Next: Body Paragraphs
                  <span>→</span>
                </button>
              )}
            </div>
          )}

          {/* Step 4: Body Paragraphs */}
          {currentStep >= 4 && (
            <div className="content-card">
              <div className="card-icon icon-purple">📋</div>
              <h2 className="card-title">Body Paragraph Structure</h2>
              <p className="card-text">
                In the body paragraphs, provide major details supported by minor details and examples.
              </p>

              <div className="info-box info-box-purple">
                <div className="info-box-title">Sample Body Paragraph 1:</div>
                <p className="card-text">
                  <strong>Major Detail:</strong> Initial impression (political gain or other gains) and his drives.
                </p>
                <p className="card-text">
                  <strong>Minor Details:</strong> Prejudices, helpful nature, and why he helps without expectations.
                </p>
                <p className="sample-text">
                  Professor Ben was my teacher. I initially thought his offers to help were empty promises, but he proved otherwise by always being available to solve both academic and personal issues.
                </p>
              </div>

              <div className="info-box info-box-purple">
                <div className="info-box-title">Sample Body Paragraph 2:</div>
                <p className="card-text">
                  <strong>Major Detail:</strong> Qualities of the person and their long-lasting impact on my life.
                </p>
                <p className="sample-text">
                  His humility and patience had a lasting effect on me, teaching me to be more empathetic in my daily interactions.
                </p>
              </div>

              {currentStep === 4 && (
                <button onClick={handleNext} className="btn-primary">
                  Next: Conclusion
                  <span>→</span>
                </button>
              )}
            </div>
          )}

          {/* Step 5: Conclusion */}
          {currentStep >= 5 && (
            <div className="content-card">
              <div className="card-icon icon-emerald">✅</div>
              <h2 className="card-title">Conclusion</h2>
              <p className="card-text">
                Summarize the key points and reinforce why the person stands out as particularly helpful. End with an appreciative statement or a concluding thought.
              </p>

              <div className="info-box info-box-emerald">
                <div className="info-box-title">Sample Conclusion:</div>
                <p className="sample-text">
                  Meeting someone like Professor Ben is a reminder of the power of kindness. His selflessness profoundly influenced my values, motivating me to assist others and foster compassion.
                </p>
              </div>

              <button onClick={handlePractice} className="btn-success">
                Let's Practice
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}