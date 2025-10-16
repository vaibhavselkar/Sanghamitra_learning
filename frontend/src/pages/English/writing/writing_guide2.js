import { useState } from 'react';

export default function InteractiveWritingGuide() {
  const [currentSection, setCurrentSection] = useState(0);
  const [userInputs, setUserInputs] = useState({
    introduction: '',
    bodyParagraph1: '',
    bodyParagraph2: '',
    conclusion: ''
  });
  const [wordCounts, setWordCounts] = useState({
    introduction: 0,
    bodyParagraph1: 0,
    bodyParagraph2: 0,
    conclusion: 0
  });
  const [showFeedback, setShowFeedback] = useState(false);

  const essayTopic = "A Helpful Person I Have Met";

  const feedbackGuides = {
    introduction: {
      title: '✨ Feedback & Example Comparison',
      tips: [
        'Does your introduction start with a general statement about helpful people? This hooks the reader and sets the context.',
        'Have you introduced the specific person you\'ll write about? The reader should know who they\'ll learn more about.',
        'Did you mention the context where you met them? This helps paint a picture of the situation.',
        'Does your introduction create curiosity? Make readers want to learn more about this person.'
      ],
      strengths: 'A strong introduction:',
      strengthsList: [
        'Opens with a relatable or thought-provoking statement',
        'Clearly identifies the helpful person',
        'Explains the relationship or context',
        'Creates interest and sets up the essay topic'
      ]
    },
    bodyParagraph1: {
      title: '✨ Feedback & Example Comparison',
      tips: [
        'Does your paragraph start with a major detail about the person? This should be the main point of the paragraph.',
        'Have you included specific examples that show their helpfulness? Use real incidents, not just general statements.',
        'Did you support your main point with minor details? These add depth and credibility to your writing.',
        'Does your paragraph show how your initial impression changed or was confirmed? Show development of your understanding.'
      ],
      strengths: 'A strong body paragraph:',
      strengthsList: [
        'Opens with a clear main idea or observation',
        'Includes 2-3 specific, detailed examples',
        'Explains how these examples prove your point',
        'Shows emotional growth or changed perspective'
      ]
    },
    bodyParagraph2: {
      title: '✨ Feedback & Example Comparison',
      tips: [
        'Have you identified the person\'s key qualities (kindness, patience, empathy, humility)? These should be explicit.',
        'Did you explain the impact they had on you? How did knowing this person change you?',
        'Are there specific examples of their character? Show, don\'t just tell - use real incidents.',
        'Did you discuss long-term effects? How do their actions still influence you today?'
      ],
      strengths: 'A strong body paragraph:',
      strengthsList: [
        'Clearly states the person\'s defining qualities',
        'Provides concrete examples of these qualities',
        'Explains how they influenced your thinking or behavior',
        'Reflects on lasting impact and personal growth'
      ]
    },
    conclusion: {
      title: '✨ Feedback & Example Comparison',
      tips: [
        'Did you summarize the key points from your essay? Briefly remind readers of what makes this person special.',
        'Have you reinforced why this person matters? Go beyond just restating - add deeper meaning.',
        'Does your conclusion end with an appreciative or reflective statement? Leave a strong final impression.',
        'Did you provide a broader lesson or thought? Connect the personal story to something universal about kindness or helping others.'
      ],
      strengths: 'A strong conclusion:',
      strengthsList: [
        'Briefly restates the main qualities discussed',
        'Reflects on the overall impact of knowing this person',
        'Expresses genuine appreciation or gratitude',
        'Ends with a meaningful insight or broader reflection'
      ]
    }
  };
  
  const sections = [
    {
      id: 'introduction',
      title: 'Step 1: Write Your Introduction',
      icon: '📝',
      color: 'blue',
      minWords: 50,
      guidelines: [
        'Start with a general statement about helpful people',
        'Introduce the person you will write about',
        'Mention the context in which you met them',
        'Create interest for the reader'
      ],
      example: 'It always feels good to see someone helping others selflessly. While some leaders help others for political gain, my junior college teacher was always ready to help students under any circumstances.',
    },
    {
      id: 'bodyParagraph1',
      title: 'Step 2: Write Body Paragraph 1',
      icon: '📋',
      color: 'purple',
      minWords: 80,
      guidelines: [
        'Provide a major detail about the person',
        'Support with minor details and examples',
        'Show specific instances of their helpfulness',
        'Explain your initial impressions and how they changed'
      ],
      example: 'Professor Ben was my teacher. I initially thought his offers to help were empty promises, but he proved otherwise by always being available to solve both academic and personal issues. He spent extra hours helping students who struggled with concepts.',
    },
    {
      id: 'bodyParagraph2',
      title: 'Step 3: Write Body Paragraph 2',
      icon: '✍️',
      color: 'amber',
      minWords: 80,
      guidelines: [
        'Discuss the person\'s qualities',
        'Explain the impact they had on you',
        'Provide specific examples of their character',
        'Show long-term effects of their help'
      ],
      example: 'His humility and patience had a lasting effect on me, teaching me to be more empathetic in my daily interactions. He never expected anything in return and always found time despite his busy schedule.',
    },
    {
      id: 'conclusion',
      title: 'Step 4: Write Your Conclusion',
      icon: '✅',
      color: 'emerald',
      minWords: 50,
      guidelines: [
        'Summarize the key points',
        'Reinforce why the person is special',
        'End with an appreciative statement',
        'Provide a concluding thought or reflection'
      ],
      example: 'Meeting someone like Professor Ben is a reminder of the power of kindness. His selflessness profoundly influenced my values, motivating me to assist others and foster compassion.',
    }
  ];

  const handleInputChange = (sectionId, value) => {
    setUserInputs(prev => ({ ...prev, [sectionId]: value }));
    const words = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCounts(prev => ({ ...prev, [sectionId]: words }));
  };

  const handleSubmitSection = () => {
    const currentSectionData = sections[currentSection];
    if (wordCounts[currentSectionData.id] < currentSectionData.minWords) {
      alert(`Please write at least ${currentSectionData.minWords} words before proceeding.`);
      return;
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setShowFeedback(false);
    }
  };

  const handleViewFullEssay = () => {
    setCurrentSection(sections.length);
  };

  const handleReset = () => {
    setCurrentSection(0);
    setUserInputs({
      introduction: '',
      bodyParagraph1: '',
      bodyParagraph2: '',
      conclusion: ''
    });
    setWordCounts({
      introduction: 0,
      bodyParagraph1: 0,
      bodyParagraph2: 0,
      conclusion: 0
    });
    setShowFeedback(false);
  };

  const getColorClass = (color) => {
    const colors = {
      blue: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', light: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '#3b82f6' },
      purple: { bg: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)', light: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '#a855f7' },
      amber: { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', light: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '#f59e0b' },
      emerald: { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', light: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '#10b981' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .guide-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', sans-serif;
          padding: 80px 20px 60px;
        }
        
        .guide-wrapper {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .guide-header {
          text-align: center;
          margin-bottom: 50px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        .guide-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 15px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .guide-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.95);
          font-weight: 400;
        }
        
        .topic-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          animation: slideUp 0.6s ease-out;
        }
        
        .topic-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        
        .topic-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }
        
        .progress-tracker {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 40px;
          animation: fadeIn 1s ease-out;
          flex-wrap: wrap;
        }
        
        .progress-step {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.4s ease;
          position: relative;
        }
        
        .progress-step.completed {
          background: white;
          color: #10b981;
          box-shadow: 0 4px 15px rgba(255,255,255,0.3);
        }
        
        .progress-step.active {
          background: white;
          color: #667eea;
          box-shadow: 0 8px 20px rgba(255,255,255,0.4);
          transform: scale(1.15);
        }
        
        .progress-step.inactive {
          background: rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.7);
        }
        
        .progress-connector {
          width: 50px;
          height: 4px;
          transition: all 0.4s ease;
        }
        
        .progress-connector.completed {
          background: white;
        }
        
        .progress-connector.inactive {
          background: rgba(255,255,255,0.3);
        }
        
        .section-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          margin-bottom: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: slideUp 0.6s ease-out;
        }
        
        .section-icon {
          width: 70px;
          height: 70px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 32px;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 25px;
        }
        
        .guidelines-box {
          border-radius: 12px;
          padding: 25px;
          margin-bottom: 25px;
          border-left: 5px solid;
        }
        
        .guidelines-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 15px;
        }
        
        .guidelines-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .guideline-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 10px;
          font-size: 1rem;
          color: #374151;
          line-height: 1.6;
        }
        
        .guideline-icon {
          color: #10b981;
          margin-right: 10px;
          margin-top: 3px;
          flex-shrink: 0;
          font-weight: 700;
        }
        
        .example-box {
          background: #f9fafb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 25px;
          border: 2px dashed #d1d5db;
        }
        
        .example-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        
        .example-text {
          font-style: italic;
          color: #374151;
          font-size: 1rem;
          line-height: 1.7;
        }
        
        .writing-area {
          margin-bottom: 20px;
        }
        
        .writing-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 12px;
          display: block;
        }
        
        .writing-textarea {
          width: 100%;
          min-height: 200px;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          line-height: 1.6;
          resize: vertical;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }
        
        .writing-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .word-count-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
          padding: 12px 16px;
          background: #f3f4f6;
          border-radius: 8px;
        }
        
        .word-count-text {
          font-size: 0.95rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .word-count-number {
          font-size: 1.05rem;
          font-weight: 700;
          color: #1f2937;
        }
        
        .word-count-box.valid {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }
        
        .word-count-box.valid .word-count-number {
          color: #065f46;
        }
        
        .button-group {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 35px;
          border-radius: 10px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }
        
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .btn-feedback {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 14px 35px;
          border-radius: 10px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }
        
        .btn-feedback:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
        }
        
        .feedback-box {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #10b981;
          border-radius: 12px;
          padding: 25px;
          margin-top: 20px;
          animation: slideUp 0.4s ease-out;
        }
        
        .feedback-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 20px;
        }

        .feedback-section-header {
          font-size: 1rem;
          font-weight: 700;
          color: #065f46;
          margin-bottom: 12px;
        }

        .feedback-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
        }

        .feedback-list-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          font-size: 0.95rem;
          color: #047857;
          line-height: 1.6;
          padding-left: 25px;
          position: relative;
        }

        .feedback-list-item:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #10b981;
          font-weight: 700;
          font-size: 1.1rem;
        }
        
        .feedback-example {
          background: white;
          border-left: 4px solid #10b981;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }
        
        .feedback-example-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #065f46;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        
        .feedback-example-text {
          font-style: italic;
          color: #047857;
          line-height: 1.7;
        }
        
        .full-essay-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: slideUp 0.6s ease-out;
        }
        
        .essay-section {
          margin-bottom: 30px;
          padding-bottom: 30px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .essay-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .essay-section-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 15px;
        }
        
        .essay-section-text {
          font-size: 1.05rem;
          color: #374151;
          line-height: 1.8;
        }
        
        .completion-banner {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 25px;
          border-radius: 12px;
          text-align: center;
          margin-top: 30px;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          animation: slideUp 0.6s ease-out;
        }
        
        .completion-banner-text {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 15px;
        }
        
        .btn-reset {
          background: white;
          color: #059669;
          padding: 14px 35px;
          border-radius: 10px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        
        .btn-reset:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
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
          .guide-title { font-size: 1.8rem; }
          .section-card { padding: 25px; }
          .progress-step { width: 40px; height: 40px; font-size: 0.95rem; }
          .progress-connector { width: 35px; }
        }
      `}</style>

      <div className="guide-container">
        <div className="guide-wrapper">
          <div className="guide-header">
            <h1 className="guide-title">Interactive Writing Guide</h1>
            <p className="guide-subtitle">Complete each section step by step to build your essay</p>
          </div>

          <div className="topic-card">
            <div className="topic-label">Essay Topic</div>
            <div className="topic-text">{essayTopic}</div>
          </div>

          <div className="progress-tracker">
            {sections.map((section, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`progress-step ${
                  currentSection > idx ? 'completed' : 
                  currentSection === idx ? 'active' : 'inactive'
                }`}>
                  {currentSection > idx ? '✓' : idx + 1}
                </div>
                {idx < sections.length - 1 && (
                  <div className={`progress-connector ${
                    currentSection > idx ? 'completed' : 'inactive'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {currentSection < sections.length ? (
            <div className="section-card">
              <div 
                className="section-icon" 
                style={{ background: getColorClass(sections[currentSection].color).bg }}
              >
                {sections[currentSection].icon}
              </div>
              <h2 className="section-title">{sections[currentSection].title}</h2>

              <div 
                className="guidelines-box"
                style={{ 
                  background: getColorClass(sections[currentSection].color).light,
                  borderColor: getColorClass(sections[currentSection].color).border
                }}
              >
                <div className="guidelines-title">📌 Guidelines</div>
                <ul className="guidelines-list">
                  {sections[currentSection].guidelines.map((guideline, idx) => (
                    <li key={idx} className="guideline-item">
                      <span className="guideline-icon">•</span>
                      <span>{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="example-box">
                <div className="example-label">💡 Example for Reference</div>
                <p className="example-text">{sections[currentSection].example}</p>
              </div>

              <div className="writing-area">
                <label className="writing-label">
                  Write your {sections[currentSection].title.split(':')[1]}
                </label>
                <textarea
                  className="writing-textarea"
                  value={userInputs[sections[currentSection].id]}
                  onChange={(e) => handleInputChange(sections[currentSection].id, e.target.value)}
                  placeholder={`Start writing your ${sections[currentSection].title.split(':')[1].toLowerCase()} here...`}
                />
                <div className={`word-count-box ${
                  wordCounts[sections[currentSection].id] >= sections[currentSection].minWords ? 'valid' : ''
                }`}>
                  <span className="word-count-text">
                    Word Count (minimum {sections[currentSection].minWords} words)
                  </span>
                  <span className="word-count-number">
                    {wordCounts[sections[currentSection].id]}
                  </span>
                </div>
              </div>

              <div className="button-group">
                <button
                  className="btn-feedback"
                  onClick={() => setShowFeedback(!showFeedback)}
                  disabled={wordCounts[sections[currentSection].id] < sections[currentSection].minWords}
                >
                  {showFeedback ? '✓ Hide Feedback' : '💡 Get Feedback'}
                </button>
                <button
                  className="btn-submit"
                  onClick={handleSubmitSection}
                  disabled={wordCounts[sections[currentSection].id] < sections[currentSection].minWords}
                >
                  {currentSection < sections.length - 1 ? 'Continue to Next Section' : 'Complete Essay'}
                  <span>→</span>
                </button>
              </div>

              {showFeedback && (
                <div className="feedback-box">
                  <div className="feedback-title">{feedbackGuides[sections[currentSection].id].title}</div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div className="feedback-section-header">📋 Points to Check in Your {sections[currentSection].title.split(':')[1]}:</div>
                    <ul className="feedback-list">
                      {feedbackGuides[sections[currentSection].id].tips.map((tip, idx) => (
                        <li key={idx} className="feedback-list-item">{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div className="feedback-section-header">{feedbackGuides[sections[currentSection].id].strengths}</div>
                    <ul className="feedback-list">
                      {feedbackGuides[sections[currentSection].id].strengthsList.map((strength, idx) => (
                        <li key={idx} className="feedback-list-item">{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="feedback-example">
                    <div className="feedback-example-label">✨ Example for Reference</div>
                    <div className="feedback-example-text">{sections[currentSection].example}</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="full-essay-card">
              <h2 className="section-title">🎉 Your Complete Essay</h2>
              
              {sections.map((section, idx) => (
                <div key={idx} className="essay-section">
                  <div className="essay-section-title">
                    {idx + 1}. {section.title.split(':')[1]}
                  </div>
                  <div className="essay-section-text">
                    {userInputs[section.id]}
                  </div>
                </div>
              ))}

              <div className="completion-banner">
                <div className="completion-banner-text">🎊 Excellent! Your essay is complete!</div>
                <button className="btn-reset" onClick={handleReset}>
                  ↻ Start New Essay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}