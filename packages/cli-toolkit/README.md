# @xstools-dev/cli-toolkit

开发、发布和 Monorepo 维护所需 CLI 的统一入口。这是**全家桶**：安装本包会带上下面列出的全部上游工具，不能按命令拆开安装。适合已经使用 Changesets、Turbo、sherif 等同套工具链的仓库。

## 安装

```bash
pnpm add -D @xstools-dev/cli-toolkit
```

## 命令

命令清单的唯一来源是 [`src/proxy/tools.ts`](./src/proxy/tools.ts) 中的 `TOOLS`。`pnpm build` 会据此生成 `bin/*.js` 并写回 `package.json` 的 `bin` 字段。

当前代理的命令：

| 命令          | 上游包               |
| ------------- | -------------------- |
| `changeset`   | `@changesets/cli`    |
| `czg`         | `czg`                |
| `del`         | `del-cli`            |
| `dotenvx`     | `@dotenvx/dotenvx`   |
| `port-client` | `port-client`        |
| `s`           | `@serverless-devs/s` |
| `sherif`      | `sherif`             |
| `turbo`       | `turbo`              |

另依赖 `@changesets/changelog-github`，供 Changesets 写 changelog，不是独立命令。

示例：

```json
{
  "scripts": {
    "changeset": "changeset",
    "check-mono": "sherif",
    "build": "turbo run build"
  }
}
```

命令由各自的上游工具实现；本包负责提供稳定、统一的命令入口。新增或删除命令时，只改 `TOOLS`，然后跑 `pnpm build`（或 `pnpm gen-bin`），把生成的 `bin/` 与 `package.json` 一并提交。

## 代码 API

`@xstools-dev/cli-toolkit/extends` 导出 `dotenvLoad`，用于读取指定的环境变量文件并写入 `process.env`：

```ts
import { dotenvLoad } from '@xstools-dev/cli-toolkit/extends';

dotenvLoad('.env');
```
