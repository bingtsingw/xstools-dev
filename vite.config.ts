import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '**/*.{js,jsx,ts,tsx}': 'vp check',
    '**/*.{html,css,md,json,prisma}': 'vp fmt',
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  fmt: {
    printWidth: 120,
    proseWrap: 'never',
    singleQuote: true,
  },
});
