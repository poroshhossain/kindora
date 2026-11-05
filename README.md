# Kindora 🌱

A community-driven social service event platform built on the modern Next.js stack. Kindora lets volunteers discover, create, and join local charity events — cleanups, tree plantations, donations, education programs, and more.

🔗 **Live:** [kindora-blush.vercel.app](https://kindora-blush.vercel.app/)

> ⚠️ **Early stage / work in progress.** Event data is served by an external REST API and the home page still uses seeded data. A fully integrated internal backend is on the roadmap.

---

## ✨ Features

- **Home page** — hero section, impact stats, bento-style feature grid, recent events, photo gallery, and newsletter CTA
- **Upcoming events** — server-fetched event list with client-side **search** (title / location / description), **category filtering**, and **date sorting** (upcoming ↔ latest), rendered in an interactive card grid
- **Event details** — dynamic detail page per event (`/upcoming-events/[id]`) with a join/leave flow
- **Create event** — validated multi-field form (title, description, category, location, date, banner image)
- **Manage events** — edit and delete events you created, with optimistic UI feedback via toasts
- **Join events** — track and leave events you've joined
- **Authentication** — email & password auth powered by [Better Auth](https://www.better-auth.com/) with MongoDB persistence, JWT plugin for API auth, cookie-cached sessions, account linking, plus a Google sign-in button (UI ready)
- **Form validation** — React Hook Form + [Zod](https://zod.dev/) schemas
- **Dark mode** — theme toggle via `next-themes`
- **Streaming & skeletons** — Suspense-based streaming with dedicated skeleton components for events and event details

## 🛠️ Technology Stack

| Category | Tech |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, `cacheComponents`, Partial Prefetching, React Compiler) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-variable theme tokens, Turbopack loader) |
| Components | [shadcn/ui](https://ui.shadcn.com/) (style `base-nova`) built on [Base UI](https://base-ui.com/) |
| Language | TypeScript (strict, `tsc --noEmit` for type-checking) |
| Auth | [Better Auth](https://www.better-auth.com/) + `@better-auth/mongo-adapter` + JWT plugin |
| Database | [MongoDB](https://www.mongodb.com/) (official `mongodb` driver) |
| Forms | React Hook Form + `@hookform/resolvers` |
| Validation | Zod |
| Icons | [Lucide React](https://lucide.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) (toasts) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) + `tw-animate-css` |
| Linting / Formatting | [Biome](https://biomejs.dev/) (single toolchain, Next.js & React domain rules) |
| Utility | `cn` (class merging), `class-variance-authority` (variants) |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # Better Auth catch-all API route
│   └── (public)/                    # All routes live here (sole root layout)
│       ├── (auth)/                  # Login & register pages (grouped layout)
│       ├── create-event/            # Create-event form page
│       ├── manage-events/           # Manage (edit/delete) your events
│       ├── join-events/             # Events you've joined
│       ├── upcoming-events/         # Event list + [id] detail page
│       ├── globals.css              # Global styles & Tailwind theme tokens
│       └── page.tsx                 # Home page
├── components/
│   ├── ui/                          # shadcn/ui primitives (Base UI)
│   ├── header/                      # Navbar & logged-in user menu
│   ├── footer/                      # Site footer
│   ├── HomeCom/                     # Home page sections (hero, stats, gallery…)
│   ├── events/                      # Event cards, explorer, skeletons,
│   │   ├── manageEvents/            #   … edit & delete flows
│   │   ├── EventDetailsContent/     #   … details & join flow
│   │   └── JoinedEvents/            #   … joined-events grid
│   ├── auth/                        # Auth forms, Zod schemas, Google button
│   ├── sheardData/                  # Shared bits (loading, leave-event button)
│   ├── theme-provider.tsx           # next-themes provider
│   └── theme-toggle.tsx             # Dark-mode toggle
├── lib/
│   ├── auth.ts                      # Better Auth server config (MongoDB adapter, JWT, Google)
│   ├── auth-client.ts               # Better Auth client instance
│   └── api.ts                       # Typed REST helpers for the events API
└── types/
    └── types.ts                     # Shared types (EventRecord, EventType)
scripts/
├── seed-events.mjs                  # Seeds sample events into MongoDB
└── make-dark-logo.mjs               # Logo generation utility
```

### Event categories

`cleanup` · `plantation` · `donation` · `food-distribution` · `blood-donation` · `awareness-campaign` · `other`

## 🚀 Getting Started

### Prerequisites

- **Node.js** (LTS recommended) with **npm** (this project does not use yarn/pnpm)
- A **MongoDB** instance (local or Atlas)
- An **external events API** satisfying `NEXT_PUBLIC_API_BASE_URL`

### Installation

```bash
git clone <repository-url>
cd kindora
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Better Auth (server)
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<generate-a-strong-secret>

# Better Auth (client)
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/kindora

# External events API consumed by the client
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Google OAuth (optional — enables the social provider)
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
```

### Seed Sample Events (optional)

```bash
node scripts/seed-events.mjs
```

Populates the `events` collection with sample community-service events. Safe to re-run — the collection is cleared first.

### Run the App

```bash
# Development server (Turbopack)
npm run dev

# Production build & serve
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack, writes `.next/dev`) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Biome `check` — lint **and** verify formatting |
| `npm run format` | Auto-fix formatting with Biome |
| `npx tsc --noEmit` | Type-check the project (no test setup yet) |
| `node scripts/seed-events.mjs` | Seed sample events into MongoDB |

> ℹ️ `biome check` does **not** type-check — always run `npx tsc --noEmit` alongside it before declaring work done.

## 🏗️ Architecture Notes

- **Single route group:** every route lives under `src/app/(public)/` — the sole root layout, `globals.css`, and site chrome (`Navber`, `Footer`) come from that layout, so pages only contribute `<main>` content.
- **Next.js 16 flags:** `cacheComponents`, `partialPrefetching`, and React Compiler are enabled. Read the bundled guides in `node_modules/next/dist/docs/` before touching `use cache`, `Suspense`, or manual memoization.
- **Tailwind v4 without a config file:** theme tokens are CSS variables in `globals.css`; Tailwind is wired via a Turbopack loader rule in `next.config.ts`.
- **API access:** the client talks to an external REST API (`src/lib/api.ts`) using Better Auth JWT bearer tokens (`authClient.token()`); auth itself runs on the app's own `/api/auth/[...all]` route.
- **Note on Tailwind remote images:** `next.config.ts` allows any HTTPS image host via `remotePatterns` — tighten this before production deploys.

## 🗺️ Roadmap

- [ ] Replace the external events API with a fully integrated internal backend
- [ ] Enable Google OAuth sign-in end-to-end
- [ ] Real join/RSVP tracking with participant counts
- [ ] Event ratings or gallery integration from participants
- [ ] Automated tests

## 🤝 Contributing

Contributions are welcome! Before submitting changes:

```bash
npm run lint
npx tsc --noEmit
```

## 📄 License

Not yet specified — add a license before public release.
