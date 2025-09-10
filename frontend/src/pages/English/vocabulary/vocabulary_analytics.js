import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/AuthContext';

const VocabAnalytics = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email && quizId) {
      fetchData();
    }
  }, [user, quizId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let dateParam = quizId;
      if (/^\d+$/.test(quizId)) {
        dateParam = new Date(parseInt(quizId)).toISOString();
      }
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vocabscores?email=${user.email}&date=${dateParam}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const userData = await response.json();
      processData(userData);
    } catch (error) {
      setError('Could not load your quiz results');
    } finally {
      setLoading(false);
    }
  };

  const processData = (userData) => {
    if (!userData?.assessments?.length) {
      setError('No quiz data available');
      return;
    }

    const assessment = userData.assessments[userData.assessments.length - 1];
    const questions = assessment.questions || [];
    
    const correct = questions.filter(q => q.is_correct).length;
    const skipped = questions.filter(q => q.user_response.includes("did not answer")).length;
    const total = questions.length;
    const incorrect = total - correct - skipped;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Process level stats
    const levelStats = {};
    questions.forEach(q => {
      if (!levelStats[q.CEFR_level]) levelStats[q.CEFR_level] = { correct: 0, total: 0 };
      levelStats[q.CEFR_level].total++;
      if (q.is_correct) levelStats[q.CEFR_level].correct++;
    });

    // Process topic stats
    const topicStats = {};
    questions.forEach(q => {
      const topic = q.topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
      topicStats[topic].total++;
      if (q.is_correct) topicStats[topic].correct++;
    });

    // Process difficulty stats
    const difficultyStats = {};
    questions.forEach(q => {
      if (!difficultyStats[q.difficulty_level]) difficultyStats[q.difficulty_level] = { correct: 0, total: 0 };
      difficultyStats[q.difficulty_level].total++;
      if (q.is_correct) difficultyStats[q.difficulty_level].correct++;
    });

    // Determine vocabulary level using advanced algorithm
    const determineVocabularyLevel = () => {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      let determinedLevel = 'A1';
      const penaltyWeights = {
        A1: 0.5, A2: 0.4, B1: 0.2, B2: 0.2, C1: 0.1, C2: 0.05
      };
      const thresholds = {
        A1: 3, A2: 3, B1: 2.5, B2: 2.5, C1: 2.5, C2: 2.5
      };
      
      for (let level of levels) {
        const levelTotal = levelStats[level]?.total || 1;
        const levelCorrect = levelStats[level]?.correct || 0;
        const incorrect = levelTotal - levelCorrect;
        const effectiveScore = levelCorrect - (penaltyWeights[level] * incorrect);
        
        if (effectiveScore >= thresholds[level]) {
          determinedLevel = level;
        } else {
          break;
        }
      }
      return determinedLevel;
    };

    const vocabularyLevel = determineVocabularyLevel();

    // Generate comprehensive insights
    const insights = [];
    
    // Performance-based insights
    if (accuracy >= 90) {
      insights.push("Outstanding mastery demonstrated across vocabulary levels - you're ready for advanced challenges");
    } else if (accuracy >= 80) {
      insights.push("Strong vocabulary foundation with consistent performance across different difficulty levels");
    } else if (accuracy >= 70) {
      insights.push("Solid vocabulary skills emerging - focus on expanding range and depth of word knowledge");
    } else if (accuracy >= 60) {
      insights.push("Building momentum in vocabulary acquisition - regular practice will accelerate your progress");
    } else if (accuracy >= 50) {
      insights.push("Foundation level established - concentrate on high-frequency vocabulary and common word patterns");
    } else {
      insights.push("Beginning your vocabulary journey - focus on everyday words and basic communication needs");
    }

    // CEFR level-specific insights
    const currentLevelStats = levelStats[vocabularyLevel];
    if (currentLevelStats && currentLevelStats.total >= 3) {
      const levelAccuracy = (currentLevelStats.correct / currentLevelStats.total) * 100;
      if (levelAccuracy >= 80) {
        insights.push(`Confident performance at ${vocabularyLevel} level (${levelAccuracy.toFixed(0)}% accuracy) indicates readiness for ${getNextLevel(vocabularyLevel)} challenges`);
      } else if (levelAccuracy >= 60) {
        insights.push(`Developing proficiency at ${vocabularyLevel} level - strengthen core vocabulary before advancing to ${getNextLevel(vocabularyLevel)}`);
      }
    }

    // Topic-specific insights
    const topicPerformanceArray = Object.entries(topicStats)
      .filter(([_, stats]) => stats.total >= 2)
      .map(([topic, stats]) => ({
        topic,
        accuracy: (stats.correct / stats.total) * 100,
        total: stats.total
      }))
      .sort((a, b) => b.accuracy - a.accuracy);

    if (topicPerformanceArray.length > 0) {
      const bestTopic = topicPerformanceArray[0];
      const worstTopic = topicPerformanceArray[topicPerformanceArray.length - 1];
      
      if (bestTopic.accuracy === 100) {
        insights.push(`Perfect mastery in ${bestTopic.topic} vocabulary demonstrates strong conceptual understanding in this domain`);
      } else if (bestTopic.accuracy >= 80) {
        insights.push(`${bestTopic.topic} is your strongest vocabulary area with ${bestTopic.accuracy.toFixed(0)}% accuracy`);
      }
      
      if (worstTopic.accuracy < 50 && topicPerformanceArray.length > 1) {
        insights.push(`${worstTopic.topic} vocabulary needs focused attention - consider targeted practice in this area`);
      }
    }

    // Difficulty pattern insights
    const easyPerf = difficultyStats.easy ? (difficultyStats.easy.correct / difficultyStats.easy.total) * 100 : 0;
    const mediumPerf = difficultyStats.medium ? (difficultyStats.medium.correct / difficultyStats.medium.total) * 100 : 0;
    const hardPerf = difficultyStats.hard ? (difficultyStats.hard.correct / difficultyStats.hard.total) * 100 : 0;

    if (hardPerf >= 70 && difficultyStats.hard?.total >= 2) {
      insights.push(`Strong performance on challenging vocabulary (${hardPerf.toFixed(0)}% on difficult questions) shows advanced word recognition skills`);
    } else if (mediumPerf >= 80 && difficultyStats.medium?.total >= 2) {
      insights.push(`Solid grasp of intermediate vocabulary - ready to tackle more complex word relationships and nuances`);
    } else if (easyPerf >= 80 && difficultyStats.easy?.total >= 2) {
      insights.push(`Strong foundation with basic vocabulary established - focus on expanding to intermediate-level words`);
    }

    // Completion and strategy insights
    const completionRate = ((total - skipped) / total) * 100;
    if (skipped > correct) {
      insights.push(`High skip rate suggests cautious approach - building confidence through regular practice will improve performance`);
    } else if (completionRate >= 95) {
      insights.push(`Excellent completion rate shows strong test-taking confidence and vocabulary knowledge application`);
    } else if (completionRate < 75) {
      insights.push(`Attempting more questions, even with uncertainty, can reveal hidden vocabulary knowledge and improve scores`);
    }

    // Learning progression insights
    if (vocabularyLevel === 'A1' || vocabularyLevel === 'A2') {
      insights.push(`At ${vocabularyLevel} level, prioritize high-frequency words, basic word families, and common collocations for rapid improvement`);
    } else if (vocabularyLevel === 'B1' || vocabularyLevel === 'B2') {
      insights.push(`${vocabularyLevel} level performance indicates readiness for academic vocabulary, idioms, and register-specific language`);
    } else {
      insights.push(`${vocabularyLevel} level achievement demonstrates advanced vocabulary control - focus on subtle meaning distinctions and specialized terminology`);
    }

    // Limit to most relevant insights (keep 6-8 for better readability)
    const finalInsights = insights.slice(0, Math.min(8, insights.length));

    function getNextLevel(currentLevel) {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const currentIndex = levels.indexOf(currentLevel);
      return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'Advanced';
    }

    setData({
      score: assessment.total_score || 0,
      accuracy,
      correct,
      incorrect,
      skipped,
      total,
      levelStats,
      topicStats,
      insights,
      questions,
      vocabularyLevel
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '3rem', height: '3rem', border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }}></div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Loading Your Results</h3>
          <p style={{ color: '#6b7280' }}>Please wait while we analyze your performance...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '24rem' }}>
          <div style={{ width: '4rem', height: '4rem', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <span style={{ fontSize: '1.5rem', color: '#dc2626' }}>!</span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Unable to Load Results</h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{error}</p>
          <button 
            onClick={() => navigate('/vocabulary')}
            style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: 'none', fontWeight: '600', cursor: 'pointer' }}
          >
            Back to Vocabulary
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '2rem 0' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
                Quiz Results
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                Your vocabulary assessment analysis
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '5rem', 
                height: '5rem', 
                borderRadius: '50%', 
                backgroundColor: data.accuracy >= 80 ? '#dcfce7' : data.accuracy >= 65 ? '#dbeafe' : '#fef3c7',
                color: data.accuracy >= 80 ? '#059669' : data.accuracy >= 65 ? '#2563eb' : '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {data.accuracy >= 90 ? 'A+' : data.accuracy >= 80 ? 'A' : data.accuracy >= 70 ? 'B' : data.accuracy >= 60 ? 'C' : 'D'}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Grade</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* Performance Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '0.5rem' }}>{data.accuracy}%</div>
            <div style={{ color: '#6b7280', fontWeight: '500' }}>Accuracy</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#059669', marginBottom: '0.5rem' }}>{data.correct}</div>
            <div style={{ color: '#6b7280', fontWeight: '500' }}>Correct</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '0.5rem' }}>{data.incorrect}</div>
            <div style={{ color: '#6b7280', fontWeight: '500' }}>Incorrect</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>{data.skipped}</div>
            <div style={{ color: '#6b7280', fontWeight: '500' }}>Skipped</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '0.5rem' }}>{data.vocabularyLevel}</div>
            <div style={{ color: '#6b7280', fontWeight: '500' }}>CEFR Level</div>
          </div>
        </div>

        {/* Key Insights */}
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Key Insights</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {data.insights.map((insight, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.75rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#3b82f6', borderRadius: '50%', marginTop: '0.5rem', flexShrink: 0 }}></div>
                <p style={{ color: '#1f2937', margin: 0, lineHeight: '1.5' }}>{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* CEFR Levels */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>CEFR Level Performance</h3>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Your Level: <strong style={{ color: '#7c3aed' }}>{data.vocabularyLevel}</strong></div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {Object.entries(data.levelStats).map(([level, stats]) => {
                const percentage = (stats.correct / stats.total) * 100;
                return (
                  <div key={level}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>{level}</span>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{stats.correct}/{stats.total}</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '0.5rem' }}>
                      <div 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: percentage >= 80 ? '#059669' : percentage >= 60 ? '#3b82f6' : '#d97706', 
                          height: '100%', 
                          borderRadius: '9999px',
                          transition: 'width 0.5s ease-in-out'
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Topics */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>Topic Performance</h3>
            <div style={{ display: 'grid', gap: '1rem', maxHeight: '20rem', overflowY: 'auto' }}>
              {Object.entries(data.topicStats).map(([topic, stats]) => {
                const percentage = (stats.correct / stats.total) * 100;
                return (
                  <div key={topic}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '500', color: '#374151', fontSize: '0.875rem' }}>{topic}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{stats.correct}/{stats.total}</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '0.375rem' }}>
                      <div 
                        style={{ 
                          width: `${percentage}%`, 
                          backgroundColor: percentage >= 80 ? '#059669' : percentage >= 60 ? '#3b82f6' : '#d97706', 
                          height: '100%', 
                          borderRadius: '9999px' 
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Question Review Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '3rem' }}>
          <div style={{ padding: '2rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Question Review</h2>
            <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0' }}>See your answers compared to the correct ones</p>
          </div>
          
          <div style={{ maxHeight: '32rem', overflowY: 'auto' }}>
            {data.questions.map((question, index) => (
              <div key={index} style={{ 
                padding: '1.5rem 2rem', 
                borderBottom: index === data.questions.length - 1 ? 'none' : '1px solid #f3f4f6',
                backgroundColor: question.is_correct ? '#f0fdf4' : question.user_response.includes("did not answer") ? '#f9fafb' : '#fef2f2'
              }}>
                {/* Question Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ flex: 1, marginRight: '1rem' }}>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      color: '#1f2937', 
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.5' 
                    }}>
                      Question {index + 1}: {question.question_text}
                    </h3>
                    
                    {/* Question Meta Info */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      <span style={{ 
                        backgroundColor: '#f3e8ff', 
                        color: '#7c3aed', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.75rem', 
                        fontWeight: '600' 
                      }}>
                        {question.CEFR_level}
                      </span>
                      <span style={{ 
                        backgroundColor: question.difficulty_level === 'easy' ? '#dcfce7' : 
                                        question.difficulty_level === 'medium' ? '#fef3c7' : '#fecaca',
                        color: question.difficulty_level === 'easy' ? '#059669' : 
                               question.difficulty_level === 'medium' ? '#d97706' : '#dc2626',
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {question.difficulty_level}
                      </span>
                      <span style={{ 
                        backgroundColor: '#e0f2fe', 
                        color: '#0369a1', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.75rem', 
                        fontWeight: '600' 
                      }}>
                        {question.topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span style={{ 
                        backgroundColor: '#f1f5f9', 
                        color: '#64748b', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.75rem', 
                        fontWeight: '600' 
                      }}>
                        {question.points_awarded} pts
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    backgroundColor: question.is_correct ? '#dcfce7' : 
                                    question.user_response.includes("did not answer") ? '#f1f5f9' : '#fecaca',
                    color: question.is_correct ? '#059669' : 
                           question.user_response.includes("did not answer") ? '#64748b' : '#dc2626',
                    minWidth: '6rem',
                    textAlign: 'center'
                  }}>
                    {question.is_correct ? '✓ Correct' : 
                     question.user_response.includes("did not answer") ? '- Skipped' : '✗ Incorrect'}
                  </div>
                </div>

                {/* Answer Comparison */}
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {/* Your Answer */}
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Your Answer:
                    </div>
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: question.is_correct ? '#dcfce7' : 
                                      question.user_response.includes("did not answer") ? '#f8fafc' : '#fef2f2',
                      border: `2px solid ${question.is_correct ? '#059669' : 
                                          question.user_response.includes("did not answer") ? '#e2e8f0' : '#dc2626'}`,
                      fontSize: '1rem',
                      color: '#1f2937'
                    }}>
                      {question.user_response.includes("did not answer") ? 
                       <em style={{ color: '#6b7280' }}>Question was skipped</em> : 
                       question.user_response}
                    </div>
                  </div>

                  {/* Correct Answer */}
                  <div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#374151', 
                      marginBottom: '0.5rem' 
                    }}>
                      Correct Answer:
                    </div>
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      backgroundColor: '#dcfce7',
                      border: '2px solid #059669',
                      fontSize: '1rem',
                      color: '#1f2937',
                      fontWeight: question.is_correct ? 'normal' : '600'
                    }}>
                      {question.correct_option}
                    </div>
                  </div>

                  {/* Explanation or Note */}
                  {!question.is_correct && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fbbf24',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#92400e'
                    }}>
                      <strong>Learning Note:</strong> {
                        question.user_response.includes("did not answer") ? 
                        "Try to attempt all questions, even if uncertain. Educated guesses help with learning!" :
                        "Review this vocabulary item and similar words to strengthen your understanding."
                      }
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
          <button 
            onClick={() => navigate('/vocabulary')}
            style={{ 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              padding: '1rem 2rem', 
              borderRadius: '0.75rem', 
              border: 'none', 
              fontWeight: '600', 
              fontSize: '1.125rem',
              cursor: 'pointer',
              marginRight: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Practice More
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{ 
              backgroundColor: '#6b7280', 
              color: 'white', 
              padding: '1rem 2rem', 
              borderRadius: '0.75rem', 
              border: 'none', 
              fontWeight: '600', 
              fontSize: '1.125rem',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default VocabAnalytics;
