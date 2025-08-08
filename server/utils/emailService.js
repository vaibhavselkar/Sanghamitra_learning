// utils/emailService.js
const nodemailer = require('nodemailer');

// Create transporter (configure based on your email provider)
const createTransporter = () => {
    // For development, you can use Gmail or other SMTP services
    // For production, consider using services like SendGrid, AWS SES, etc.
    
    if (process.env.NODE_ENV === 'production') {
        // Production configuration (example with SendGrid)
        return nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        });
    } else {
        // Development configuration (Gmail example)
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD // Use App Password for Gmail
            }
        });
    }
};

const sendVerificationEmail = async (email, token, userName) => {
    try {
        const transporter = createTransporter();
        
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
        
        const mailOptions = {
            from: {
                name: 'Sanghamitra Learning Platform',
                address: process.env.EMAIL_FROM || process.env.EMAIL_USER
            },
            to: email,
            subject: 'Verify Your Sanghamitra Account',
            html: generateVerificationEmailTemplate(userName, verificationUrl),
            text: `
                Hi ${userName},
                
                Welcome to Sanghamitra! Please verify your email address by clicking the link below:
                
                ${verificationUrl}
                
                This link will expire in 24 hours.
                
                If you didn't create an account with us, please ignore this email.
                
                Best regards,
                The Sanghamitra Team
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully:', result.messageId);
        return result;
        
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

const generateVerificationEmailTemplate = (userName, verificationUrl) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #374151;
                background-color: #f8fafc;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(to right, #2563eb, #4f46e5);
                padding: 2rem;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 1.875rem;
                font-weight: bold;
            }
            .content {
                padding: 2rem;
            }
            .welcome-text {
                font-size: 1.125rem;
                margin-bottom: 1.5rem;
                color: #1f2937;
            }
            .verify-button {
                display: inline-block;
                background: linear-gradient(to right, #2563eb, #4f46e5);
                color: white;
                padding: 0.875rem 2rem;
                text-decoration: none;
                border-radius: 0.5rem;
                font-weight: 600;
                font-size: 1.125rem;
                margin: 1.5rem 0;
                transition: transform 0.2s;
            }
            .verify-button:hover {
                transform: translateY(-1px);
            }
            .warning-text {
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 0.5rem;
                padding: 1rem;
                margin: 1.5rem 0;
                font-size: 0.875rem;
            }
            .footer {
                background-color: #f9fafb;
                padding: 1.5rem;
                text-align: center;
                font-size: 0.875rem;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }
            .footer a {
                color: #2563eb;
                text-decoration: none;
            }
            @media (max-width: 600px) {
                .container {
                    margin: 1rem;
                    border-radius: 8px;
                }
                .header, .content {
                    padding: 1.5rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Sanghamitra!</h1>
            </div>
            
            <div class="content">
                <p class="welcome-text">Hi ${userName},</p>
                
                <p>Thank you for joining Sanghamitra Learning Platform! We're excited to have you as part of our community.</p>
                
                <p>To complete your registration and start your learning journey, please verify your email address by clicking the button below:</p>
                
                <div style="text-align: center;">
                    <a href="${verificationUrl}" class="verify-button">Verify My Email</a>
                </div>
                
                <div class="warning-text">
                    <strong>⚠️ Important:</strong> This verification link will expire in 24 hours. If you don't verify your email within this time, you'll need to request a new verification email.
                </div>
                
                <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #2563eb; font-family: monospace; background-color: #f3f4f6; padding: 0.5rem; border-radius: 0.25rem;">
                    ${verificationUrl}
                </p>
                
                <p>If you didn't create an account with Sanghamitra, please ignore this email and no further action is required.</p>
                
                <p>Happy learning!<br>
                <strong>The Sanghamitra Team</strong></p>
            </div>
            
            <div class="footer">
                <p>
                    Need help? Contact us at 
                    <a href="mailto:support@sanghamitra.edu">support@sanghamitra.edu</a>
                </p>
                <p>© 2025 Sanghamitra Learning Platform. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const sendPasswordResetEmail = async (email, resetToken, userName) => {
    try {
        const transporter = createTransporter();
        
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        const mailOptions = {
            from: {
                name: 'Sanghamitra Learning Platform',
                address: process.env.EMAIL_FROM || process.env.EMAIL_USER
            },
            to: email,
            subject: 'Reset Your Sanghamitra Password',
            html: generatePasswordResetTemplate(userName, resetUrl),
            text: `
                Hi ${userName},
                
                We received a request to reset your password for your Sanghamitra account.
                
                Click the link below to reset your password:
                ${resetUrl}
                
                This link will expire in 1 hour.
                
                If you didn't request a password reset, please ignore this email.
                
                Best regards,
                The Sanghamitra Team
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully:', result.messageId);
        return result;
        
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};

const generatePasswordResetTemplate = (userName, resetUrl) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #374151;
                background-color: #f8fafc;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(to right, #dc2626, #ef4444);
                padding: 2rem;
                text-align: center;
                color: white;
            }
            .header h1 {
                margin: 0;
                font-size: 1.875rem;
                font-weight: bold;
            }
            .content {
                padding: 2rem;
            }
            .reset-button {
                display: inline-block;
                background: linear-gradient(to right, #dc2626, #ef4444);
                color: white;
                padding: 0.875rem 2rem;
                text-decoration: none;
                border-radius: 0.5rem;
                font-weight: 600;
                font-size: 1.125rem;
                margin: 1.5rem 0;
                transition: transform 0.2s;
            }
            .reset-button:hover {
                transform: translateY(-1px);
            }
            .warning-text {
                background-color: #fef3c7;
                border: 1px solid #f59e0b;
                border-radius: 0.5rem;
                padding: 1rem;
                margin: 1.5rem 0;
                font-size: 0.875rem;
            }
            .footer {
                background-color: #f9fafb;
                padding: 1.5rem;
                text-align: center;
                font-size: 0.875rem;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset</h1>
            </div>
            
            <div class="content">
                <p>Hi ${userName},</p>
                
                <p>We received a request to reset the password for your Sanghamitra account.</p>
                
                <p>Click the button below to reset your password:</p>
                
                <div style="text-align: center;">
                    <a href="${resetUrl}" class="reset-button">Reset My Password</a>
                </div>
                
                <div class="warning-text">
                    <strong>⚠️ Important:</strong> This link will expire in 1 hour for security reasons.
                </div>
                
                <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
                
                <p>For security reasons, we recommend that you:</p>
                <ul>
                    <li>Use a strong, unique password</li>
                    <li>Don't share your password with anyone</li>
                    <li>Log out from shared devices</li>
                </ul>
            </div>
            
            <div class="footer">
                <p>© 2025 Sanghamitra Learning Platform. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail
};