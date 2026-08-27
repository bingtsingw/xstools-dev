import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: {
      proxy: 'src/proxy/index.ts',
      extends: 'src/extends/index.ts',
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
    sourcemap: true,
    treeshake: true,
  },
});
