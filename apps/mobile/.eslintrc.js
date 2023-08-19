module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  plugins: [
    'react',
    'react-native',
    'react-hooks',
    'prettier',
    '@typescript-eslint',
  ],
  ecmaFeatures: {
    jsx: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'react/prop-types': 0,
    'react/jsx-no-bind': 0,
    'react/jsx-no-duplicate-props': 2,
    'prettier/prettier': 'error',
    'import/extensions': 0,
    'no-shadow': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/default': 0,
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-use-before-define': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
};
