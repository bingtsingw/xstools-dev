import { parse } from '@dotenvx/dotenvx';
import { readFileSync } from 'fs';

export const dotenvLoad = (path: string) => {
  const envData = parse(readFileSync(path).toString('utf-8'), { processEnv: {} });
  for (const [k, v] of Object.entries(envData)) {
    if (typeof k === 'string' && k && typeof v === 'string') {
      process.env[k] = v;
    }
  }
};
