# xstools-dev

面向 JavaScript、TypeScript 与 Monorepo 项目的共享开发配置和 CLI 工具集。

## 包一览

| 包                                                   | 用途                               |
| ---------------------------------------------------- | ---------------------------------- |
| [`@xstools-dev/config-ts`](./packages/config-ts)     | TypeScript 严格模式与现代构建预设  |
| [`@xstools-dev/cli-toolkit`](./packages/cli-toolkit) | 常用开发与 Monorepo CLI 的统一入口 |

## 安装

```bash
pnpm add -D \
  @xstools-dev/config-ts \
  @xstools-dev/cli-toolkit
```

## 配置示例

`package.json`：

```json
{
  "scripts": {
    "commit": "czg",
    "check-mono": "sherif"
  },
  "devDependencies": {
    "@xstools-dev/cli-toolkit": "workspace:^",
    "@xstools-dev/config-ts": "workspace:^"
  }
}
```

`tsconfig.json`（TypeScript 5）：

```json
{
  "extends": "@xstools-dev/config-ts/v5/tsconfig.modern.json"
}
```

TypeScript 7 项目改用 `@xstools-dev/config-ts/v7/tsconfig.modern.json`。React JSX 再叠一层同版本的 `tsconfig.react.json`。选项说明见 [`packages/config-ts`](./packages/config-ts)。

各包的配置选项和可用命令见对应包目录中的 README。
