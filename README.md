# Next.js Config Fix Kit (Auto-convert `next.config.ts` → `next.config.mjs`)

Use this when Vercel fails with:
> Configuring Next.js via 'next.config.ts' is not supported.

This kit finds every `next.config.ts` in your repo (monorepo-safe) and converts it into a supported **ESM** config: `next.config.mjs`.

## Quick usage (copy-paste)

```bash
# 1) Drop this folder at the ROOT of your repo (same level as package.json / apps/ etc.)
# 2) Run:
bash scripts/fix-next-config.sh
# 3) Commit the changes:
git add -A && git commit -m "fix: convert next.config.ts to next.config.mjs for Vercel"
# 4) On Vercel: Redeploy with 'Clear build cache'
```

If you prefer Node only:
```bash
node scripts/convert-next-config.mjs --dry-run   # see planned changes
node scripts/convert-next-config.mjs             # perform conversion
```

## What the script does
- Finds **all** `next.config.ts` files (including in monorepo subpackages/apps)
- Converts TypeScript-only bits to plain JS with JSDoc
- Writes a new `next.config.mjs` next to each TS file
- Deletes the old `next.config.ts`
- Leaves CommonJS configs alone (if you had `next.config.js`, it won't touch them)

### Examples of conversions

```ts
// TS input
import type { NextConfig } from 'next'
const config: NextConfig = {
  reactStrictMode: true,
}
export default config
```

becomes

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
export default nextConfig;
```

```ts
// TS input
const config = { trailingSlash: true } as import('next').NextConfig
export default config
```

becomes

```js
/** @type {import('next').NextConfig} */
const nextConfig = { trailingSlash: true };
export default nextConfig;
```

### After running
- Ensure there is **only one** config file per Next.js app: `next.config.mjs`
- Delete any leftover `next.config.ts` (script already does it)
- On Vercel → Project → Deployments → Redeploy with **Clear build cache**
- Double-check the “Root Directory” is pointing to your app if monorepo

## Troubleshooting
- **Multiple apps**: The script handles multiple `apps/*/next.config.ts`. Each gets its own `next.config.mjs`.
- **Custom webpack / redirects**: They’re preserved verbatim.
- **Still failing?** Search your repo for any remaining `next.config.ts`:
  ```bash
  git ls-files | grep next.config.ts || true
  ```
  If any remain, convert/delete manually or re-run the script.
- **CJS to ESM**: If you had `module.exports = { ... }`, either keep it as `next.config.js` or change to ESM style:
  ```js
  const nextConfig = { /* ... */ }
  export default nextConfig
  ```
- **Monorepo root vs app root**: Make sure Vercel’s project root is set to the correct app folder.
- **Clear cache**: Always redeploy with cache cleared after changing configs.
