# Next.js Full Starter (Fixed `next.config.ts` Error)

A complete Next.js starter that **uses `next.config.mjs`** (ESM) so it builds cleanly on Vercel.
Includes TypeScript, App Router, API route, ESLint, Prettier, and example components.

## Why this exists
Vercel does **not** support `next.config.ts`. If your project had that, move your config to **`next.config.mjs`** (see this repo).

## Quick start

```bash
npm install
npm run dev
# http://localhost:3000
```

## Scripts
- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm start` – Run production
- `npm run lint` – Lint with ESLint
- `npm run typecheck` – TypeScript type-check only

## Project structure
```
app/
  api/health/route.ts   # Example API route
  globals.css           # Global styles
  layout.tsx            # Root layout
  page.tsx              # Home page
  favicon.ico
components/
  Hello.tsx
  Nav.tsx
public/
  next.svg
  vercel.svg
next.config.mjs         # ✅ ESM config (supported)
tsconfig.json
.env.example
```

## Deploying to Vercel
1. Push this folder as a new GitHub repo
2. Import in Vercel (Framework = Next.js auto-detected)
3. Add environment variables from `.env.example` (if any) in Vercel → Project Settings → Environment Variables
4. Deploy

## Migrating your app
- Copy your `app/` or `pages/` code into this template
- Copy `public/` assets
- **Replace** any `next.config.ts` with `next.config.mjs` (like ours)
- If you had custom webpack or redirects, move them into the mjs file.

---

Made for smooth Vercel deploys. Enjoy!
