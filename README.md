# The Kircuit

A community platform where people can share posts, organize events, and collect resources. Built with Next.js, TypeScript, Tailwind CSS, and Neon Postgres.

## Project Structure

```
the-kircuit/
├── src/
│   ├── app/                    # Pages and API routes (Next.js App Router)
│   │   ├── page.tsx            # Homepage — lists all communities
│   │   ├── layout.tsx          # Root layout (header, footer, auth)
│   │   ├── error.tsx           # Error boundary (friendly error messages)
│   │   ├── loading.tsx         # Loading state (spinner)
│   │   ├── [communitySlug]/    # Community pages
│   │   │   ├── page.tsx        # Community homepage (placeholder)
│   │   │   ├── events/
│   │   │   │   └── page.tsx    # Events list (placeholder)
│   │   │   └── posts/
│   │   │       └── [postId]/
│   │   │           └── page.tsx # Post detail page
│   │   ├── profile/
│   │   │   └── page.tsx        # User profile (placeholder)
│   │   └── api/                # API routes (you'll create these)
│   │       └── auth/
│   │           └── route.ts    # Auth placeholder
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx          # Site header with login
│   │   ├── Footer.tsx          # Site footer
│   │   └── CommunityNav.tsx    # Community tab navigation
│   ├── db/                     # Database files
│   │   ├── schema.ts           # Table definitions (Drizzle ORM)
│   │   ├── index.ts            # Database connection
│   │   └── seed.ts             # Fills tables with sample data
│   ├── lib/                    # Shared utilities
│   │   ├── auth.tsx            # Dev-mode fake authentication
│   │   └── seed-users.ts       # Sample user data for dev login
│   └── types.ts                # Shared TypeScript types
├── .env.local                  # Database connection string (pre-configured)
├── drizzle.config.ts           # Drizzle ORM configuration
└── package.json
```

## Tech Stack

- **Next.js 16** — React framework with App Router
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Utility-first CSS
- **Drizzle ORM** — Type-safe database queries
- **Neon Postgres** — Cloud PostgreSQL database
