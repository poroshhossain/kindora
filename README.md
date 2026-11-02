# Kindora 🌱

A community-driven social service event platform built with the modern Next.js stack. Kindora lets volunteers discover, create, and join local charity events — cleanups, tree plantations, donations, education programs, and more.

> ⚠️ **Early stage / work in progress** — the app currently reads event data from an external API and uses seeded/mock data on the home page. A full backend is not wired up yet.

---

## ✨ Features

- **Home page** — hero section, impact stats, bento-style feature grid, recent events, photo gallery, and newsletter CTA
- **Upcoming events** — server-fetched event list with client-side **search** (title / location / description), **category filtering**, and **date sorting** (upcoming ↔ latest), all rendered with an interactive event-card grid
- **Event categories** — Cleanup, Plantation, Donation, Food Distribution, Blood Donation, Awareness Campaign, and Other
- **Event details** — dynamic detail pages per event (`/upcoming-events/[id]`) with a join flow
- **Create event** — validated multi-field form (title, description, category, location, date, banner image)
- **Authentication** — email & password auth powered by [Better Auth](https://www.better-auth.com/) with MongoDB persistence, plus registration/login pages, form validation, logout, and a Google sign-in button (UI ready)
- **Dark mode** — theme toggle via `next-themes`
- **Skeleton loading states** — Suspense-based streaming with skeleton components for events and event details

## 🛠️ Technology Stack

| Category | Tech |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, `cacheComponents`, Partial Prefetching, React Compiler) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-variable theme tokens, Turbopack loader) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (style `base-nova`) built on [Base UI](https://base-ui.com/) |
| Language | TypeScript |
| Auth | [Better Auth](https://www.better-auth.com/) + `@better-auth/mongo-adapter` |
| Database | [MongoDB](https://www.mongodb.com/) (`mongodb` driver) |
| Forms | React Hook Form + `@hookform/resolvers` |
| Validation | [Zod v4](https://zod.dev/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) (toasts) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) + `tw-animate-css` |
| Linting / Formatting | [Biome](https://biomejs.dev/) |
| Utility | `cn` (class merging), `class-variance-authority` (variants) |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # Better Auth catch-all API route
│   └── (public)/                    # All routes live here (sole root layout)
│       ├── (auth)/                  # Login & register pages (grouped layout)
│       ├── create-event/
│       ├── upcoming-events/[id]/    # Event list + detail pages
│       ├── join-events/
│       └── page.tsx                 # Home page
├── components/
│   ├── ui/                          # shadcn/ui primitives (Base UI)
│   ├── header/                      # Navbar & user menu
│   ├── footer/
│   ├── home/                        # Home page sections
│   ├── events/                      # Event cards, explorer, skeletons
│   └── auth/                        # Auth forms & Zod schemas
├── context/                         # Auth context provider
├── lib/                             # auth, auth-client, api helpers, types
└── types/                           # Shared TypeScript interfaces
scripts/
├── seed-events.mjs                  # Seeds sample events into MongoDB
└── make-dark-logo.mjs               # Logo generation utility
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS recommended) with **npm**
- A **MongoDB** instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd kindora

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/kindora
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### Seed Sample Events (optional)

```bash
node scripts/seed-events.mjs
```

This populates the `events` collection with sample community-service events. It is safe to re-run (the collection is cleared first).

### Run the App

```bash
# Development server (Turbopack)
npm run dev

# Production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run Biome check (lint + format verification) |
| `npm run format` | Auto-fix formatting with Biome |
| `npx tsc --noEmit` | Type-check the project |

## 🗺️ Roadmap

- [ ] Replace external API / mock data with a full internal backend
- [ ] Enable Google OAuth sign-in end-to-end
- [ ] Real join/RSVP tracking with participant counts
- [ ] Organizer dashboard for managing created events

## 🤝 Contributing

Contributions are welcome! Please run `npm run lint` and `npx tsc --noEmit` before submitting changes.
