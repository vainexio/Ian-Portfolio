import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolio = pgTable("portfolio", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personal: jsonb("personal").notNull(),
  specialties: jsonb("specialties").notNull(),
  projectCategories: jsonb("projectCategories").notNull(),
  achievements: jsonb("achievements").notNull(),
  experience: jsonb("experience").notNull(),
  skills: jsonb("skills").notNull(),
  projects: jsonb("projects").notNull(),
  contact: jsonb("contact").notNull(),
  interactiveElements: jsonb("interactiveElements").notNull(),
});

export const insertPortfolioSchema = createInsertSchema(portfolio).omit({
  id: true,
});

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolio.$inferSelect;

// Type definitions for portfolio data structure
export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  discord?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

export interface ProjectStats {
  users?: string;
  servers?: string;
  uptime?: string;
  revenue?: string;
  orders?: string;
  merchants?: string;
  downloads?: string;
  rating?: string;
  reviews?: string;
  visits?: string;
  concurrent?: string;
  teams?: string;
  apis?: string;
  tests?: string;
  exchanges?: string;
  volume?: string;
}

export interface ProjectCategory {
  id: string;
  label: string;
  color: string;
  colorClass: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  featured?: boolean;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  playStore?: string;
  roblox?: string;
  stats?: ProjectStats;
}

export interface Specialty {
  id: string;
  icon: string;
  title: string;
  description: string;
  tagline: string;
  color: string;
  technologies: string[];
}

export interface ContactMethod {
  id: string;
  platform: string;
  value: string;
  href: string;
  icon: string;
  color: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  github: string;
  facebook: string;
  viber?: string;
  discord?: string;
  contactMethods?: ContactMethod[];
}

export interface InteractiveElements {
  introduction: {
    language: string;
    code: string;
    preview: string;
    color: string;
  };
  quotes: Array<{
    text: string;
    author: string;
    color: string;
  }>;
  skillsRadar: Array<{
    name: string;
    level: number;
    angle: number;
    color: string;
  }>;
  talents: Array<{
    clue: string;
    talent: string;
    description: string;
  }>;
  journey: Array<{
    year: string;
    title: string;
    description: string;
    color: string;
    icon: string;
  }>;
  techFacts: Array<{
    title: string;
    fact: string;
    icon: string;
    color: string;
  }>;
}

export interface PortfolioData {
  personal: PersonalInfo;
  specialties: Specialty[];
  projectCategories: ProjectCategory[];
  achievements: Achievement[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  contact: ContactInfo;
  interactiveElements: InteractiveElements;
}
