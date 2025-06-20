import { getEmailDomain } from './emailConfig';

export interface ContactFormData {
  name: string;
  subject: string;
  phone: string;
  email: string;
  message: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
}

// Base email template factory
export const createEmailTemplates = (
  formData: ContactFormData,
  emailUser: string
): { toOwner: EmailTemplate; toSender: EmailTemplate } => {
  const domain = getEmailDomain(emailUser);
  
  // Owner notification email
  const toOwner: EmailTemplate = {
    subject: `New Contact Form Submission: ${formData.subject}`,
    html: generateOwnerEmailTemplate(formData, domain),
  };

  // Auto-reply to sender
  const toSender: EmailTemplate = {
    subject: `Thank you for contacting me, ${formData.name}!`,
    html: generateSenderEmailTemplate(formData, domain),
  };

  return { toOwner, toSender };
};

// Owner email template with domain-specific styling
const generateOwnerEmailTemplate = (formData: ContactFormData, domain: string): string => {
  const domainColors = getDomainColors(domain);
  
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px ${domainColors.primary}15;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${domainColors.primary} 0%, ${domainColors.secondary} 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                🚀 New Contact Form Submission
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
                Someone is interested in your services! (via ${domain.toUpperCase()})
            </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <!-- Contact Details -->
            <div style="background: ${domainColors.primary}1A; border: 1px solid ${domainColors.primary}4D; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 20px 0; color: ${domainColors.primary}; font-size: 20px; display: flex; align-items: center;">
                    👤 Contact Information
                </h2>
                <div style="display: grid; gap: 15px;">
                    <div style="display: flex; align-items: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: ${domainColors.primary}; width: 100px;">Name:</strong>
                        <span style="color: #ffffff;">${formData.name}</span>
                    </div>
                    <div style="display: flex; align-items: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: ${domainColors.secondary}; width: 100px;">Email:</strong>
                        <a href="mailto:${formData.email}" style="color: ${domainColors.secondary}; text-decoration: none;">${formData.email}</a>
                    </div>
                    <div style="display: flex; align-items: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: #FF6B35; width: 100px;">Phone:</strong>
                        <a href="tel:${formData.phone}" style="color: #FF6B35; text-decoration: none;">${formData.phone}</a>
                    </div>
                    <div style="display: flex; align-items: center; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <strong style="color: ${domainColors.primary}; width: 100px;">Service:</strong>
                        <span style="color: #ffffff;">${formData.subject}</span>
                    </div>
                </div>
            </div>
            
            <!-- Message -->
            <div style="background: ${domainColors.secondary}1A; border: 1px solid ${domainColors.secondary}4D; border-radius: 12px; padding: 25px;">
                <h3 style="margin: 0 0 15px 0; color: ${domainColors.secondary}; font-size: 18px; display: flex; align-items: center;">
                    💬 Message
                </h3>
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 20px; line-height: 1.6;">
                    <p style="margin: 0; color: #ffffff; white-space: pre-wrap;">${formData.message}</p>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: rgba(255,255,255,0.05); padding: 20px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 0; color: #cccccc; font-size: 14px;">
                📧 This message was sent from your amananilofficial.com contact form via ${domain.toUpperCase()}
            </p>
            <p style="margin: 5px 0 0 0; color: #999999; font-size: 12px;">
                ${new Date().toLocaleString()}
            </p>
        </div>
    </div>
  `;
};

// Sender auto-reply template with domain-specific styling
const generateSenderEmailTemplate = (formData: ContactFormData, domain: string): string => {
  const domainColors = getDomainColors(domain);
  
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 20px 40px ${domainColors.primary}15;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, ${domainColors.primary} 0%, ${domainColors.secondary} 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                🙏 Thank You, ${formData.name}!
            </h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">
                Your message has been received successfully via ${domain.toUpperCase()}
            </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, ${domainColors.primary} 0%, ${domainColors.secondary} 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 36px;">
                    ✅
                </div>
                <h2 style="margin: 0 0 15px 0; color: #ffffff; font-size: 24px;">
                    Message Received!
                </h2>
                <p style="margin: 0; color: #cccccc; font-size: 16px; line-height: 1.6;">
                    Thank you for reaching out about <strong style="color: ${domainColors.primary};">${formData.subject}</strong>. 
                    I've received your message and will get back to you within 24-48 hours.
                </p>
            </div>
            
            <!-- Message Summary -->
            <div style="background: ${domainColors.primary}1A; border: 1px solid ${domainColors.primary}4D; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h3 style="margin: 0 0 15px 0; color: ${domainColors.primary}; font-size: 18px;">
                    📝 Your Message Summary:
                </h3>
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px;">
                    <p style="margin: 0; color: #ffffff; font-style: italic; white-space: pre-wrap;">"${formData.message.substring(0, 200)}${formData.message.length > 200 ? '...' : ''}"</p>
                </div>
            </div>
            
            <!-- What's Next -->
            <div style="background: ${domainColors.secondary}1A; border: 1px solid ${domainColors.secondary}4D; border-radius: 12px; padding: 25px;">
                <h3 style="margin: 0 0 15px 0; color: ${domainColors.secondary}; font-size: 18px;">
                    🚀 What happens next?
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #cccccc; line-height: 1.8;">
                    <li>I'll review your message and requirements carefully</li>
                    <li>You'll hear back from me within 24-48 hours</li>
                    <li>We can schedule a call to discuss your project in detail</li>
                    <li>I'll provide you with a customized solution proposal</li>
                </ul>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: rgba(255,255,255,0.05); padding: 25px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-weight: bold;">
                🌟 Let's connect on social media!
            </p>
            <div style="margin: 0 0 15px 0;">
                <a href="https://www.github.com/amananilofficial" style="display: inline-block; margin: 0 10px; color: ${domainColors.primary}; text-decoration: none; font-weight: bold;">GitHub</a>
                <a href="https://in.linkedin.com/in/amananilofficial" style="display: inline-block; margin: 0 10px; color: ${domainColors.secondary}; text-decoration: none; font-weight: bold;">LinkedIn</a>
                <a href="https://www.instagram.com/amananilofficial" style="display: inline-block; margin: 0 10px; color:${domainColors.tertiary}; text-decoration: none; font-weight: bold;">Instagram</a>
                <a href="https://www.facebook.com/amananilofficial" style="display: inline-block; margin: 0 10px; color:${domainColors.quaternary}; text-decoration: none; font-weight: bold;">Facebook</a>
            </div>
            <p style="margin: 0; color: #999999; font-size: 12px;">
                📧 This is an automated response via ${domain.toUpperCase()}. Please don't reply to this email.
            </p>
            <p style="margin: 5px 0 0 0; color: #999999; font-size: 12px;">
                ${new Date().toLocaleString()}
            </p>
        </div>
    </div>
  `;
};

// Domain-specific color schemes
const getDomainColors = (domain: string): {
    [x: string]: any; primary: string; secondary: string 
} => {
  const colorSchemes: Record<string, { primary: string; secondary: string }> = {
    gmail: { primary: '#EA4335', secondary: '#4285F4' },
    outlook: { primary: '#0078D4', secondary: '#00BCF2' },
    microsoft365: { primary: '#0078D4', secondary: '#00BCF2' },
    apple: { primary: '#007AFF', secondary: '#34C759' },
    zoho: { primary: '#FF6B35', secondary: '#9D3BE1' },
    proton: { primary: '#6D4AFF', secondary: '#9D3BE1' },
    default: { primary: '#9D3BE1', secondary: '#2BA233' },
  };

  return colorSchemes[domain] || colorSchemes.default;
};