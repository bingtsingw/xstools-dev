import type { Linter } from 'eslint';
import { baseConfig } from './_util';

const taro: Linter.Config = {
  ...baseConfig,
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  plugins: [...(baseConfig.plugins ?? []), 'react-hooks'],
  rules: {
    ...baseConfig.rules,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'jsx-quotes': ['error', 'prefer-double'],
  },
  settings: {
    ...baseConfig.settings,
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    JSX: true,
    __wxConfig: true,
    defineAppConfig: true,
    definePageConfig: true,
  },
};

module.exports = taro;
