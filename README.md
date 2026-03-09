# Milind Murmu - Personal Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features include multi-language support (English, Hindi, French, German), dark/light theme toggle, photo gallery, music player, and contact form integration.

![Portfolio Preview](public/images/preview.png)

## 🚀 Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Multi-language Support** - Available in 4 languages (EN, HI, FR, DE)
- **Theme Toggle** - Dark and light mode with system preference detection
- **Photo Gallery** - Categorized photo gallery with filtering
- **Music Player** - Floating music player with playlist support
- **Contact Form** - EmailJS integration for contact form submissions
- **Smooth Animations** - Framer Motion animations throughout
- **SEO Optimized** - Meta tags, sitemap, and semantic HTML
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **Type Safe** - Built with TypeScript for better developer experience

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Configuration Guide](#-configuration-guide)
- [Project Structure](#-project-structure)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)

## 🛠 Tech Stack

- **Frontend Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v7
- **Animations:** Framer Motion
- **Internationalization:** i18next
- **Icons:** React Icons (Font Awesome, Simple Icons, Lucide)
- **Form Handling:** EmailJS
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/milind-portfolio.git
cd milind-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Configure environment variables** (see [EmailJS Setup](#emailjs-setup))

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:5173` to view your portfolio.

## ⚙️ Configuration Guide

### 1. Personal Information

Edit `/src/i18n/locales/en.json` (and other language files):

```json
{
  "data": {
    "personalInfo": {
      "name": "Your Name",
      "title": "Your Job Title",
      "bio": "Your bio description",
      "location": "Your City, Country"
    }
  }
}
```

### 2. Profile Image

Replace `/public/images/profile.jpg` with your photo. Recommended size: 400x400px.

Update in `/src/data/portfolio.ts`:
```typescript
export const profileImage = '/images/profile.jpg'
```

### 3. Skills

Edit `/src/data/portfolio.ts`:

```typescript
export const skills: Skill[] = [
  { 
    name: 'React', 
    icon: 'FaReact',           // Icon from react-icons
    category: 'frontend',       // 'frontend' | 'backend' | 'tools'
    proficiency: 95            // 0-100
  },
  // Add more skills...
]
```

**Available Icon Libraries:**
- Font Awesome: `Fa*` (e.g., `FaReact`, `FaNode`)
- Simple Icons: `Si*` (e.g., `SiTypescript`, `SiTailwindcss`)

### 4. Experience

Edit `/src/i18n/locales/en.json`:

```json
{
  "data": {
    "experiences": {
      "1": {
        "company": "Company Name",
        "jobTitle": "Job Title",
        "startDate": "Feb 2025",
        "description": "Job description",
        "roles": [
          {
            "title": "Senior Role",
            "startDate": "Oct 2025",
            "description": "Role description",
            "highlightPoints": [
              "Achievement 1",
              "Achievement 2"
            ]
          }
        ]
      }
    }
  }
}
```

Update technologies in `/src/data/portfolio.ts`:

```typescript
export const experiences: Experience[] = [
  {
    id: '1',
    company: '',
    jobTitle: '',
    startDate: '',
    technologies: ['React', 'TypeScript', 'Node.js'], // Tech stack
    roles: [...]
  }
]
```

### 5. Projects

**Step 1:** Add project images to `/public/images/` (e.g., `project1.jpg`)

**Step 2:** Edit `/src/data/portfolio.ts`:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: '',                              // Leave empty (uses i18n)
    description: '',                        // Leave empty (uses i18n)
    image: '/images/project1.jpg',         // Your image path
    tags: ['React', 'Node.js', 'MongoDB'], // Tech stack
    demoUrl: 'https://demo.com',           // Optional
    githubUrl: 'https://github.com/...',   // Optional
  }
]
```

**Step 3:** Add translations in `/src/i18n/locales/en.json`:

```json
{
  "data": {
    "projects": {
      "1": {
        "title": "Project Name",
        "description": "Project description"
      }
    }
  }
}
```

### 6. Photos

**Step 1:** Add photos to `/public/images/` (e.g., `photo1.jpg`, `photo2.jpg`)

**Step 2:** Edit `/src/data/portfolio.ts`:

```typescript
export const photos: Photo[] = [
  { 
    id: '1', 
    title: '',                        // Leave empty (uses i18n)
    description: '',                  // Leave empty (uses i18n)
    image: '/images/photo1.jpg',     // Your image path
    category: 'travel'               // 'travel' | 'achievement' | 'family' | 'work'
  }
]
```

**Step 3:** Add translations in `/src/i18n/locales/en.json`:

```json
{
  "data": {
    "photos": {
      "1": {
        "title": "Photo Title",
        "description": "Photo description",
        "category": "travel"
      }
    }
  }
}
```

**Available Categories:**
- `travel` - Travel photos
- `achievement` - Awards and achievements
- `family` - Family moments
- `work` - Work-related photos

### 7. Music Player

**Step 1:** Add music files to `/public/music/` (MP3 format recommended)

**Step 2:** Edit `/src/data/portfolio.ts`:

```typescript
export const musicTracks: MusicTrack[] = [
  { 
    id: '1', 
    title: 'Song Title', 
    artist: 'Artist Name', 
    src: '/music/song1.mp3',
    cover: '/images/album1.jpg'  // Optional album cover
  }
]
```

**Note:** Ensure you have rights to use the music files.

### 8. Social Links

Edit `/src/data/portfolio.ts`:

```typescript
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'FaLinkedin' },
  { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'FaTwitter' },
  { name: 'Email', url: 'mailto:your.email@example.com', icon: 'FaEnvelope' },
]
```

### 9. EmailJS Setup

**Step 1:** Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account

**Step 2:** Create Email Service
1. Dashboard → Email Services → Add New Service
2. Choose provider (Gmail, Outlook, or Personal Email Service)

**For Gmail:**
- Click "Connect Account" and authorize
- Grant all permissions including "Send emails on your behalf"

**For Personal Email Service (Recommended):**
- SMTP Server: `smtp.gmail.com`
- Port: `465` or `587`
- Username: Your Gmail address
- Password: [App Password](https://support.google.com/accounts/answer/185833) (not regular password)

**Step 3:** Create Email Template
1. Dashboard → Email Templates → Create New Template
2. Use these variables in your template:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{message}}` - Message content

Example template:
```
New message from {{from_name}}

Email: {{from_email}}

Message:
{{message}}
```

**Step 4:** Configure Environment Variables

Create `.env` file in project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Find these values in your EmailJS dashboard:
- Service ID: Email Services → Your Service
- Template ID: Email Templates → Your Template
- Public Key: Account → General

**Step 5:** Restart dev server
```bash
npm run dev
```

### 10. Adding New Languages

**Step 1:** Create translation file

Create `/src/i18n/locales/es.json` (for Spanish):

```json
{
  "nav": {
    "home": "Inicio",
    "about": "Acerca de",
    ...
  }
}
```

**Step 2:** Update i18n config

Edit `/src/i18n/index.ts`:

```typescript
import es from './locales/es.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    fr: { translation: fr },
    de: { translation: de },
    es: { translation: es },  // Add new language
  },
  // ...
})
```

**Step 3:** Update language selector

Edit `/src/i18n/locales/en.json`:

```json
{
  "language": {
    "en": "English",
    "hi": "Hindi",
    "fr": "French",
    "de": "German",
    "es": "Spanish"
  }
}
```

### 11. SEO Configuration

Edit `/public/sitemap.xml`:

```xml
<url>
  <loc>https://yourdomain.com/</loc>
  <lastmod>2025-01-01</lastmod>
  <priority>1.0</priority>
</url>
```

Edit `/index.html`:

```html
<meta name="description" content="Your description" />
<meta name="keywords" content="Your, Keywords" />
<meta property="og:title" content="Your Name | Job Title" />
<meta property="og:image" content="/images/profile.jpg" />
```

## 📁 Project Structure

```
milind-portfolio/
├── public/
│   ├── images/           # Profile, projects, photos
│   ├── music/            # Music files (MP3)
│   ├── favicon.svg       # Favicon
│   └── sitemap.xml       # SEO sitemap
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Photos.tsx
│   │   ├── Contact.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── InfoModal.tsx
│   ├── data/
│   │   └── portfolio.ts  # Structural data (skills, projects, etc.)
│   ├── hooks/
│   │   └── useTheme.tsx  # Theme context and hook
│   ├── i18n/
│   │   ├── index.ts      # i18n configuration
│   │   └── locales/      # Translation files
│   │       ├── en.json
│   │       ├── hi.json
│   │       ├── fr.json
│   │       └── de.json
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Gallery.tsx
│   │   └── NotFound.tsx
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables (create this)
├── .env.example          # Environment variables example
├── components.json       # shadcn/ui config
├── tailwind.config.js    # Tailwind configuration
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test

# Run tests with coverage
npm run test:ci
```

### Test Files

- `src/App.test.tsx` - App component tests
- `src/components/ui/*.test.tsx` - UI component tests
- `src/components/*.test.tsx` - Feature component tests
- `src/lib/utils.test.ts` - Utility function tests
- `src/data/portfolio.test.ts` - Data validation tests

### Writing Tests

Example test:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (EmailJS keys)
5. Deploy

### Deploy to Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/milind-portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/milind-portfolio/',
  // ...
})
```

4. Deploy:
```bash
npm run deploy
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests once (for CI/CD)

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(222.2 47.4% 11.2%)',
        foreground: 'hsl(210 40% 98%)',
      },
      // Customize other colors...
    }
  }
}
```

### Fonts

Add Google Fonts in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Update `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    }
  }
}
```

### Animations

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    animation: {
      'custom-bounce': 'bounce 2s infinite',
    },
    keyframes: {
      bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      }
    }
  }
}
```

## 🐛 Troubleshooting

### EmailJS 412 Error

**Problem:** "Request had insufficient authentication scopes"

**Solution:**
1. Delete Gmail service in EmailJS
2. Reconnect and grant all permissions
3. Or use Personal Email Service with App Password

### Images Not Loading

**Problem:** Images show broken icon

**Solution:**
1. Ensure images are in `/public/images/`
2. Use correct path: `/images/photo.jpg` (not `./images/`)
3. Check file names match exactly (case-sensitive)

### Music Not Playing

**Problem:** Music player shows error

**Solution:**
1. Use MP3 format (best compatibility)
2. Ensure files are in `/public/music/`
3. Check browser console for errors
4. Verify file paths in `portfolio.ts`

### Build Errors

**Problem:** TypeScript errors during build

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run build
```

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

Milind Murmu - [milind64.dev@gmail.com](mailto:milind64.dev@gmail.com)

Project Link: [https://github.com/yourusername/milind-portfolio](https://github.com/yourusername/milind-portfolio)

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
