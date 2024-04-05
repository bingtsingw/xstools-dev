import type { Config } from 'prettier';

const base: Config = {
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-organize-imports',
    'prettier-plugin-prisma',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-multiline-arrays',
  ],
  printWidth: 120,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};

module.exports = base;
