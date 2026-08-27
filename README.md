# xstools-dev

按需安装的开发配置与 CLI 工具集，该库封装了许多开发环境的工具: 比如`dotenvx`、`del-cli`等，以及Monorepo工程化相关工具: 比如`turbo`、`sherif`、`changesets`等。包的用途：

| 包 | 用途 |
| --- | --- |
| `@xstools-dev/prettier-config` | Prettier |
| `@xstools-dev/eslint-config` | ESLint |
| `@xstools-dev/config-ts` | TypeScript presets |
| `@xstools-dev/cli-toolkit` | 统一 CLI 代理（`czg` / `turbo` / `changeset` / `del` …） |

## 为什么进行封装

每次创建新项目都需要安装和配置`eslint`, `prettier`, `typescript`等等, 维护起来很繁琐:

1. 这些配置在多数项目里都几乎一致, 到处复制粘贴带来了许多模板代码
2. 经常性地升级这些`devDependencies`是一个负担
3. 要更新一些配置是一个负担, 比如`typescript`新版本`tsconfig`配置改了一项, 需要在各个项目的各个包中去更新.

## 快速开始

```bash
pnpm add -D \
  @xstools-dev/prettier-config \
  @xstools-dev/eslint-config \
  @xstools-dev/config-ts \
  @xstools-dev/cli-toolkit
```

可选 `.npmrc`（本仓仅保留 eslint / prettier hoist）：

```ini
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
```

根 `package.json` 示例：

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

TypeScript：

```json
{
  "extends": "@xstools-dev/config-ts/v5/tsconfig.modern.json"
}
```

## 废弃包

以下包仅兼容保留，勿用于新项目：

- `@xstools-dev/mix` → 按需安装上表组合
- `@xstools-dev/tools-mono` / `@xstools-dev/tools-script` → `@xstools-dev/cli-toolkit`
- `@xstools-dev/typescript-config` → `@xstools-dev/config-ts`
