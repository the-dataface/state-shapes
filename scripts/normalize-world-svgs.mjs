import {
  readdir,
  readFile,
  writeFile,
  mkdir,
  unlink,
} from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const worldDir = join(root, 'assets', 'world');
const regionsPath = join(root, 'scripts', 'generated', 'world-regions.json');
const FIGMA_PATTERN = /^Country=(.+) \(([A-Z]{2})\)\.svg$/;

await mkdir(join(root, 'scripts', 'generated'), { recursive: true });

const files = await readdir(worldDir);
const figmaFiles = files.filter((file) => FIGMA_PATTERN.test(file));

let regions = {};

if (figmaFiles.length > 0) {
  for (const file of figmaFiles) {
    const match = file.match(FIGMA_PATTERN);
    const name = match[1];
    const code = match[2];
    const slug = code.toLowerCase();

    const content = await readFile(join(worldDir, file), 'utf8');
    await writeFile(join(worldDir, `${slug}.svg`), content, 'utf8');
    await unlink(join(worldDir, file));

    regions[code] = { name, slug };
  }

  await writeFile(regionsPath, `${JSON.stringify(regions, null, 2)}\n`, 'utf8');
  console.log(`Normalized ${figmaFiles.length} world SVGs in assets/world/`);
} else {
  const normalized = files.filter((file) => /^[a-z]{2}\.svg$/.test(file));

  if (normalized.length === 0) {
    throw new Error('No world SVGs found in assets/world/');
  }

  try {
    regions = JSON.parse(await readFile(regionsPath, 'utf8'));
  } catch {
    throw new Error(
      'Missing scripts/generated/world-regions.json — add Figma exports or restore the regions file'
    );
  }

  if (Object.keys(regions).length !== normalized.length) {
    throw new Error(
      `World region count mismatch: ${Object.keys(regions).length} regions vs ${normalized.length} SVG files`
    );
  }

  console.log(`World SVGs already normalized (${normalized.length} files)`);
}
