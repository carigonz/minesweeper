module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'nonblock-statement-body-position': ['error', 'below'],
    'import/prefer-default-export': 'off',
    'import/order': ['error', {
      alphabetize: { order: 'asc', caseInsensitive: true },
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['src/test/**/*.ts'],
      optionalDependencies: false,
      peerDependencies: false,
    }],
    'import/no-cycle': 'off',
    'max-len': ['error', { code: 80 }],
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    }],
  },
};
