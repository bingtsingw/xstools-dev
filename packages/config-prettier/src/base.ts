const base: import('prettier').Config = {
  // Resolve plugins from this package. Prettier otherwise resolves string plugin
  // names from the consuming project, which breaks with pnpm's isolated layout.
  plugins: [
    require.resolve('prettier-plugin-packagejson'),
    require.resolve('prettier-plugin-prisma'),
    require.resolve('prettier-plugin-multiline-arrays'),
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  printWidth: 120,
  proseWrap: 'never',
  singleQuote: true,
  trailingComma: 'all',
};

module.exports = base;
