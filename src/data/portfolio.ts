import type { Skill, SocialLink, Experience, Photo, Project, MusicTrack } from '@/types'

// Structural data only - translatable text lives in src/i18n/locales/*.json

export const profileImage = '/images/profile/milind-profile.JPG'

export const skills: Skill[] = [
  { name: 'React', icon: 'FaReact', category: 'frontend', proficiency: 95 },
  { name: 'TypeScript', icon: 'SiTypescript', category: 'frontend', proficiency: 90 },
  { name: 'JavaScript', icon: 'FaJsSquare', category: 'frontend', proficiency: 95 },
  { name: 'Next.js', icon: 'SiNextdotjs', category: 'frontend', proficiency: 85 },
  { name: 'Tailwind CSS', icon: 'SiTailwindcss', category: 'frontend', proficiency: 90 },
  { name: 'Node.js', icon: 'FaNode', category: 'backend', proficiency: 88 },
  { name: 'Python', icon: 'FaPython', category: 'backend', proficiency: 75 },
  { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'backend', proficiency: 85 },
  { name: 'MongoDB', icon: 'SiMongodb', category: 'backend', proficiency: 80 },
  { name: 'Git', icon: 'FaGitAlt', category: 'tools', proficiency: 90 },
  { name: 'Docker', icon: 'FaDocker', category: 'tools', proficiency: 80 },
  { name: 'AWS', icon: 'FaAws', category: 'tools', proficiency: 85 },
]

export const projects: Project[] = [
  {
    id: '1',
    title: '',
    description: '',
    image: '',
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'Google Gemini AI', 'WhatsApp API', 'gTTS'],
    githubUrl: 'https://github.com/milinddev64/SaralRozgar_ONEST',
  },
  {
    id: '2',
    title: '',
    description: '',
    image: '',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/milinddev64/CGC-Placements',
  },
]

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/yourusername', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername', icon: 'FaLinkedin' },
  { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'FaTwitter' },
  { name: 'Email', url: 'mailto:milind64.dev@gmail.com', icon: 'FaEnvelope' },
]

export const experiences: Experience[] = [
  {
    id: '1',
    company: '',
    jobTitle: '',
    startDate: '',
    endDate: undefined,
    description: '',
    technologies: ['Go', 'Java', 'React', 'TypeScript', 'Spring Boot', 'Docker', 'Kubernetes', 'Keycloak', 'Grafana', 'Prometheus'],
    highlightPoints: [],
    roles: [
      {
        title: '',
        startDate: '',
        endDate: undefined,
        description: '',
        highlightPoints: [],
      },
      {
        title: '',
        startDate: '',
        endDate: '',
        description: '',
        highlightPoints: [],
      },
    ],
  },
]

export const photos: Photo[] = [
  { id: '1', title: '', description: '', image: '/images/photos/travel/1.jpeg', category: 'travel' },
  { id: '2', title: '', description: '', image: '/images/photos/travel/2.jpeg', category: 'travel' },
  { id: '3', title: '', description: '', image: '/images/photos/travel/3.jpeg', category: 'travel' },
  { id: '4', title: '', description: '', image: '/images/photos/travel/4.jpeg', category: 'travel' },
  { id: '5', title: '', description: '', image: '/images/photos/travel/5.JPG', category: 'travel' },
  { id: '6', title: '', description: '', image: '/images/photos/travel/6.JPG', category: 'travel' },
  { id: '7', title: '', description: '', image: '/images/photos/travel/7.JPG', category: 'travel' },
  { id: '8', title: '', description: '', image: '/images/photos/travel/8.JPG', category: 'travel' },
  { id: '9', title: '', description: '', image: '/images/photos/family/9.jpeg', category: 'family & friends' },
]

export const musicTracks: MusicTrack[] = [
  { id: '1', title: 'A Sky Full of Stars', artist: 'Coldplay',       src: '/music/songs/1-A-Sky-Full-Of-Stars.mp3',        volume: 0.10 },
  { id: '2', title: 'Love Me Like You Do',  artist: 'Ellie Goulding', src: '/music/songs/2-love-me-like-you-do-mp3.mp3',   volume: 0.10 },
  { id: '3', title: 'End of Beginning',     artist: 'Djo',            src: '/music/songs/3-end-of-beginning.mp3',           volume: 0.10 },
  { id: '4', title: 'Paradise',             artist: 'Coldplay',       src: '/music/songs/4-Paradise.mp3',                   volume: 0.10 },
  { id: '5', title: 'Let the World Burn',   artist: 'Chris Grey',     src: '/music/songs/5-let-the-world-burn.mp3',         volume: 0.10 },
]
