import crypto from 'crypto';
import nodemailer from 'nodemailer';

// First, let's set up the Nodemailer configuration with Brevo
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '8daf85001@smtp-brevo.com',
      pass: 'c1bHsRVQqywjv7np'
    }
  });
};

// Generate secure reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Create password reset email template
const createResetEmailTemplate = (resetUrl, username) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Password Reset Request</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .button { 
                display: inline-block; 
                background-color: #007bff; 
                color: white; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 4px; 
                margin: 20px 0;
            }
            .footer { font-size: 12px; color: #666; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <p>Hello ${username},</p>
                <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
                <p>To reset your password, click the button below:</p>
                <a href="${resetUrl}" class="button">Reset Password</a>
                <p>Or copy and paste this link into your browser:</p>
                <p><a href="${resetUrl}">${resetUrl}</a></p>
                <p>This link will expire in 1 hour for security reasons.</p>
                <div class="footer">
                    <p>If you're having trouble clicking the button, copy and paste the URL above into your web browser.</p>
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Simulate sending email (in real implementation, this would actually send)
const sendResetEmail = async (email, resetUrl, username) => {
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: 'lautibacega@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: createResetEmailTemplate(resetUrl, username)
  };

  try {
    // In a real implementation, you would uncomment the next line
    // const info = await transporter.sendMail(mailOptions);
    console.log('Email would be sent to:', email);
    console.log('Reset URL:', resetUrl);
    console.log('Email template generated successfully');
    return { success: true, message: 'Reset email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send reset email' };
  }
};

// Demo the functionality
console.log('=== Password Reset System Demo ===\n');

// 1. Generate a secure token
const resetToken = generateResetToken();
console.log('1. Generated secure reset token:', resetToken);

// 2. Create reset URL (would include your domain)
const resetUrl = `https://yourapp.com/reset-password?token=${resetToken}`;
console.log('2. Reset URL created:', resetUrl);

// 3. Demo email sending
const demoUser = {
  email: 'user@example.com',
  username: 'johndoe'
};

console.log('\n3. Sending password reset email...');
await sendResetEmail(demoUser.email, resetUrl, demoUser.username);

console.log('\n=== Implementation Files Required ===');
console.log('The following files need to be updated/created:');
console.log('- user.model.js (add reset token fields)');
console.log('- auth.controller.js (add reset functions)');
console.log('- auth.route.js (add reset routes)');
console.log('- email.service.js (email configuration)');