import type { Skill, SocialLink, Experience, Photo, Project, MusicTrack } from '@/types'

// Structural data only - translatable text lives in src/i18n/locales/*.json

export const profileImage = '/images/profile.jpg'

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
    image: '/images/project1.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project1',
  },
  {
    id: '2',
    title: '',
    description: '',
    image: '/images/project2.jpg',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project2',
  },
  {
    id: '3',
    title: '',
    description: '',
    image: '/images/project3.jpg',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Weather API'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project3',
  },
  {
    id: '4',
    title: '',
    description: '',
    image: '/images/project4.jpg',
    tags: ['React', 'D3.js', 'Node.js', 'Express'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/project4',
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
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
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
  { id: '1', title: '', description: '', image: '/images/photo1.jpg', category: 'travel' },
  { id: '2', title: '', description: '', image: '/images/photo2.jpg', category: 'achievement' },
  { id: '3', title: '', description: '', image: '/images/photo3.jpg', category: 'travel' },
  { id: '4', title: '', description: '', image: '/images/photo4.jpg', category: 'family' },
  { id: '5', title: '', description: '', image: '/images/photo5.jpg', category: 'work' },
  { id: '6', title: '', description: '', image: '/images/photo6.jpg', category: 'travel' },
  { id: '7', title: '', description: '', image: '/images/photo7.jpg', category: 'family' },
  { id: '8', title: '', description: '', image: '/images/photo8.jpg', category: 'achievement' },
]

// TODO: Replace with your actual favorite tracks and place mp3 files in public/music/
export const musicTracks: MusicTrack[] = [
  { id: '1', title: 'Chill Vibes', artist: 'Lo-Fi Artist', src: '/music/song1.mp3', cover: '' },
  { id: '2', title: 'Night Drive', artist: 'Synthwave DJ', src: '/music/song2.mp3', cover: '' },
  { id: '3', title: 'Morning Coffee', artist: 'Jazz Trio', src: '/music/song3.mp3', cover: '' },
  { id: '4', title: 'Sunset Groove', artist: 'Indie Band', src: '/music/song4.mp3', cover: '' },
  { id: '5', title: 'Deep Focus', artist: 'Ambient Sound', src: '/music/song5.mp3', cover: '' },
]
