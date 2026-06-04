export interface Project {
  id: string;
  title: string;
  category: "wet-processing" | "dyeing" | "client-acquisition" | "innovations" | "all";
  description: string;
  details: string[];
  tags: string[];
  image?: string;
  link?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  date: string;
  highlights: string[];
  icon: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
  badge?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
}

export interface Training {
  title: string;
  institution: string;
  date: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}
