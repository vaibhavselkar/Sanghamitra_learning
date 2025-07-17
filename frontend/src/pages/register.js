import React, { useState, useEffect } from 'react';
import { Users, BookOpen, UserCheck, Code, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      tutorCode: '',
      classroomName: ''
    });
    
    const [uiState, setUiState] = useState({
      error: '',
      isLoading: false,
      showTutorCodeField: false,
      showPassword: false,
      showConfirmPassword: false,
      classroomPreview: null,
      validatingCode: false,
      successMessage: ''
    });
  
  
    const handleNavigation = (path) => {
      console.log(`Navigate to: ${path}`);
      // navigate to /login page
      window.location.href = path;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (uiState.error) {
        setUiState(prev => ({ ...prev, error: '' }));
      }
    };
  

    useEffect(() => {
        // Check for invite code in URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const inviteCode = urlParams.get('code');
        
        if (inviteCode) {
            setFormData(prev => ({ 
                ...prev, 
                role: 'student',
                tutorCode: inviteCode.toUpperCase()
            }));
            
            setUiState(prev => ({ 
                ...prev, 
                showTutorCodeField: true 
            }));
            
            // Validate the code immediately
            validateTutorCode(inviteCode.toUpperCase());
        }
    }, []);
    const handleRoleChange = (role) => {
      setFormData(prev => ({ 
        ...prev, 
        role,
        tutorCode: role === 'student' ? prev.tutorCode : '',
        classroomName: role === 'tutor' ? prev.classroomName : ''
      }));
      
      setUiState(prev => ({ 
        ...prev, 
        showTutorCodeField: false,
        classroomPreview: null 
      }));
    };

  
    const validateTutorCode = async (code) => {
      if (!code || code.length < 6) return;
      
      setUiState(prev => ({ ...prev, validatingCode: true }));
      
      try {
        const response = await fetch(`https://3.111.49.131:4000/api/classrooms/validate/${code}`);
        
        if (response.ok) {
          const classroom = await response.json();
          setUiState(prev => ({ 
            ...prev, 
            classroomPreview: classroom,
            validatingCode: false 
          }));
        } else {
          setUiState(prev => ({ 
            ...prev, 
            classroomPreview: null,
            validatingCode: false 
          }));
        }
      } catch (error) {
        console.error('Error validating tutor code:', error);
        setUiState(prev => ({ 
          ...prev, 
          classroomPreview: null,
          validatingCode: false 
        }));
      }
    };
  
    const handleTutorCodeChange = (e) => {
      const code = e.target.value.toUpperCase();
      setFormData(prev => ({ ...prev, tutorCode: code }));
      
      // Debounce the validation
      const timeoutId = setTimeout(() => validateTutorCode(code), 500);
      return () => clearTimeout(timeoutId);
    };
  
    const validateForm = () => {
      if (!formData.name.trim()) return 'Full name is required';
      if (!formData.email.trim()) return 'Email is required';
      if (formData.password.length < 6) return 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
      
      if (formData.role === 'tutor') {
        if (!formData.classroomName.trim()) return 'Classroom name is required';
      }
      
      return null;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const validationError = validateForm();
      if (validationError) {
        setUiState(prev => ({ ...prev, error: validationError }));
        return;
      }
  
      setUiState(prev => ({ ...prev, isLoading: true, error: '', successMessage: '' }));
  
      try {
        // Prepare the data for the API
        const registrationData = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: formData.role
        };
  
        // Add role-specific fields
        if (formData.role === 'tutor') {
          registrationData.classroomName = formData.classroomName.trim();
        } else if (formData.role === 'student' && formData.tutorCode) {
          registrationData.tutorCode = formData.tutorCode.trim();
        }

        console.log('Sending registration data:', registrationData);
  
        // Make the API call
        const response = await fetch('https://3.111.49.131:4000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });
  
        const data = await response.json();
        console.log('Server response:', data);
  
        if (response.ok) {
          // Registration successful
          setUiState(prev => ({ 
            ...prev, 
            isLoading: false, 
            successMessage: 'Registration successful! Redirecting to login...',
            error: ''
          }));

          // Redirect to login page after success
          setTimeout(() => {
            handleNavigation('/login');
          }, 2000);
  
        } else {
          // Registration failed
          setUiState(prev => ({ 
            ...prev, 
            error: data.error || data.message || 'Registration failed. Please try again.',
            isLoading: false 
          }));
        }
  
      } catch (error) {
        console.error('Registration error:', error);
        setUiState(prev => ({ 
          ...prev, 
          error: 'Network error. Please check your connection and try again.',
          isLoading: false 
        }));
      }
    };
  
    const SuccessMessage = () => (
      <div style={styles.successBox}>
        <CheckCircle size={20} style={styles.successIcon} />
        <p style={styles.successText}>{uiState.successMessage}</p>
      </div>
    );
  
    return (
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            {/* Header */}
            <div style={styles.header}>
              <h2 style={styles.headerTitle}>Join Sanghamitra</h2>
              <p style={styles.headerSubtitle}>Create your account to get started</p>
            </div>
  
            <div style={styles.content}>
              <form onSubmit={handleSubmit} style={styles.form}>
                {/* Role Selection */}
                <div style={styles.section}>
                  <label style={styles.sectionLabel}>I am registering as:</label>
                  <div style={styles.roleButtons}>
                    <button
                      type="button"
                      onClick={() => handleRoleChange('student')}
                      style={{
                        ...styles.roleButton,
                        ...(formData.role === 'student' ? styles.roleButtonActive : {})
                      }}
                    >
                      <Users size={32} style={styles.roleIcon} />
                      <div style={styles.roleTitle}>Student</div>
                      <div style={styles.roleDescription}>Learn with tutors</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleChange('tutor')}
                      style={{
                        ...styles.roleButton,
                        ...(formData.role === 'tutor' ? styles.roleButtonActiveTutor : {})
                      }}
                    >
                      <UserCheck size={32} style={styles.roleIcon} />
                      <div style={styles.roleTitle}>Tutor</div>
                      <div style={styles.roleDescription}>Teach students</div>
                    </button>
                  </div>
                </div>
  
                {/* Personal Information */}
                <div style={styles.grid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={styles.input}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
  
                {/* Password Section */}
                <div style={styles.grid}>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Password</label>
                    <div style={styles.passwordInput}>
                      <input
                        type={uiState.showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Create password"
                        minLength="6"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setUiState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                        style={styles.passwordToggle}
                      >
                        {uiState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>Confirm Password</label>
                    <div style={styles.passwordInput}>
                      <input
                        type={uiState.showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Confirm password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setUiState(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                        style={styles.passwordToggle}
                      >
                        {uiState.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
  
                {/* Tutor-Specific Fields */}
                {formData.role === 'tutor' && (
                  <div style={styles.tutorSection}>
                    <h3 style={styles.tutorTitle}>
                      <BookOpen size={20} style={styles.tutorIcon} />
                      Classroom Setup
                    </h3>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.inputLabel}>Classroom Name</label>
                      <input
                        type="text"
                        name="classroomName"
                        value={formData.classroomName}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="e.g., Advanced Mathematics Class"
                        required
                      />
                    </div>
                  </div>
                )}
  
                {/* Student-Specific Fields */}
                {formData.role === 'student' && (
                  <div style={styles.studentSection}>
                    <div style={styles.studentHeader}>
                      <h3 style={styles.studentTitle}>
                        <Code size={20} style={styles.studentIcon} />
                        Join a Classroom (Optional)
                      </h3>
                      <label style={styles.toggleSwitch}>
                        <input
                          type="checkbox"
                          checked={uiState.showTutorCodeField}
                          onChange={() => setUiState(prev => ({ ...prev, showTutorCodeField: !prev.showTutorCodeField }))}
                          style={styles.toggleInput}
                        />
                        <span style={{
                          ...styles.toggleSlider,
                          ...(uiState.showTutorCodeField ? styles.toggleSliderActive : {})
                        }} />
                      </label>
                    </div>
                    
                    {uiState.showTutorCodeField && (
                      <div style={styles.codeSection}>
                        <div style={styles.inputGroup}>
                          <label style={styles.inputLabel}>Tutor Enrollment Code</label>
                          <div style={styles.codeInput}>
                            <input
                              type="text"
                              name="tutorCode"
                              value={formData.tutorCode}
                              onChange={handleTutorCodeChange}
                              style={{ ...styles.input, ...styles.codeText }}
                              placeholder="ENTER CODE"
                              maxLength="8"
                            />
                            {uiState.validatingCode && (
                              <div style={styles.codeSpinner} />
                            )}
                          </div>
                        </div>
  
                        {uiState.classroomPreview && (
                          <div style={styles.classroomPreview}>
                            <CheckCircle size={20} style={styles.checkIcon} />
                            <div>
                              <h4 style={styles.classroomName}>{uiState.classroomPreview.name}</h4>
                              <p style={styles.classroomTutor}>Tutor: {uiState.classroomPreview.tutor}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
  
                {/* Success Message */}
                {uiState.successMessage && <SuccessMessage />}
  
                {/* Error Display */}
                {uiState.error && (
                  <div style={styles.errorBox}>
                    <XCircle size={20} style={styles.errorIcon} />
                    <p style={styles.errorText}>{uiState.error}</p>
                  </div>
                )}
  
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uiState.isLoading}
                  style={{
                    ...styles.submitButton,
                    ...(formData.role === 'tutor' ? styles.submitButtonTutor : {}),
                    ...(uiState.isLoading ? styles.submitButtonDisabled : {})
                  }}
                >
                  {uiState.isLoading ? (
                    <div style={styles.loadingIndicator}>
                      <div style={styles.spinner} />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    `Create ${formData.role === 'tutor' ? 'Tutor' : 'Student'} Account`
                  )}
                </button>
  
                {/* Login Link */}
                <div style={styles.loginLink}>
                  <p style={styles.loginText}>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => handleNavigation('/login')}
                      style={styles.loginButton}
                    >
                      Sign in here
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '3rem 1rem',
    fontFamily: "'Inter', sans-serif"
  },
  cardContainer: {
    maxWidth: '48rem',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0'
  },
  header: {
    background: 'linear-gradient(to right, #2563eb, #4f46e5)',
    padding: '1.5rem 2rem',
    color: 'white',
    textAlign: 'center'
  },
  headerTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    margin: 0
  },
  headerSubtitle: {
    color: '#bfdbfe',
    marginTop: '0.5rem',
    marginBottom: 0
  },
  content: {
    padding: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  section: {
    marginBottom: '1rem'
  },
  sectionLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.75rem'
  },
  roleButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  roleButton: {
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '2px solid #e5e7eb',
    transition: 'all 0.2s',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'white'
  },
  roleButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8'
  },
  roleButtonActiveTutor: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
    color: '#4f46e5'
  },
  roleIcon: {
    margin: '0 auto 0.5rem',
    color: 'inherit'
  },
  roleTitle: {
    fontWeight: '600',
    marginBottom: '0.25rem'
  },
  roleDescription: {
    fontSize: '0.75rem',
    opacity: 0.75
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  inputGroup: {
    marginBottom: '1rem'
  },
  inputLabel: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.2s'
  },
  passwordInput: {
    position: 'relative'
  },
  passwordToggle: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer'
  },
  tutorSection: {
    backgroundColor: '#eef2ff',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #c7d2fe'
  },
  tutorTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#4f46e5',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  tutorIcon: {
    marginRight: '0.5rem'
  },
  toggleSwitch: {
    position: 'relative',
    display: 'inline-block',
    width: '2.75rem',
    height: '1.5rem'
  },
  toggleInput: {
    opacity: 0,
    width: 0,
    height: 0
  },
  toggleSlider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#d1d5db',
    transition: '0.4s',
    borderRadius: '9999px'
  },
  toggleSliderActive: {
    backgroundColor: '#2563eb'
  },
  codeSection: {
    marginTop: '1rem'
  },
  codeInput: {
    position: 'relative'
  },
  codeText: {
    fontFamily: 'monospace',
    textAlign: 'center',
    fontSize: '1.125rem',
    letterSpacing: '0.1em',
    fontWeight: '600'
  },
  codeSpinner: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '1.25rem',
    height: '1.25rem',
    border: '2px solid rgba(59, 130, 246, 0.2)',
    borderTop: '2px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  classroomPreview: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #86efac',
    marginTop: '1rem',
    display: 'flex',
    gap: '0.75rem'
  },
  checkIcon: {
    color: '#22c55e',
    flexShrink: 0
  },
  classroomName: {
    fontWeight: '600',
    color: '#166534',
    margin: 0
  },
  classroomTutor: {
    fontSize: '0.875rem',
    color: '#166534',
    margin: '0.25rem 0 0'
  },
  invalidCode: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid #fca5a5',
    marginTop: '1rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  xIcon: {
    color: '#ef4444',
    flexShrink: 0
  },
  invalidCodeText: {
    fontSize: '0.875rem',
    color: '#b91c1c',
    margin: 0
  },
  successBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #7dd3fc',
    borderRadius: '0.5rem',
    padding: '1rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  successIcon: {
    color: '#0284c7'
  },
  successText: {
    color: '#0c4a6e',
    margin: 0,
    fontWeight: '500'
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    padding: '1rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  errorIcon: {
    color: '#ef4444'
  },
  errorText: {
    color: '#b91c1c',
    margin: 0
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(to right, #2563eb, #4f46e5)',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '1.125rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginTop: '0.5rem'
  },
  submitButtonTutor: {
    background: 'linear-gradient(to right, #6366f1, #4f46e5)'
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed'
  },
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  },
  spinner: {
    width: '1.25rem',
    height: '1.25rem',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loginLink: {
    textAlign: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb'
  },
  loginText: {
    color: '#4b5563',
    margin: 0
  },
  loginButton: {
    color: '#2563eb',
    fontWeight: '600',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'underline'
  }
};

export default RegisterPage;
