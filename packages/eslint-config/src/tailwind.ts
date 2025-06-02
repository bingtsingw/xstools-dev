import type { Linter } from 'eslint';
import path from 'path';

const tailwind: Linter.Config = {
  extends: ['plugin:tailwindcss/recommended'],
  settings: {
    tailwindcss: {
      config: path.join(process.cwd(), 'tailwind.config.js'),
      whitelist: [
        'van-[\\w-]+',
        'custom-[\\w-]+',
        'tabs--[\\w-]+',
      ],
    },
  },
  rules: {
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
  },
};

module.exports = tailwind;
