import { type Portfolio, type InsertPortfolio, type PersonalInfo, type Achievement, type Experience, type Skill, type Project, type ContactInfo } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPortfolio(): Promise<Portfolio | undefined>;
  updatePortfolio(data: InsertPortfolio): Promise<Portfolio>;
  createPortfolio(data: InsertPortfolio): Promise<Portfolio>;
}

export class MemStorage implements IStorage {
  private portfolio: Portfolio | undefined;

  constructor() {
    // Initialize with default portfolio data
    // Load data from JSON file (using import in a different way for ES modules)
    import("../client/src/data/portfolio.json", { with: { type: "json" } })
      .then(module => {
        this.portfolio = {
          id: randomUUID(),
          ...module.default
        };
      })
      .catch(() => {
        // Fallback to default data if JSON file can't be loaded
        this.portfolio = {
          id: randomUUID(),
          personal: {
            name: "Ian Iglipa",
            title: "Full-Stack Developer & Game Creator",
            bio: "Passionate developer with 5+ years of experience across web development, mobile apps, and game creation.",
            email: "ian.iglipa@email.com",
            github: "github.com/ianiglipa",
            linkedin: "linkedin.com/in/ianiglipa",
            twitter: "twitter.com/ianiglipa",
            discord: "discord.com/users/ianiglipa"
          },
          achievements: [],
          experience: [],
          skills: [],
          projects: [],
          contact: {
            email: "ian.iglipa@email.com",
            github: "github.com/ianiglipa",
            linkedin: "linkedin.com/in/ianiglipa",
            twitter: "twitter.com/ianiglipa",
            discord: "discord.com/users/ianiglipa"
          }
        };
      });
  }

  async getPortfolio(): Promise<Portfolio | undefined> {
    return this.portfolio;
  }

  async updatePortfolio(data: InsertPortfolio): Promise<Portfolio> {
    if (this.portfolio) {
      this.portfolio = { ...this.portfolio, ...data };
    } else {
      this.portfolio = { id: randomUUID(), ...data };
    }
    return this.portfolio;
  }

  async createPortfolio(data: InsertPortfolio): Promise<Portfolio> {
    const portfolio: Portfolio = { id: randomUUID(), ...data };
    this.portfolio = portfolio;
    return portfolio;
  }
}

export const storage = new MemStorage();
