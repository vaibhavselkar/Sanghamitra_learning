import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";

const PythonLoops = () => {
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
          // Fallback to a simple alert for now
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
  }, [pyodideLoading]);

  // Update quiz editor when current question changes
  useEffect(() => {
    if (quizState.questions.length > 0 && window.CodeMirror && quizCodeEditorRef.current) {
      const currentQuestion = quizState.questions[quizState.currentQuizIndex];
      if (currentQuestion) {
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
        if (textarea.style.display === 'none' || textarea.nextSibling?.classList?.contains('CodeMirror')) {
          return;
        }

        const originalValue = textarea.value;
        
        const editor = window.CodeMirror.fromTextArea(textarea, {
          mode: "python",
          theme: "dracula",
          lineNumbers: true,
          indentUnit: 4,
          matchBrackets: true,
          viewportMargin: Infinity,
        });

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
        if (quizCodeEditorRef.current) {
          try {
            quizCodeEditorRef.current.toTextArea();
          } catch (e) {
            console.warn('Error cleaning up existing quiz editor:', e);
          }
          quizCodeEditorRef.current = null;
        }
        
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
        
        // Handle test cases if provided (simplified for better performance)
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

      // For demo purposes - in real app, submit to backend
      // const submitResponse = await fetch('API_ENDPOINT', { ... });

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

  // Mock quiz data for demo - enhanced to match HTML functionality
  const mockQuestions = [
    {
      id: 1,
      title: "Basic For Loop",
      description: "Write a for loop that prints numbers from 1 to 5.",
      starter_code: "# Write your for loop here\nfor i in range(1, 6):\n    print(i)",
      hint: "Use range(1, 6) to get numbers from 1 to 5",
      test_cases: [
        { input: {}, expected: "1\n2\n3\n4\n5" }
      ]
    },
    {
      id: 2,
      title: "While Loop Counter",
      description: "Write a while loop that counts from 0 to 4.",
      starter_code: "# Write your while loop here\ncount = 0\nwhile count < 5:\n    print(count)\n    count += 1",
      hint: "Initialize a counter variable and increment it in each iteration",
      test_cases: [
        { input: {}, expected: "0\n1\n2\n3\n4" }
      ]
    },
    {
      id: 3,
      title: "String Iteration",
      description: "Write a for loop that prints each character in the word 'Python'.",
      starter_code: "# Write your for loop here\n",
      hint: "Use 'for char in string:' syntax to iterate through characters",
      test_cases: [
        { input: {}, expected: "P\ny\nt\nh\no\nn" }
      ]
    }
  ];

  useEffect(() => {
    setQuizState(prev => ({
      ...prev,
      questions: mockQuestions,
      isLoading: false
    }));
    
    setTimeout(() => initQuizCodeEditor(), 500);
  }, []);

  const currentQuestion = quizState.questions[quizState.currentQuizIndex];

  return (
    <div className="python-loops-container">
      <style jsx>{`
        .python-loops-container {
          font-family: 'Open Sans', sans-serif;
          line-height: 1.6;
          color: #333;
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

        .exercise-container {
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
          margin-bottom: 10px;
          font-size: 1.1rem;
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

        .col-md-6 {
          flex: 1;
          min-width: 300px;
        }

        @media (max-width: 768px) {
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

          .col-md-6 {
            min-width: 100%;
          }
        }
      `}</style>

      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Python Loops with Computational Thinking</h1>
                <p className="mb-0">Master problem-solving through process decomposition, conditional logic, and algorithmic thinking</p>
               
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/programming">Programming</a></li>
              <li className="current">Python Loops</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Repetition Introduction */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-arrow-repeat"></i> Introduction to Repetition</h2>
          
          <div className="flowchart-example">
            <h4><i className="bi bi-lightbulb"></i> Computational Thinking Principle</h4>
            <p>Loops automate repetitive tasks using decomposition, pattern recognition, and abstraction</p>
            
            <h4><i className="bi bi-check-circle"></i> Loop Advantages</h4>
            <ul>
              <li>Automate repetitive tasks</li>
              <li>Enhance efficiency and scalability</li>
            </ul>
        
            <h4><i className="bi bi-globe"></i> Real-Life Examples</h4>
            <ul>
              <li>Daily attendance marking</li>
              <li>Mass production of bricks</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Loop Procedure */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-diagram-3"></i> Loop Implementation Process</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-shuffle"></i> Flowchart Representation</h4>
                <ol>
                  <li>Start → Initialize condition</li>
                  <li>Check condition → Continue or Exit</li>
                  <li>Execute task → Update condition</li>
                  <li>Repeat from step 2</li>
                </ol>
            
                <h4><i className="bi bi-file-code"></i> Pseudocode Example</h4>
                <pre><code>Set count to 1
While count ≤ 5:
    Print "Hello World!"
    count += 1</code></pre>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="text-center mt-4">
                <div style={{
                  width: '70%',
                  height: '300px',
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '2px dashed #2196f3'
                }}>
                  <div style={{ textAlign: 'center', color: '#1976d2' }}>
                    <i className="bi bi-diagram-3" style={{ fontSize: '3rem', marginBottom: '10px' }}></i>
                    <p>Visual representation of loop process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                  
          <div className="exercise-container">
            <div className="exercise-title">Exercise 1: Basic While Loop</div>
            <p>Try this while loop example that prints "Hello World!" 5 times:</p>
            <div className="explanation">
              <div className="code-body">
                <textarea className="codeInput" defaultValue={`count = 1
while count <= 5:
    print("Hello World!")
    count += 1`}></textarea>
                <button onClick={(e) => runCode(e.target)}>Run Code</button>
                <div className="output"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loop Types */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-infinity"></i> Loop Types</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-arrow-clockwise"></i> While Loop</h4>
                
                <div className="exercise-container">
                  <div className="exercise-title">Exercise 2: While Loop with Condition</div>
                  <p>This while loop counts from 0 to 4:</p>
                  <div className="explanation">
                    <div className="code-body">
                      <textarea className="codeInput" defaultValue={`count = 0
while count < 5:
    print("Count:", count)
    count += 1`}></textarea>
                      <button onClick={(e) => runCode(e.target)}>Run Code</button>
                      <div className="output"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-collection"></i> For Loop</h4>
                
                <div className="exercise-container">
                  <div className="exercise-title">Exercise 3: Basic For Loop</div>
                  <p>This for loop iterates through a range:</p>
                  <div className="explanation">
                    <div className="code-body">
                      <textarea className="codeInput" defaultValue={`for i in range(5):
    print("Iteration:", i)`}></textarea>
                      <button onClick={(e) => runCode(e.target)}>Run Code</button>
                      <div className="output"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-pencil"></i> Best Practices</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-check-lg text-success"></i> Good Naming</h4>
                <pre><code>{`attempts = 0
while attempts < 3:
    print("Processing...")
    attempts += 1`}</code></pre>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-x-lg text-danger"></i> Bad Naming</h4>
                <pre><code>{`x = 0
while x < 3:
    print("Looping")
    x += 1`}</code></pre>
              </div>
            </div>
          </div>

          <div className="flowchart-example mt-3">
            <h4><i className="bi bi-exclamation-triangle"></i> Common Errors</h4>
            <ul>
              <li>Infinite loops from missing updates</li>
              <li>Off-by-one errors in range()</li>
              <li>Modifying lists during iteration</li>
            </ul>
          </div>
          
          <div className="flowchart-example mt-3">
            <div className="exercise-container">
              <div className="exercise-title">Exercise 4: Avoiding Infinite Loops</div>
              <p>Fix this infinite loop by adding proper condition updates:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Fix this infinite loop
counter = 0
while counter < 10:
    print("Counter value:", counter)
    # Add the missing line here to increment counter`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loop Examples */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-trophy"></i> Loop Examples</h2>
      
          <div className="flowchart-example">
            <h4><i className="bi bi-1-circle"></i> For Loop Examples</h4>
            
            <div className="exercise-container">
              <div className="exercise-title">Print numbers from 1 to 5</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Print numbers from 1 to 5
for i in range(1, 6):
    print(i)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Print each character of a string</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Print each character in "Hello"
for char in "Hello":
    print(char)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
      
            <h4><i className="bi bi-2-circle"></i> While Loop Examples</h4>
            
            <div className="exercise-container">
              <div className="exercise-title">Print numbers from 1 to 5 using while</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Print numbers from 1 to 5
i = 1
while i <= 5:
    print(i)
    i += 1`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Simple countdown example</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Countdown from 5 to 1
countdown = 5
while countdown > 0:
    print("Countdown:", countdown)
    countdown -= 1
print("Blast off!")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Input loop example (Note: input() won't work in browser)</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Simulated input loop - normally would use input()
# This example shows the concept without actual user input
responses = ["hello", "world", "exit"]
for user_input in responses:
    print(f"Simulated input: {user_input}")
    if user_input.lower() == "exit":
        print("Exiting loop...")
        break
    print("You typed:", user_input)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          
      {/* Practice Quiz Section */}
      <div className="container">
        <div className="section">
          <div className="row d-flex justify-content-center">
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
                        <span className="badge bg-info">Python Loops</span>
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
                              <p><strong>Congratulations!</strong> You've completed all practice questions.</p>
                              <button className="btn btn-success" onClick={() => window.location.reload()}>
                                <i className="bi bi-arrow-repeat"></i> Start Over
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
      <div className="container">
        <div className="section text-center">
       
           <div className="section" style={{ textAlign: 'center' }}>
          <h2>Ready to Learn More?</h2>
          <p>Now that you understand the basics of Python, let's explore further topics in Python Conditionals!</p>
          <a href="python-functions" className="btn btn-primary">
            Continue to Next Lesson
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PythonLoops;