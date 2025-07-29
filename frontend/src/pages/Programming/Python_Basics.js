import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from "react-router-dom";

const PythonBasics = () => {
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
        const endpoint = testCases ? 'http://3.111.49.131:4000/test' : 'http://3.111.49.131:4000/run-python';
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
        const submitResponse = await fetch('http://3.111.49.131:4000/api/finger-exercise/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username: userInfo.username,
            email: userInfo.email,
            topic: 'python_basics',
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
      const response = await fetch('http://3.111.49.131:4000/api/finger-exercise/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: userInfo.email,
          topic: 'python_basics'
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
      const sessionResponse = await fetch('http://3.111.49.131:4000/api/session-info', { 
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
      
      const response = await fetch(`http://3.111.49.131:4000/api/finger-exercise?email=${email}&topic=python_basics`, {
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
      
      const response = await fetch('http://3.111.49.131:4000/api/finger-questions?topic=python_basics', {
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
          title: "First Python Program",
          description: "Write a Python program that prints 'Hello, Python!'",
          starter_code: "# Write your code here\nprint('Hello, Python!')",
          hint: "Use the print() function to display text",
          test_cases: [
            { input: {}, expected: "Hello, Python!" }
          ]
        },
        {
          id: 2,
          title: "Variables and Data Types",
          description: "Create a variable called 'name' with the value 'Alice' and print it. Then create an 'age' variable with value 25 and print it.",
          starter_code: "# Create variables and print them\n# name = ?\n# age = ?\n",
          hint: "Use quotes for strings and no quotes for numbers. Use print() to display values.",
          test_cases: [
            { input: {}, expected: "Alice\n25" }
          ]
        },
        {
          id: 3,
          title: "Working with Lists",
          description: "Create a list of 3 fruits: 'apple', 'banana', 'orange'. Print the entire list, then print just the first fruit.",
          starter_code: "# Create a list of fruits\nfruits = []\n# Print the list and first fruit\n",
          hint: "Use square brackets [] to create a list and [0] to access the first item",
          test_cases: [
            { input: {}, expected: "['apple', 'banana', 'orange']\napple" }
          ]
        },
        {
          id: 4,
          title: "Dictionary Basics",
          description: "Create a dictionary with keys 'name' and 'age', with values 'John' and 30. Print the name using the key.",
          starter_code: "# Create a dictionary\nperson = {}\n# Print the name\n",
          hint: "Use curly braces {} for dictionaries and square brackets ['key'] to access values",
          test_cases: [
            { input: {}, expected: "John" }
          ]
        },
        {
          id: 5,
          title: "String Operations",
          description: "Create two variables: first_name = 'John' and last_name = 'Doe'. Combine them with a space and print the full name.",
          starter_code: "# Create name variables\nfirst_name = 'John'\nlast_name = 'Doe'\n# Combine and print full name\n",
          hint: "Use the + operator to concatenate strings. Don't forget the space!",
          test_cases: [
            { input: {}, expected: "John Doe" }
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
    <div className="python-basics-container">
      <style jsx>{`
        /* Python Conditionals CSS - Add this to your styled-jsx section */

.python-conditionals-container {
  font-family: 'Open Sans', sans-serif;
  line-height: 1.6;
  color: #333;
}.loading-indicator {
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

/* COMPARISON CONTAINER STYLES - Key highlighting feature */
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

/* RESPONSIVE DESIGN */
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
                <h1>Python Basics </h1>
                <p className="mb-0">Learn fundamental programming concepts through problem-solving and logical thinking</p>
               
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/programming">Programming</a></li>
              <li className="current">Python Basics</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Python Introduction */}
      <div className="container">
        <div className="section">
          <h2>🐍 Introduction to Python Programming</h2>
          
          <div className="flowchart-example">
            <h4>🎯 What is Python?</h4>
            <p><strong>When was Python developed?</strong><br/>
            Python was created by Guido van Rossum in the late 1980s. He started working on it in December 1989, and the first version was released in 1991 (over 30 years ago!).</p>
            
            <p><strong>Why was Python developed?</strong><br/>
            Guido wanted to create a programming language that:</p>
            <ul>
              <li><strong>Easy to read and write</strong><br/>
              Code should look almost like English (e.g., <code>print("Hello")</code> instead of confusing symbols).<br/>
              Perfect for beginners!</li>
              <li><strong>Fun to use</strong><br/>
              He named it after Monty Python (a funny British comedy show), not the snake!</li>
              <li><strong>Flexible for all tasks</strong><br/>
              From building websites to analyzing data or even controlling robots!</li>
            </ul>
            
            <p><strong>Why learn Python today?</strong></p>
            <ul>
              <li><strong>Simple:</strong> Great for your first programming language</li>
              <li><strong>Popular:</strong> Used by companies like Google, Netflix, and NASA</li>
              <li><strong>Free:</strong> Anyone can use it!</li>
              <li><strong>High Demand:</strong> Popular in industry and academia</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hello World */}
      <div className="container">
        <div className="section">
          <h2>👋 Your First Python Program</h2>
          
          <div className="flowchart-example">
            <h4>The Traditional "Hello, World!" Program</h4>
            <p>Let's start with the most famous program in programming - printing "Hello, World!" to the screen.</p>
          </div>
          
          <div className="exercise-container">
            <div className="exercise-title">Exercise 1: Hello World</div>
            <p>Try running your first Python program:</p>
            <div className="explanation">
              <div className="code-body">
                <textarea className="codeInput" defaultValue={`print("Hello, World!")`}></textarea>
                <button onClick={(e) => runCode(e.target)}>Run Code</button>
                <div className="output"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Life Usage */}
      <div className="container">
        <div className="section">
          <h2>🌍 Real-Life Uses of Python</h2>
          
          <div className="flowchart-example">
            <h4>🏢 Companies Using Python</h4>
            <ul>
              <li><strong>Instagram:</strong> Built with Python</li>
              <li><strong>NASA:</strong> Uses Python for scientific calculations</li>
              <li><strong>Netflix:</strong> Recommends movies using Python</li>
              <li><strong>Google:</strong> Powers many of their services</li>
              <li><strong>Spotify:</strong> Backend services and data analysis</li>
            </ul>
            
            <h4>💼 Applications</h4>
            <ul>
              <li><strong>Web Development:</strong> Building websites and web applications</li>
              <li><strong>Data Science:</strong> Analyzing large datasets</li>
              <li><strong>Artificial Intelligence:</strong> Machine learning and AI applications</li>
              <li><strong>Automation:</strong> Automating repetitive tasks</li>
              <li><strong>Game Development:</strong> Creating games like parts of Minecraft</li>
            </ul>
          </div>
          
          <div className="exercise-container">
            <div className="exercise-title">Exercise 2: Express Your Interest</div>
            <p>Write a program to print your favorite real-life use of Python:</p>
            <div className="explanation">
              <div className="code-body">
                <textarea className="codeInput" defaultValue={`# Your coding with print statements
print("My favorite real-life use of Python is: ")
# Add your own favorite use case here`}></textarea>
                <button onClick={(e) => runCode(e.target)}>Run Code</button>
                <div className="output"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Python Compilers */}
      <div className="container">
        <div className="section">
          <h2>💻 Python Development Tools</h2>
          
          <div className="flowchart-example">
            <h4>🔧 What is a Compiler/Interpreter?</h4>
            <p>A tool that runs your Python code and shows you the results.</p>
            
            <h4>📱 Popular Python Development Tools:</h4>
            <ul>
              <li><strong>Jupyter Notebook:</strong> Write code in cells and run them interactively</li>
              <li><strong>Google Colab:</strong> Free online Python editor (no installation needed!)</li>
              <li><strong>PyCharm:</strong> Professional Python IDE</li>
              <li><strong>VS Code:</strong> Popular code editor with Python extensions</li>
              <li><strong>Spyder:</strong> Scientific Python development environment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="container">
        <div className="section">
          <h2>💬 Comments in Python</h2>
          
          <div className="flowchart-example">
            <h4>📝 What are Comments?</h4>
            <p>Comments are notes in your code that Python ignores. They start with <code>#</code>.</p>
            
            <h4>Why Use Comments?</h4>
            <ul>
              <li>To explain what your code does</li>
              <li>To make your code easier to understand</li>
              <li>To leave notes for yourself or other programmers</li>
              <li>To temporarily disable code without deleting it</li>
            </ul>
            
            <div className="comparison-container">
              <div className="code-comparison incorrect">
                <div className="code-header">
                  ❌ No Comments
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`length = 10
width = 5
area = length * width
print("Area:", area)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
              
              <div className="code-comparison correct">
                <div className="code-header">
                  ✅ With Helpful Comments
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Calculate the area of a rectangle
length = 10  # in meters
width = 5    # in meters
area = length * width  # area in square meters
print("Area:", area)   # display the result`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <div className="exercise-container">
              <div className="exercise-title">Exercise: Add Comments</div>
              <p>Add comments to this code to explain what it does:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Add comments to explain this code
x = 15
y = 3
result = x // y
print(result)

# Your version with comments:
# x = 15       # dividend
# y = 3        # divisor  
# result = x // y  # floor division
# print(result)    # display quotient`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Python Indentation */}
      <div className="container">
        <div className="section">
          <h2>📐 Python Indentation</h2>
          
          <div className="flowchart-example">
            <h4>🎯 Introduction to Indentation</h4>
            <p>In Python, indentation (spaces or tabs at the start of a line) is used to define blocks of code. Unlike other languages that use braces <code>{}</code>, Python relies on indentation to separate different parts of the program. Proper indentation ensures that the code runs correctly and is easy to read.</p>
            
            <div className="explanation" style={{backgroundColor: '#f0f8ff', borderLeft: '4px solid #4682b4', padding: '15px', margin: '15px 0'}}>
              <h4>Why is Indentation Important?</h4>
              <ul>
                <li><strong>Defines Code Blocks</strong> – Python uses indentation to group statements (like in loops, functions, and conditions)</li>
                <li><strong>Improves Readability</strong> – Well-indented code is easier to understand and debug</li>
                <li><strong>Avoids Errors</strong> – Wrong indentation can cause <code>IndentationError</code> or logical mistakes</li>
              </ul>
            </div>
            
            <h4>📋 Best Practices for Indentation</h4>
            <ul>
              <li>✔ Use <strong>4 spaces</strong> (recommended) or a consistent tab size</li>
              <li>✔ Never mix tabs and spaces (Python 3 disallows it)</li>
              <li>✔ Indent after <code>:</code> (colon) in loops, functions, and conditions</li>
              <li>✔ Use an IDE (like VS Code or PyCharm) to auto-indent code</li>
            </ul>
            
            <div className="comparison-container">
              <div className="code-comparison incorrect">
                <div className="code-header">
                  ❌ Wrong Indentation (Error!)
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`age = 18
if age >= 18:
print("You are an adult")  # Missing indentation`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
              
              <div className="code-comparison correct">
                <div className="code-header">
                  ✅ Correct Indentation
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`age = 18
if age >= 18:
    print("You are an adult")  # Properly indented
print("This always runs")      # Outside the if block`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <div className="exercise-container">
              <div className="exercise-title">Exercise: Fix Indentation Errors</div>
              <p>1. Fix the indentation error in this loop:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Fix the indentation
for i in range(5):
    print(i)  # This should be indented

# Fixed version above - run to see it work!`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variables and Data Types */}
      <div className="container">
        <div className="section">
          <h2>📦 Python Data Types</h2>
          
          <div className="flowchart-example">
            <p>There are 4 basic data types in Python:</p>
            <ul>
              <li><strong>int:</strong> Whole numbers, e.g., <code>10</code>, <code>-5</code></li>
              <li><strong>float:</strong> Decimal numbers, e.g., <code>3.14</code>, <code>-0.5</code></li>
              <li><strong>str:</strong> Text, e.g., <code>"Hello, World!"</code></li>
              <li><strong>bool:</strong> True/False values</li>
            </ul>
            <p>It's important to understand different types because certain operations are only allowed between certain types, and the behavior of our programs depends on the types of our variables.</p>
            
            <h4>🔢 Integers</h4>
            <p>Python uses the int data type to represent whole integer values. Integers are all whole numbers - as soon as there is a decimal point, the number becomes a float instead.</p>
            <p><strong>Note:</strong> Numbers that you might write with commas (such as 1,000,000) are written as 1000000 in Python. This is because Python would interpret 1,000,000 as three separate numbers!</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Exercise: Working with Integers</div>
              <p>Run this code and see how data types work. Try changing the numbers!</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Store int value
roll_no = 33
# Display roll number
print("Roll number is:", roll_no)
print(type(roll_no))  # Shows the data type`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Creating Integers with int() class</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Store integer using int() class
id = int(25)
print(id)  # 25
print(type(id))  # <class 'int'>`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🔢 Float</h4>
            <p>To represent floating-point values or decimal values, we use the float data type. For example, if we want to store a salary, we can use the float type.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Working with Float Numbers</div>
              <p>Run this code and see how float data type works. Try changing the numbers!</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Store a floating-point value
salary = 8000.456
print("Salary is:", salary)  # 8000.456
print(type(salary))  # <class 'float'>`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Creating Float with float() class</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Store a floating-point value using float() class
num = float(54.75)
print(num)  # 54.75
print(type(num))  # <class 'float'>`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>📝 String</h4>
            <p>In Python, a string is a sequence of characters enclosed within single or double quotes. These characters could be letters, numbers, or special symbols. For example, "Sanghamitra" is a string.</p>
            <p>To work with text or character data in Python, we use strings. Once a string is created, we can do many operations on it, such as searching inside it, creating a substring from it, and splitting it.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Working with Strings</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`platform = "Sanghamitra"
print(type(platform))  # <class 'str'>

# Display string
print(platform)  # 'Sanghamitra'

# Accessing 2nd character of a string (indexing starts at 0)
print(platform[1])  # a`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">String Immutability</div>
              <p><strong>Note:</strong> Strings are immutable, meaning they cannot be changed once defined. You need to create a copy if you want to modify it.</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`platform = "SANGHAMITRA"
# Let's try to change the first character of a string
try:
    platform[0] = 's'
except TypeError as e:
    print("Error:", e)
    print("Strings cannot be modified!")`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>✅ Boolean</h4>
            <p>In Python, to represent boolean values (True and False) we use the bool data type. Boolean values are used to evaluate expressions. For example, when we compare two values, Python returns True or False.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Working with Booleans</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`x = 25
y = 20

z = x > y
print(z)  # True
print(type(z))  # <class 'bool'>

# More boolean examples
print("25 > 20:", 25 > 20)
print("10 == 10:", 10 == 10)
print("5 < 3:", 5 < 3)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variables Section */}
      <div className="container">
        <div className="section">
          <h2>🏷️ Variables in Python</h2>
          
          <div className="flowchart-example">
            <p>A variable is a reserved memory area to store values. For example, we can store an employee's salary using a variable. Using that variable name, you can read or modify the salary amount.</p>
            <p>In other words, a variable is a value that varies according to the condition or input passed to the program. Everything in Python is treated as an object, so every variable is an object in Python.</p>
            <p>A variable can be either <strong>mutable</strong> or <strong>immutable</strong>. If the variable's value can change, the object is mutable, while if the value cannot change, the object is immutable.</p>
            
            <h4>🔧 Creating a Variable</h4>
            <p>Python is dynamically typed, so there's no need to declare a variable before using it or declare the data type. The declaration happens automatically when we assign a value to the variable.</p>
            <p>We use the assignment operator <strong>=</strong> to assign a value to a variable.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Basic Variable Creation</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Simple variable assignment
x = 25
print(x)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Multiple Variable Types</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`name = "John"  # string assignment
age = 25  # integer assignment
salary = 25800.60  # float assignment

print(name)  # John
print(age)  # 25
print(salary)  # 25800.6`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🔄 Changing Variable Values</h4>
            <p>A variable may be assigned a value of one type, and then later re-assigned a value of a different type.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Variable Type Changes</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Start with integer
var = 10
print(var)  # 10
print(type(var))  # <class 'int'>

# Change to different integer value
var = 55
print(var)  # 55

# Change to string
var = "Now I'm a string"
print(var)  # Now I'm a string
print(type(var))  # <class 'str'>

# Change to float
var = 35.69
print(var)  # 35.69
print(type(var))  # <class 'float'>`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🗑️ Deleting Variables</h4>
            <p>Use the <code>del</code> keyword to delete a variable. Once deleted, it will no longer be accessible.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Variable Deletion</div>
              <p>After deletion, trying to use the variable will show an error:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`x = 25
print("Before deletion:", x)
del x
# Trying to print x now will cause an error
try:
    print(x)
except NameError as e:
    print("Error:", e)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🔤 Variables are Case-Sensitive</h4>
            <p>Python is case-sensitive. Variables <code>a</code> and <code>A</code> are treated as different variables.</p>
            
            <div className="exercise-container">
              <div className="exercise-title">Case Sensitivity</div>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`a = 100
A = 200

# These are different variables
print("lowercase a:", a)  # 100
print("uppercase A:", A)  # 200

# We can use them together
result = a + A
print("a + A =", result)  # 300`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Descriptive Writing */}
      <div className="container">
        <div className="section">
          <h2>📝 Descriptive Writing (Why It Matters)</h2>
          
          <div className="flowchart-example">
            <p><strong>Why It Matters:</strong><br/>
            Writing clear and descriptive code helps others (and your future self) understand what the code does.</p>
            
            <p><strong>Use Descriptive Naming:</strong><br/>
            Choose variable, function, and file names that clearly describe their purpose or contents.<br/>
            Instead of naming a variable <code>x</code>, use <code>student_score</code> or <code>total_price</code>.</p>
            
            <p><strong>Advantages of Descriptive Writing:</strong></p>
            <ul>
              <li>Makes code easier to read and maintain</li>
              <li>Improves collaboration in teams</li>
              <li>Reduces chances of bugs due to misunderstandings</li>
              <li>Helps in debugging and reviewing after long gaps</li>
            </ul>
            
            <p><strong>Why We Use Underscores Instead of Spaces:</strong><br/>
            In most programming languages, variable names cannot contain spaces. Underscores (<code>_</code>) are used to make names more readable, such as <code>max_temperature</code> or <code>file_path</code>, instead of <code>maxtemperature</code>.</p>
            
            <div className="comparison-container">
              <div className="code-comparison incorrect">
                <div className="code-header">
                  ❌ Hard to Understand
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Bad Example
x = 10
y = 5
z = x + y
print(z)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
              
              <div className="code-comparison correct">
                <div className="code-header">
                  ✅ Clear and Descriptive
                </div>
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Good Example
total_apples = 10
apples_added = 5
total_fruits = total_apples + apples_added
print(total_fruits)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <div className="exercise-container">
              <div className="exercise-title">Exercise: Improve Variable Names</div>
              <p>Rewrite this code with meaningful variable names:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`# Try to improve these variable names
a = 20  # What could this represent?
b = 4   # What could this represent?
c = a * b
print(c)

# Your improved version:
# length = 20
# width = 4
# area = length * width
# print(area)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Operations */}
      <div className="container">
        <div className="section">
          <h2>🧮 Basic Operations</h2>
          
          <div className="row">
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4>➕ Arithmetic Operations</h4>
                <ul>
                  <li><code>+</code> Addition</li>
                  <li><code>-</code> Subtraction</li>
                  <li><code>*</code> Multiplication</li>
                  <li><code>/</code> Division</li>
                  <li><code>//</code> Floor Division</li>
                  <li><code>%</code> Modulus (remainder)</li>
                  <li><code>**</code> Exponentiation</li>
                </ul>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="flowchart-example">
                <h4>🔤 String Operations</h4>
                <ul>
                  <li><code>+</code> Concatenation (joining strings)</li>
                  <li><code>*</code> Repetition</li>
                  <li><code>len()</code> Get string length</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="exercise-container">
            <div className="exercise-title">Exercise 4: Arithmetic Operations</div>
            <p>Try different mathematical operations:</p>
            <div className="explanation">
              <div className="code-body">
                <textarea className="codeInput" defaultValue={`# Basic arithmetic
a = 15
b = 4

print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)
print("Floor Division:", a // b)
print("Modulus:", a % b)
print("Exponentiation:", a ** 2)`}></textarea>
                <button onClick={(e) => runCode(e.target)}>Run Code</button>
                <div className="output"></div>
              </div>
            </div>
          </div>

          <div className="exercise-container">
            <div className="exercise-title">Exercise 5: String Operations</div>
            <p>Work with strings using various operations:</p>
            <div className="explanation">
              <div className="code-body">
                <textarea className="codeInput" defaultValue={`# String operations
first_name = "John"
last_name = "Doe"

# Concatenation
full_name = first_name + " " + last_name
print("Full name:", full_name)

# Repetition
greeting = "Hello! " * 3
print(greeting)

# String length
print("Length of full name:", len(full_name))

# String methods
print("Uppercase:", full_name.upper())
print("Lowercase:", full_name.lower())`}></textarea>
                <button onClick={(e) => runCode(e.target)}>Run Code</button>
                <div className="output"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Python Data Structures */}
      <div className="container">
        <div className="section">
          <h2>📦 Python Data Structures</h2>
          
          <div className="flowchart-example">
            <h4>🗂️ Lists - Your Changeable Collection</h4>
            <p>Lists are like shopping lists where you can add, remove, or change items:</p>
            <ul>
              <li>Ordered collection of items</li>
              <li>Items can be added, removed or changed - <strong>mutable</strong></li>
              <li>Allows duplicate values</li>
              <li>Created with square brackets []</li>
            </ul>
            
            <div className="exercise-container">
              <div className="exercise-title">Working with Lists</div>
              <p>1. Simple list of fruits:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`fruits = ["apple", "banana", "orange"]  # Create list
print(fruits)  # Show all items
print("First fruit:", fruits[0])  # Indexing starts from 0`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">List Modification</div>
              <p>2. List modification using indexing and methods:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`numbers = [10, 20, 30]
print("Original:", numbers)
print("First number:", numbers[0])  # Indexing starts from 0
print("Length:", len(numbers))  # len() finds the length

numbers.remove(20)  # Remove element
print("After removing 20:", numbers)

numbers.append(40)  # Add element
print("After adding 40:", numbers)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Mixed Data Types in Lists</div>
              <p>3. Lists can contain different data types:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`student = ["Rahul", 16, "Grade 10", True]  # string, int, string, bool
print("Name:", student[0])  # Get name
print("Age:", student[1])   # Get age
student[3] = False  # Change status
print("Updated student:", student)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🔒 Tuples - Your Unchangeable Collection</h4>
            <p>Tuples are like sealed packages that can't be modified:</p>
            <ul>
              <li>Ordered collection like lists</li>
              <li>Items cannot be changed after creation - <strong>immutable</strong></li>
              <li>Faster than lists</li>
              <li>Created with parentheses ()</li>
            </ul>
            
            <div className="exercise-container">
              <div className="exercise-title">Working with Tuples</div>
              <p>1. Basic tuple of coordinates:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`point = (3, 5)  # Create tuple
print("Point:", point)
print("X coordinate:", point[0])  # Access first item (3)
print("Y coordinate:", point[1])  # Access second item (5)
# point[0] = 4  # This would cause an error!`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Tuple with Multiple Data Types</div>
              <p>2. Tuple unpacking:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`person = ("Alice", 25, "Engineer")
name = person[0]
age = person[1]
job = person[2]
print(name, "is", age, "years old and works as an", job)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🏷️ Dictionaries - Your Labeled Storage</h4>
            <p>Dictionaries store data with custom labels (key-value pairs):</p>
            <ul>
              <li>Unordered collection</li>
              <li>Access items using keys (not positions)</li>
              <li>Keys must be unique</li>
              <li>Created with curly braces {}</li>
            </ul>
            
            <div className="exercise-container">
              <div className="exercise-title">Simple Dictionary</div>
              <p>1. Student dictionary:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`student = {"name": "Priya", "age": 14, "grade": "9A"}
print("Student name:", student["name"])  # Access by key
print("Student age:", student["age"])
print("Complete student info:", student)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Dictionary Operations</div>
              <p>2. Updating and adding to dictionaries:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`student = {"name": "Priya", "age": 14, "grade": "9A"}
student["age"] = 15  # Update value
print("After birthday:", student)

student["school"] = "ABC High"  # Add new key-value pair
print("With school info:", student)`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Complex Dictionary</div>
              <p>3. Dictionary with different value types:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`car = {"brand": "Toyota", "year": 2020, "colors": ["red", "blue"]}
print("Car brand:", car["brand"])  # Access string value
print("Car year:", car["year"])    # Access integer value
print("Available colors:", car["colors"])  # Access list value
print("First color:", car["colors"][0])    # Access item in list`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>
            
            <h4>🎯 Sets - Your Unique Collection</h4>
            <p>Sets automatically remove duplicates and allow fast lookups:</p>
            <ul>
              <li>Unordered collection</li>
              <li>No duplicate items</li>
              <li>Very fast membership testing</li>
              <li>Created with curly braces {}</li>
            </ul>
            
            <div className="exercise-container">
              <div className="exercise-title">Basic Set Operations</div>
              <p>1. Working with sets:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`colors = {"red", "blue", "green"}
colors.add("red")  # Won't add duplicate
colors.add("yellow")  # Will add new color
print("Colors:", colors)
print("Is blue in colors?", "blue" in colors)  # Check membership`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Finding Unique Letters</div>
              <p>2. Finding unique letters in a word:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`word = "hello"
unique_letters = set(word)
print("Word:", word)
print("Unique letters:", unique_letters)  # Order may vary
print("Number of unique letters:", len(unique_letters))`}></textarea>
                  <button onClick={(e) => runCode(e.target)}>Run Code</button>
                  <div className="output"></div>
                </div>
              </div>
            </div>

            <div className="exercise-container">
              <div className="exercise-title">Set Operations</div>
              <p>3. Union and intersection:</p>
              <div className="explanation">
                <div className="code-body">
                  <textarea className="codeInput" defaultValue={`A = {1, 2, 3}
B = {3, 4, 5}
print("Set A:", A)
print("Set B:", B)
print("Union (A ∪ B):", A.union(B))        # {1, 2, 3, 4, 5}
print("Intersection (A ∩ B):", A.intersection(B))  # {3}`}></textarea>
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
                  <h3>🧪 Practice Quiz</h3>
                  
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
                      <h4>🏆 Congratulations!</h4>
                      <p>You've completed all practice questions for Python Basics!</p>
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
                        <span className="badge bg-info">Python Basics</span>
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
                            '▶️ Run Code'
                          )}
                        </button>
                        <button className="btn btn-outline-secondary show-quiz-hint-btn" onClick={toggleQuizHint}>
                          💡 {quizState.showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                        {quizState.allTestsPassed && (
                          <button className="btn btn-success ms-auto" onClick={submitQuizAnswer}>
                            ✅ Submit Answer
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
                              ➡️ Next Question
                            </button>
                          )}
                          {quizState.resultType === 'success' && 
                           quizState.currentQuizIndex === quizState.questions.length - 1 && (
                            <div className="mt-3">
                              <p><strong>🎉 Congratulations!</strong> You've completed all practice questions.</p>
                              <Link to="/programming/python-conditionals" className="btn btn-success me-2">
                                🚀 Continue to Conditionals
                              </Link>
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
          
          <div className="container">
        <div className="section" style={{ textAlign: 'center' }}>
          <h2>Ready to Learn More?</h2>
          <p>Now that you understand the basics of Python, let's explore further topics in Python Conditionals!</p>
          <a href="python-conditionals" className="btn btn-primary">
            Continue to Next Lesson
          </a>
        </div>
      </div>
          
        </div>
      </div>
    </div>
  );
};

export default PythonBasics;
