module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended', // eslint
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/stylistic', // @typescript-eslint/eslint-plugin
    "plugin:react/recommended", // eslint-plugin-react
    "plugin:react-hooks/recommended", // eslint-plugin-react-hooks
    'airbnb-typescript', // eslint-config-airbnb-typescript
    'prettier', // should alway be at the and of the array in order to override rules from other linters
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
