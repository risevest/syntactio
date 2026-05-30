const { defineConfig } = require("eslint/config");
const prettierConfig = require("eslint-config-prettier");
const reactNativePlugin = require("eslint-plugin-react-native");
const reactNativeA11yPlugin = require("eslint-plugin-react-native-a11y");
const simpleImportSortPlugin = require("eslint-plugin-simple-import-sort");
const sortKeysFixPlugin = require("eslint-plugin-sort-keys-fix");
const typescriptSortKeysPlugin = require("eslint-plugin-typescript-sort-keys");
const unicornPlugin = require("eslint-plugin-unicorn").default;
const unusedImportsPlugin = require("eslint-plugin-unused-imports");
const globals = require("globals");

module.exports = defineConfig([
  prettierConfig,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.es2026,
        ...globals.jest,
        ...globals.node,
        __DEV__: "readonly",
        cancelAnimationFrame: "readonly",
        cancelIdleCallback: "readonly",
        clearImmediate: "readonly",
        ErrorUtils: "readonly",
        requestAnimationFrame: "readonly",
        requestIdleCallback: "readonly",
        setImmediate: "readonly",
        Atomics: "readonly",
        NodeJS: "readonly",
        SharedArrayBuffer: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: {
      "react-native": reactNativePlugin,
      "react-native-a11y": reactNativeA11yPlugin,
      "simple-import-sort": simpleImportSortPlugin,
      "sort-keys-fix": sortKeysFixPlugin,
      "typescript-sort-keys": typescriptSortKeysPlugin,
      unicorn: unicornPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      ...reactNativeA11yPlugin.configs.all.rules,
      "comma-dangle": ["error", "never"],
      "import/no-default-export": "error",
      "no-console": 2,
      "no-extra-boolean-cast": 0,
      "no-unused-expressions": ["error", { allowShortCircuit: false, allowTernary: false }],
      "react-native/no-inline-styles": "warn",
      "react/jsx-curly-brace-presence": [1, { children: "never", props: "never" }],
      "react/jsx-sort-props": [
        "error",
        {
          ignoreCase: true,
        },
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      semi: 0,
      "simple-import-sort/exports": "warn",
      "simple-import-sort/imports": "warn",
      "sort-keys-fix/sort-keys-fix": "warn",
      "typescript-sort-keys/interface": "warn",
      "typescript-sort-keys/string-enum": "warn",
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
          },
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
