# Student Survival Tools

Static-first student utilities built with Next.js, strict TypeScript, and Tailwind CSS.

Milestone 0 establishes the shared application foundation. Calculator routes and calculation logic are intentionally deferred to later milestones.

## Development

```bash
npm install
npm run dev
```

The development site runs at `http://localhost:3000`.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Configuration

Copy `.env.example` to `.env.local` when environment-specific values are needed. `NEXT_PUBLIC_SITE_URL` controls canonical metadata; it defaults to `https://studentsurvival.tools`.
