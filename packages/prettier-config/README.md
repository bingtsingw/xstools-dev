# @xstools-dev/prettier-config

共享 Prettier 基础配置，内置 package.json、Prisma、Tailwind CSS、导入整理和多行数组格式化插件。

## 安装

```bash
pnpm add -D @xstools-dev/prettier-config prettier
```

## 使用

在 `package.json` 中引用：

```json
{
  "prettier": "@xstools-dev/prettier-config/base"
}
```

也可以在 `prettier.config.cjs` 中导出：

```js
module.exports = require('@xstools-dev/prettier-config/base');
```

## 默认风格

- 单引号
- 行宽 120
- 始终保留尾逗号
- Markdown 不自动换行
