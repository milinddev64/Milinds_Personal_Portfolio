export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
}

export interface AboutSection {
  title: string;
  description: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
}

export interface PortfolioContent {
  hero: HeroSection;
  about: AboutSection;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  music: MusicTrack[];
  photos: PhotoItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  proficiency: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface Role {
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlightPoints?: string[];
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  highlightPoints?: string[];
  roles?: Role[];
}

export interface Photo {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
}

export interface PhotoItem {
  id: string;
  src: string;
  caption?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}
