#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { exec as _exec } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(_exec);

const DRY = process.argv.includes('--dry-run');

async function listGitFiles() {
  try {
    const { stdout } = await exec('git ls-files');
    return stdout.split('\n').filter(Boolean);
  } catch (e) {
    // Fallback: walk the filesystem (slower); here we just fallback to globbing minimal
    return [];
  }
}

function transformTsToMjs(source) {
  let out = source;

  // Remove type-only imports: import type { NextConfig } from 'next'
  out = out.replace(/import\s+type\s+\{[^}]+\}\s+from\s+['"]next['"];?/g, '');

  // Replace "as import('next').NextConfig" or "as NextConfig"
  out = out.replace(/\s+as\s+import\(['"]next['"]\)\.NextConfig/g, '');
  out = out.replace(/\s+as\s+NextConfig/g, '');

  // Replace "const X: NextConfig =" with "const nextConfig ="
  out = out.replace(/const\s+([A-Za-z0-9_$]+)\s*:\s*NextConfig\s*=\s*/g, 'const nextConfig = ');

  // If it didn't match typed const, try to rename a top-level const X = { ... } to nextConfig
  // only if export default X exists
  const exportDefaultMatch = out.match(/export\s+default\s+([A-Za-z0-9_$]+)/);
  if (exportDefaultMatch) {
    const exported = exportDefaultMatch[1];
    // Replace "const exported =" with "const nextConfig ="
    const regex = new RegExp(`const\\s+${exported}\\s*=`, 'm');
    if (regex.test(out)) {
      out = out.replace(regex, 'const nextConfig =');
      out = out.replace(new RegExp(`export\\s+default\\s+${exported}`,'g'), 'export default nextConfig');
    }
  }

  // Ensure JSDoc type is present at top (if not already)
  if (!/NextConfig\}/.test(out)) {
    out = `/** @type {import('next').NextConfig} */\n` + out;
  } else {
    // If it's already there, keep it
  }

  // Ensure ending semicolons + consistent export default nextConfig
  out = out.replace(/export\s+default\s*{/, 'const nextConfig = {').replace(/}\s*;?\s*$/, '}\nexport default nextConfig;\n');

  // Clean up double blank lines
  out = out.replace(/\n{3,}/g, '\n\n');

  return out;
}

async function main() {
  const files = await listGitFiles();
  // Fallback if git is unavailable: scan a few common paths
  const candidates = files.length
    ? files.filter(f => f.endsWith('next.config.ts'))
    : [
        'next.config.ts',
      ];

  // If no candidates from git, try naive filesystem walk at top level
  if (!candidates.length) {
    // naive check for monorepo paths
    const common = ['.', 'apps', 'packages', 'packages/web', 'apps/web'];
    for (const dir of common) {
      try {
        const list = await fs.readdir(dir);
        for (const f of list) {
          if (f === 'next.config.ts') candidates.push(join(dir, f));
        }
      } catch {}
    }
  }

  if (!candidates.length) {
    console.log('No next.config.ts files found. Nothing to do.');
    process.exit(0);
  }

  for (const tsPath of candidates) {
    const mjsPath = tsPath.replace(/next\.config\.ts$/, 'next.config.mjs');
    const src = await fs.readFile(tsPath, 'utf8');
    const transformed = transformTsToMjs(src);

    console.log(`\n➡️  Converting: ${tsPath} \n    → ${mjsPath}`);
    if (!DRY) {
      await fs.writeFile(mjsPath, transformed, 'utf8');
      await fs.rm(tsPath);
    }
  }

  console.log('\nDone.' + (DRY ? ' (dry run)' : ''));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
