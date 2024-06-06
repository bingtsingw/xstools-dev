import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { readFileSync } from 'fs';

export const dotenvLoad = (path: string) => {
  const envFile = readFileSync(path).toString('utf-8');
  const envData = {};
  dotenvExpand.expand({ processEnv: envData, parsed: dotenv.parse(envFile) });
  for (const [k, v] of Object.entries(envData)) {
    if (typeof k === 'string' && k && typeof v === 'string') {
      process.env[k] = v;
    }
  }
};
