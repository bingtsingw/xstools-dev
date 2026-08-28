# xstools-dev

面向 JavaScript、TypeScript 与 Monorepo 项目的共享开发配置和 CLI 工具集。

## 包一览

| 包                                                           | 用途                               |
| ------------------------------------------------------------ | ---------------------------------- |
| [`@xstools-dev/config-ts`](./packages/config-ts)             | TypeScript 严格模式与现代构建预设  |
| [`@xstools-dev/eslint-config`](./packages/eslint-config)     | ESLint 的基础与 Taro 配置          |
| [`@xstools-dev/prettier-config`](./packages/prettier-config) | Prettier 基础配置与常用插件        |
| [`@xstools-dev/cli-toolkit`](./packages/cli-toolkit)         | 常用开发与 Monorepo CLI 的统一入口 |

## 安装

```bash
pnpm add -D \
  @xstools-dev/prettier-config \
  @xstools-dev/eslint-config \
  @xstools-dev/config-ts \
  @xstools-dev/cli-toolkit
```

在 pnpm 工作区中，如需让 ESLint 和 Prettier 插件被解析，可加入 `.npmrc`：

```ini
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```

## 配置示例

`package.json`：

```json
{
  "prettier": "@xstools-dev/prettier-config/base",
  "scripts": {
    "commit": "czg",
    "check-mono": "sherif"
  },
  "devDependencies": {
    "@xstools-dev/cli-toolkit": "workspace:^",
    "@xstools-dev/config-ts": "workspace:^",
    "@xstools-dev/eslint-config": "workspace:^",
    "@xstools-dev/prettier-config": "workspace:^"
  }
}
```

`tsconfig.json`：

```json
{
  "extends": "@xstools-dev/config-ts/v5/tsconfig.modern.json"
}
```

各包的配置选项和可用命令见对应包目录中的 README。
