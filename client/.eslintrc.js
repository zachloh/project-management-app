module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:testing-library/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest', 'import'],
  rules: {
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'object-curly-newline': 'off',
    'no-plusplus': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'operator-linebreak': 'off',
    'no-confusing-arrow': 'off',
    '@typescript-eslint/indent': 'off',
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
    'react/jsx-wrap-multilines': 'off',
  },
  settings: {
    // Allows us to lint absolute imports within codebase
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
