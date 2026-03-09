# Quick Reference Guide

## 🎯 Common Tasks

### Change Your Name
**File:** `src/i18n/locales/en.json` (and other language files)
```json
"data": {
  "personalInfo": {
    "name": "Your Name Here"
  }
}
```

### Add a New Skill
**File:** `src/data/portfolio.ts`
```typescript
{ name: 'Vue.js', icon: 'FaVuejs', category: 'frontend', proficiency: 85 }
```

### Add a New Project
1. Add image to `/public/images/project5.jpg`
2. Update `src/data/portfolio.ts`:
```typescript
{
  id: '5',
  title: '',
  description: '',
  image: '/images/project5.jpg',
  tags: ['React', 'Firebase'],
  demoUrl: 'https://demo.com',
  githubUrl: 'https://github.com/...'
}
```
3. Update `src/i18n/locales/en.json`:
```json
"projects": {
  "5": {
    "title": "My New Project",
    "description": "Project description"
  }
}
```

### Add a New Photo
1. Add image to `/public/images/photo9.jpg`
2. Update `src/data/portfolio.ts`:
```typescript
{ id: '9', title: '', description: '', image: '/images/photo9.jpg', category: 'travel' }
```
3. Update `src/i18n/locales/en.json`:
```json
"photos": {
  "9": {
    "title": "Photo Title",
    "description": "Photo description",
    "category": "travel"
  }
}
```

### Add Music Track
1. Add MP3 to `/public/music/song6.mp3`
2. Update `src/data/portfolio.ts`:
```typescript
{ id: '6', title: 'Song Name', artist: 'Artist', src: '/music/song6.mp3' }
```

### Change Theme Colors
**File:** `tailwind.config.js`
```javascript
colors: {
  primary: {
    DEFAULT: 'hsl(220 70% 50%)',  // Your color
  }
}
```

### Update Social Links
**File:** `src/data/portfolio.ts`
```typescript
{ name: 'Instagram', url: 'https://instagram.com/username', icon: 'FaInstagram' }
```

### Add New Experience
**File:** `src/i18n/locales/en.json`
```json
"experiences": {
  "2": {
    "company": "New Company",
    "jobTitle": "Position",
    "startDate": "Jan 2024",
    "description": "Job description"
  }
}
```

## 🔧 Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
npm run lint         # Check code quality
```

## 📦 Icon Reference

### Font Awesome (Fa*)
- `FaReact` - React logo
- `FaNode` - Node.js logo
- `FaPython` - Python logo
- `FaGithub` - GitHub icon
- `FaLinkedin` - LinkedIn icon
- `FaEnvelope` - Email icon

### Simple Icons (Si*)
- `SiTypescript` - TypeScript logo
- `SiTailwindcss` - Tailwind CSS logo
- `SiNextdotjs` - Next.js logo
- `SiMongodb` - MongoDB logo
- `SiPostgresql` - PostgreSQL logo

Find more icons at: https://react-icons.github.io/react-icons/

## 🎨 Category Reference

### Photo Categories
- `travel` - Travel and adventure
- `achievement` - Awards and accomplishments
- `family` - Family moments
- `work` - Professional events

### Skill Categories
- `frontend` - Frontend technologies
- `backend` - Backend technologies
- `tools` - Development tools

## 🌍 Language Codes
- `en` - English
- `hi` - Hindi
- `fr` - French
- `de` - German

## 📝 File Paths

| Type | Location | Format |
|------|----------|--------|
| Profile Image | `/public/images/profile.jpg` | JPG/PNG |
| Project Images | `/public/images/project*.jpg` | JPG/PNG |
| Photos | `/public/images/photo*.jpg` | JPG/PNG |
| Music | `/public/music/*.mp3` | MP3 |
| Translations | `/src/i18n/locales/*.json` | JSON |
| Data | `/src/data/portfolio.ts` | TypeScript |

## 🚨 Common Issues

### Images not showing?
- Check file path starts with `/` (e.g., `/images/photo.jpg`)
- Verify file exists in `/public/images/`
- Check file name matches exactly (case-sensitive)

### Music not playing?
- Use MP3 format
- Check file is in `/public/music/`
- Verify path in `portfolio.ts`

### EmailJS not working?
- Check `.env` file exists
- Verify all 3 environment variables are set
- Restart dev server after adding `.env`

### Build failing?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```
