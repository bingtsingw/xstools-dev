# @xstools-dev/cli-toolkit

开发期间常用的各种 CLI 工具，按命令名转发到真实 bin。

## Install

```bash
pnpm add -D @xstools-dev/cli-toolkit
```

## CLI

安装后可直接使用：

`changeset` · `czg` · `del` · `dotenvx` · `miniprogram-ci` · `port-client` · `release-it` · `s` · `sherif` · `turbo` · `wesvg`

每个命令对应 `bin/<name>.js` stub（避免 pnpm 多 bin 共用同一文件时丢失命令名）。

## Library

仅暴露 `dotenvLoad`：

```ts
import { dotenvLoad } from '@xstools-dev/cli-toolkit/extends';

dotenvLoad('.env');
```
