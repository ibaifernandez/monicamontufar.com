/**
 * prepare-wp-uploads.mjs
 *
 * Prebuild script: copies only the WP upload images that are actually referenced
 * in blog post HTML from src/assets/wp-content/ → public/wp-content/.
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

const postsPath = path.join(ROOT, 'src/data/wp-archive/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// Extract all image paths referenced as localhost:PORT/wp-content/uploads/...
const allHTML = posts.map(p => p.content?.rendered ?? '').join(' ');
const pattern = /https?:\/\/localhost:\d+\/wp-content\/(uploads\/[^\s"']+\.(?:jpg|jpeg|png|gif|webp|svg))/gi;
const referenced = new Set();
let m;
while ((m = pattern.exec(allHTML)) !== null) {
  referenced.add(m[1]); // e.g. "uploads/2025/04/Desierto_de_la_Tatacoa_Colombia_10.jpg"
}

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

  // Skip if destination is already up-to-date (same size = good enough for CI)
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
  ` (${referenced.size} total referenced)`
);
