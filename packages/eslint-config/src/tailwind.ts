import type { Linter } from 'eslint';
import path from 'path';

const tailwind: Linter.Config = {
  plugins: ['tailwindcss'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
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
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-negative-arbitrary-values': 'error',
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'warn',
    'tailwindcss/no-arbitrary-value': 'off',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    'tailwindcss/no-unnecessary-arbitrary-value': 'error',
  },
};

module.exports = tailwind;
