export interface ToolDefinition {
  /** npm package name that owns the real CLI. */
  pkg: string;
  /** Key in that package's package.json#bin (ignored when bin is a string). */
  bin: string;
}

/**
 * CLI command name → resolution target.
 * Single source of truth for package.json#bin (synced on build).
 */
export const TOOLS = {
  // formerly tools-script
  del: { pkg: 'del-cli', bin: 'del' },
  dotenvx: { pkg: '@dotenvx/dotenvx', bin: 'dotenvx' },
  'miniprogram-ci': { pkg: 'miniprogram-ci', bin: 'miniprogram-ci' },
  'port-client': { pkg: 'port-client', bin: 'port-client' },
  s: { pkg: '@serverless-devs/s', bin: 's' },
  wesvg: { pkg: '@wesvg/cli', bin: 'wesvg' },

  // formerly tools-mono (+ czg)
  changeset: { pkg: '@changesets/cli', bin: 'changeset' },
  czg: { pkg: 'czg', bin: 'czg' },
  'release-it': { pkg: 'release-it', bin: 'release-it' },
  sherif: { pkg: 'sherif', bin: 'sherif' },
  turbo: { pkg: 'turbo', bin: 'turbo' },
} as const satisfies Record<string, ToolDefinition>;

export type ToolName = keyof typeof TOOLS;

export function getTool(name: string): ToolDefinition | undefined {
  if (Object.hasOwn(TOOLS, name)) {
    return TOOLS[name as ToolName];
  }
  return undefined;
}

export function listToolNames(): ToolName[] {
  return Object.keys(TOOLS).sort() as ToolName[];
}
