import type { Linter } from 'eslint';
import { baseConfig } from './_util';

const taro: Linter.Config = {
  ...baseConfig,
  extends: [
    'taro',
    'taro/react',
    'alloy',
    'alloy/react',
    'alloy/typescript',
  ],
  rules: {
    ...baseConfig.rules,
    'jsx-quotes': [
      'error',
      'prefer-double',
    ],
  },
  globals: {
    JSX: true,
    __wxConfig: true,
    defineAppConfig: true,
    definePageConfig: true,
  },
};

module.exports = taro;
