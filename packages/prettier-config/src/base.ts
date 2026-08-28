const base: import('prettier').Config = {
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-prisma',
    'prettier-plugin-multiline-arrays',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  printWidth: 120,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};

module.exports = base;
