# Ian Iglipa - Portfolio Website

## Overview

This is a fully immersive and editable programmer's portfolio website for Ian Iglipa. It serves as a comprehensive showcase of his work, achievements, skills, background information, and other portfolio details in a visually engaging, glassmorphism-styled design. The application features a single-page layout with smooth scrolling navigation, interactive 3D elements, and modern animations to create an immersive user experience.

**Latest Update (Aug 14, 2025)**: Enhanced specialty cards and fixed project technology display:

**Major Changes Completed:**
- ✅ Fixed duplicate technology display in project cards (removed from image overlay)
- ✅ Enhanced About Me specialty cards with 3D hover effects and unique animations
- ✅ Added floating particles, orbit animations, and dynamic background patterns
- ✅ Implemented smooth 3D transforms with perspective on specialty card hover
- ✅ Enhanced technology tags with reveal-on-hover animations
- ✅ Fixed Creative Philosophy section layout shift issues with fixed height container
- ✅ Enhanced Creative Philosophy with better design, clickable quote indicators, and smooth transitions
- ✅ Improved Featured Projects with enhanced animations and proper link handling
- ✅ Added proper handling for missing demo/repository links in project cards
- ✅ Enhanced contact section with flexible contact methods system

**Previous Improvements:**
- ✅ Reverted syntax highlighting changes in Personal Introduction section back to simple text
- ✅ Enhanced typing animation with human-like behavior (natural pauses, typos, corrections, speed variations)
- ✅ Fixed contrast issues by changing white background to dark gradient design
- ✅ Completely removed Skills Radar component from all code files
- ✅ Completely removed Explore My World section from all pages
- ✅ Cleaned up all unused imports and component references
- ✅ Fixed quote component to handle proper data structure (text, author, color)
- ✅ Removed syntax-highlighter utility file

**Current Features:**
- Enhanced About Me specialty cards with 3D hover effects and unique animations
- Fixed technology display in project cards (no more duplicates)
- Fixed-height Creative Philosophy section preventing layout shifts
- Enhanced Featured Projects with proper missing link handling
- Dynamic project card animations with image loading states
- Flexible and customizable contact methods system
- Enhanced Professional Experience timeline with focus indicators
- Mobile-optimized responsive design throughout
- Single personal introduction coding environment with enhanced human-like typing
- Clean, streamlined portfolio layout focusing on core content

**Technical Implementation:**
- 3D transformed specialty cards with perspective and smooth rotations on hover
- Floating particle animations and orbit effects for enhanced visual appeal
- Dynamic background patterns with color-matched blur effects
- Technology tags with reveal-on-hover animations and individual hover states
- Fixed duplicate technology display issue in project cards
- Fixed-height Creative Philosophy container (min-h-[200px]) preventing layout shifts
- Enhanced project cards with proper link validation and fallback states
- Image loading states and error handling for smoother user experience
- Staggered animations with proper delay timing for visual appeal
- ContactMethod interface with flexible platform, icon, and color management
- Enhanced timeline with centered icons and mobile-first responsive design
- Enhanced typing animation with 5% typo simulation and natural speed variations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using **React** with **TypeScript** and **Vite** as the build tool. The frontend follows a component-based architecture with:
- **React Router**: Uses `wouter` for lightweight client-side routing
- **State Management**: Leverages React Query (`@tanstack/react-query`) for server state management and caching
- **UI Components**: Built with Radix UI components and shadcn/ui component library for consistent, accessible design
- **Styling**: Uses Tailwind CSS with custom CSS variables for glassmorphism effects and dark theme
- **Animations**: Implements intersection observer-based animations for scroll effects and visual feedback

### Backend Architecture
The server is built with **Express.js** and follows a RESTful API design:
- **Express Server**: Handles HTTP requests with middleware for JSON parsing, logging, and error handling
- **In-Memory Storage**: Currently uses a memory-based storage system (`MemStorage`) for portfolio data
- **Database Ready**: Configured with Drizzle ORM for PostgreSQL integration (schema defined but storage layer abstracts database implementation)
- **API Endpoints**: Provides endpoints for portfolio data retrieval, updates, and contact form submission

### Data Storage Design
The application uses a flexible storage abstraction:
- **Storage Interface**: Defines `IStorage` interface allowing for different storage implementations
- **Current Implementation**: Memory-based storage with default portfolio data
- **Database Schema**: PostgreSQL schema defined using Drizzle ORM with JSONB columns for flexible portfolio content
- **Content Structure**: Portfolio data is organized into personal info, skills, projects, and contact information

### Component Architecture
- **Section-Based Layout**: Organized into distinct sections (Hero, About, Skills, Projects, Contact)
- **Reusable UI Components**: Custom components for skill charts, project cards, and interactive elements
- **Clean UI Focus**: Streamlined interface focusing on core portfolio content and professional presentation
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Intersection Observer**: Used for scroll-triggered animations and active navigation highlighting

### Styling and Design System
- **Glassmorphism Theme**: Dark-mode-only design with glass-like elements and backdrop filters
- **Color Palette**: Custom CSS variables for coral, amber, purple, and cyan accent colors
- **Typography**: Inter font family with Font Awesome icons for visual consistency
- **3D Effects**: CSS transforms and shadows for interactive button and card elements
- **Smooth Transitions**: Coordinated animation system for seamless user interactions

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework with TypeScript support
- **Express.js**: Node.js web framework for API server
- **Vite**: Build tool and development server with Hot Module Replacement

### Database and ORM
- **Drizzle ORM**: Type-safe ORM for PostgreSQL database operations
- **@neondatabase/serverless**: PostgreSQL client optimized for serverless environments
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Headless UI component library for accessibility
- **shadcn/ui**: Pre-built component system built on Radix UI
- **Font Awesome**: Icon library for visual elements
- **Google Fonts**: Web fonts (Inter, JetBrains Mono) for typography

### Data Management and Validation
- **React Query**: Server state management and caching
- **Zod**: Schema validation for type-safe data handling
- **React Hook Form**: Form state management and validation

### Development and Build Tools
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Plugins**: Development environment integration and runtime error handling

### Additional Libraries
- **date-fns**: Date manipulation and formatting
- **clsx** and **class-variance-authority**: Dynamic CSS class handling
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component for image galleries