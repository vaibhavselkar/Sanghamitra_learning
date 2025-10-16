import { useState, useEffect, useRef } from 'react';

export default function WritingGRE() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('');
  const [topicId, setTopicId] = useState('');
  const [response, setResponse] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [corrections, setCorrections] = useState(null);
  const [cefrSummary, setCefrSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchSessionInfo();
    fetchTopic();
    startTimer();
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const fetchSessionInfo = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/session-info`);
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
        setEmail(data.email);
      } else {
        window.location.href = '/user-login';
      }
    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

  const fetchTopic = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/gre_writing_topics`);
      const data = await res.json();
      const randomTopic = data[Math.floor(Math.random() * data.length)];
      setTopic(randomTopic.topic_text);
      setTopicId(randomTopic._id);
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResponseChange = (e) => {
    const text = e.target.value;
    setResponse(text);
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
  };

  const handleSubmit = async () => {
    if (wordCount < 200) {
      alert('Please write at least 200 words');
      return;
    }

    setIsLoading(true);
    const dataToSend = {
      username,
      email,
      topic_id: topicId,
      topic_text: topic,
      response_text: response,
      time: timeElapsed
    };

    try {
      const saveRes = await fetch(`${process.env.REACT_APP_API_URL}/api/gre_writing_response`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      if (saveRes.ok) {
        clearInterval(timerRef.current);
        setIsSubmitted(true);
        console.log(dataToSend);
        await getFeedback(response);
      }
    } catch (error) {
      console.log(dataToSend);
      console.error('Error submitting:', error);
      
      alert('Error submitting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFeedback = async (text) => {
    try {
      const feedbackRes = await fetch('https://flask-hello-world-2-eta.vercel.app/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: text })
      });

      if (feedbackRes.ok) {
        const data = await feedbackRes.json();
        setFeedback(data['Original Feedback']);
        setCorrections(data['Corrections']);
        setCefrSummary(data['CEFR Summary']);
      }
    } catch (error) {
      console.error('Error getting feedback:', error);
    }
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; }
        
        .gre-writing-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', sans-serif;
          padding: 80px 20px 40px;
        }
        
        .gre-writing-wrapper {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .gre-header {
          text-align: center;
          margin-bottom: 25px;
          animation: fadeInDown 0.8s ease-out;
        }
        
        .gre-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .gre-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
        }
        
        .main-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          animation: slideUp 0.6s ease-out;
          margin-bottom: 30px;
        }
        
        .card-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        
        .card-main-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }
        
        .timer-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        
        .topic-section {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-left: 5px solid #3b82f6;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        
        .topic-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e40af;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }
        
        .topic-text {
          font-size: 1rem;
          color: #1e3a8a;
          line-height: 1.6;
          font-weight: 500;
        }
        
        .writing-area {
          margin-bottom: 15px;
        }
        
        .writing-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 12px;
          display: block;
        }
        
        .response-textarea {
          width: 100%;
          min-height: 280px;
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.6;
          resize: vertical;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        
        .response-textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .response-textarea:disabled {
          background: #f9fafb;
          cursor: not-allowed;
        }
        
        .word-count {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          padding: 10px 16px;
          background: #f3f4f6;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .word-count-text {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }
        
        .word-count-number {
          font-size: 1rem;
          font-weight: 700;
          color: #1f2937;
        }
        
        .word-count.valid {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        }
        
        .word-count.valid .word-count-number {
          color: #065f46;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 12px 32px;
          border-radius: 10px;
          border: none;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }
        
        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .btn-home {
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
          color: white;
          padding: 16px 40px;
          border-radius: 12px;
          border: none;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(107, 114, 128, 0.3);
          margin-top: 20px;
        }
        
        .btn-home:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(107, 114, 128, 0.4);
        }
        
        .success-message {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-left: 5px solid #10b981;
          padding: 20px 25px;
          border-radius: 12px;
          margin-bottom: 30px;
          animation: slideUp 0.5s ease-out;
        }
        
        .success-text {
          font-size: 1.3rem;
          font-weight: 700;
          color: #065f46;
          margin: 0;
        }
        
        .feedback-card {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 25px;
          animation: slideUp 0.6s ease-out;
        }
        
        .feedback-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #fbbf24;
          margin-bottom: 15px;
        }
        
        .feedback-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: #e5e7eb;
        }
        
        .corrections-card {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 25px;
          animation: slideUp 0.7s ease-out;
        }
        
        .corrections-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #fb923c;
          margin-bottom: 20px;
        }
        
        .correction-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .correction-item {
          background: rgba(255,255,255,0.05);
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 12px;
          border-left: 4px solid #fb923c;
          font-size: 1.05rem;
          line-height: 1.6;
        }
        
        .cefr-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          animation: slideUp 0.8s ease-out;
          margin-bottom: 25px;
        }
        
        .cefr-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
        }
        
        .cefr-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .cefr-table th {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px;
          text-align: left;
          font-weight: 700;
          font-size: 1.05rem;
        }
        
        .cefr-table th:first-child {
          border-radius: 10px 0 0 0;
        }
        
        .cefr-table th:last-child {
          border-radius: 0 10px 0 0;
        }
        
        .cefr-table td {
          padding: 15px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 1.05rem;
        }
        
        .cefr-table tr:last-child td {
          border-bottom: none;
        }
        
        .cefr-table tr:hover {
          background: #f9fafb;
        }
        
        .loader {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
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
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .gre-title { font-size: 1.5rem; }
          .main-card { padding: 20px; }
          .response-textarea { min-height: 220px; }
          .btn-home { margin-left: 0; margin-top: 15px; }
        }
      `}</style>

      <div className="gre-writing-container">
        <div className="gre-writing-wrapper">
          <div className="gre-header">
            <h1 className="gre-title">Analytical Writing (GRE)</h1>
            <p className="gre-subtitle">Express your thoughts clearly and coherently</p>
          </div>

          <div className="main-card">
            <div className="card-header-flex">
              <h2 className="card-main-title">Writing Task</h2>
              <div className="timer-badge">
                <span>⏱️</span>
                <span>{formatTime(timeElapsed)}</span>
              </div>
            </div>

            <div className="topic-section">
              <div className="topic-label">Topic</div>
              <div className="topic-text">{topic || 'Loading topic...'}</div>
            </div>

            {!isSubmitted ? (
              <>
                <div className="writing-area">
                  <label className="writing-label">Your Response</label>
                  <textarea
                    className="response-textarea"
                    value={response}
                    onChange={handleResponseChange}
                    placeholder="Write your response here... (Minimum 200 words required)"
                  />
                  <div className={`word-count ${wordCount >= 200 ? 'valid' : ''}`}>
                    <span className="word-count-text">Word Count</span>
                    <span className="word-count-number">{wordCount} / 200</span>
                  </div>
                </div>

                <button
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={wordCount < 200 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loader"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Response
                      <span>→</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <div className="success-message">
                  <p className="success-text">✅ Thank you for your submission, {username}!</p>
                </div>

                {feedback && (
                  <div className="feedback-card">
                    <div className="feedback-title">📝 Original Feedback</div>
                    <div className="feedback-text">{feedback}</div>
                  </div>
                )}

                {corrections && Object.keys(corrections).length > 0 && (
                  <div className="corrections-card">
                    <div className="corrections-title">🔍 Corrections</div>
                    <ul className="correction-list">
                      {Object.entries(corrections).map(([original, corrected], idx) => (
                        <li key={idx} className="correction-item">
                          <strong>{original}</strong> → {corrected}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {cefrSummary && (
                  <div className="cefr-card">
                    <div className="cefr-title">📊 CEFR Summary</div>
                    <table className="cefr-table">
                      <thead>
                        <tr>
                          <th>CEFR Level</th>
                          <th>Word Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(cefrSummary).map(([level, count], idx) => (
                          <tr key={idx}>
                            <td><strong>{level}</strong></td>
                            <td><strong>{count}</strong></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <button className="btn-home" onClick={goHome}>
                  Writing Page
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}