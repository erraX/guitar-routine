module.exports = {
    env: {
      browser: true,
      es6: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json'
    },
    extends: [
      'airbnb',
      'airbnb/hooks',
      'airbnb-typescript',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended'
    ],
    rules: {
      'import/prefer-default-export': 0,
      'react/react-in-jsx-scope': 0,
      'react/prop-types': 0,
      'react/require-default-props': 0,
      'react/function-component-definition': [2, { 'namedComponents': 'arrow-function' }]
    }
};
