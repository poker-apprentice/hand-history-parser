const fs = require('fs');

const generageTypescriptConfigAliases = () => {
  const aliases = {};
  const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf-8'));
  Object.entries(tsconfig.compilerOptions.paths).forEach(([pattern, paths]) => {
    const patternKey = pattern.endsWith('/*') ? pattern.slice(0, -2) : pattern;
    const target = paths[0].endsWith('/*') ? paths[0].slice(0, -2) : paths[0];
    aliases[patternKey] = target;
  });
  return aliases;
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: false },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'unknown',
          'object',
        ],
        pathGroups: [{ pattern: '~/**', group: 'internal', position: 'after' }],
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: generageTypescriptConfigAliases(),
        extensions: ['.js', '.ts'],
      },
    },
  },
};
