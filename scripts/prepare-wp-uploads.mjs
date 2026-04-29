/**
 * prepare-wp-uploads.mjs
 *
 * Prebuild script: copies only the WP upload images that are actually referenced
 * from src/assets/wp-content/ → public/wp-content/.
 *
 * Sources scanned:
 *   1. Blog post HTML content (localhost:PORT/wp-content/... URLs)
 *   2. Astro source files (~/assets/wp-content/... static imports)
 *
 * Runs automatically via the "prebuild" npm script before `astro build`.
 * This avoids duplicating assets in git while still serving them as static
 * files from public/ in the built site.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── 1. Images referenced in WP post HTML (served via /wp-content/ static path) ──
const postsPath = path.join(ROOT, 'src/data/wp-archive/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const allHTML = posts.map(p => p.content?.rendered ?? '').join(' ');
const htmlPattern = /https?:\/\/localhost:\d+\/wp-content\/(uploads\/[^\s"']+\.(?:jpg|jpeg|png|gif|webp|svg))/gi;
const referenced = new Set();
let m;
while ((m = htmlPattern.exec(allHTML)) !== null) {
  referenced.add(m[1]); // e.g. "uploads/2025/04/Desierto_de_la_Tatacoa_Colombia_10.jpg"
}

// ── 2. Images imported statically in Astro source files (processed by Astro Image) ──
// These are imported via `~/assets/wp-content/...` and handled at build time by
// Vite/Astro — they don't need to be copied to public/, but must exist in src/.
// We track them so the cleanup script knows to keep them.
const SRC_DIR = path.join(ROOT, 'src');
const astroImportPattern = /~\/assets\/wp-content\/(uploads\/[^\s"'`]+)/g;
const astroReferenced = new Set();

function scanDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.astro', 'dist'].includes(entry.name)) {
      scanDir(full);
    } else if (entry.isFile() && /\.(astro|ts|tsx|js|jsx|mjs)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      let am;
      while ((am = astroImportPattern.exec(content)) !== null) {
        astroReferenced.add(am[1]);
      }
    }
  }
}
scanDir(SRC_DIR);

// ── Copy HTML-referenced files to public/wp-content/ ──
const SRC_BASE = path.join(ROOT, 'src/assets/wp-content');
const DST_BASE = path.join(ROOT, 'public/wp-content');

let copied = 0;
let skipped = 0;

for (const rel of referenced) {
  const src = path.join(SRC_BASE, rel);
  const dst = path.join(DST_BASE, rel);

  if (!fs.existsSync(src)) {
    skipped++;
    continue;
  }

  if (fs.existsSync(dst)) {
    const srcStat = fs.statSync(src);
    const dstStat = fs.statSync(dst);
    if (srcStat.size === dstStat.size) {
      skipped++;
      continue;
    }
  }

  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  copied++;
}

console.log(
  `[prepare-wp-uploads] ✓ ${copied} copied, ${skipped} up-to-date/missing` +
  ` (${referenced.size} HTML-referenced + ${astroReferenced.size} Astro-imported)`
);
