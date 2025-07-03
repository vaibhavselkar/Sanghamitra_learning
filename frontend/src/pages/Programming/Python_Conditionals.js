import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const PythonConditionals = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State management
  const [userInfo, setUserInfo] = useState({ username: null, email: null });
  const [quizState, setQuizState] = useState({
    questions: [],
    answeredQuestionIds: [],
    currentQuizIndex: 0,
    isLoading: true,
    showOutput: false,
    showHint: false,
    showResult: false,
    output: '',
    resultMessage: '',
    resultType: '',
    allTestsPassed: false
  });

  // Pyodide instance
  const [pyodide, setPyodide] = useState(null);
  const [pyodideLoading, setPyodideLoading] = useState(true);

  // Refs for CodeMirror instances
  const codeEditorsRef = useRef([]);
  const quizCodeEditorRef = useRef(null);

  // Initialize component
  useEffect(() => {
    initializePyodide();
    loadCodeMirror();
  }, []);

  // Initialize Pyodide with better UX and optimization
  const initializePyodide = async () => {
    try {
      // Check if Pyodide is already loaded globally
      if (window.pyodide) {
        setPyodide(window.pyodide);
        setPyodideLoading(false);
        console.log('Using existing Pyodide instance');
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      script.onload = async () => {
        try {
          console.log('Loading Pyodide... This may take 15-30 seconds on first load.');
          
          const pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            fullStdLib: false, // Only load essential packages for faster loading
          });
          
          // Setup minimal output capture for better performance
          pyodideInstance.runPython(`
import sys
from io import StringIO

# Lightweight output capture
class FastCapture:
    def __init__(self):
        self.stdout = StringIO()
        
    def reset(self):
        self.stdout = StringIO()
        
    def capture(self):
        sys.stdout = self.stdout
        
    def get_output(self):
        return self.stdout.getvalue()
        
    def restore(self):
        sys.stdout = sys.__stdout__

_capture = FastCapture()
          `);
          
          // Store globally to reuse across components
          window.pyodide = pyodideInstance;
          setPyodide(pyodideInstance);
          setPyodideLoading(false);
          console.log('Pyodide loaded successfully!');
        } catch (error) {
          console.error('Error loading Pyodide:', error);
          setPyodideLoading(false);
          alert('Python interpreter failed to load. Code examples will not work. Please refresh the page to try again.');
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load Pyodide script');
        setPyodideLoading(false);
        alert('Failed to load Python interpreter. Please check your internet connection and refresh.');
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error initializing Pyodide:', error);
      setPyodideLoading(false);
    }
  };

  // Reinitialize editors when content changes
  useEffect(() => {
    if (window.CodeMirror && !pyodideLoading) {
      const timer = setTimeout(() => {
        initCodeEditors();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pyodideLoading]); // Changed dependency to prevent multiple initializations

  // Update quiz editor when current question changes
  useEffect(() => {
    if (quizState.questions.length > 0 && window.CodeMirror && quizCodeEditorRef.current) {
      const currentQuestion = quizState.questions[quizState.currentQuizIndex];
      if (currentQuestion) {
        // Clear and set new value to prevent duplication
        quizCodeEditorRef.current.setValue('');
        quizCodeEditorRef.current.setValue(currentQuestion.starter_code || '');
      }
    }
  }, [quizState.currentQuizIndex, quizState.questions]);

  // Cleanup CodeMirror instances on unmount
  useEffect(() => {
    return () => {
      if (quizCodeEditorRef.current) {
        quizCodeEditorRef.current.toTextArea();
        quizCodeEditorRef.current = null;
      }
      
      codeEditorsRef.current.forEach(editor => {
        if (editor && editor.toTextArea) {
          try {
            editor.toTextArea();
          } catch (e) {
            console.warn('Error cleaning up CodeMirror editor:', e);
          }
        }
      });
      codeEditorsRef.current = [];
    };
  }, []);

  // Load CodeMirror library
  const loadCodeMirror = () => {
    if (!window.CodeMirror) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js';
      script.onload = () => {
        const pythonScript = document.createElement('script');
        pythonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js';
        pythonScript.onload = () => {
          setTimeout(() => initCodeEditors(), 100);
        };
        document.head.appendChild(pythonScript);
      };
      document.head.appendChild(script);

      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css';
      document.head.appendChild(cssLink);

      const themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/theme/dracula.css';
      document.head.appendChild(themeLink);
    } else {
      setTimeout(() => initCodeEditors(), 100);
    }
  };

  // Initialize CodeMirror editors
  const initCodeEditors = () => {
    if (!window.CodeMirror) return;

    setTimeout(() => {
      const textareas = document.querySelectorAll("textarea.codeInput");
      textareas.forEach((textarea, index) => {
        // Check if this textarea already has a CodeMirror instance
        if (textarea.style.display === 'none' || textarea.nextSibling?.classList?.contains('CodeMirror')) {
          return; // Skip if already initialized
        }

        // Store original value to prevent duplication
        const originalValue = textarea.value;
        
        const editor = window.CodeMirror.fromTextArea(textarea, {
          mode: "python",
          theme: "dracula",
          lineNumbers: true,
          indentUnit: 4,
          matchBrackets: true,
          viewportMargin: Infinity,
        });

        // Set the original value to prevent duplication
        editor.setValue(originalValue);

        editor.setSize("100%", "auto");
        editor.on("change", function(cm) {
          let lines = cm.lineCount();
          let newHeight = Math.min(30 + lines * 20, 200);
          cm.setSize("100%", newHeight + "px");
        });

        codeEditorsRef.current[index] = editor;
      });
    }, 200);
  };

  // Initialize quiz code editor
  const initQuizCodeEditor = () => {
    if (!window.CodeMirror) return;
    
    setTimeout(() => {
      const quizTextarea = document.getElementById('quiz-code-editor');
      if (quizTextarea && quizTextarea.style.display !== 'none') {
        // Clean up existing editor if it exists
        if (quizCodeEditorRef.current) {
          try {
            quizCodeEditorRef.current.toTextArea();
          } catch (e) {
            console.warn('Error cleaning up existing quiz editor:', e);
          }
          quizCodeEditorRef.current = null;
        }
        
        // Store original value
        const originalValue = quizTextarea.value;
        
        try {
          quizCodeEditorRef.current = window.CodeMirror.fromTextArea(quizTextarea, {
            mode: "python",
            theme: "dracula",
            lineNumbers: false,
            indentUnit: 4,
            matchBrackets: true,
            viewportMargin: Infinity,
            lineWrapping: true
          });
          
          // Set the original value
          quizCodeEditorRef.current.setValue(originalValue);
          quizCodeEditorRef.current.setSize("100%", "250px");
        } catch (e) {
          console.error('Error creating quiz editor:', e);
        }
      }
    }, 100);
  };

  // Optimized Python code execution
  const executePythonCode = async (code, testCases = null) => {
    if (!pyodide) {
      return { 
        error: 'Python interpreter not loaded yet. Please wait for initialization to complete...',
        loading: true 
      };
    }

    try {
      // Reset and capture output
      pyodide.runPython('_capture.reset()');
      pyodide.runPython('_capture.capture()');
      
      let result = { output: '', error: null };
      
      try {
        // Execute the user code
        const output = pyodide.runPython(code);
        const capturedOutput = pyodide.runPython('_capture.get_output()');
        pyodide.runPython('_capture.restore()');
        
        // Process output
        let finalOutput = '';
        if (capturedOutput && capturedOutput.trim()) {
          finalOutput = capturedOutput.trim();
        } else if (output !== undefined && output !== null) {
          finalOutput = String(output);
        }
        
        result.output = finalOutput;
        result.raw_output = finalOutput;
        
        // Handle test cases if provided
        if (testCases && testCases.length > 0) {
          result.results = [];
          
          for (let i = 0; i < Math.min(testCases.length, 5); i++) { // Limit to 5 test cases for performance
            const testCase = testCases[i];
            try {
              pyodide.runPython('_capture.reset()');
              pyodide.runPython('_capture.capture()');
              
              const testOutput = pyodide.runPython(code);
              const testCapturedOutput = pyodide.runPython('_capture.get_output()');
              pyodide.runPython('_capture.restore()');
              
              let actualOutput = '';
              if (testCapturedOutput && testCapturedOutput.trim()) {
                actualOutput = testCapturedOutput.trim();
              } else if (testOutput !== undefined && testOutput !== null) {
                actualOutput = String(testOutput);
              }
              
              result.results.push({
                input: testCase.input || {},
                expected: testCase.expected,
                output: actualOutput,
                passed: String(actualOutput).trim() === String(testCase.expected).trim()
              });
              
            } catch (testError) {
              result.results.push({
                input: testCase.input || {},
                expected: testCase.expected,
                output: `Error: ${testError.message}`,
                passed: false
              });
            }
          }
        }
        
      } catch (executeError) {
        pyodide.runPython('_capture.restore()');
        result.error = executeError.message;
      }
      
      return result;
      
    } catch (error) {
      return { error: error.message };
    }
  };

  // Run regular code examples with better UX
  const runCode = async (buttonElement) => {
    try {
      const container = buttonElement.closest('.code-body') || buttonElement.parentElement;
      if (!container) return;

      const codeMirrorElement = container.querySelector('.CodeMirror');
      if (!codeMirrorElement || !codeMirrorElement.CodeMirror) return;

      const cmInstance = codeMirrorElement.CodeMirror;
      const code = cmInstance.getValue();
      
      let outputDiv = buttonElement.nextElementSibling;
      if (!outputDiv || !outputDiv.classList.contains('output')) {
        outputDiv = container.querySelector('.output');
      }
      
      if (!outputDiv) return;

      // Show loading state
      outputDiv.style.display = "block";
      buttonElement.disabled = true;
      buttonElement.textContent = 'Running...';

      if (pyodideLoading) {
        outputDiv.innerHTML = '<span style="color: #666;">⏳ Waiting for Python interpreter to load... This may take a moment on first visit.</span>';
        buttonElement.disabled = false;
        buttonElement.textContent = 'Run Code';
        return;
      }

      if (!pyodide) {
        outputDiv.innerHTML = '<span style="color: #dc3545;">❌ Python interpreter failed to load. Please refresh the page to try again.</span>';
        buttonElement.disabled = false;
        buttonElement.textContent = 'Run Code';
        return;
      }

      const result = await executePythonCode(code);
      
      if (result.loading) {
        outputDiv.innerHTML = '<span style="color: #666;">⏳ Python interpreter is still loading...</span>';
      } else if (result.error) {
        outputDiv.innerHTML = `<span style="color: #dc3545;">❌ Error: ${result.error}</span>`;
      } else {
        outputDiv.innerHTML = `<span style="color: #28a745;">✅ Output:</span><br/>${result.output || '<em>Code executed successfully (no output)</em>'}`;
      }
      
      buttonElement.disabled = false;
      buttonElement.textContent = 'Run Code';
    } catch (error) {
      console.error('Error running code:', error);
      buttonElement.disabled = false;
      buttonElement.textContent = 'Run Code';
    }
  };

  // Quiz functions
  const runQuizCode = async () => {
    if (!quizCodeEditorRef.current || quizState.questions.length === 0) return;
    
    if (pyodideLoading) {
      setQuizState(prev => ({ ...prev, showOutput: true, output: 'Python interpreter is still loading. Please wait...' }));
      return;
    }

    const currentQuestion = quizState.questions[quizState.currentQuizIndex];
    if (!currentQuestion) return;

    const code = quizCodeEditorRef.current.getValue();
    
    setQuizState(prev => ({ ...prev, showOutput: true, output: 'Running your code...' }));
    
    try {
      const result = await executePythonCode(code, currentQuestion.test_cases || []);
      
      if (result.error) {
        setQuizState(prev => ({
          ...prev,
          output: `Error: ${result.error}`,
          allTestsPassed: false
        }));
      } else {
        let output = '';
        let allTestsPassed = true;
        
        if (result.raw_output) {
          const rawOutput = result.raw_output.trim();
          if (rawOutput !== "None" && rawOutput !== "") {
            output = rawOutput + '\n';
          }
        }
        
        if (result.results && result.results.length > 0) {
          if (output) output += '\n';
          output += '--- Test Results ---\n';
          
          result.results.forEach((res, i) => {
            const testCase = currentQuestion.test_cases[i];
            const expectedOutput = String(testCase.expected).trim();
            const actualOutput = String(res.output).trim();
            const passed = expectedOutput === actualOutput;
            
            if (!passed) allTestsPassed = false;
            
            output += `Test ${i + 1}: ${passed ? 'PASSED' : 'FAILED'}\n`;
            if (!passed) {
              output += `  Expected: ${expectedOutput}\n`;
              output += `  Got: ${actualOutput}\n`;
            }
          });
        }
        
        if (!output.trim()) {
          output = "Code executed successfully.";
        }
        
        setQuizState(prev => ({
          ...prev,
          output,
          allTestsPassed
        }));
      }
    } catch (error) {
      setQuizState(prev => ({
        ...prev,
        output: `Error running code: ${error.message}`,
        allTestsPassed: false
      }));
    }
  };

  const submitQuizAnswer = async () => {
    if (!quizCodeEditorRef.current || quizState.questions.length === 0) return;

    const currentQuestion = quizState.questions[quizState.currentQuizIndex];
    if (!currentQuestion) return;

    const userCode = quizCodeEditorRef.current.getValue();
    
    try {
      const testResult = await executePythonCode(userCode, currentQuestion.test_cases || []);
      
      let isCorrect = false;
      if (testResult.results && testResult.results.length > 0) {
        isCorrect = testResult.results.every((res, i) => {
          const testCase = currentQuestion.test_cases[i];
          return String(res.output).trim() === String(testCase.expected).trim();
        });
      } else if (!testResult.error && testResult.raw_output) {
        isCorrect = true;
      }

      // For demo purposes, just show local feedback
      // You can add your backend submission logic here if needed
      if (isCorrect) {
        setQuizState(prev => ({
          ...prev,
          answeredQuestionIds: [...prev.answeredQuestionIds, currentQuestion.id],
          showResult: true,
          resultType: 'success',
          resultMessage: 'Correct! Great job! Your solution is working perfectly.'
        }));
      } else {
        setQuizState(prev => ({
          ...prev,
          showResult: true,
          resultType: 'warning',
          resultMessage: 'Keep Trying! Your solution is not quite right yet.'
        }));
      }
    } catch (error) {
      setQuizState(prev => ({
        ...prev,
        showResult: true,
        resultType: 'danger',
        resultMessage: `Execution Error: ${error.message}`
      }));
    }
  };

  const goToNextQuestion = () => {
    if (quizState.currentQuizIndex < quizState.questions.length - 1) {
      const nextIndex = quizState.currentQuizIndex + 1;
      
      setQuizState(prev => ({
        ...prev,
        currentQuizIndex: nextIndex,
        showOutput: false,
        showHint: false,
        showResult: false,
        output: '',
        allTestsPassed: false
      }));
    }
  };

  const toggleQuizHint = () => {
    setQuizState(prev => ({ ...prev, showHint: !prev.showHint }));
  };

  // Mock quiz data for demo
  const mockQuestions = [
    {
      id: 1,
      title: "Age Checker",
      description: "Write a program that checks if a person can vote. If age is 18 or older, print 'Can vote', otherwise print 'Cannot vote'.",
      starter_code: "age = 20\n# Write your code here\n",
      hint: "Use an if-else statement to compare age with 18",
      test_cases: [
        { input: { age: 20 }, expected: "Can vote" },
        { input: { age: 16 }, expected: "Cannot vote" },
        { input: { age: 18 }, expected: "Can vote" }
      ]
    },
    {
      id: 2,
      title: "Grade Calculator",
      description: "Write a program that converts a numeric score to a letter grade: A (90+), B (80-89), C (70-79), D (60-69), F (below 60).",
      starter_code: "score = 85\n# Write your code here\n",
      hint: "Use if-elif-else statements to check score ranges",
      test_cases: [
        { input: { score: 95 }, expected: "A" },
        { input: { score: 85 }, expected: "B" },
        { input: { score: 75 }, expected: "C" },
        { input: { score: 65 }, expected: "D" },
        { input: { score: 55 }, expected: "F" }
      ]
    }
  ];

  useEffect(() => {
    // Set mock quiz data
    setQuizState(prev => ({
      ...prev,
      questions: mockQuestions,
      isLoading: false
    }));
    
    // Initialize quiz editor after state is set
    setTimeout(() => initQuizCodeEditor(), 500);
  }, []);

  const currentQuestion = quizState.questions[quizState.currentQuizIndex];

  return (
    <div className="python-conditionals-container">
      <style jsx>{`
        .python-conditionals-container {
          font-family: 'Open Sans', sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .page-title {
          background: linear-gradient(135deg, #28a745 0%, 100%);
          color: white;
          padding: 60px 0;
          text-align: center;
        }

        .page-title h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }

        .page-title p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .breadcrumbs {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px 0;
          margin-top: 20px;
        }

        .breadcrumbs ol {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
        }

        .breadcrumbs li {
          margin: 0 5px;
        }

        .breadcrumbs li::after {
          content: '>';
          margin-left: 10px;
          opacity: 0.7;
        }

        .breadcrumbs li:last-child::after {
          display: none;
        }

        .breadcrumbs a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        .breadcrumbs a:hover {
          opacity: 1;
        }

        .breadcrumbs .current {
          color: white;
          font-weight: 500;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .loading-indicator {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          text-align: center;
          color: #856404;
        }

        .container h1 {
          text-align: center;
          font-family: "arial", sans-serif;
        }

        .container h2 {
          font-family: 'Comic Sans MS', cursive;
          font-size: 20px;
          color: #3498db;
          margin-bottom: 1rem;
        }

        .text-success { color: #28a745 !important; }
        .text-danger { color: #dc3545 !important; }

        .bi-1-circle, .bi-2-circle, .bi-3-circle, .bi-4-circle { 
          margin-right: 8px;
          font-size: 1.2em;
          color: #3498db;
        }

        .section {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .explanation {
          background: #ffffff;
          margin: 1.5rem 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 15px;
          border-radius: 8px;
        }

        .flowchart-example {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
        }
        
        code {
          background-color: #f8f9fa;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9em;
        }

        pre {
          background-color: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #3498db;
          overflow-x: auto;
        }

        .operators-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-radius: 8px;
          overflow: hidden;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.95rem;
        }

        .operators-table th,
        .operators-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .operators-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #2c3e50;
        }

        .operators-table tr:hover {
          background-color: #f1f1f1;
        }

        .operators-table td code {
          background-color: #eaf2f8;
          padding: 2px 6px;
          border-radius: 4px;
          color: #005f73;
          font-weight: 500;
          display: inline-block;
        }

        .comparison-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 20px 0;
        }

        .code-comparison {
          flex: 1;
          min-width: 300px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .code-header {
          padding: 10px 15px;
          font-weight: bold;
          display: flex;
          align-items: center;
        }

        .correct .code-header {
          background-color: #d4edda;
          color: #155724;
        }

        .incorrect .code-header {
          background-color: #f8d7da;
          color: #721c24;
        }

        .code-header i {
          margin-right: 8px;
        }

        .code-body {
          padding: 15px;
          background: white;
        }

        .output {
          margin-top: 1rem;
          padding: 1rem;
          background-color: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          white-space: pre-wrap;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.9rem;
          min-height: 50px;
          display: none;
          position: relative;
        }

        button {
          padding: 0.8rem 1.5rem;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          margin: 1rem 0;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }

        button:hover {
          background-color: #28a745;
          transform: translateY(-1px);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        button:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
          transform: none;
        }

        .exercise {
          background: #fff;
          padding: 20px;
          margin: 15px 0;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-left: 4px solid #3498db;
        }

        .exercise-title {
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .exercise-description {
          color: #666;
          margin-bottom: 15px;
          font-style: italic;
        }

        .card {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          padding: 15px 20px;
          border-bottom: 1px solid #dee2e6;
        }

        .card-body {
          padding: 20px;
        }

        .bg-success {
          background-color: #28a745 !important;
        }

        .text-white {
          color: white !important;
        }

        .alert {
          padding: 15px;
          margin-bottom: 15px;
          border: 1px solid transparent;
          border-radius: 8px;
        }

        .alert-success {
          color: #155724;
          background-color: #d4edda;
          border-color: #c3e6cb;
          border-left: 4px solid #28a745;
        }

        .alert-info {
          color: #0c5460;
          background-color: #d1ecf1;
          border-color: #b6d4db;
          border-left: 4px solid #17a2b8;
        }

        .alert-warning {
          color: #856404;
          background-color: #fff3cd;
          border-color: #ffeaa7;
          border-left: 4px solid #f39c12;
        }

        .alert-danger {
          color: #721c24;
          background-color: #f8d7da;
          border-color: #f5c6cb;
          border-left: 4px solid #dc3545;
        }

        .btn {
          display: inline-block;
          font-weight: 400;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          border: 1px solid transparent;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          line-height: 1.5;
          border-radius: 0.25rem;
          transition: all 0.15s ease-in-out;
          text-decoration: none;
        }

        .btn-primary {
          color: #fff;
          background-color: #3498db;
          border-color: #3498db;
        }

        .btn-primary:hover {
          background-color: #2980b9;
          border-color: #2980b9;
        }

        .btn-success {
          color: #fff;
          background-color: #28a745;
          border-color: #28a745;
        }

        .btn-success:hover {
          background-color: #218838;
          border-color: #218838;
        }

        .btn-outline-secondary {
          color: #6c757d;
          border-color: #6c757d;
          background-color: transparent;
        }

        .btn-outline-secondary:hover {
          background-color: #6c757d;
          color: white;
        }

        .spinner-border {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          vertical-align: text-bottom;
          border: 0.125em solid currentColor;
          border-right-color: transparent;
          border-radius: 50%;
          animation: spinner-border 0.75s linear infinite;
        }

        .spinner-border-sm {
          width: 0.875rem;
          height: 0.875rem;
          border-width: 0.125em;
        }

        @keyframes spinner-border {
          to { transform: rotate(360deg); }
        }

        .text-center {
          text-align: center;
        }

        .py-5 {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }

        .mt-3 {
          margin-top: 1rem;
        }

        .mb-0 {
          margin-bottom: 0;
        }

        .mb-2 {
          margin-bottom: 0.5rem;
        }

        .mb-3 {
          margin-bottom: 1rem;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }

        .me-2 {
          margin-right: 0.5rem;
        }

        .ms-auto {
          margin-left: auto;
        }

        .visually-hidden {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }

        .btn-toolbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        .d-flex {
          display: flex;
        }

        .justify-content-between {
          justify-content: space-between;
        }

        .align-items-center {
          align-items: center;
        }

        .badge {
          display: inline-block;
          padding: 0.35em 0.65em;
          font-size: 0.75em;
          font-weight: 700;
          line-height: 1;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.25rem;
        }

        .bg-info {
          background-color: #17a2b8 !important;
        }

        .row {
          display: flex;
          gap: 20px;
          margin: 20px 0;
        }

        .col-lg-12 {
          width: 100%;
        }

        @media (max-width: 768px) {
          .comparison-container {
            flex-direction: column;
          }
          
          .code-comparison {
            min-width: 100%;
          }

          .container {
            padding: 20px;
            margin: 10px;
          }
          
          h1 {
            font-size: 2rem;
          }

          .row {
            flex-direction: column;
          }

          .operators-table {
            font-size: 0.85rem;
          }

          .operators-table th,
          .operators-table td {
            padding: 8px 12px;
          }
        }
      `}</style>

      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Python Conditional Statements</h1>
                <p className="mb-0">Master decision-making through conditional logic and control flow</p>
                
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/programming">Programming</a></li>
              <li className="current">Python Conditionals</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Introduction Section */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-diagram-2"></i> Introduction to Conditional Statements</h2>
          
          <div className="flowchart-example">
            <p>Conditional statements allow your program to make decisions and execute different code blocks based on whether conditions are True or False.</p>
            
            <h4><i className="bi bi-lightbulb"></i> Why Use Conditionals?</h4>
            <ul>
              <li><b>Make decisions:</b> Choose different actions based on different situations</li>
              <li><b>Handle different cases:</b> Respond appropriately to various inputs</li>
              <li><b>Control flow:</b> Determine which parts of your code run</li>
            </ul>

            <div className="comparison-container">
              <div className="code-comparison incorrect">
                <div className="code-header">
                  <i className="bi bi-x-circle-fill"></i> Without Conditionals
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Linear execution with no decisions
print("Welcome!")
print("You must be at least 18 to enter")
print("Please come back when you're older")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
              
              <div className="code-comparison correct">
                <div className="code-header">
                  <i className="bi bi-check-circle-fill"></i> With Conditionals
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Dynamic response based on input
age = 20
print("Welcome!")
if age >= 18:
    print("Access granted")
else:
    print("You must be at least 18 to enter")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic If Statement */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-1-circle"></i> The If Statement</h2>
          
          <div className="flowchart-example">
            <p>The <code>if</code> statement executes code only when a condition is True.</p>
            
            <h4><i className="bi bi-file-code"></i> Syntax</h4>
            <pre><code>if condition:
    # code to execute if condition is True
# code that always runs</code></pre>

            <div className="comparison-container">
              <div className="code-comparison correct">
                <div className="code-header">
                  <i className="bi bi-check-circle-fill"></i> Basic If Examples
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Simple if statement
age = 20
if age >= 18:
    print("You are an adult")
print("Age check complete")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Temperature check
temperature = 25
if temperature > 30:
    print("It's hot today!")
if temperature < 10:
    print("It's cold today!")
print("Weather check done")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <h4><i className="bi bi-lightbulb"></i> Best Practices</h4>
            <ul>
              <li>Use clear, descriptive variable names</li>
              <li>Keep conditions simple and readable</li>
              <li>Always include the colon (:) after the condition</li>
              <li>Indent code blocks properly (4 spaces)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* If-Else Statements */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-2-circle"></i> If-Else Statements</h2>
          
          <div className="flowchart-example">
            <p>The <code>if-else</code> structure lets you choose between two paths.</p>
            
            <h4><i className="bi bi-file-code"></i> Syntax</h4>
            <pre><code>if condition:
    # code when true
else:
    # code when false</code></pre>

            <div className="comparison-container">
              <div className="code-comparison correct">
                <div className="code-header">
                  <i className="bi bi-check-circle-fill"></i> If-Else Examples
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Voting eligibility
age = 17
if age >= 18:
    print("You can vote!")
else:
    print("You cannot vote yet")
print("Check complete")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Number comparison
number = -5
if number >= 0:
    print("Positive or zero")
else:
    print("Negative number")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* If-Elif-Else Statements */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-3-circle"></i> If-Elif-Else Statements</h2>
          
          <div className="flowchart-example">
            <p>The <code>if-elif-else</code> chain handles multiple possible conditions.</p>
            
            <h4><i className="bi bi-file-code"></i> Syntax</h4>
            <pre><code>if condition1:
    # code for condition1
elif condition2:
    # code for condition2
else:
    # default case</code></pre>

            <div className="comparison-container">
              <div className="code-comparison correct">
                <div className="code-header">
                  <i className="bi bi-check-circle-fill"></i> Multiple Conditions
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Grade calculator
score = 85
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
elif score >= 60:
    print("Grade: D")
else:
    print("Grade: F")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Weather conditions
temperature = 25
if temperature > 30:
    print("Hot weather")
elif temperature > 20:
    print("Warm weather")
elif temperature > 10:
    print("Cool weather")
else:
    print("Cold weather")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Exercises */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-trophy"></i> Practice Examples</h2>
          
          <div className="flowchart-example">
            <h4><i className="bi bi-1-circle"></i> Try These Examples</h4>
            
            <div className="exercise">
              <div className="exercise-title">Number Sign Checker</div>
              <div className="exercise-description">Check if a number is positive, negative, or zero</div>
              <textarea className="codeInput" defaultValue={`number = 0  # Try different numbers

if number > 0:
    print("Positive")
elif number < 0:
    print("Negative")
else:
    print("Zero")`}></textarea>
              <button onClick={(e) => runCode(e.target)}>Run Code</button>
              <div className="output"></div>
            </div>
            
            <div className="exercise">
              <div className="exercise-title">Password Strength Checker</div>
              <div className="exercise-description">Check password strength based on length</div>
              <textarea className="codeInput" defaultValue={`password = "secret123"  # Try different passwords
length = len(password)

if length < 6:
    print("Too short")
elif length <= 8:
    print("Weak")
elif length <= 12:
    print("Medium")
else:
    print("Strong")`}></textarea>
              <button onClick={(e) => runCode(e.target)}>Run Code</button>
              <div className="output"></div>
            </div>

            <div className="exercise">
              <div className="exercise-title">Discount Calculator</div>
              <div className="exercise-description">Calculate discounts based on purchase amount</div>
              <textarea className="codeInput" defaultValue={`purchase = 150  # Try different amounts

if purchase >= 200:
    discount = 0.15
elif purchase >= 100:
    discount = 0.10
elif purchase >= 50:
    discount = 0.05
else:
    discount = 0

final_price = purchase * (1 - discount)
print(f"Discount: {discount*100}%")
print(f"Final price: $\{final_price:.2f\}")`}></textarea>
              <button onClick={(e) => runCode(e.target)}>Run Code</button>
              <div className="output"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Quiz Section */}
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h3><i className="bi bi-question-circle"></i> Practice Quiz</h3>
                  <p className="mb-0">Test your Python skills with interactive exercises</p>
                </div>
                <div className="card-body">
                  {quizState.isLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3">Loading practice questions...</p>
                    </div>
                  ) : quizState.questions.length === 0 ? (
                    <div className="alert alert-success">
                      <h4><i className="bi bi-trophy"></i> No questions available!</h4>
                      <p>Practice with the examples above to improve your skills.</p>
                    </div>
                  ) : (
                    <div>
                      <div className="quiz-header d-flex justify-content-between align-items-center mb-3">
                        <h4>{currentQuestion?.title || 'Practice Question'}</h4>
                        <span className="badge bg-info">Python</span>
                      </div>
                      
                      <div className="text-muted mb-2">
                        Question {quizState.currentQuizIndex + 1} of {quizState.questions.length}
                      </div>
                      
                      <div className="quiz-question mb-4">
                        <p>{currentQuestion?.description}</p>
                      </div>
                      
                      <textarea 
                        className="codeInput" 
                        id="quiz-code-editor"
                        key={`quiz-${quizState.currentQuizIndex}`}
                        defaultValue={currentQuestion?.starter_code || ''}
                      ></textarea>
                      
                      <div className="btn-toolbar mt-3 mb-3">
                        <button className="btn btn-primary run-quiz-btn me-2" onClick={runQuizCode}>
                          <i className="bi bi-play-fill"></i> Run Code
                        </button>
                        <button className="btn btn-outline-secondary show-quiz-hint-btn" onClick={toggleQuizHint}>
                          <i className="bi bi-lightbulb"></i> {quizState.showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        {quizState.allTestsPassed && (
                          <button className="btn btn-success ms-auto" onClick={submitQuizAnswer}>
                            <i className="bi bi-check-circle"></i> Submit Answer
                          </button>
                        )}
                      </div>
                      
                      {quizState.showHint && (
                        <div className="quiz-hint-container alert alert-info">
                          {currentQuestion?.hint || 'No hint available for this question.'}
                        </div>
                      )}
                      
                      {quizState.showOutput && (
                        <div className="quiz-output">
                          <h5>Output:</h5>
                          <pre className="bg-light p-3 rounded">{quizState.output}</pre>
                        </div>
                      )}
                      
                      {quizState.showResult && (
                        <div className={`quiz-result alert alert-${quizState.resultType}`}>
                          {quizState.resultMessage}
                          {quizState.resultType === 'success' && 
                           quizState.currentQuizIndex < quizState.questions.length - 1 && (
                            <button className="btn btn-primary ms-2" onClick={goToNextQuestion}>
                              <i className="bi bi-arrow-right"></i> Next Question
                            </button>
                          )}
                          {quizState.resultType === 'success' && 
                           quizState.currentQuizIndex === quizState.questions.length - 1 && (
                            <div className="mt-3">
                              <p><strong>🎉 Congratulations!</strong> You've completed all practice questions.</p>
                              <Link to="/programming/python-loops" className="btn btn-success me-2">
                                🚀 Continue to Loops
                              </Link>
                              <button className="btn btn-outline-primary" onClick={() => window.location.reload()}>
                                🔄 Start Over
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
       <div className="section" style={{ textAlign: 'center' }}>
          <h2>Ready to Learn More?</h2>
          <p>Now that you understand the Python Conditionals, let's explore further topics in Python Loops!</p>
          <a href="python-loops" className="btn btn-primary">
            Continue to Next Lesson
          </a>
        </div>
    </div>
  );
};

export default PythonConditionals;