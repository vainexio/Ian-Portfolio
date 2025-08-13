import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolio = pgTable("portfolio", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personal: jsonb("personal").notNull(),
  achievements: jsonb("achievements").notNull(),
  experience: jsonb("experience").notNull(),
  skills: jsonb("skills").notNull(),
  projects: jsonb("projects").notNull(),
  contact: jsonb("contact").notNull(),
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

export interface Project {
  id: string;
  title: string;
  category: "web" | "android" | "game";
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

export interface ContactInfo {
  email: string;
  github: string;
  facebook: string;
  viber?: string;
  discord?: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  achievements: Achievement[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  contact: ContactInfo;
}
