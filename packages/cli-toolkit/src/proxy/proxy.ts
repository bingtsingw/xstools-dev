import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { basename, dirname, extname, resolve } from 'node:path';
import process from 'node:process';

import { getTool, listToolNames } from './tools.js';

type NodeRequire = ReturnType<typeof createRequire>;

const JS_EXTS = new Set(['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts']);
const NATIVE_EXTS = new Set(['.exe', '.node', '.bin', '.dylib', '.so', '.dll']);

function getCommandName(argv1 = process.argv[1]): string {
  let name = basename(argv1 ?? '');
  // Windows package-manager shims append .CMD or .ps1.
  name = name.replace(/\.(cmd|ps1)$/i, '');
  const ext = extname(name).toLowerCase();
  if (ext === '.js' || ext === '.mjs') {
    name = basename(name, ext);
  }
  return name;
}

function resolveBinPath(nodeRequire: NodeRequire, pkg: string, binName: string): string {
  let pkgJsonPath: string;
  try {
    pkgJsonPath = nodeRequire.resolve(`${pkg}/package.json`);
  } catch (error) {
    throw new Error(`[cli-toolkit] cannot resolve "${pkg}". Is it listed in @xstools-dev/cli-toolkit dependencies?`, {
      cause: error,
    });
  }

  const pkgJson = nodeRequire(pkgJsonPath) as { bin?: string | Record<string, string> };
  const binField = pkgJson.bin;

  let rel: string | undefined;
  if (typeof binField === 'string') {
    rel = binField;
  } else if (binField && typeof binField === 'object') {
    rel = binField[binName];
  }

  if (!rel) {
    throw new Error(`[cli-toolkit] package "${pkg}" has no bin entry for "${binName}"`);
  }

  return resolve(dirname(pkgJsonPath), rel);
}

function shouldRunWithNode(binPath: string): boolean {
  const ext = extname(binPath).toLowerCase();
  if (NATIVE_EXTS.has(ext)) return false;
  // No extension (node wrappers) or JS-like → run with node
  if (!ext || JS_EXTS.has(ext)) return true;
  return false;
}

function run(binPath: string, args: string[]): void {
  const useNode = shouldRunWithNode(binPath);
  const command = useNode ? process.execPath : binPath;
  const commandArgs = useNode ? [binPath, ...args] : args;

  const child = spawn(command, commandArgs, {
    stdio: 'inherit',
    windowsHide: false,
    env: process.env,
  });

  const forward = (signal: NodeJS.Signals) => {
    if (!child.killed) child.kill(signal);
  };

  process.on('SIGINT', forward);
  process.on('SIGTERM', forward);

  child.on('error', (error) => {
    console.error(`[cli-toolkit] failed to spawn ${binPath}`);
    console.error(error);
    process.exit(1);
  });

  child.on('exit', (code, signal) => {
    process.off('SIGINT', forward);
    process.off('SIGTERM', forward);

    if (signal) {
      try {
        process.kill(process.pid, signal);
      } catch {
        process.exit(1);
      }
      return;
    }
    process.exit(code ?? 1);
  });
}

export function main(commandName = getCommandName()): void {
  const name = commandName;
  const tool = getTool(name);

  if (!tool) {
    console.error(`[cli-toolkit] unknown command "${name}"`);
    console.error(`known: ${listToolNames().join(', ')}`);
    process.exit(1);
  }

  const nodeRequire = createRequire(import.meta.url);
  const binPath = resolveBinPath(nodeRequire, tool.pkg, tool.bin);
  run(binPath, process.argv.slice(2));
}
