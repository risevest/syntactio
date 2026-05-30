import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["unicorn", "typescript", "import", "react", "jsx-a11y"],
  jsPlugins: [
    "./react-native-compat.js",
    "eslint-plugin-react-native",
    "eslint-plugin-react-native-a11y",
  ],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  options: {
    typeAware: true,
  },
  env: {
    builtin: true,
    es2026: true,
    browser: true,
    jest: true,
    node: true,
  },
  globals: {
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
  settings: {
    react: {
      version: "19.0",
    },
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "*.js",
    "*.d.ts",
    "*.json",
    "bun.lock",
    "package-lock.json",
  ],
  rules: {
    // ESLint core
    "no-console": "error",
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: false, allowTernary: false },
    ],
    "no-extra-boolean-cast": "off",
    "no-useless-assignment": "error",
    "prefer-const": "error",
    "object-shorthand": "error",

    // Import
    "import/no-default-export": "error",
    "import/newline-after-import": "error",
    "import/no-named-as-default-member": "off",

    // Unicorn
    "unicorn/filename-case": ["error", { cases: { kebabCase: true } }],
    "unicorn/no-array-sort": "off",
    "unicorn/no-array-reverse": "off",

    // React (native)
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "error",
    "react/hook-use-state": "error",
    "react/jsx-curly-brace-presence": [
      "warn",
      { children: "never", props: "never" },
    ],
    "react/no-unstable-nested-components": "error",
    "react/no-clone-element": "error",
    "react/no-react-children": "error",
    "react/prefer-function-component": "error",
    "react/only-export-components": "error",
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "warn",
    "react/style-prop-object": "off",
    "react/no-object-type-as-default-prop": "off",

    // TypeScript — noisy for React Native
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/unbound-method": "off",
    "typescript/no-unnecessary-type-arguments": "off",
    "typescript/no-floating-promises": "off",
    "typescript/consistent-return": "off",
    "typescript/no-misused-spread": "off",
    "typescript/no-base-to-string": "off",

    // JSX a11y — web-focused, not applicable to React Native
    "jsx-a11y/prefer-tag-over-role": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/control-has-associated-label": "off",

    // React Native compat plugin
    "react-native-compat/no-unused-styles": "warn",
    "react-native-compat/no-inline-styles": "warn",
    "react-native-compat/no-color-literals": "warn",
    "react-native/no-raw-text": ["error", { skip: ["AnimatedText"] }],
    "react-native/sort-styles": "warn",
    "react-native/no-single-element-style-arrays": "warn",
    "react-native/split-platform-components": "warn",

    // React Native a11y
    "react-native-a11y/has-accessibility-hint": "error",
    "react-native-a11y/has-accessibility-props": "error",
    "react-native-a11y/has-valid-accessibility-actions": "error",
    "react-native-a11y/has-valid-accessibility-component-type": "error",
    "react-native-a11y/has-valid-accessibility-descriptors": "error",
    "react-native-a11y/has-valid-accessibility-role": "error",
    "react-native-a11y/has-valid-accessibility-state": "error",
    "react-native-a11y/has-valid-accessibility-states": "error",
    "react-native-a11y/has-valid-accessibility-traits": "error",
    "react-native-a11y/has-valid-accessibility-value": "error",
    "react-native-a11y/no-nested-touchables": "error",
    "react-native-a11y/has-valid-accessibility-ignores-invert-colors": "error",
    "react-native-a11y/has-valid-accessibility-live-region": "error",
    "react-native-a11y/has-valid-important-for-accessibility": "error",

    // Sort keys
    "sort-keys": "off",
  },
  overrides: [
    {
      files: ["src/app/**", "app/**", "**/*.stories.*"],
      rules: {
        "import/no-default-export": "off",
        "react/only-export-components": "off",
      },
    },
  ],
});
