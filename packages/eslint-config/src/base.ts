import type { Linter } from 'eslint';

const base: Linter.Config = {
  extends: ['alloy', 'alloy/typescript'],
  ignorePatterns: ['dist', 'build', 'out'],
  overrides: [
    {
      files: ['*.config.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
        'import/no-commonjs': 'off',
      },
    },
  ],
};

module.exports = base;
