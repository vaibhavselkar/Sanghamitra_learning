import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const ResetPasswordPage = () => {
    const [formState, setFormState] = useState({
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
        isLoading: false,
        message: '',
        messageType: '',
        resetToken: '',
        tokenValid: null,
        resetComplete: false
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        
        if (token) {
            setFormState(prev => ({ ...prev, resetToken: token }));
            verifyToken(token);
        } else {
            setFormState(prev => ({
                ...prev,
                tokenValid: false,
                message: 'No reset token provided',
                messageType: 'error'
            }));
        }
    }, []);

    const verifyToken = async (token) => {
        try {
            const response = await fetch(`http://localhost:4000/api/verify-reset-token?token=${token}`);
            const data = await response.json();
            
            if (response.ok) {
                setFormState(prev => ({ ...prev, tokenValid: true }));
            } else {
                setFormState(prev => ({
                    ...prev,
                    tokenValid: false,
                    message: data.error || 'Invalid or expired reset token',
                    messageType: 'error'
                }));
            }
        } catch (error) {
            console.error('Token verification error:', error);
            setFormState(prev => ({
                ...prev,
                tokenValid: false,
                message: 'Network error. Please try again.',
                messageType: 'error'
            }));
        }
    };

    const handleInputChange = (field, value) => {
        setFormState(prev => ({
            ...prev,
            [field]: value,
            message: '',
            messageType: ''
        }));
    };

    const togglePasswordVisibility = (field) => {
        setFormState(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        return null;
    };

    const handleSubmit = async () => {
        const { password, confirmPassword, resetToken } = formState;

        // Validation
        if (!password.trim()) {
            setFormState(prev => ({
                ...prev,
                message: 'Please enter a new password',
                messageType: 'error'
            }));
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setFormState(prev => ({
                ...prev,
                message: passwordError,
                messageType: 'error'
            }));
            return;
        }

        if (password !== confirmPassword) {
            setFormState(prev => ({
                ...prev,
                message: 'Passwords do not match',
                messageType: 'error'
            }));
            return;
        }

        setFormState(prev => ({ ...prev, isLoading: true, message: '' }));

        try {
            const response = await fetch('http://localhost:4000/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: resetToken,
                    newPassword: password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setFormState(prev => ({
                    ...prev,
                    isLoading: false,
                    resetComplete: true,
                    message: data.message || 'Password reset successfully!',
                    messageType: 'success'
                }));

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    window.location.href = '/login?reset=true';
                }, 3000);
            } else {
                setFormState(prev => ({
                    ...prev,
                    isLoading: false,
                    message: data.error || 'Failed to reset password',
                    messageType: 'error'
                }));
            }
        } catch (error) {
            console.error('Reset password error:', error);
            setFormState(prev => ({
                ...prev,
                isLoading: false,
                message: 'Network error. Please try again.',
                messageType: 'error'
            }));
        }
    };

    const handleBackToLogin = () => {
        window.location.href = '/login';
    };

    const handleGoToForgotPassword = () => {
        window.location.href = '/forgot-password';
    };

    // Loading state while verifying token
    if (formState.tokenValid === null) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Lock size={32} style={styles.headerIcon} />
                        <h2 style={styles.headerTitle}>Reset Password</h2>
                    </div>
                    <div style={styles.content}>
                        <div style={styles.loadingContainer}>
                            <div style={styles.loadingSpinner} />
                            <p style={styles.loadingText}>Verifying reset link...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Reset complete state
    if (formState.resetComplete) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Lock size={32} style={styles.headerIcon} />
                        <h2 style={styles.headerTitle}>Password Reset Complete</h2>
                    </div>
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <CheckCircle size={64} style={styles.successIcon} />
                        </div>
                        <h1 style={styles.successTitle}>Password Updated!</h1>
                        <p style={styles.message}>
                            Your password has been successfully updated. You can now log in with your new password.
                        </p>
                        <div style={styles.redirectMessage}>
                            <div style={styles.miniSpinner} />
                            <span>Redirecting to login page in 3 seconds...</span>
                        </div>
                        <button
                            onClick={handleBackToLogin}
                            style={styles.primaryButton}
                        >
                            <ArrowRight size={20} style={styles.buttonIcon} />
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (formState.tokenValid === false) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Lock size={32} style={styles.headerIcon} />
                        <h2 style={styles.headerTitle}>Reset Link Invalid</h2>
                    </div>
                    <div style={styles.content}>
                        <div style={styles.iconContainer}>
                            <XCircle size={64} style={styles.errorIcon} />
                        </div>
                        <h1 style={styles.errorTitle}>Link Expired or Invalid</h1>
                        <p style={styles.message}>
                            {formState.message}
                        </p>
                        <p style={styles.subMessage}>
                            This could happen if the link has expired (links are valid for 1 hour) 
                            or if it has already been used.
                        </p>
                        <div style={styles.actionButtons}>
                            <button
                                onClick={handleGoToForgotPassword}
                                style={styles.primaryButton}
                            >
                                Request New Link
                            </button>
                            <button
                                onClick={handleBackToLogin}
                                style={styles.secondaryButton}
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main reset password form
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <Lock size={32} style={styles.headerIcon} />
                    <h2 style={styles.headerTitle}>Reset Your Password</h2>
                </div>
                
                <div style={styles.content}>
                    <div style={styles.description}>
                        <p style={styles.descriptionText}>
                            Please enter your new password. Make sure it's at least 6 characters long 
                            and something you'll remember.
                        </p>
                    </div>

                    <div style={styles.formContainer}>
                        <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>New Password</label>
                            <div style={styles.passwordInput}>
                                <input
                                    type={formState.showPassword ? 'text' : 'password'}
                                    value={formState.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    style={styles.input}
                                    placeholder="Enter new password"
                                    disabled={formState.isLoading}
                                />
                                <button
                                    onClick={() => togglePasswordVisibility('showPassword')}
                                    style={styles.passwordToggle}
                                    disabled={formState.isLoading}
                                >
                                    {formState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.inputLabel}>Confirm New Password</label>
                            <div style={styles.passwordInput}>
                                <input
                                    type={formState.showConfirmPassword ? 'text' : 'password'}
                                    value={formState.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    style={styles.input}
                                    placeholder="Confirm new password"
                                    disabled={formState.isLoading}
                                />
                                <button
                                    onClick={() => togglePasswordVisibility('showConfirmPassword')}
                                    style={styles.passwordToggle}
                                    disabled={formState.isLoading}
                                >
                                    {formState.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
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
                            disabled={formState.isLoading || !formState.password.trim() || !formState.confirmPassword.trim()}
                            style={{
                                ...styles.submitButton,
                                ...(formState.isLoading || !formState.password.trim() || !formState.confirmPassword.trim() ? styles.submitButtonDisabled : {})
                            }}
                        >
                            {formState.isLoading ? (
                                <div style={styles.loadingIndicator}>
                                    <div style={styles.spinner} />
                                    <span>Updating Password...</span>
                                </div>
                            ) : (
                                <>
                                    <Lock size={20} style={styles.buttonIcon} />
                                    Update Password
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
    passwordInput: {
        position: 'relative'
    },
    input: {
        width: '100%',
        padding: '0.75rem 1rem',
        paddingRight: '3rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    },
    passwordToggle: {
        position: 'absolute',
        right: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#6b7280',
        cursor: 'pointer',
        padding: '0.25rem'
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
        fontSize: '0.875rem',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        transition: 'color 0.2s'
    },
    loadingContainer: {
        textAlign: 'center',
        padding: '2rem'
    },
    loadingSpinner: {
        width: '3rem',
        height: '3rem',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #dc2626',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
    },
    loadingText: {
        color: '#6b7280',
        margin: 0
    },
    iconContainer: {
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'center'
    },
    successIcon: {
        color: '#10b981'
    },
    errorIcon: {
        color: '#ef4444'
    },
    successTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#059669',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    errorTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#dc2626',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    message: {
        color: '#6b7280',
        marginBottom: '1rem',
        lineHeight: '1.6',
        textAlign: 'center'
    },
    subMessage: {
        color: '#9ca3af',
        marginBottom: '1.5rem',
        lineHeight: '1.6',
        textAlign: 'center',
        fontSize: '0.875rem'
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
    miniSpinner: {
        width: '1rem',
        height: '1rem',
        border: '2px solid rgba(107, 114, 128, 0.3)',
        borderTop: '2px solid #6b7280',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
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
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
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

export default ResetPasswordPage;