import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

const EmailVerificationPage = () => {
    const [verificationState, setVerificationState] = useState({
        status: 'verifying', // 'verifying', 'success', 'error', 'expired'
        message: '',
        isLoading: false,
        userEmail: '',
        canResend: false
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
            verifyEmail(token);
        } else {
            setVerificationState({
                status: 'error',
                message: 'No verification token provided',
                isLoading: false,
                userEmail: '',
                canResend: false
            });
        }
    }, []);

    const verifyEmail = async (token) => {
        setVerificationState(prev => ({ ...prev, status: 'verifying', isLoading: true }));
        
        try {
            console.log('Verifying token:', token); // Debug log
            const response = await fetch(`http://localhost:4000/api/verify-email?token=${token}`);
            const data = await response.json();
            
            console.log('Verification response:', response.status, data); // Debug log
            
            if (response.ok) {
                // Set success state first
                setVerificationState({
                    status: 'success',
                    message: data.message || 'Email verified successfully!',
                    isLoading: false,
                    userEmail: '',
                    canResend: false
                });
                
                // Start countdown
                let countdown = 1;
                const countdownInterval = setInterval(() => {
                    countdown--;
                    setVerificationState(prev => ({
                        ...prev,
                        message: `Redirecting in ${countdown} seconds...`
                    }));
                    
                    if (countdown <= 0) {
                        clearInterval(countdownInterval);
                        window.location.href = '/login?verified=true&message=' + encodeURIComponent('Email verified successfully!');
                    }
                }, 1000);
                
                return; // Stop further execution
            } else {
                const isExpired = data.error?.includes('expired') || data.error?.includes('Invalid');
                setVerificationState({
                    status: isExpired ? 'expired' : 'error',
                    message: data.error || 'Verification failed',
                    isLoading: false,
                    userEmail: '',
                    canResend: isExpired
                });
            }
        } catch (error) {
            console.error('Verification error:', error);
            setVerificationState({
                status: 'error',
                message: 'Network error. Please check if the server is running.',
                isLoading: false,
                userEmail: '',
                canResend: false
            });
        }
    };

    const handleResendVerification = async () => {
        if (!verificationState.userEmail) {
            setVerificationState(prev => ({ 
                ...prev, 
                message: 'Please enter your email address to resend verification'
            }));
            return;
        }

        setVerificationState(prev => ({ ...prev, isLoading: true }));
        
        try {
            const response = await fetch('http://localhost:4000/api/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: verificationState.userEmail }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setVerificationState(prev => ({
                    ...prev,
                    message: `Verification email resent to ${verificationState.userEmail}. Please check your inbox.`,
                    isLoading: false,
                    canResend: false
                }));
            } else {
                setVerificationState(prev => ({
                    ...prev,
                    message: data.error || 'Failed to resend verification email',
                    isLoading: false
                }));
            }
        } catch (error) {
            setVerificationState(prev => ({
                ...prev,
                message: 'Network error. Please try again.',
                isLoading: false
            }));
        }
    };

    const handleEmailChange = (e) => {
        setVerificationState(prev => ({
            ...prev,
            userEmail: e.target.value
        }));
    };

    const handleNavigation = (path) => {
        window.location.href = path;
    };

    const renderContent = () => {
        switch (verificationState.status) {
            case 'verifying':
                return (
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <div style={styles.loadingSpinner} />
                        </div>
                        <h1 style={styles.title}>Verifying Your Email</h1>
                        <p style={styles.message}>
                            Please wait while we verify your email address...
                        </p>
                    </div>
                );

            case 'success':
                return (
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <CheckCircle size={64} style={styles.successIcon} />
                        </div>
                        <h1 style={styles.successTitle}>Email Verified Successfully!</h1>
                        <p style={styles.message}>
                            {verificationState.message}
                        </p>
                        <p style={styles.subMessage}>
                            You can now log in to your Sanghamitra account.
                        </p>
                        <div style={styles.redirectMessage}>
                            <div style={styles.miniSpinner} />
                            <span>Redirecting to login page in 1 seconds...</span>
                        </div>
                        <button 
                            onClick={() => handleNavigation('/login?verified=true')}
                            style={styles.primaryButton}
                        >
                            Go to Login <ArrowRight size={20} style={styles.buttonIcon} />
                        </button>
                    </div>
                );

            case 'expired':
                return (
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <XCircle size={64} style={styles.errorIcon} />
                        </div>
                        <h1 style={styles.errorTitle}>Verification Link Expired</h1>
                        <p style={styles.message}>
                            Your verification link has expired or is invalid. 
                            Don't worry, we can send you a new one!
                        </p>
                        
                        <div style={styles.resendSection}>
                            <div style={styles.inputGroup}>
                                <label style={styles.inputLabel}>Email Address</label>
                                <input
                                    type="email"
                                    value={verificationState.userEmail}
                                    onChange={handleEmailChange}
                                    style={styles.emailInput}
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                            
                            <button 
                                onClick={handleResendVerification}
                                disabled={verificationState.isLoading || !verificationState.userEmail}
                                style={{
                                    ...styles.resendButton,
                                    ...(verificationState.isLoading || !verificationState.userEmail ? styles.buttonDisabled : {})
                                }}
                            >
                                {verificationState.isLoading ? (
                                    <div style={styles.buttonLoading}>
                                        <div style={styles.miniSpinner} />
                                        <span>Sending...</span>
                                    </div>
                                ) : (
                                    <>
                                        <RefreshCw size={20} style={styles.buttonIcon} />
                                        Resend Verification Email
                                    </>
                                )}
                            </button>
                        </div>
                        
                        <div style={styles.helpText}>
                            <p>Still having trouble? <a href="/support" style={styles.link}>Contact Support</a></p>
                        </div>
                    </div>
                );

            case 'error':
            default:
                return (
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <XCircle size={64} style={styles.errorIcon} />
                        </div>
                        <h1 style={styles.errorTitle}>Verification Failed</h1>
                        <p style={styles.message}>
                            {verificationState.message}
                        </p>
                        
                        <div style={styles.actionButtons}>
                            <button 
                                onClick={() => handleNavigation('/register')}
                                style={styles.secondaryButton}
                            >
                                Back to Registration
                            </button>
                            <button 
                                onClick={() => handleNavigation('/login')}
                                style={styles.primaryButton}
                            >
                                Go to Login
                            </button>
                        </div>
                        
                        <div style={styles.helpText}>
                            <p>Need help? <a href="/support" style={styles.link}>Contact Support</a></p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <Mail size={32} style={styles.headerIcon} />
                    <h2 style={styles.headerTitle}>Email Verification</h2>
                </div>
                
                {renderContent()}
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
        maxWidth: '32rem',
        width: '100%'
    },
    header: {
        background: 'linear-gradient(to right, #2563eb, #4f46e5)',
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
        padding: '3rem 2rem',
        textAlign: 'center'
    },
    iconContainer: {
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '1rem'
    },
    successTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#059669',
        marginBottom: '1rem'
    },
    errorTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#dc2626',
        marginBottom: '1rem'
    },
    message: {
        color: '#6b7280',
        marginBottom: '1rem',
        lineHeight: '1.6'
    },
    subMessage: {
        color: '#374151',
        marginBottom: '1.5rem',
        fontWeight: '500'
    },
    successIcon: {
        color: '#10b981'
    },
    errorIcon: {
        color: '#ef4444'
    },
    loadingSpinner: {
        width: '3rem',
        height: '3rem',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    miniSpinner: {
        width: '1rem',
        height: '1rem',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #2563eb',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    redirectMessage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        color: '#6b7280',
        fontSize: '0.875rem',
        marginBottom: '1.5rem'
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem'
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
        fontSize: '1rem'
    },
    resendButton: {
        background: 'linear-gradient(to right, #059669, #10b981)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        width: '100%',
        justifyContent: 'center'
    },
    buttonDisabled: {
        opacity: 0.6,
        cursor: 'not-allowed'
    },
    buttonIcon: {
        flexShrink: 0
    },
    buttonLoading: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    actionButtons: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap'
    },
    resendSection: {
        backgroundColor: '#f9fafb',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem'
    },
    inputGroup: {
        marginBottom: '1rem',
        textAlign: 'left'
    },
    inputLabel: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.5rem'
    },
    emailInput: {
        width: '100%',
        padding: '0.75rem 1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    },
    helpText: {
        fontSize: '0.875rem',
        color: '#6b7280'
    },
    link: {
        color: '#2563eb',
        textDecoration: 'none',
        fontWeight: '500'
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

export default EmailVerificationPage;