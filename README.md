# Student Survival Tools

Static-first student utilities built with Next.js, strict TypeScript, and Tailwind CSS.

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
npm run test:e2e
npm run build
```

The E2E suite starts the development server automatically. Install its browser runtime once with `npx playwright install chromium`.

## Configuration

Copy `.env.example` to `.env.local` when environment-specific values are needed. `NEXT_PUBLIC_SITE_URL` controls canonical metadata; it defaults to `https://getschoolkit.com`. `NEXT_PUBLIC_ADSENSE_CLIENT_ID` identifies the public AdSense publisher account used by the production script.

Production: [https://getschoolkit.com](https://getschoolkit.com)

## Cloudflare Pages deployment

The application uses Next.js static export mode. `npm run build` writes the deployable site to `out/`, so no server runtime, database, or Workers paid plan is required.

Create a Cloudflare Pages project connected to this repository with:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://getschoolkit.com`
- Optional analytics variable: `NEXT_PUBLIC_GA_ID`
- AdSense variable: `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-3024928824650244`

After the first deployment, replace `NEXT_PUBLIC_SITE_URL` with the final custom domain and redeploy before submitting the sitemap to search engines.
