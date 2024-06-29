export const defaultConfig = {
  git: {
    // eslint-disable-next-line no-template-curly-in-string
    commitMessage: 'chore(release): v${version}',
  },
  github: {
    release: true,
    // eslint-disable-next-line no-template-curly-in-string
    releaseName: 'v${version}',
    tokenRef: 'RELEASE_IT_GITHUB_TOKEN',
  },
  hooks: {
    'before:init': ['npm run format', 'npm run lint:js', 'npm run test'],
    'after:bump': 'npm run build',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: 'Features',
          },
          {
            type: 'fix',
            section: 'Bug Fixes',
          },
          {
            type: 'docs',
            section: 'Documentation',
          },
          {
            type: 'style',
            section: 'Styles',
          },
          {
            type: 'refactor',
            section: 'Code Refactoring',
          },
          {
            type: 'perf',
            section: 'Performance Improvements',
          },
          {
            type: 'test',
            section: 'Tests',
          },
          {
            type: 'build',
            section: 'Build System',
          },
          {
            type: 'ci',
            section: 'Continuous Integration',
          },
          {
            type: 'chore',
            section: 'Chores',
          },
          {
            type: 'revert',
            section: 'Reverts',
          },
        ],
      },
    },
  },
};

export const configA = {};
