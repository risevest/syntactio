import { defineConfig } from "oxlint";

/**
 * Base config for any TypeScript project.
 * No framework-specific rules.
 */
export const baseConfig = defineConfig({
  plugins: ["unicorn", "typescript", "import"],
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
    Atomics: "readonly",
    NodeJS: "readonly",
    SharedArrayBuffer: "readonly",
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "*.js",
    "*.d.ts",
    "*.json",
    "bun.lock",
    "package-lock.json",
    "yarn.lock",
  ],
  rules: {
    "no-console": "error",
    "no-unused-expressions": [
      "error",
      { allowShortCircuit: false, allowTernary: false },
    ],
    "no-extra-boolean-cast": "off",
    "no-useless-assignment": "error",
    "prefer-const": "error",
    "object-shorthand": "error",
    "import/no-default-export": "error",
    "import/newline-after-import": "error",
    "import/no-named-as-default-member": "off",
    "unicorn/filename-case": ["error", { cases: { kebabCase: true } }],
    "unicorn/no-array-sort": "off",
    "unicorn/no-array-reverse": "off",
    "typescript/ban-ts-comment": "error",
    "sort-keys": "off",
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
});
