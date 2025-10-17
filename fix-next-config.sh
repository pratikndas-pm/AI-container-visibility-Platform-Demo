#!/usr/bin/env bash
set -euo pipefail

# Ensure node exists
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is required. Install Node 18+ and retry." >&2
  exit 1
fi

echo "🔎 Searching and converting all next.config.ts files to next.config.mjs ..."
node scripts/convert-next-config.mjs

echo ""
echo "🧹 Removing local Next build cache (if any) ..."
rm -rf .next || true
find . -type d -name ".next" -prune -exec rm -rf {} + || true

cat <<'NOTE'

✅ Conversion complete.

Next steps:
1) git add -A && git commit -m "fix: convert next.config.ts to next.config.mjs for Vercel"
2) Push your changes
3) In Vercel, trigger a new deployment and enable "Clear build cache"
4) Verify the project root is correct if you're in a monorepo (Project Settings → General → Root Directory)

NOTE
