# @xstools-dev/config-prettier

共享 Prettier 基础配置，内置 package.json、Prisma、Tailwind CSS、导入整理和多行数组格式化插件。

插件会从本包解析为绝对路径，因此在 pnpm 的隔离依赖布局中也可直接使用，无需设置 `public-hoist-pattern[]=*prettier*`。

## 安装

```bash
pnpm add -D @xstools-dev/config-prettier
```

本包代理了 `prettier` CLI，因此可直接执行 `pnpm prettier`，无需在使用方额外安装 `prettier`。

## 使用

在 `package.json` 中引用：

```json
{
  "prettier": "@xstools-dev/config-prettier/base"
}
```

也可以在 `prettier.config.cjs` 中导出：

```js
module.exports = require('@xstools-dev/config-prettier/base');
```

随后可正常运行 Prettier：

```bash
pnpm prettier --write .
```

## 默认风格

- 单引号
- 行宽 120
- 始终保留尾逗号
- Markdown 不自动换行
