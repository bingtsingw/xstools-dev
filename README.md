# @xstools-dev/mono

开发相关的工具以及配置封装  
该库封装了许多开发环境的工具: 比如`tsup`、`del-cli`等，以及Monorepo工程化相关工具: 比如`turbo`、`simple-git-hooks`、`changesets`、`lint-staged`等.

## 为什么进行封装

每次创建新项目都需要安装和配置`eslint`, `prettier`, `commitlint`, `lint-staged`, `git-hooks`等等, 维护起来很繁琐:

1. 这些配置在多数项目里都几乎一致, 到处复制粘贴带来了许多模板代码
2. 经常性地升级这些`devDependencies`是一个负担
3. 要更新一些配置是一个负担, 比如`typescript`新版本`tsconfig`配置改了一项, 需要在各个项目的各个包中去更新.

## 如何使用

在项目跟目录安装`@xstools-dev/mix`, 然后就可以直接使用各种dev工具和配置, 本项目就是使用`@xstools-dev/mix`来配置自己的.
