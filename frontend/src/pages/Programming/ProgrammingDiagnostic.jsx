// src/pages/Programming/ProgrammingDiagnostic.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
    questions, 
    sampleSolutions, 
    initializePyodide, 
    runPythonCode, 
    fetchSessionInfo, 
    submitDiagnostic 
} from './programming_questions';

const ProgrammingDiagnostic = () => {
    const [userCodes, setUserCodes] = useState({});
    const [pyodideReady, setPyodideReady] = useState(false);
    const [pyodideError, setPyodideError] = useState(null);
    const [userInfo, setUserInfo] = useState({ username: '', email: '' });
    const [runningQuestions, setRunningQuestions] = useState(new Set());
    const [testResults, setTestResults] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [overallScore, setOverallScore] = useState(0);
    const [submissions, setSubmissions] = useState([]);
    const codeMirrorInstances = useRef({});

    useEffect(() => {
        // Initialize everything on component mount
        initializeComponent();
    }, []);

    const initializeComponent = async () => {
        // Initialize user codes with starter code
        const initialCodes = {};
        questions.forEach(q => {
            initialCodes[q.id] = q.starter_code || '';
        });
        setUserCodes(initialCodes);

        // Fetch user session info
        const sessionInfo = await fetchSessionInfo();
        if (sessionInfo) {
            setUserInfo(sessionInfo);
        }

        // Initialize Pyodide
        try {
            await initializePyodide();
            setPyodideReady(true);
        } catch (error) {
            setPyodideError(error.message);
        }

        // Initialize CodeMirror editors after a short delay
        setTimeout(initializeCodeMirrorEditors, 100);
    };

    const initializeCodeMirrorEditors = async () => {
        // Load CodeMirror if not already loaded
        if (!window.CodeMirror) {
            await loadCodeMirror();
        }

        // Initialize each editor
        questions.forEach((q) => {
            const textarea = document.getElementById(`code-${q.id}`);
            if (textarea && !codeMirrorInstances.current[q.id]) {
                try {
                    const editor = window.CodeMirror.fromTextArea(textarea, {
                        mode: "python",
                        theme: "dracula",
                        lineNumbers: true,
                        indentUnit: 4,
                        matchBrackets: true,
                        viewportMargin: Infinity,
                        lineWrapping: true
                    });

                    const lines = editor.lineCount();
                    const initialHeight = Math.max(120, lines * 20);
                    editor.setSize("100%", initialHeight + "px");
                    
                    editor.on("change", function() {
                        const newValue = editor.getValue();
                        const newLines = editor.lineCount();
                        const newHeight = Math.max(120, newLines * 20);
                        editor.setSize("100%", newHeight + "px");
                        
                        setUserCodes(prev => ({
                            ...prev,
                            [q.id]: newValue
                        }));
                    });

                    codeMirrorInstances.current[q.id] = editor;
                } catch (err) {
                    console.error(`Error initializing CodeMirror for question ${q.id}:`, err);
                }
            }
        });
    };

    const loadCodeMirror = async () => {
        // Load CSS files
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css';
        document.head.appendChild(cssLink);

        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.css';
        document.head.appendChild(themeLink);

        // Load JS files
        const loadScript = (src) => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                document.head.appendChild(script);
            });
        };

        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/codemirror.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/mode/python/python.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.0/addon/edit/matchbrackets.min.js');
    };

    const handleRunCode = async (questionId) => {
        if (!pyodideReady) {
            alert('Python environment not ready. Please wait...');
            return;
        }

        const question = questions.find(q => q.id === questionId);
        const code = userCodes[questionId] || '';
        
        if (!question) return;

        setRunningQuestions(prev => new Set([...prev, questionId]));

        try {
            const result = await runPythonCode(code, question.test_cases);
            
            const passedCount = result.results ? result.results.filter(r => r.passed).length : 0;
            question.test_cases_passed = passedCount;
            
            setTestResults(prev => ({
                ...prev,
                [questionId]: result
            }));
        } catch (error) {
            setTestResults(prev => ({
                ...prev,
                [questionId]: {
                    error: error.message,
                    results: [],
                    rawOutput: ''
                }
            }));
        } finally {
            setRunningQuestions(prev => {
                const newSet = new Set(prev);
                newSet.delete(questionId);
                return newSet;
            });
        }
    };

    const toggleHint = (questionId) => {
        const hintContainer = document.getElementById(`hint-${questionId}`);
        const button = document.getElementById(`hint-btn-${questionId}`);
        
        if (hintContainer.style.display === "block") {
            hintContainer.style.display = "none";
            button.innerHTML = '<i className="bi bi-lightbulb"></i> Show Hint';
        } else {
            hintContainer.style.display = "block";
            button.innerHTML = '<i className="bi bi-lightbulb-fill"></i> Hide Hint';
        }
    };

    const handleSubmitDiagnostic = async () => {
        if (!userInfo.username || !userInfo.email) {
            alert("Error: User session data not found. Please log in.");
            return;
        }

        const submissionData = questions.map(q => {
            const userCode = userCodes[q.id] || '';
            const isAttempted = userCode.trim() !== '' && userCode !== (q.starter_code || '');
            
            return {
                question_id: q.id,
                user_code: userCode,
                test_cases_passed: q.test_cases_passed || 0,
                total_test_cases: q.test_cases.length,
                solution: sampleSolutions[q.id] || "",
                attempted: isAttempted
            };
        });

        const unattemptedQuestions = submissionData.filter(s => !s.attempted);
        
        if (unattemptedQuestions.length > 0) {
            const confirmMessage = `You have ${unattemptedQuestions.length} unattempted question(s). Are you sure you want to submit your assessment?`;
            if (!window.confirm(confirmMessage)) {
                return;
            }
        }

        setIsSubmitting(true);

        try {
            const totalTestCases = submissionData.reduce((sum, q) => sum + q.total_test_cases, 0);
            const totalPassed = submissionData.reduce((sum, s) => sum + s.test_cases_passed, 0);
            const calculatedScore = totalTestCases > 0 ? Math.round((totalPassed / totalTestCases) * 100) : 0;
            
            await submitDiagnostic(userInfo, submissionData);
            
            setSubmissions(submissionData);
            setOverallScore(calculatedScore);
            setIsSubmitted(true);
            
            // Disable all editors
            Object.values(codeMirrorInstances.current).forEach(editor => {
                if (editor) {
                    editor.setOption('readOnly', true);
                }
            });
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        } catch (error) {
            alert("Submission failed! " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderTestResults = (questionId) => {
        const result = testResults[questionId];
        if (!result) return null;

        const question = questions.find(q => q.id === questionId);
        const { results, rawOutput, error } = result;
        
        return (
            <div className="output" style={{ display: 'block' }}>
                {rawOutput && (
                    <div className="raw-output" style={{ marginBottom: '15px' }}>
                        <h4>Code Output:</h4>
                        <pre style={{ 
                            backgroundColor: '#f1f1f1', 
                            padding: '8px', 
                            borderRadius: '4px',
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.9rem'
                        }}>
                            {rawOutput}
                        </pre>
                    </div>
                )}

                {error && (
                    <div className="error">
                        <h4>Error:</h4>
                        <pre style={{ color: 'red' }}>{error}</pre>
                    </div>
                )}

                {results && results.length > 0 && (
                    <>
                        {(() => {
                            const passedCount = results.filter(r => r.passed).length;
                            const totalTests = results.length;
                            const percentage = Math.round((passedCount / totalTests) * 100);
                            
                            return (
                                <div style={{ 
                                    marginBottom: '15px', 
                                    fontWeight: 'bold', 
                                    fontSize: '1.1em',
                                    color: passedCount === totalTests ? 'green' : 'inherit'
                                }}>
                                    <h4>Test Results: {passedCount}/{totalTests} tests passing ({percentage}%)</h4>
                                    {passedCount === totalTests && (
                                        <div style={{ color: 'green' }}>✅ Well done! All tests passed!</div>
                                    )}
                                </div>
                            );
                        })()}
                        
                        {results.map((result, index) => {
                            const testCase = question.test_cases[index];
                            let expected = testCase.expected;
                            let output = result.output;

                            expected = expected.replace(/\\n/g, '↵\n');
                            output = output.replace(/\\n/g, '↵\n');

                            return (
                                <div key={index} style={{
                                    marginBottom: '15px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}>
                                    <b>Test {index + 1}:</b>
                                    <div>Input: {JSON.stringify(testCase.input)}</div>
                                    <div>Expected: <pre style={{
                                        backgroundColor: '#f1f1f1',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        margin: '5px 0',
                                        whiteSpace: 'pre-wrap',
                                        fontSize: '0.9rem'
                                    }}>{expected}</pre></div>
                                    <div>Output: <pre style={{
                                        backgroundColor: '#f1f1f1',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        margin: '5px 0',
                                        whiteSpace: 'pre-wrap',
                                        fontSize: '0.9rem'
                                    }}>{output}</pre></div>
                                    <div style={{
                                        fontWeight: 'bold',
                                        marginTop: '5px',
                                        color: result.passed ? 'green' : 'red'
                                    }}>
                                        {result.passed ? '✔ Passed' : '✘ Failed'}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        );
    };

    // Loading state
    if (!pyodideReady && !pyodideError) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading Python environment...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (pyodideError) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    <h4>Error Loading Python Environment</h4>
                    <p>{pyodideError}</p>
                    <p>Please refresh the page to try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <div className="row d-flex justify-content-center">
                <div className="col-lg-10">
                    <div className="text-center mb-4">
                        <h1>Python Diagnostic Assessment</h1>
                    </div>

                    {/* Results Section */}
                    {isSubmitted && (
                        <div style={{
                            display: 'block',
                            backgroundColor: '#f8f9fa',
                            padding: '20px',
                            borderRadius: '8px',
                            marginBottom: '30px',
                            borderLeft: '5px solid #0d6efd'
                        }}>
                            <h2><i className="bi bi-award"></i> Assessment Results</h2>
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                textAlign: 'center'
                            }}>
                                Your score: <span>{overallScore}</span>%
                            </div>
                            
                            <div>
                                {submissions.map((submission) => {
                                    const question = questions.find(q => q.id === submission.question_id);
                                    if (!question) return null;
                                    
                                    const isFullyCorrect = submission.test_cases_passed === submission.total_test_cases;
                                    
                                    return (
                                        <div 
                                            key={submission.question_id}
                                            style={{
                                                backgroundColor: isFullyCorrect ? '#f0fff0' : '#fff0f0',
                                                borderLeft: `4px solid ${isFullyCorrect ? '#28a745' : '#dc3545'}`,
                                                padding: '15px',
                                                marginBottom: '20px',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            <h4>{question.title}</h4>
                                            <div dangerouslySetInnerHTML={{ __html: question.description }} />
                                            <p><strong>Score:</strong> {submission.test_cases_passed} / {submission.total_test_cases} tests passed</p>
                                            
                                            {!isFullyCorrect && sampleSolutions[submission.question_id] && (
                                                <div style={{
                                                    backgroundColor: '#f0fff0',
                                                    borderLeft: '4px solid #28a745',
                                                    padding: '15px',
                                                    marginTop: '10px',
                                                    borderRadius: '5px'
                                                }}>
                                                    <h5>Solution:</h5>
                                                    <pre style={{
                                                        backgroundColor: '#f8f9fa',
                                                        padding: '10px',
                                                        borderRadius: '4px',
                                                        overflow: 'auto'
                                                    }}>
                                                        {sampleSolutions[submission.question_id]}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                
                                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                    <a href="/programming" className="btn btn-success" style={{ marginRight: '1rem' }}>
                                        <i className="bi bi-arrow-left"></i> Return to Programming Page
                                    </a>
                                    <a href="/programming_details" className="btn btn-success">
                                        <i className="bi bi-file-earmark-code"></i> Programming Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Introduction */}
                    {!isSubmitted && (
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '25px',
                            borderRadius: '8px',
                            marginBottom: '30px'
                        }}>
                            <h2><i className="bi bi-clipboard-check"></i> About This Diagnostic</h2>
                            <p>This diagnostic assessment will help you identify your strengths and areas for improvement in Python programming. The questions range from beginner to advanced levels, covering fundamental concepts like:</p>
                            <ul>
                                <li>Basic syntax and data types</li>
                                <li>Control structures (loops and conditionals)</li>
                                <li>Functions and modules</li>
                                <li>Data structures (lists, dictionaries, etc.)</li>
                                <li>Error handling and debugging</li>
                            </ul>
                            <p>Complete as many questions as you can. Don't worry if you can't solve all of them - this is meant to help you identify areas to focus on in your learning journey.</p>
                        </div>
                    )}

                    {/* Questions */}
                    {!isSubmitted && (
                        <div>
                            {questions.map((question) => {
                                const difficultyClass = question.difficulty.toLowerCase();
                                const isRunning = runningQuestions.has(question.id);
                                
                                return (
                                    <div 
                                        key={question.id} 
                                        style={{
                                            background: '#ffffff',
                                            borderRadius: '8px',
                                            padding: '20px',
                                            margin: '20px 0',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                                        }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '15px'
                                        }}>
                                            <h2>{question.title}</h2>
                                            <span 
                                                className={`difficulty-badge ${difficultyClass}`}
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '5px 10px',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    backgroundColor: difficultyClass === 'beginner' ? '#d4edda' : 
                                                                    difficultyClass === 'intermediate' ? '#fff3cd' : '#f8d7da',
                                                    color: difficultyClass === 'beginner' ? '#155724' : 
                                                           difficultyClass === 'intermediate' ? '#856404' : '#721c24'
                                                }}
                                            >
                                                {question.difficulty}
                                            </span>
                                        </div>
                                        
                                        <div 
                                            style={{ marginBottom: '20px' }}
                                            dangerouslySetInnerHTML={{ __html: question.description }}
                                        />
                                        
                                        <textarea 
                                            id={`code-${question.id}`}
                                            className="codeInput"
                                            defaultValue={question.starter_code || ""}
                                            style={{ display: 'none' }}
                                        />
                                        
                                        <div style={{ 
                                            marginTop: '10px', 
                                            marginBottom: '10px',
                                            display: 'flex',
                                            gap: '10px'
                                        }}>
                                            <button 
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleRunCode(question.id)}
                                                disabled={isRunning}
                                            >
                                                {isRunning ? (
                                                    <>
                                                        <span style={{
                                                            display: 'inline-block',
                                                            width: '16px',
                                                            height: '16px',
                                                            border: '2px solid rgba(0, 0, 0, 0.1)',
                                                            borderRadius: '50%',
                                                            borderTopColor: '#0d6efd',
                                                            animation: 'spin 1s ease-in-out infinite',
                                                            marginRight: '5px'
                                                        }}></span>
                                                        Running...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-play-fill"></i> Run Code
                                                    </>
                                                )}
                                            </button>
                                            
                                            <button 
                                                id={`hint-btn-${question.id}`}
                                                className="btn btn-outline-secondary btn-sm"
                                                onClick={() => toggleHint(question.id)}
                                            >
                                                <i className="bi bi-lightbulb"></i> Show Hint
                                            </button>
                                        </div>
                                        
                                        <div 
                                            id={`hint-${question.id}`}
                                            style={{
                                                marginTop: '15px',
                                                padding: '10px 15px',
                                                backgroundColor: '#e2f0fd',
                                                borderLeft: '4px solid #0d6efd',
                                                borderRadius: '4px',
                                                display: 'none'
                                            }}
                                        >
                                            {question.hint || "No hint available for this question."}
                                        </div>
                                        
                                        {renderTestResults(question.id)}
                                    </div>
                                );
                            })}
                            
                            <button 
                                className="btn btn-success w-100 p-3"
                                onClick={handleSubmitDiagnostic}
                                disabled={isSubmitting}
                                style={{ fontSize: '1.1rem' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Diagnostic Assessment'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ProgrammingDiagnostic;
