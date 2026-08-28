import { chmodSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { TOOLS } from '../src/proxy/tools.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkgPath = resolve(root, 'package.json');
const binDirRel = './bin';
const binDirAbs = resolve(root, 'bin');

function toSingleQuotedString(value: string): string {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
}

mkdirSync(binDirAbs, { recursive: true });

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
  bin?: Record<string, string>;
  [key: string]: unknown;
};

pkg.bin = {};
for (const name of Object.keys(TOOLS).sort()) {
  const fileRel = `${binDirRel}/${name}.js`;
  const fileAbs = resolve(root, fileRel);
  // pnpm links these source-controlled stubs during install. Each one passes its
  // command name explicitly because argv[1] is the shared target path in pnpm shims.
  const code = `#!/usr/bin/env node
import { main } from '../dist/proxy.js';
main(${toSingleQuotedString(name)});
`;
  writeFileSync(fileAbs, code);
  chmodSync(fileAbs, 0o755);
  pkg.bin[name] = fileRel;
}

writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(`[cli-toolkit] synced ${Object.keys(TOOLS).length} bin stubs → ${binDirRel}`);
