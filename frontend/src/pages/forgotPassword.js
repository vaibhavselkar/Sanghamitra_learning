import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle, XCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [formState, setFormState] = useState({
        email: '',
        isLoading: false,
        message: '',
        messageType: '', // 'success' or 'error'
        emailSent: false
    });

    const handleEmailChange = (e) => {
        setFormState(prev => ({
            ...prev,
            email: e.target.value,
            message: '',
            messageType: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formState.email.trim()) {
            setFormState(prev => ({
                ...prev,
                message: 'Please enter your email address',
                messageType: 'error'
            }));
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            setFormState(prev => ({
                ...prev,
                message: 'Please enter a valid email address',
                messageType: 'error'
            }));
            return;
        }

        setFormState(prev => ({ ...prev, isLoading: true, message: '' }));

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formState.email.trim().toLowerCase() }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormState(prev => ({
                    ...prev,
                    isLoading: false,
                    emailSent: true,
                    message: data.message || `Password reset email sent to ${formState.email}`,
                    messageType: 'success'
                }));
            } else {
                setFormState(prev => ({
                    ...prev,
                    isLoading: false,
                    message: data.error || 'Failed to send reset email',
                    messageType: 'error'
                }));
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            setFormState(prev => ({
                ...prev,
                isLoading: false,
                message: 'Network error. Please check if the server is running.',
                messageType: 'error'
            }));
        }
    };

    const handleBackToLogin = () => {
        window.location.href = '/login';
    };

    const handleTryAgain = () => {
        setFormState({
            email: '',
            isLoading: false,
            message: '',
            messageType: '',
            emailSent: false
        });
    };

    if (formState.emailSent) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Mail size={32} style={styles.headerIcon} />
                        <h2 style={styles.headerTitle}>Check Your Email</h2>
                    </div>
                    
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <CheckCircle size={64} style={styles.successIcon} />
                        </div>
                        
                        <h1 style={styles.successTitle}>Reset Email Sent!</h1>
                        
                        <p style={styles.message}>
                            We've sent a password reset link to:
                        </p>
                        
                        <div style={styles.emailDisplay}>
                            <strong>{formState.email}</strong>
                        </div>
                        
                        <div style={styles.instructionBox}>
                            <h3 style={styles.instructionTitle}>What's next?</h3>
                            <ul style={styles.instructionList}>
                                <li>Check your email inbox (and spam folder)</li>
                                <li>Click the "Reset Password" link in the email</li>
                                <li>Create your new password</li>
                                <li>Sign in with your new password</li>
                            </ul>
                        </div>
                        
                        <div style={styles.actionButtons}>
                            <button
                                onClick={handleTryAgain}
                                style={styles.secondaryButton}
                            >
                                Try Different Email
                            </button>
                            <button
                                onClick={handleBackToLogin}
                                style={styles.primaryButton}
                            >
                                Back to Login
                            </button>
                        </div>
                        
                        <div style={styles.helpText}>
                            <p>
                                Didn't receive the email? Check your spam folder, or{' '}
                                <button
                                    onClick={handleTryAgain}
                                    style={styles.linkButton}
                                >
                                    try again
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <Mail size={32} style={styles.headerIcon} />
                    <h2 style={styles.headerTitle}>Forgot Password?</h2>
                </div>
                
                <div style={styles.content}>
                    <div style={styles.description}>
                        <p style={styles.descriptionText}>
                            Don't worry! It happens to the best of us. Enter your email address below 
                            and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <div style={styles.formContainer}>
                        <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Email Address</label>
                            <input
                                type="email"
                                value={formState.email}
                                onChange={handleEmailChange}
                                style={styles.input}
                                placeholder="Enter your email address"
                                disabled={formState.isLoading}
                                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                            />
                        </div>

                        {formState.message && (
                            <div style={{
                                ...styles.messageBox,
                                ...(formState.messageType === 'success' ? styles.successBox : styles.errorBox)
                            }}>
                                {formState.messageType === 'success' ? (
                                    <CheckCircle size={20} style={styles.messageIcon} />
                                ) : (
                                    <XCircle size={20} style={styles.messageIcon} />
                                )}
                                <p style={styles.messageText}>{formState.message}</p>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={formState.isLoading || !formState.email.trim()}
                            style={{
                                ...styles.submitButton,
                                ...(formState.isLoading || !formState.email.trim() ? styles.submitButtonDisabled : {})
                            }}
                        >
                            {formState.isLoading ? (
                                <div style={styles.loadingIndicator}>
                                    <div style={styles.spinner} />
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                <>
                                    <Send size={20} style={styles.buttonIcon} />
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </div>

                    <div style={styles.backLink}>
                        <button
                            onClick={handleBackToLogin}
                            style={styles.backButton}
                            disabled={formState.isLoading}
                        >
                            <ArrowLeft size={20} style={styles.buttonIcon} />
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        maxWidth: '28rem',
        width: '100%'
    },
    header: {
        background: 'linear-gradient(to right, #dc2626, #ef4444)',
        padding: '1.5rem 2rem',
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem'
    },
    headerIcon: {
        color: 'white'
    },
    headerTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        margin: 0
    },
    content: {
        padding: '2rem'
    },
    description: {
        marginBottom: '2rem',
        textAlign: 'center'
    },
    descriptionText: {
        color: '#6b7280',
        lineHeight: '1.6',
        margin: 0
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputLabel: {
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
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    },
    messageBox: {
        padding: '1rem',
        borderRadius: '0.5rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start'
    },
    successBox: {
        backgroundColor: '#f0f9ff',
        border: '1px solid #7dd3fc'
    },
    errorBox: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca'
    },
    messageIcon: {
        flexShrink: 0,
        marginTop: '0.125rem'
    },
    messageText: {
        margin: 0,
        fontSize: '0.875rem',
        color: '#374151'
    },
    submitButton: {
        background: 'linear-gradient(to right, #dc2626, #ef4444)',
        color: 'white',
        padding: '0.875rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
    },
    submitButtonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed'
    },
    loadingIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    spinner: {
        width: '1rem',
        height: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    buttonIcon: {
        flexShrink: 0
    },
    backLink: {
        textAlign: 'center',
        marginTop: '1.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #e5e7eb'
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: '#6b7280',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        transition: 'color 0.2s',
        margin: '0 auto'
    },
    iconContainer: {
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'center'
    },
    successIcon: {
        color: '#10b981'
    },
    successTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#059669',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    message: {
        color: '#6b7280',
        marginBottom: '1rem',
        lineHeight: '1.6',
        textAlign: 'center'
    },
    emailDisplay: {
        backgroundColor: '#f3f4f6',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: '#1f2937'
    },
    instructionBox: {
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem'
    },
    instructionTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '0.75rem'
    },
    instructionList: {
        margin: 0,
        paddingLeft: '1.25rem',
        color: '#6b7280',
        fontSize: '0.875rem',
        lineHeight: '1.6'
    },
    actionButtons: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem'
    },
    primaryButton: {
        background: 'linear-gradient(to right, #2563eb, #4f46e5)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '0.875rem',
        flex: 1
    },
    secondaryButton: {
        background: 'white',
        color: '#374151',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        border: '1px solid #d1d5db',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '0.875rem',
        flex: 1
    },
    helpText: {
        fontSize: '0.875rem',
        color: '#6b7280',
        textAlign: 'center'
    },
    linkButton: {
        background: 'none',
        border: 'none',
        color: '#2563eb',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: 'inherit',
        padding: 0
    }
};

// Add keyframes for spinner animation
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);


export default ForgotPasswordPage;

