import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: {
      extend: 'src/extend.ts',
      index: 'src/index.ts',
    },
    format: ['esm'],
    platform: 'node',
    outExtensions() {
      return {
        js: '.js',
      };
    },
    dts: true,
    clean: true,
    treeshake: true,
  },
});
