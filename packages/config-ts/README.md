# @xstools-dev/config-ts

TypeScript configuration presets for `@xstools-dev` projects.

## Usage

All current presets require TypeScript 5.6 or later.

### Modern projects

Use this for projects authored as ESM and built by an external tool such as Bun, Webpack, tsup, Vite, or esbuild. TypeScript performs type checking only.

```json
{
  "extends": "@xstools-dev/config-ts/v5/tsconfig.modern.json"
}
```

### React

Add this focused preset only when the project uses React JSX:

```json
{
  "extends": [
    "@xstools-dev/config-ts/v5/tsconfig.modern.json",
    "@xstools-dev/config-ts/v5/tsconfig.react.json"
  ]
}
```

`common/tsconfig.base.json` contains the shared strictness, consistency, and performance settings. It is intended as a building block for other presets.

## 参考资料

- https://github.com/vuejs/tsconfig
- https://juejin.cn/post/7370516186909589545
- https://juejin.cn/post/7372933691490156582
- https://blog.csdn.net/zzyp1927314/article/details/139888376
