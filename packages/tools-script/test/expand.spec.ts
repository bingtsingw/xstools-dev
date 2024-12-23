import { describe, expect, test } from 'bun:test';
import { join } from 'path';
import { dotenvLoad } from '../src';

describe('extend', () => {
  test('dotenvLoad', async () => {
    const envFile = join(__dirname, '.env.test');

    expect(process.env['DB_HOST']).toBeUndefined();
    expect(process.env['DATABASE_URL']).toBeUndefined();

    dotenvLoad(envFile);
    expect(process.env['DB_HOST']).toBe('127.0.0.1');
    expect(process.env['DATABASE_URL']).toBe('postgresql://postgres:password@127.0.0.1:5432/xstools-dev-test');

    const content = await Bun.file(envFile).text();
    const changed = content.replace('127.0.0.1', '192.168.1.1');

    await Bun.write(envFile, changed);
    dotenvLoad(envFile);
    expect(process.env['DB_HOST']).toBe('192.168.1.1');
    expect(process.env['DATABASE_URL']).toBe('postgresql://postgres:password@192.168.1.1:5432/xstools-dev-test');

    await Bun.write(envFile, content);
  });
});
