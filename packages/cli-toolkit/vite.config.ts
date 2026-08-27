import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: {
      proxy: 'src/proxy/index.ts',
      extends: 'src/extends/index.ts',
    },
    format: ['esm'],
    platform: 'node',
    dts: true,
    // With package "type": "module", emit .js instead of .mjs
    fixedExtension: false,
    // Keep package.json exports/bin under our control (multi-alias via sync-bin)
    exports: false,
  },
});
