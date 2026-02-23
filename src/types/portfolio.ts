// TypeScript interfaces for portfolio data

export interface Profile {
  name: string;
  title: string;
  description: string;
  resumeUrl: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  order: number;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  icon: string;
  order: number;
  link?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  order: number;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  period: string;
  cgpa: string;
  order: number;
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  color: string;
  order: number;
}

export interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  href: string | null;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface Contact {
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
}
