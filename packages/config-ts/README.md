# @xstools-dev/config-ts

面向现代 TypeScript 项目的共享配置预设。

- v5 预设要求 TypeScript 5.6 或更高版本。
- v7 预设要求 TypeScript 7.0 或更高版本。

## 预设

### 现代项目（TypeScript 5）

适用于 ESM 项目，且由 Bun、Webpack、tsup、Vite 或 esbuild 等工具负责转译与打包。该预设启用严格类型检查、Bundler 模块解析与 `noEmit`。

```json
{
  "extends": "@xstools-dev/config-ts/v5/tsconfig.modern.json"
}
```

### 现代项目（TypeScript 7）

面向同样的 bundler + `noEmit` 场景，但按 TypeScript 6/7 的新默认值与官方推荐做了增量调整：

```json
{
  "extends": "@xstools-dev/config-ts/v7/tsconfig.modern.json"
}
```

TypeScript 6/7 起，`types` 默认变为 `[]`（不再自动载入全部 `node_modules/@types`），`rootDir` 默认变为配置文件所在目录。这两项因项目而异，预设不会代填。若类型检查缺少全局声明，或（在需要 emit 时）输出目录结构不对，请在项目自己的 `tsconfig.json` 中覆盖，例如：

```json
{
  "extends": "@xstools-dev/config-ts/v7/tsconfig.modern.json",
  "compilerOptions": {
    "types": ["node"]
  }
}
```

路径别名也不要再写 `baseUrl`（该选项在 TypeScript 7 已移除）。请把 `paths` 写成相对当前 `tsconfig.json` 的路径：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### React 项目

仅在项目使用 React JSX 时加入此预设。v5 / v7 的 React 配置都只负责启用 `react-jsx`，请与对应版本的现代项目预设组合使用：

```json
{
  "extends": ["@xstools-dev/config-ts/v7/tsconfig.modern.json", "@xstools-dev/config-ts/v7/tsconfig.react.json"]
}
```

### 基础预设

`common/tsconfig.base.json` 是 v5 / v7 的共用基础，包含严格类型检查、一致性与性能相关设置，例如 `strict`、`noImplicitReturns`、`noUncheckedIndexedAccess` 与 `skipLibCheck`。

## 相对 v5，v7 预设改了什么

v7 仍 extends 同一份 `common/tsconfig.base.json`，并沿用 v5 的「严格检查 + bundler + 不 emit」定位。下面只列出相对 `v5/tsconfig.modern.json` 的增减。

| 选项 | v5 | v7 | 理由 |
| --- | --- | --- | --- |
| `module` | `ESNext` | `Preserve` | TypeScript 6/7 对 bundler 项目的推荐组合是 `module: preserve` + `moduleResolution: bundler`。`Preserve` 按源码保留 ESM/`require` 形态，类型检查更接近 Vite、esbuild、Bun 的真实行为；`ESNext` 会把整份编译单元收成单一 ESM 格式。 |
| `libReplacement` | 未设置（旧默认 `true`） | `false` | TypeScript 6/7 默认改为 `false`。关闭后不再为替换内置 lib 做一轮失败的模块解析，能减轻 `--watch` 和编辑器开销。显式钉死，避免被上层改回。 |
| `noUncheckedSideEffectImports` | `true` | `true`（保留） | TypeScript 6/7 已默认 `true`。仍显式写出，防止使用方覆盖后静默退回旧行为。 |
| `esModuleInterop` | `true` | `true`（保留） | TypeScript 7 禁止设为 `false`。保留 `true` 仍然合法，并明确 CJS/ESM 互操作语义。 |
| `target` | `ESNext` | `ESNext`（保留） | TypeScript 7 默认是「当前稳定 ES」（现为 `es2025`），会随版本浮动。现代预设继续钉在 `ESNext`，行为可预期，也能用到最新 lib（如 Temporal）。真正的降级交给打包器。 |
| `types` / `rootDir` | 未设置 | 仍不设置 | 新默认值（`types: []`、`rootDir: ./`）会让不少项目踩坑，但正确取值取决于运行时和目录布局。写进共享预设会误伤纯前端或非 `src/` 项目，因此留给使用方覆盖。 |
| `baseUrl` | 未使用 | 不加入 | TypeScript 7 已移除。需要别名时只配置相对 `tsconfig.json` 的 `paths`。 |

刻意没有加入的选项：

- `erasableSyntaxOnly`：会禁止 `enum`、运行时 `namespace`、构造函数参数属性等，对共享预设过激。
- `allowImportingTsExtensions`：允许 `.ts` 扩展名导入，但不强制；是否采用取决于 Node type-stripping / Vite 约定，留给项目自己开。
- `stableTypeOrdering`：TypeScript 7 已强制开启且不可关闭。
- `isolatedDeclarations`：只对 emit `.d.ts` 有意义，本预设是 `noEmit`。

React 预设与 v5 相同，仍只设置 `jsx: react-jsx`。

## 参考资料

- https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html
- https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
- https://github.com/vuejs/tsconfig
- https://juejin.cn/post/7370516186909589545
- https://juejin.cn/post/7372933691490156582
- https://blog.csdn.net/zzyp1927314/article/details/139888376
