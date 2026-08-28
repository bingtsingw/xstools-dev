import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

import { afterEach, describe, expect, test } from 'vite-plus/test';

import { dotenvLoad } from '../src/extends/dotenvLoad.js';
import { getTool, listToolNames } from '../src/proxy/tools.js';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8')) as {
  bin: Record<string, string>;
};
const envKeys = ['CLI_TOOLKIT_TEST_HOST', 'CLI_TOOLKIT_TEST_URL'] as const;
const originalEnv = new Map(envKeys.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of envKeys) {
    const value = originalEnv.get(key);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('CLI proxies', () => {
  test('keeps the generated bin manifest and stubs aligned with TOOLS', () => {
    const names = listToolNames();

    expect(Object.keys(packageJson.bin).sort()).toEqual(names);

    for (const name of names) {
      expect(getTool(name)).toBeDefined();
      expect(getTool(`${name}-unknown`)).toBeUndefined();
      expect(readFileSync(resolve(packageRoot, packageJson.bin[name]), 'utf8')).toContain(
        `main(${JSON.stringify(name)});`,
      );
    }
  });

  test('forwards a command to its resolved executable', () => {
    const result = spawnSync(process.execPath, [resolve(packageRoot, packageJson.bin.turbo), '--version'], {
      encoding: 'utf8',
    });

    expect(result.error).toBeUndefined();
    expect(result.status).toBe(0);
    expect(`${result.stdout}${result.stderr}`).toMatch(/\d+\.\d+\.\d+/);
  });
});

describe('dotenvLoad', () => {
  test('loads and expands environment variables', () => {
    const directory = mkdtempSync(resolve(tmpdir(), 'cli-toolkit-'));
    const envPath = resolve(directory, '.env');
    writeFileSync(
      envPath,
      'CLI_TOOLKIT_TEST_HOST=127.0.0.1\nCLI_TOOLKIT_TEST_URL=http://${CLI_TOOLKIT_TEST_HOST}:3000\n',
    );

    try {
      dotenvLoad(envPath);

      expect(process.env.CLI_TOOLKIT_TEST_HOST).toBe('127.0.0.1');
      expect(process.env.CLI_TOOLKIT_TEST_URL).toBe('http://127.0.0.1:3000');
    } finally {
      rmSync(directory, { force: true, recursive: true });
    }
  });
});
