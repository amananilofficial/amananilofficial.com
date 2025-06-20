# 🚀 Aman Anil - Digital Specialist amananilofficial.com

[![](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js&logoColor=white)](https://nextjs.org/) [![](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![](https://img.shields.io/badge/Framer_Motion-12.18.1-pink?logo=framer&logoColor=white)](https://www.framer.com/motion/) [![](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/) [![](https://img.shields.io/badge/React_Markdown-10.1.0-orange?logo=markdown&logoColor=white)](https://github.com/remarkjs/react-markdown) [![](https://img.shields.io/badge/React_Icons-5.5.0-red?logo=react&logoColor=white)](https://react-icons.github.io/react-icons/) [![](https://img.shields.io/badge/Nodemailer-7.0.3-brightgreen?logo=nodemailer&logoColor=white)](https://nodemailer.com/)

> **A modern, responsive amananilofficial.com website showcasing cybersecurity expertise, full-stack development skills, and AI/ML projects.**

## 🌟 Live Demo

🔗 **[View Live amananilofficial.com](https://your-domain.com)** *(Replace with your actual domain)*

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Configuration](#️-configuration)
- [🎨 Customization](#-customization)
- [📡 API Routes](#-api-routes)
- [🔧 Environment Variables](#-environment-variables)
- [📱 Responsive Design](#-responsive-design)
- [🎭 Animations](#-animations)
- [📧 Contact Form](#-contact-form)
- [🐙 GitHub Integration](#-github-integration)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

## 🌟 Features

### 🎯 Core Features
- **Modern Design**: Clean, professional layout with dark theme and gradient accents
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Dynamic Content**: Projects automatically fetched from GitHub repositories
- **Interactive Animations**: Smooth transitions and engaging micro-interactions
- **Contact Form**: Functional contact form with email integration
- **SEO Optimized**: Meta tags, structured data, and performance optimized

### 🔐 Specialized Sections
- **Cybersecurity amananilofficial.com**: Showcase of security research and projects
- **AI/ML Projects**: Machine learning and artificial intelligence work
- **Full-Stack Development**: Web applications and system architecture
- **Digital Forensics**: Incident response and forensic analysis tools
- **Penetration Testing**: Ethical hacking and vulnerability assessment

### 🎨 UI/UX Features
- **Smooth Scrolling**: Seamless navigation between sections
- **Loading States**: Professional loading indicators
- **Error Handling**: Graceful error states and fallbacks
- **Type Safety**: Full TypeScript implementation
- **Accessibility**: WCAG compliant design patterns

### 📊 Dynamic Content
- **GitHub Integration**: Automatic project fetching from repositories
- **README Parsing**: Extract project descriptions and images
- **Technology Detection**: Automatic tech stack identification
- **Project Categorization**: Smart categorization based on content
- **Status Tracking**: Live, completed, and in-progress project states

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 12.18.1
- **Icons**: React Icons 5.5.0
- **Markdown**: React Markdown 10.1.0

### **Backend & APIs**
- **Runtime**: Node.js
- **Email Service**: Nodemailer 7.0.3
- **API Routes**: Next.js API Routes
- **GitHub API**: REST API v3
- **Email Providers**: Gmail, Outlook, Yahoo, Custom SMTP

### **Development**
- **Package Manager**: npm
- **Build Tool**: Next.js with Turbopack
- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Code Formatting**: Prettier (implied)

## 📁 Project Structure

```
amananilofficial.com/
├── 📁 public/                     # Static assets
│   ├── favicon.ico
│   └── grid-pattern.svg
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 api/                # API Routes
│   │   │   ├── 📁 contact/        # Contact form endpoint
│   │   │   ├── 📁 github/         # GitHub projects API
│   │   │   └── 📁 github-repos/   # Fallback GitHub API
│   │   ├── 📁 components/         # React Components
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   ├── ItsMe.tsx          # Main hero/about section
│   │   │   ├── Navbar.tsx         # Navigation component
│   │   │   └── Projects.tsx       # Projects showcase
│   │   ├── 📁 projects/           # Projects pages
│   │   │   ├── [slug]/            # Dynamic project pages
│   │   │   └── page.tsx           # Projects listing
│   │   ├── 📁 utils/              # Utility functions
│   │   │   ├── errorHandler.ts    # Error handling utilities
│   │   │   └── github.ts          # GitHub API utilities
│   │   ├── 📁 lib/                # Library functions
│   │   │   ├── emailConfig.ts     # Email configuration
│   │   │   └── emailTemplates.ts  # Email templates
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── loading.tsx            # Loading UI
├── 📄 next.config.ts              # Next.js configuration
├── 📄 package.json                # Dependencies
├── 📄 tailwind.config.js          # Tailwind configuration
├── 📄 tsconfig.json               # TypeScript configuration
└── 📄 README.md                   # Project documentation
```

## 🚀 Quick Start

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v18.0 or higher)
- **npm**
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amananilofficial/amananilofficial.com.git
cd amananilofficial.com
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
.env.local
```

4. **Configure your environment variables** (see [Environment Variables](#-environment-variables))

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000` to see your amananilofficial.com!

## ⚙️ Configuration

### Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
# GitHub Configuration
GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-personal-access-token

# Email Configuration
EMAIL_PROVIDER=gmail
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password

# Alternative Email Providers
OUTLOOK_USER=your-email@outlook.com
OUTLOOK_PASS=your-app-password

YAHOO_USER=your-email@yahoo.com
AHOO_PASS=your-app-password

# Custom SMTP (Optional)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password

# Site Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `public_repo` scope
3. Copy the token to your `.env.local` file

### Email Provider Setup

#### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in `GMAIL_PASS`

#### Outlook Setup
1. Use your regular Outlook credentials
2. May require app-specific password

## 🎨 Customization

### Personal Information
Update your personal details in `src/app/components/ItsMe.tsx`:

```typescript
const personalInfo = {
  name: "Your Name",
  title: "Your Professional Title",
  bio: "Your professional bio...",
  // ... other details
};
```

### Color Scheme
Modify the color palette in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#9D3BE1',    // Purple accent
        secondary: '#2BA233',  // Green accent
        // Add your custom colors
      }
    }
  }
}
```

### Skills and Services
Update your skills in the `skillCategories` array in `ItsMe.tsx`:

```typescript
const skillCategories = [
  {
    category: "Your Skill Category",
    icon: <YourIcon />,
    skills: ["Skill 1", "Skill 2", "Skill 3"],
    tools: ["Tool 1", "Tool 2", "Tool 3"]
  },
  // ... more categories
];
```

## 📡 API Routes

### Contact Form API (`/api/contact`)
Handles form submissions and sends emails.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "phone": "+1234567890",
  "message": "Hello, I'd like to discuss..."
}
```

**Response:**
```json
{
  "message": "Email sent successfully!",
  "provider": "GMAIL",
  "domain": "GMAIL.COM"
}
```

### GitHub Projects API (`/api/github`)
Fetches and processes GitHub repositories.

**Response:**
```json
[
  {
    "id": "123",
    "name": "Project Name",
    "slug": "project-name",
    "description": "Project description",
    "technologies": ["React", "TypeScript"],
    "category": "Web Development",
    "status": "Live",
    "githubUrl": "https://github.com/user/repo",
    "demoUrl": "https://project-demo.com"
  }
]
```

## 🔧 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GITHUB_USERNAME` | Your GitHub username | ✅ | - |
| `GITHUB_TOKEN` | GitHub personal access token | ⚠️ | - |
| `EMAIL_PROVIDER` | Email service provider | ✅ | `gmail` |
| `GMAIL_USER` | Gmail address | ⚠️ | - |
| `GMAIL_PASS` | Gmail app password | ⚠️ | - |
| `NEXT_PUBLIC_BASE_URL` | Site base URL | ⚠️ | `http://localhost:3000` |

**Legend:**
- ✅ Required
- ⚠️ Required for specific features
- ❌ Optional

## 📱 Responsive Design

The amananilofficial.com is fully responsive across all device sizes:

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`
- **Large Desktop**: `> 1440px`

### Mobile-First Approach
- Base styles target mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized loading for mobile networks

## 🎭 Animations

### Framer Motion Animations
- **Page Transitions**: Smooth enter/exit animations
- **Scroll Animations**: Elements animate into view
- **Hover Effects**: Interactive micro-animations
- **Loading States**: Engaging loading indicators

### Performance Optimized
- CSS `transform` and `opacity` properties
- Hardware acceleration
- Reduced motion for accessibility
- Lazy loading for animations

## 📧 Contact Form

### Features
- **Real-time Validation**: Client-side form validation
- **Email Integration**: Automated email sending
- **Auto-reply**: Confirmation emails to users
- **Spam Protection**: Basic spam prevention
- **Error Handling**: Graceful error states

### Email Templates
Professional HTML email templates with:
- Responsive design
- Branded styling
- Contact information
- Professional signatures

## 🐙 GitHub Integration

### Automatic Project Detection
- Fetches public repositories
- Extracts README content
- Identifies technologies used
- Categorizes projects automatically
- Determines project status

### README Processing
- Parses Markdown content
- Extracts images for thumbnails
- Identifies project descriptions
- Technology stack detection

### Project Categorization
- **Cybersecurity**: Security-related projects
- **AI/ML**: Machine learning projects
- **Web Development**: Frontend/backend projects
- **Python**: Python-specific projects
- **Software Development**: General development

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'out' folder or connect your Git repository
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use strong, unique passwords for email accounts
- Rotate GitHub tokens regularly
- Use least privilege access for tokens

### Email Security
- Use app-specific passwords
- Enable 2FA on email accounts
- Consider using dedicated email for forms
- Implement rate limiting for production

### Content Security
- Sanitize user inputs
- Validate email addresses
- Implement CSRF protection for production
- Use HTTPS in production

## 🧪 Testing

### Development Testing
```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Test build
npm run build
```

### Manual Testing Checklist
- [ ] Contact form submission
- [ ] GitHub projects loading
- [ ] Responsive design on all devices
- [ ] Email delivery functionality
- [ ] Navigation and routing
- [ ] Loading states and error handling

## 🎯 Performance Optimization

### Built-in Optimizations
- **Next.js Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Static Generation**: Pre-rendered pages where possible
- **Font Optimization**: Optimized font loading
- **Bundle Analysis**: Built-in bundle analyzer

### Custom Optimizations
- **Lazy Loading**: Components load when needed
- **Memoization**: React.memo and useMemo usage
- **Efficient Re-renders**: Optimized state management
- **Compressed Assets**: Optimized images and assets

## 🌍 Browser Support

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

### Polyfills
- Modern JavaScript features
- CSS Grid and Flexbox
- Fetch API
- IntersectionObserver

## 🤝 Contributing

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow existing naming conventions
- Add comments for complex logic
- Ensure responsive design
- Test on multiple devices

### Commit Messages
Use conventional commit format:
```
feat: add new project showcase feature
fix: resolve mobile navigation issue
docs: update README with deployment instructions
style: improve button hover animations
```

## 🐛 Troubleshooting

### Common Issues

#### GitHub API Rate Limiting
```
Error: API rate limit exceeded
```
**Solution**: Add a GitHub personal access token to increase rate limits.

#### Email Not Sending
```
Error: Invalid login credentials
```
**Solution**: 
- Enable 2FA and use app-specific password for Gmail
- Check email provider settings
- Verify environment variables

#### Build Errors
```
Error: Module not found
```
**Solution**: 
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`
- Check import paths and file names

#### Environment Variables Not Loading
```
Error: process.env.VARIABLE_NAME is undefined
```
**Solution**:
- Ensure `.env.local` exists in root directory
- Restart development server after adding variables  
- Use `NEXT_PUBLIC_` prefix for client-side variables

### Getting Help
- Check the [Issues](https://github.com/amananilofficial/amananilofficial.com/issues) page
- Create a new issue with detailed description
- Include browser console errors
- Provide steps to reproduce the issue

## 📊 Analytics & Monitoring

### Recommended Analytics
- **Google Analytics**: User behavior tracking
- **Vercel Analytics**: Performance monitoring
- **Hotjar**: User experience insights
- **GTmetrix**: Performance testing

### Performance Monitoring
```javascript
// Add to your layout.tsx
export function reportWebVitals(metric) {
  console.log(metric);
  // Send to analytics service
}
```

## 🔄 Updates & Maintenance

### Regular Updates
- Update dependencies monthly
- Monitor security advisories
- Review GitHub token permissions
- Update personal information and projects

### Version Control
- Tag releases with semantic versioning
- Maintain changelog
- Create branches for major features
- Use meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Aman Anil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Aman Anil** - *Digital Security Specialist & Full-Stack Developer*

- 🌐 **Website**: [https://your-domain.com](https://your-domain.com)
- 💼 **LinkedIn**: [linkedin.com/in/amananilofficial](https://in.linkedin.com/in/amananilofficial)
- 🐙 **GitHub**: [github.com/amananilofficial](https://github.com/amananilofficial)
- 📧 **Email**: [contact@your-domain.com](mailto:contact@your-domain.com)
- 📱 **Instagram**: [instagram.com/amananilofficial](https://www.instagram.com/amananilofficial)

### Expertise Areas
- 🔐 **Cybersecurity**: Threat detection, vulnerability assessment, digital forensics
- 🤖 **AI/ML**: Machine learning models, data science, intelligent systems
- 🌐 **Full-Stack Development**: React, Next.js, Python, cloud architecture
- 📊 **Business Intelligence**: Data analytics, reporting, dashboard creation
- 🛡️ **Information Security**: Penetration testing, security audits, compliance

---

<div align="center">

### 🌟 Star this repository if you found it helpful!

**Made with ❤️ and ☕ by Aman Anil**

*"Securing the digital world, one line of code at a time."*

</div>

---

## 📝 Changelog

### v1.0.0 (Current)
- ✨ Initial release
- 🎨 Modern responsive design
- 📧 Contact form with email integration
- 🐙 GitHub projects integration
- 🎭 Smooth animations and transitions
- 📱 Mobile-first responsive design
- 🔐 Security-focused implementation

### Planned Updates
- 🌙 **v1.1.0**: Dark/Light theme toggle
- 📊 **v1.2.0**: Analytics dashboard
- 🌍 **v1.3.0**: Multi-language support
- 🎨 **v1.4.0**: Theme customization
- 📝 **v1.5.0**: Blog functionality

---

*Last updated: 2025*
