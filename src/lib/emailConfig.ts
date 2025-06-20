// Email service provider configurations
export interface EmailProvider {
  service?: string;
  host?: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized?: boolean;
  };
}

export const getEmailConfig = (provider: string): EmailProvider => {
  const configs: Record<string, () => EmailProvider> = {
    gmail: () => ({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER || process.env.EMAIL_USER || '',
        pass: process.env.GMAIL_PASS || process.env.EMAIL_PASS || '',
      },
    }),

    outlook: () => ({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_USER || process.env.EMAIL_USER || '',
        pass: process.env.OUTLOOK_PASS || process.env.EMAIL_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),

    microsoft365: () => ({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.OUTLOOK_USER || process.env.EMAIL_USER || '',
        pass: process.env.OUTLOOK_PASS || process.env.EMAIL_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),

    apple: () => ({
      host: 'smtp.mail.me.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.APPLE_USER || process.env.EMAIL_USER || '',
        pass: process.env.APPLE_PASS || process.env.EMAIL_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),

    zoho: () => ({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.ZOHO_USER || process.env.EMAIL_USER || '',
        pass: process.env.ZOHO_PASS || process.env.EMAIL_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),

    proton: () => ({
      host: process.env.PROTON_HOST || '127.0.0.1',
      port: parseInt(process.env.PROTON_PORT || '1025'),
      secure: false,
      auth: {
        user: process.env.PROTON_USER || process.env.EMAIL_USER || '',
        pass: process.env.PROTON_PASS || process.env.EMAIL_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    }),
  };

  const configFunction = configs[provider.toLowerCase()];
  if (!configFunction) {
    throw new Error(`Unsupported email provider: ${provider}`);
  }

  return configFunction();
};

export const getSupportedProviders = (): string[] => {
  return ['gmail', 'outlook', 'microsoft365', 'apple', 'zoho', 'proton'];
};

export const validateEmailConfig = (config: EmailProvider): boolean => {
  return !!(config.auth.user && config.auth.pass);
};

// Get email domain from the configured user
export const getEmailDomain = (emailUser: string): string => {
  const domain = emailUser.split('@')[1];
  if (!domain) return 'unknown';
  
  // Map domains to folder names
  const domainMap: Record<string, string> = {
    'gmail.com': 'gmail',
    'outlook.com': 'outlook',
    'hotmail.com': 'outlook',
    'live.com': 'outlook',
    'office365.com': 'microsoft365',
    'me.com': 'apple',
    'icloud.com': 'apple',
    'mac.com': 'apple',
    'zoho.com': 'zoho',
    'zohomail.com': 'zoho',
    'protonmail.com': 'proton',
    'pm.me': 'proton',
  };
  
  return domainMap[domain] || domain.replace('.', '_');
};