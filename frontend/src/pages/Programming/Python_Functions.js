import React, { useState, useEffect, useRef, useCallback } from 'react';

const PythonFunctions = () => {
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

  // Refs for performance optimization
  const pyodideRef = useRef(null);
  const [pyodideLoading, setPyodideLoading] = useState(true);
  const codeEditorsRef = useRef([]);
  const quizCodeEditorRef = useRef(null);
  const executionQueue = useRef([]);
  const isExecuting = useRef(false);

  // Initialize component
  useEffect(() => {
    initializePyodide();
    loadCodeMirror();
    fetchSessionInfo();
  }, []);

  // Initialize Pyodide with better performance
  const initializePyodide = async () => {
    if (pyodideRef.current) {
      setPyodideLoading(false);
      return;
    }

    try {
      if (window.pyodide) {
        pyodideRef.current = window.pyodide;
        setPyodideLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      script.onload = async () => {
        try {
          const pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
            fullStdLib: false,
          });
          
          pyodideInstance.runPython(`
import sys
from io import StringIO

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
          
          pyodideRef.current = pyodideInstance;
          window.pyodide = pyodideInstance;
          setPyodideLoading(false);
        } catch (error) {
          console.error('Error loading Pyodide:', error);
          setPyodideLoading(false);
        }
      };
      
      script.onerror = () => {
        console.error('Failed to load Pyodide script');
        setPyodideLoading(false);
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error initializing Pyodide:', error);
      setPyodideLoading(false);
    }
  };

  // Optimized CodeMirror initialization
  const initQuizCodeEditor = useCallback(() => {
    if (!window.CodeMirror || quizCodeEditorRef.current) return;

    const quizTextarea = document.getElementById('quiz-code-editor');
    if (!quizTextarea) return;

    quizCodeEditorRef.current = window.CodeMirror.fromTextArea(quizTextarea, {
      mode: "python",
      theme: "dracula",
      lineNumbers: true,
      indentUnit: 4,
      lineWrapping: true
    });

    const currentQuestion = quizState.questions[quizState.currentQuizIndex];
    if (currentQuestion) {
      quizCodeEditorRef.current.setValue(currentQuestion.starter_code || '');
    }
  }, [quizState.questions, quizState.currentQuizIndex]);

  // Load CodeMirror library
  const loadCodeMirror = () => {
    if (!window.CodeMirror) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js';
      script.onload = () => {
        const pythonScript = document.createElement('script');
        pythonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js';
        pythonScript.onload = () => {
          setTimeout(() => {
            initCodeEditors();
            initQuizCodeEditor();
          }, 100);
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
      setTimeout(() => {
        initCodeEditors();
        initQuizCodeEditor();
      }, 100);
    }
  };

  // Initialize regular code editors
  const initCodeEditors = () => {
    if (!window.CodeMirror) return;

    const textareas = document.querySelectorAll("textarea.codeInput");
    textareas.forEach((textarea, index) => {
      if (textarea.style.display === 'none' || textarea.nextSibling?.classList?.contains('CodeMirror')) {
        return;
      }

      const editor = window.CodeMirror.fromTextArea(textarea, {
        mode: "python",
        theme: "dracula",
        lineNumbers: true,
        indentUnit: 4,
        matchBrackets: true,
        viewportMargin: Infinity,
      });

      editor.setValue(textarea.value);
      editor.setSize("100%", "auto");
      editor.on("change", function(cm) {
        let lines = cm.lineCount();
        let newHeight = Math.min(30 + lines * 20, 200);
        cm.setSize("100%", newHeight + "px");
      });

      codeEditorsRef.current[index] = editor;
    });
  };

  // Optimized question navigation
  const goToNextQuestion = useCallback(() => {
    if (quizState.currentQuizIndex >= quizState.questions.length - 1) return;

    setQuizState(prev => ({
      ...prev,
      currentQuizIndex: prev.currentQuizIndex + 1,
      showOutput: false,
      showHint: false,
      showResult: false,
      output: '',
      allTestsPassed: false
    }));

    if (quizCodeEditorRef.current) {
      const nextQuestion = quizState.questions[quizState.currentQuizIndex + 1];
      quizCodeEditorRef.current.setValue(nextQuestion.starter_code || '');
    }
  }, [quizState.questions, quizState.currentQuizIndex]);

  // Previous question navigation
  const goToPrevQuestion = useCallback(() => {
    if (quizState.currentQuizIndex <= 0) return;

    setQuizState(prev => ({
      ...prev,
      currentQuizIndex: prev.currentQuizIndex - 1,
      showOutput: false,
      showHint: false,
      showResult: false,
      output: '',
      allTestsPassed: false
    }));

    if (quizCodeEditorRef.current) {
      const prevQuestion = quizState.questions[quizState.currentQuizIndex - 1];
      quizCodeEditorRef.current.setValue(prevQuestion.starter_code || '');
    }
  }, [quizState.questions, quizState.currentQuizIndex]);

  // Queue-based code execution
  const runQuizCode = async () => {
    if (!quizCodeEditorRef.current || isExecuting.current) {
      return;
    }

    isExecuting.current = true;
    setQuizState(prev => ({ ...prev, showOutput: true, output: 'Running your code...' }));
    
    try {
      const currentQuestion = quizState.questions[quizState.currentQuizIndex];
      const code = quizCodeEditorRef.current.getValue();
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
    } finally {
      isExecuting.current = false;
      if (executionQueue.current.length > 0) {
        const next = executionQueue.current.shift();
        next();
      }
    }
  };

  // Execute Python code with fallback to server
  const executePythonCode = async (code, testCases = null) => {
    if (!pyodideRef.current) {
      try {
        const endpoint = testCases ? `${process.env.REACT_APP_API_URL}/test` : `${process.env.REACT_APP_API_URL}/run-python`;
        const payload = testCases ? { code, test_cases: testCases } : { code };
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        
        return await response.json();
      } catch (serverError) {
        console.error('Server execution failed:', serverError);
        return { 
          error: 'Python interpreter not loaded and server execution failed. Please wait for initialization to complete...',
          loading: true 
        };
      }
    }

    try {
      pyodideRef.current.runPython('_capture.reset()');
      pyodideRef.current.runPython('_capture.capture()');
      
      let result = { output: '', error: null };
      
      try {
        const output = pyodideRef.current.runPython(code);
        const capturedOutput = pyodideRef.current.runPython('_capture.get_output()');
        pyodideRef.current.runPython('_capture.restore()');
        
        let finalOutput = '';
        if (capturedOutput && capturedOutput.trim()) {
          finalOutput = capturedOutput.trim();
        } else if (output !== undefined && output !== null) {
          finalOutput = String(output);
        }
        
        result.output = finalOutput;
        result.raw_output = finalOutput;
        
        if (testCases && testCases.length > 0) {
          result.results = [];
          
          for (let i = 0; i < Math.min(testCases.length, 5); i++) {
            const testCase = testCases[i];
            try {
              pyodideRef.current.runPython('_capture.reset()');
              pyodideRef.current.runPython('_capture.capture()');
              
              const testOutput = pyodideRef.current.runPython(code);
              const testCapturedOutput = pyodideRef.current.runPython('_capture.get_output()');
              pyodideRef.current.runPython('_capture.restore()');
              
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
        pyodideRef.current.runPython('_capture.restore()');
        result.error = executeError.message;
      }
      
      return result;
      
    } catch (error) {
      return { error: error.message };
    }
  };

  // Run regular code examples
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

      outputDiv.style.display = "block";
      buttonElement.disabled = true;
      buttonElement.textContent = 'Running...';

      if (pyodideLoading) {
        outputDiv.innerHTML = '<span style="color: #666;">⏳ Waiting for Python interpreter to load... This may take a moment on first visit.</span>';
        buttonElement.disabled = false;
        buttonElement.textContent = 'Run Code';
        return;
      }

      if (!pyodideRef.current) {
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

  // Submit quiz answer
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

      try {
        const submitResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/finger-exercise/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username: userInfo.username,
            email: userInfo.email,
            topic: 'python_functions',
            questionId: currentQuestion.id,
            userAnswer: userCode,
            isCorrect
          })
        });
        
        if (!submitResponse.ok) {
          throw new Error(`Server responded with status: ${submitResponse.status}`);
        }
        
        const responseData = await submitResponse.json();
        console.log('Answer submitted successfully to server:', responseData);
        
        if (isCorrect) {
          setQuizState(prev => ({
            ...prev,
            answeredQuestionIds: [...prev.answeredQuestionIds, currentQuestion.id],
            showResult: true,
            resultType: 'success',
            resultMessage: `✅ Correct! Great job! Your solution has been saved to the server. (Question ID: ${currentQuestion.id})`
          }));
        } else {
          setQuizState(prev => ({
            ...prev,
            showResult: true,
            resultType: 'warning',
            resultMessage: `📝 Keep Trying! Your attempt has been recorded on the server, but it's not quite right yet. (Question ID: ${currentQuestion.id})`
          }));
        }
        
      } catch (submitError) {
        console.error('Error submitting to server:', submitError);
        
        if (isCorrect) {
          setQuizState(prev => ({
            ...prev,
            answeredQuestionIds: [...prev.answeredQuestionIds, currentQuestion.id],
            showResult: true,
            resultType: 'success',
            resultMessage: 'Correct! Great job! (Note: Server submission failed, but your answer is correct)'
          }));
        } else {
          setQuizState(prev => ({
            ...prev,
            showResult: true,
            resultType: 'warning',
            resultMessage: 'Keep Trying! Your solution is not quite right yet. (Note: Server submission failed)'
          }));
        }
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

  const toggleQuizHint = () => {
    setQuizState(prev => ({ ...prev, showHint: !prev.showHint }));
  };

  // Reset all questions
  const resetAllQuestions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/finger-exercise/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: userInfo.email,
          topic: 'python_functions'
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to reset questions: ${response.status}`);
      }
      
      setQuizState(prev => ({
        ...prev,
        answeredQuestionIds: [],
        currentQuizIndex: 0,
        showOutput: false,
        showHint: false,
        showResult: false,
        output: '',
        allTestsPassed: false
      }));
      
      await fetchUserAnsweredQuestions(userInfo.email);
      
    } catch (error) {
      console.error('Error resetting questions:', error);
      alert(`Failed to reset questions: ${error.message}`);
    }
  };

  // Fetch session information
  const fetchSessionInfo = async () => {
    try {
      const sessionResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/session-info`, { 
        credentials: 'include' 
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        setUserInfo({
          email: sessionData.email,
          username: sessionData.username
        });
        
        await fetchUserAnsweredQuestions(sessionData.email);
      } else {
        setUserInfo({
          email: 'demo@example.com',
          username: 'demo_user'
        });
        await fetchUserAnsweredQuestions('demo@example.com');
      }
    } catch (error) {
      console.error('Error fetching session info:', error);
      setUserInfo({
        email: 'demo@example.com',
        username: 'demo_user'
      });
      await fetchUserAnsweredQuestions('demo@example.com');
    }
  };

  // Fetch user's answered questions
  const fetchUserAnsweredQuestions = async (email) => {
    try {
      if (!email) {
        await initPracticeQuiz([]);
        return;
      }
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/finger-exercise?email=${email}&topic=python_functions`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        await initPracticeQuiz([]);
        return;
      }
      
      const answeredData = await response.json();
      
      const answeredIds = (answeredData.submissions || [])
        .map(sub => String(sub.questionId));
      
      setQuizState(prev => ({ ...prev, answeredQuestionIds: answeredIds }));
      await initPracticeQuiz(answeredIds);
      
    } catch (error) {
      console.error('Error fetching user answered questions:', error);
      await initPracticeQuiz([]);
    }
  };

  // Initialize practice quiz
  const initPracticeQuiz = async (answeredIds) => {
    try {
      setQuizState(prev => ({ ...prev, isLoading: true }));
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/finger-questions?topic=python_functions`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch questions: ${response.status}`);
      }
      
      const allQuestions = await response.json();
      
      const answeredSet = new Set(answeredIds);
      const unansweredQuestions = allQuestions.filter(q => 
        !answeredSet.has(String(q.id))
      );
      
      setQuizState(prev => ({
        ...prev,
        questions: unansweredQuestions,
        isLoading: false
      }));
      
      if (unansweredQuestions.length > 0) {
        setTimeout(() => initQuizCodeEditor(), 500);
      }
    } catch (error) {
      console.error('Error initializing practice quiz:', error);
      
      const mockQuestions = [
        {
          id: 1,
          title: "Simple Function",
          description: "Write a function called 'greet' that takes a name parameter and prints 'Hello, [name]!'",
          starter_code: "def greet(name):\n    # Write your code here\n    pass\n\n# Test your function\ngreet('Alice')",
          hint: "Use print() inside the function and concatenate strings with +",
          test_cases: [
            { input: { name: "Alice" }, expected: "Hello, Alice!" }
          ]
        },
        {
          id: 2,
          title: "Function with Return",
          description: "Write a function called 'add_numbers' that takes two parameters and returns their sum.",
          starter_code: "def add_numbers(a, b):\n    # Write your code here\n    pass\n\n# Test your function\nresult = add_numbers(5, 3)\nprint(result)",
          hint: "Use the 'return' keyword to return the sum of a and b",
          test_cases: [
            { input: { a: 5, b: 3 }, expected: "8" }
          ]
        },
        {
          id: 3,
          title: "Default Parameters",
          description: "Write a function called 'power' that calculates base^exponent. The exponent should default to 2.",
          starter_code: "def power(base, exponent=2):\n    # Write your code here\n    pass\n\n# Test your function\nprint(power(3))\nprint(power(3, 4))",
          hint: "Use ** for exponentiation and set exponent=2 as the default parameter",
          test_cases: [
            { input: {}, expected: "9\n81" }
          ]
        },
        {
          id: 4,
          title: "Advanced Function",
          description: "Write a function called 'calculate_average' that takes a list of numbers and returns the average.",
          starter_code: "def calculate_average(numbers):\n    # Write your code here\n    pass\n\n# Test your function\nscores = [85, 90, 78, 92, 88]\nprint(calculate_average(scores))",
          hint: "Use sum(numbers) / len(numbers) to calculate the average",
          test_cases: [
            { input: { numbers: [85, 90, 78, 92, 88] }, expected: "86.6" }
          ]
        },
        {
          id: 5,
          title: "String Function",
          description: "Write a function called 'reverse_string' that takes a string and returns it reversed.",
          starter_code: "def reverse_string(text):\n    # Write your code here\n    pass\n\n# Test your function\nprint(reverse_string('hello'))",
          hint: "Use slicing with [::-1] to reverse a string",
          test_cases: [
            { input: { text: "hello" }, expected: "olleh" }
          ]
        },
        {
          id: 6,
          title: "List Function",
          description: "Write a function called 'find_max' that takes a list of numbers and returns the maximum value.",
          starter_code: "def find_max(numbers):\n    # Write your code here\n    pass\n\n# Test your function\nprint(find_max([3, 7, 2, 9, 1]))",
          hint: "Use the max() function or write a loop to compare values",
          test_cases: [
            { input: { numbers: [3, 7, 2, 9, 1] }, expected: "9" }
          ]
        }
      ];
      
      const answeredSet = new Set(answeredIds);
      const unansweredQuestions = mockQuestions.filter(q => !answeredSet.has(String(q.id)));
      
      setQuizState(prev => ({
        ...prev,
        questions: unansweredQuestions,
        isLoading: false
      }));
      
      if (unansweredQuestions.length > 0) {
        setTimeout(() => initQuizCodeEditor(), 500);
      }
    }
  };

  const currentQuestion = quizState.questions[quizState.currentQuizIndex];

  return (
    <div className="python-functions-container">
      <style jsx>{`
        .python-functions-container {
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
                <h1>Python Functions </h1>
                <p className="mb-0">Master modular programming by breaking problems into reusable, organized, and testable functions.</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/programming">Programming</a></li>
              <li className="current">Python Functions</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Functions Introduction */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-gear"></i> Introduction to Functions</h2>
          
          <div className="flowchart-example">
            <h4><i className="bi bi-lightbulb"></i> Computational Thinking Principle</h4>
            <p>Functions enable decomposition, abstraction, and pattern recognition in programming</p>
            
            <h4><i className="bi bi-check-circle"></i> Function Advantages</h4>
            <ul>
              <li>Code reusability and modularity</li>
              <li>Easier debugging and maintenance</li>
              <li>Better code organization</li>
            </ul>
        
            <h4><i className="bi bi-globe"></i> Real-Life Examples</h4>
            <ul>
              <li>Calculator operations (add, subtract, multiply)</li>
              <li>ATM functions (withdraw, deposit, check balance)</li>
              <li>Kitchen appliances (blend, chop, mix)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Function Structure */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-diagram-3"></i> Function Structure & Syntax</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-code-square"></i> Basic Function Syntax</h4>
                <pre><code>def function_name(parameters):
    """Optional docstring"""
    # Function body
    return result  # Optional</code></pre>
            
                <h4><i className="bi bi-list-ol"></i> Function Creation Steps</h4>
                <ol>
                  <li>Define with <code>def</code> keyword</li>
                  <li>Name the function descriptively</li>
                  <li>Add parameters in parentheses</li>
                  <li>Write function body with indentation</li>
                  <li>Return result (optional)</li>
                </ol>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="exercise-container">
                <div className="exercise-title">Exercise 1: Simple Function</div>
                <p>Create a basic greeting function:</p>
                <div className="explanation">
                  <div className="code-body">
                    <textarea className="codeInput" defaultValue={`def greet(name):
    print("Hello, " + name + "!")

# Call the function
greet("Alice")
greet("Bob")`}></textarea>
                    <button onClick={(e) => runCode(e.target)}>Run Code</button>
                    <div className="output"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Function Types */}
      <div className="container">
        <div className="section">
          <h2><i className="bi bi-collection"></i> Function Types</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-arrow-return-left"></i> Functions with Return Values</h4>
                
                <div className="exercise-container">
                  <div className="exercise-title">Exercise 2: Function with Return</div>
                  <p>Create a function that returns a calculated result:</p>
                  <div className="explanation">
                    <div className="code-body">
                      <textarea className="codeInput" defaultValue={`def add_numbers(a, b):
    return a + b

# Use the returned value
result = add_numbers(5, 3)
print("5 + 3 =", result)
print("10 + 15 =", add_numbers(10, 15))`}></textarea>
                      <button onClick={(e) => runCode(e.target)}>Run Code</button>
                      <div className="output"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-sliders"></i> Functions with Default Parameters</h4>
                
                <div className="exercise-container">
                  <div className="exercise-title">Exercise 3: Default Parameters</div>
                  <p>Functions can have default values for parameters:</p>
                  <div className="explanation">
                    <div className="code-body">
                      <textarea className="codeInput" defaultValue={`def power(base, exponent=2):
    return base ** exponent

print("3^2 =", power(3))        # Uses default
print("3^4 =", power(3, 4))     # Uses provided value
print("2^3 =", power(2, 3))`}></textarea>
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
          <h2><i className="bi bi-star"></i> Best Practices</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-check-lg text-success"></i> Good Function Design</h4>
                <pre><code>{`def calculate_area(width, height):
    """Calculate rectangle area"""
    return width * height

def is_even(number):
    """Check if number is even"""
    return number % 2 == 0`}</code></pre>
                <p><strong>Good:</strong> Clear names, single purpose, documented</p>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4><i className="bi bi-x-lg text-danger"></i> Poor Function Design</h4>
                <pre><code>{`def calc(w, h):
    return w * h

def func(x):
    if x % 2 == 0:
        return True
    else:
        return False`}</code></pre>
                <p><strong>Bad:</strong> Unclear names, no documentation, verbose</p>
              </div>
            </div>
          </div>

          <div className="flowchart-example mt-3">
            <h4><i className="bi bi-lightbulb"></i> Function Design Principles</h4>
            <ul>
              <li><strong>Single Responsibility:</strong> One function, one task</li>
              <li><strong>Descriptive Names:</strong> Clear purpose from name</li>
              <li><strong>Meaningful Parameters:</strong> Self-explanatory parameter names</li>
              <li><strong>Return vs Print:</strong> Return values for reusability</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Function Examples Section */}
{/* Function Examples Section */}
<div className="container">
  <div className="section">
    <h2><i className="bi bi-trophy"></i> Function Examples</h2>
    
    {/* Temperature Converter Example */}
    <div className="flowchart-example">
      <h4><i className="bi bi-thermometer-half"></i> Temperature Converter</h4>
      <div className="exercise-container">
        <div className="exercise-title">Celsius to Fahrenheit Conversion</div>
        <div className="explanation">
          <p>This example shows two functions that convert between Celsius and Fahrenheit:</p>
          <div className="code-body">
            <textarea className="codeInput" defaultValue={`def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius"""
    return (fahrenheit - 32) * 5/9

# Test the functions
print("25°C =", celsius_to_fahrenheit(25), "°F")
print("77°F =", fahrenheit_to_celsius(77), "°C")`}></textarea>
            <button onClick={(e) => runCode(e.target)}>Run Code</button>
            <div className="output"></div>
          </div>
        </div>
      </div>
    </div>

    {/* String Manipulation Example */}
    <div className="flowchart-example">
      <h4><i className="bi bi-textarea-t"></i> String Manipulation</h4>
      <div className="exercise-container">
        <div className="exercise-title">String Analysis Functions</div>
        <div className="explanation">
          <p>These functions perform operations on strings:</p>
          <div className="code-body">
            <textarea className="codeInput" defaultValue={`def count_vowels(text):
    """Count vowels in a string"""
    vowels = "aeiouAEIOU"
    count = 0
    for char in text:
        if char in vowels:
            count += 1
    return count

def reverse_string(text):
    """Reverse a string"""
    return text[::-1]

# Test the functions
message = "Hello World"
print("Vowel count:", count_vowels(message))
print("Reversed:", reverse_string(message))`}></textarea>
            <button onClick={(e) => runCode(e.target)}>Run Code</button>
            <div className="output"></div>
          </div>
        </div>
      </div>
    </div>

    {/* List Processing Example */}
    <div className="flowchart-example">
      <h4><i className="bi bi-list-ol"></i> List Processing</h4>
      <div className="exercise-container">
        <div className="exercise-title">List Analysis Functions</div>
        <div className="explanation">
          <p>Functions that operate on lists of numbers:</p>
          <div className="code-body">
            <textarea className="codeInput" defaultValue={`def calculate_average(numbers):
    """Calculate average of numbers"""
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

def find_max(numbers):
    """Find maximum value"""
    if not numbers:
        return None
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num

# Test the functions
grades = [85, 90, 78, 92, 88]
print("Average:", calculate_average(grades))
print("Highest:", find_max(grades))`}></textarea>
            <button onClick={(e) => runCode(e.target)}>Run Code</button>
            <div className="output"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Word Frequency Example */}
    <div className="flowchart-example">
      <h4><i className="bi bi-card-text"></i> Word Frequency</h4>
      <div className="exercise-container">
        <div className="exercise-title">Text Analysis Function</div>
        <div className="explanation">
          <p>This function counts how often each word appears in text:</p>
          <div className="code-body">
            <textarea className="codeInput" defaultValue={`def word_frequency(text):
    """Count word occurrences"""
    words = text.lower().split()
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    return freq

# Test the function
text = "This is a test. This is only a test."
result = word_frequency(text)
for word, count in result.items():
    print(f"{word}: {count}")`}></textarea>
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
                  <p className="mb-0">Test your Python functions knowledge with interactive exercises</p>
                  
                </div>
                <div className="card-body">
                  {pyodideLoading && (
                    <div className="alert alert-info">
                      <div className="spinner-border spinner-border-sm me-2"></div>
                      Loading Python interpreter (this may take 20-30 seconds on first load)...
                    </div>
                  )}
                  
                  {quizState.isLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3">Loading practice questions...</p>
                    </div>
                  ) : quizState.questions.length === 0 ? (
                    <div className="alert alert-success">
                      <h4><i className="bi bi-trophy"></i> Congratulations!</h4>
                      <p>You've completed all practice questions for Python Functions!</p>
                      <p>You're ready to move on to the next topic.</p>
                      <div className="mt-3">
                        <button className="btn btn-primary me-2" onClick={() => window.location.reload()}>
                          🔄 Reload Questions
                        </button>
                        <button className="btn btn-outline-secondary" onClick={resetAllQuestions}>
                          🗑️ Reset Progress
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="quiz-header d-flex justify-content-between align-items-center mb-3">
                        <h4>{currentQuestion?.title || 'Practice Question'}</h4>
                        <span className="badge bg-info">Python Functions</span>
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
                        <button 
                          className="btn btn-primary run-quiz-btn me-2" 
                          onClick={runQuizCode}
                          disabled={pyodideLoading || quizState.isLoading}
                        >
                          {pyodideLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Loading...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-play-fill"></i> Run Code
                            </>
                          )}
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
                          💡 <strong>Hint:</strong> {currentQuestion?.hint || 'No hint available for this question.'}
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
                              <a href="/programming/python-lists" className="btn btn-success me-2">
                                🚀 Continue to Lists
                              </a>
                              <button className="btn btn-outline-primary me-2" onClick={() => window.location.reload()}>
                                🔄 Start Over
                              </button>
                              <button className="btn btn-outline-secondary" onClick={resetAllQuestions}>
                                🗑️ Reset All Progress
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Navigation between questions */}
                      <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded">
                        <button 
                          className="btn btn-outline-secondary" 
                          onClick={goToPrevQuestion}
                          disabled={quizState.currentQuizIndex === 0}
                        >
                          <i className="bi bi-arrow-left"></i> Previous
                        </button>
                        
                        <span className="text-muted">
                          {quizState.currentQuizIndex + 1} / {quizState.questions.length}
                        </span>
                        
                        <button 
                          className="btn btn-outline-secondary" 
                          onClick={goToNextQuestion}
                          disabled={quizState.currentQuizIndex >= quizState.questions.length - 1}
                        >
                          Next <i className="bi bi-arrow-right"></i>
                        </button>
                      </div>
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
          <p>Now that you understand Python Functions, let's explore Python Lists and data structures!</p>
          <a href="python-lists" className="btn btn-primary">
            Continue to Next Lesson
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PythonFunctions;
