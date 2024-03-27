module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    amd: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended', // eslint
    'plugin:@typescript-eslint/recommended', // @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/stylistic', // @typescript-eslint/eslint-plugin
    'plugin:react/recommended', // eslint-plugin-react
    'plugin:react-hooks/recommended', // eslint-plugin-react-hooks
    'plugin:import/recommended', // eslint-plugin-import
    'airbnb-typescript', // eslint-config-airbnb-typescript
    'prettier', // should alway be at the and of the array in order to override rules from other linters
  ],
  plugins: [
    // The eslint-plugin- prefix can be omitted from the plugin name so you can just use 'react' in this case.
    // https://eslint.org/docs/latest/use/configure/plugins#configure-plugins
    'react',
    // 'import'
  ],
  rules: {
    // The 'react/react-in-jsx-scope' rule is not relevant for React v17+.
    // Now you can use JSX without importing React.
    // https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    'react/react-in-jsx-scope': 'off',

    // The 'react/prop-types' rule also shows the error when you use React.FC<T> with type destructure declaration:
    // const Message: React.FC<T> ({ text })
    // To get rid of this error you have to specify your type after the type destructure declaration too:
    // const Message: React.FC<T> ({ text }: T)
    // In order to avoid this duplication you can either omit the type specification by removing ': React.FC<T>' (in this case
    // your element will be of type React.JSX.Element) or disable the 'react/prop-types' rule.
    // Some benefits of using React.FC: https://github.com/typescript-cheatsheets/react/blob/main/README.md#function-components
    'react/prop-types': 'off',

    // Enable the 'no-console' error because when running a bundled app,
    // the console.log() statements can cause a big bottleneck in the JavaScript thread.
    // https://reactnative.dev/docs/performance#common-sources-of-performance-problems
    'no-console': 'error',
    '@typescript-eslint/no-shadow': 'off',
    // 'import/extensions': 'off',
  },
  settings: {
    // You need to add this setting to avoid the eslint error:
    // Parse errors in imported module 'react-native': ';' expected. (14:32) eslint(import/namespace)
    // That happens because node_modules/react-native/index.js uses getters to define all the exports.
    // This prevents the linter from statically resolving the import.
    // This issue can be worked around by ignoring the react-native dependency in the eslint-plugin-import import/ignore setting.
    // https://github.com/facebook/react-native/issues/28549
    'import/ignore': [
      // Use "node_modules/react-native/index\\.js$" instead of "react-native"
      // because 'react-native' will ignore all packages that have react-native in their name,
      // e.g. react-native-svg, since it is parsed as a regex.
      'node_modules/react-native/index\\.js$',
    ],
    // React version should be specified in eslint-plugin-react settings.
    react: {
      version: 'detect',
    },
  },
}
