# @xstools-dev/cli-toolkit

开发、发布和 Monorepo 维护所需 CLI 的统一入口。安装后可直接在 `package.json` scripts 或命令行中使用对应命令。

## 安装

```bash
pnpm add -D @xstools-dev/cli-toolkit
```

## 命令

本包公开的命令由 [`package.json`](./package.json) 中的 `bin` 字段定义；该字段是完整且唯一的命令清单。

示例：

```json
{
  "scripts": {
    "changeset": "changeset",
    "check-mono": "sherif",
    "release": "release-it",
    "build": "turbo run build"
  }
}
```

命令由各自的上游工具实现；本包负责提供稳定、统一的命令入口。

## 代码 API

`@xstools-dev/cli-toolkit/extends` 导出 `dotenvLoad`，用于读取指定的环境变量文件并写入 `process.env`：

```ts
import { dotenvLoad } from '@xstools-dev/cli-toolkit/extends';

dotenvLoad('.env');
```
