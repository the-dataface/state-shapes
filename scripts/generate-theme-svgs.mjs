import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'assets', 'us');
const targetDir = join(root, 'assets', 'us-theme');
const DEFAULT_FILL = 'fill="#030712"';
const THEME_FILL = 'fill="currentColor"';

await mkdir(targetDir, { recursive: true });

const files = (await readdir(sourceDir)).filter((file) => file.endsWith('.svg'));

for (const file of files) {
  const content = await readFile(join(sourceDir, file), 'utf8');

  if (!content.includes(DEFAULT_FILL)) {
    throw new Error(`${file} is missing expected fill ${DEFAULT_FILL}`);
  }

  const themed = content.replaceAll(DEFAULT_FILL, THEME_FILL);
  await writeFile(join(targetDir, file), themed, 'utf8');
}

console.log(`Generated ${files.length} theme SVGs in assets/us-theme/`);
