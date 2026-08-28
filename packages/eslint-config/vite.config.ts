import { defineConfig } from 'vite-plus';

export default defineConfig({
  pack: {
    entry: {
      base: 'src/base.ts',
      taro: 'src/taro.ts',
    },
    format: ['cjs'],
    platform: 'node',
    outExtensions() {
      return {
        js: '.js',
      };
    },
    dts: false,
    clean: true,
    treeshake: true,
  },
});
