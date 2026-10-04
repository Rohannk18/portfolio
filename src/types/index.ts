export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'AI & ML' | 'Systems & Backend' | 'Automation & Tools';
  description: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  architectureType: 'fullstack' | 'erp' | 'ai' | 'iot' | 'analytics';
  architectureDescription: string;
  techStack: string[];
  challenges: string[];
  learnings: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  accentColor: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: 'Advanced' | 'Proficient' | 'Exploring';
    iconName: string;
    description: string;
    relatedProjects: string[];
  }[];
}

export interface Experience {
  id: string;
  title: string;
  roleType: string;
  company: string;
  companyType: string;
  location: string;
  period: string;
  isCurrent: boolean;
  description: string;
  technicalHighlights: string[];
  transferableCapabilities: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  period: string;
  graduationYear: string;
  details: string[];
  coursework: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  category: string;
  description: string;
  date: string;
  highlight: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    roleSwitcher: string[];
    tagline: string;
    bio: string[];
    availability: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
    stats: {
      label: string;
      value: string;
      description: string;
    }[];
  };
  socials: SocialLink[];
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  aiInitiatives: {
    title: string;
    status: string;
    description: string;
    technologies: string[];
    focusArea: string;
  }[];
}
