# @xstools-dev/eslint-config

共享 ESLint 配置，提供 TypeScript 基础配置和 Taro 项目配置。

## 安装

```bash
pnpm add -D @xstools-dev/eslint-config eslint
```

## 基础配置

在 `.eslintrc.cjs` 中使用：

```js
module.exports = {
  extends: ['@xstools-dev/eslint-config/base'],
};
```

基础配置基于 Alloy 的 JavaScript 与 TypeScript 规则，并包含 import 顺序、类型导入风格和未使用变量等规则。构建产物目录 `dist`、`build`、`out` 默认忽略；以下划线开头的未使用参数与捕获错误会被允许。

## Taro 配置

Taro 项目使用：

```js
module.exports = {
  extends: ['@xstools-dev/eslint-config/taro'],
};
```

该配置在基础规则之上增加 React、React Hooks 和 Taro 全局变量支持。
