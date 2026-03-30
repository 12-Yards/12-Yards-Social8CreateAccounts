# Social8

## Overview

Social8 is a community management platform designed for clubs and communities. This is the marketing website for the Social8 SaaS platform. The application enables management of members, events, competitions, content, and reciprocal play arrangements.

## Recent Changes

- **March 2026**: Migrated to Replit environment with security hardening:
  - Admin credentials moved from hardcoded values to secure environment secrets (ADMIN_PASSWORD)
  - API response body logging removed to prevent sensitive data leakage
  - Onboarding API key and DNS admin email stored as environment variables
  - Deployment configured: autoscale target, build via `npm run build`, run via `node ./dist/index.cjs`
- **March 2026**: Rebranded from "Golf Junkies" to "Social8":
  - Removed all references to "Golf" and "Golfing" throughout the platform
  - Changed brand name from "Golf Junkies" to "Social8"
  - Updated hero text to "and provide specific features for different community types"
  - Updated domain references from golfjunkies.com to social8.io
  - Updated all SEO meta tags, Open Graph tags, and Twitter cards
- **February 2026**: Added admin panel, login, account creation, and contact pages:
  - Admin panel (/admin) with login (/admin/login) - username: admin, password stored securely
  - Admin features: View all registrations and contact submissions, edit Platform URL and Admin URL per registration
  - Registration and contact form data now saved to PostgreSQL database
  - Login page (/login) with "Organisers Login" form (email, password, forgot password link, back button)
  - Create Account page (/create-account) with multi-step onboarding:
    - Step 0 (Register): Organisation Name, Your Name, Email, Password (step indicator hidden)
    - Step 1 (Identity): Domain setup - Yes/No for existing domain, domain input, subdomain prefix editing (platform.[domain])
    - Step 2 (Terms): Terms & Conditions acceptance page
    - "No domain" shows random 5-letter subdomain on social8.io with option to change the prefix
    - After completion: "Creating your platform" screen with spinning cog animation for 15 seconds
    - Then "All ready" screen showing admin URL, username (email), password, and platform link with copy buttons
  - Contact page (/contact) with form (Organisation, Name, Email, Mobile, Notes) - data saved to database
  - Contact form shows "Thank You" message on submit
  - Updated header: Log In and Create Account buttons link to respective pages
  - Updated hero section: "Start Free Trial" links to /create-account, "View Platform" opens https://democommunity.social8.app
  - Updated pricing buttons: Starter and Professional tiers link to /create-account, Enterprise links to /contact
  - Changed "Contact Sales" to "Contact Us" throughout the site
  - Updated Launch CTA section: "Create Account" button links to /create-account
- **January 2026**: Created marketing landing page with the following sections:
  - Hero section with dashboard preview mockup
  - Features section (6 feature cards with "Learn More" links)
  - Benefits section (removed)
  - How It Works section (5 steps with icons)
  - Who Is It For section (5 audience types including Content Creators)
  - Testimonials section (3 testimonials)
  - Pricing section (3 tiers: Starter, Professional, Enterprise)
  - Launch your community now CTA section with Social8 logo
  - Footer with navigation links
- Created 6 dedicated feature detail pages with unique content:
  - Member Communication & Social Networking (/features/member-communication)
  - Groups & Communities (/features/groups-communities)
  - Events & Competitions (/features/events-competitions)
  - AI Fully Enabled (/features/ai-feature-create)
  - Content Publishing & News (/features/content-publishing)
  - Analytics & Reporting (/features/analytics-reporting)
- Each feature page includes: hero section, key benefits, image placeholder, prev/next navigation, CTA section
- Created 5 dedicated benefit detail pages with unique content:
  - Increase Member Engagement (/benefits/member-engagement)
  - Simplify Management (/benefits/simplify-management)
  - Inter-Club Play Made Easy (/benefits/inter-club-play)
  - Generate Revenue Streams (/benefits/revenue-streams)
  - Improve Member Retention (/benefits/improve-retention)
- Each benefit page includes: hero section with icon, 4 detail sections, prev/next navigation with looping, CTA section
- Applied pink/purple color theme matching the Social8 logo
- Added SEO meta tags and Open Graph tags with dynamic updates on feature pages
- Uses Social8 logo from attached assets

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Build Tool**: Vite with custom plugins for Replit development experience
- **Color Theme**: Pink/Fuchsia (#d946ef) and Purple/Violet (#8b5cf6) for branding, matching the Social8 logo

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/` (home.tsx, login.tsx, create-account.tsx, contact.tsx, feature.tsx, benefit.tsx, admin.tsx, admin-login.tsx, not-found.tsx)
- Reusable UI components in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`
- Utility functions and query client in `client/src/lib/`

### Routing Structure
- `/` - Home page (marketing landing page)
- `/login` - Login page (Organisers Login form with back button)
- `/create-account` - Account creation page (5-step onboarding, data saved to DB)
- `/contact` - Contact page (form with Organisation, Name, Email, Mobile, Notes, data saved to DB)
- `/admin/login` - Admin login page (username: admin)
- `/admin` - Admin dashboard (view registrations and contact submissions, edit Platform/Admin URLs)
- `/features/:slug` - Feature detail pages (6 total)
- `/benefits/:slug` - Benefit detail pages (5 total)
- Feature slugs: member-communication, groups-communities, events-competitions, ai-feature-create, content-publishing, analytics-reporting
- Benefit slugs: member-engagement, simplify-management, inter-club-play, revenue-streams, improve-retention

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful API with `/api` prefix for all routes
- **Storage Interface**: Abstracted storage layer (`IStorage` interface) allowing swappable implementations

The backend structure:
- `server/index.ts` - Application entry point with middleware setup
- `server/routes.ts` - API route registration
- `server/storage.ts` - Data access layer with storage interface
- `server/vite.ts` - Development server integration with Vite HMR
- `server/static.ts` - Production static file serving

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's type-safe schema builder
- **Validation**: Zod schemas generated from Drizzle schemas via `drizzle-zod`
- **Migrations**: Managed via `drizzle-kit` with migrations output to `./migrations`

### Shared Code
The `shared/` directory contains code shared between frontend and backend:
- Database schema definitions
- TypeScript types derived from schema
- Zod validation schemas

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production Build**: Custom build script (`script/build.ts`) using:
  - Vite for client bundle (output to `dist/public`)
  - esbuild for server bundle (output to `dist/index.cjs`)
  - Selective dependency bundling to optimize cold start times

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage for Express sessions

### Core Libraries
- **Drizzle ORM**: Type-safe database queries and schema management
- **Zod**: Runtime type validation
- **TanStack React Query**: Async state management and caching

### UI Framework
- **Radix UI**: Unstyled, accessible component primitives
- **shadcn/ui**: Pre-built component patterns using Radix + Tailwind
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript/TypeScript bundler for server
- **TypeScript**: Static type checking across the stack
