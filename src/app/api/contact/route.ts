import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getEmailConfig, validateEmailConfig, getEmailDomain } from '@/lib/emailConfig';
import { createEmailTemplates, type ContactFormData } from '@/lib/emailTemplates';

export async function POST(request: NextRequest) {
    try {
        const { name, subject, phone, email, message } = await request.json();

        // Validate required fields
        if (!name || !subject || !phone || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Get email provider from environment
        const emailProvider = process.env.EMAIL_PROVIDER || 'gmail';
        
        let transporter: nodemailer.Transporter;
        
        try {
            // Get email configuration for the specified provider
            const emailConfig = getEmailConfig(emailProvider);
            
            // Validate email configuration
            if (!validateEmailConfig(emailConfig)) {
                console.error('Invalid email configuration for provider:', emailProvider);
                return NextResponse.json(
                    { error: 'Email service configuration error' },
                    { status: 500 }
                );
            }            // Create transporter with provider-specific configuration
            transporter = nodemailer.createTransport(emailConfig);

            // Verify transporter connection
            await transporter.verify();
            
            console.log(`✅ Email service connected successfully using ${emailProvider.toUpperCase()}`);
        } catch (configError) {
            console.error('Email configuration error:', configError);
            return NextResponse.json(
                { error: `Failed to configure ${emailProvider} email service` },
                { status: 500 }
            );
        }

        // Prepare form data
        const formData: ContactFormData = { name, subject, phone, email, message };
        
        // Get current email user for domain detection
        const emailConfig = getEmailConfig(emailProvider);
        const currentEmailUser = emailConfig.auth.user;
        
        // Create email templates with domain-specific styling
        const { toOwner, toSender } = createEmailTemplates(formData, currentEmailUser);

        // Email options to owner (notification)
        const mailOptionsToOwner = {
            from: currentEmailUser,
            to: currentEmailUser, // Your email to receive messages
            subject: toOwner.subject,
            html: toOwner.html,
        };

        // Auto-reply email to the sender
        const mailOptionsToSender = {
            from: currentEmailUser,
            to: email,
            subject: toSender.subject,
            html: toSender.html,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptionsToOwner),
            transporter.sendMail(mailOptionsToSender)
        ]);

        // Get domain for logging
        const domain = getEmailDomain(currentEmailUser);
        
        console.log(`📧 Emails sent successfully via ${emailProvider.toUpperCase()} (${domain})`);
        console.log(`📤 Owner notification sent to: ${currentEmailUser}`);
        console.log(`📤 Auto-reply sent to: ${email}`);

        return NextResponse.json(
            { 
                message: 'Email sent successfully!',
                provider: emailProvider.toUpperCase(),
                domain: domain.toUpperCase()
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error sending email:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to send email';
        
        if (error instanceof Error) {
            if (error.message.includes('authentication')) {
                errorMessage = 'Email authentication failed. Please check your credentials.';
            } else if (error.message.includes('connection')) {
                errorMessage = 'Failed to connect to email server. Please check your network connection.';
            } else if (error.message.includes('Invalid')) {
                errorMessage = 'Invalid email configuration. Please check your settings.';
            }
        }
        
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}