module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'react-app',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
    '.eslintrc.js',
    'config-overrides.js',
    'tailwind.config.js',
    '*.d.ts',
    'src/types/ts',
    'src/graphql/*',
  ],
  plugins: ['@typescript-eslint', 'import', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    quotes: ['error', 'single'],
    'import/no-unresolved': 0,
    'max-len': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'require-jsdoc': 'off',
  },
};
