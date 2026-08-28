# @xstools-dev/config-ts

面向现代 TypeScript 项目的共享配置预设。所有预设要求 TypeScript 5.6 或更高版本。

## 预设

### 现代项目

适用于 ESM 项目，且由 Bun、Webpack、tsup、Vite 或 esbuild 等工具负责转译与打包。该预设启用严格类型检查、Bundler 模块解析与 `noEmit`。

```json
{
  "extends": "@xstools-dev/config-ts/v5/tsconfig.modern.json"
}
```

### React 项目

仅在项目使用 React JSX 时加入此预设：

```json
{
  "extends": ["@xstools-dev/config-ts/v5/tsconfig.modern.json", "@xstools-dev/config-ts/v5/tsconfig.react.json"]
}
```

React 配置只负责启用 `react-jsx`；请与现代项目预设组合使用。

### 基础预设

`common/tsconfig.base.json` 是其他预设的基础，包含严格类型检查、一致性与性能相关设置，例如 `strict`、`noImplicitReturns`、`noUncheckedIndexedAccess` 与 `skipLibCheck`。

## 参考资料

- https://github.com/vuejs/tsconfig
- https://juejin.cn/post/7370516186909589545
- https://juejin.cn/post/7372933691490156582
- https://blog.csdn.net/zzyp1927314/article/details/139888376
