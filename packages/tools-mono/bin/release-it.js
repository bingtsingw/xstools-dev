#!/usr/bin/env node

import releaseIt from 'release-it';
import { configA, defaultConfig } from '../config/release-it.config.js';

// 解析命令行参数
// Example: npx release-it --config=A
const args = process.argv.slice(2);
const customConfigArg = args.find((arg) => arg.startsWith('--config='));
const customConfig = customConfigArg ? customConfigArg.split('=')[1] : null;

let finalConfig = defaultConfig;
// 如果提供了自定义配置路径，则读取并解析配置文件
if (customConfig === 'A') {
  finalConfig = configA;
}

releaseIt(finalConfig);
