import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { US_REGIONS } from '../dist/us.js';
import { WORLD_COUNTRIES } from '../dist/world.generated.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const manifest = { us: {}, world: {} };

for (const [code, { slug, name }] of Object.entries(US_REGIONS)) {
  manifest.us[slug] = {
    code,
    name,
    variants: ['default', 'theme'],
  };
}

for (const [code, { slug, name }] of Object.entries(WORLD_COUNTRIES)) {
  manifest.world[slug] = {
    code,
    name,
    variants: ['default', 'theme'],
  };
}

await writeFile(
  join(root, 'dist', 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8'
);

console.log(
  `Generated manifest with ${Object.keys(manifest.us).length} US shapes and ${Object.keys(manifest.world).length} world countries`
);
