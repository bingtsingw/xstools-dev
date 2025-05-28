import type { Linter } from 'eslint';

const tailwind: Linter.Config = {
  extends: ['plugin:tailwindcss/recommended'],
  settings: {
    tailwindcss: {
      config: './tailwind.config.js',
      whitelist: [],
    },
  },
};

export default tailwind;
