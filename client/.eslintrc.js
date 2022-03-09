module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
  },
};
