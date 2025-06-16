module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "@react-native-community",
    "plugin:react/recommended",
    "plugin:react-native-a11y/all",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    NodeJS: true,
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "simple-import-sort",
    "sort-keys-fix",
    "unused-imports",
    "typescript-sort-keys",
    "unicorn",
    "eslint-plugin-react-compiler",
    "import",
  ],
  root: true,
  rules: {
    "comma-dangle": ["error", "never"],
    "no-console": 2,
    "no-extra-boolean-cast": 0,
    "react/jsx-curly-brace-presence": [
      1,
      { children: "never", props: "never" },
    ],
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
    "react-compiler/react-compiler": "error",
    "import/no-default-export": "error",
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: false, allowTernary: false },
    ],
  },
};
