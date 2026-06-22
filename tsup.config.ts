import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/us.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
});
