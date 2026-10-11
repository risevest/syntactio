import { defineConfig } from 'oxlint';

/**
 * Globs every consumer should ignore. Oxlint resolves `ignorePatterns`
 * relative to the config file that declares them, so they only take effect
 * when set in the consumer's root config:
 *   ignorePatterns: [...ignorePatterns]
 */
export const ignorePatterns = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '*.d.ts',
  'bun.lock',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock'
];

/**
 * Base config for any TypeScript project.
 * No framework-specific rules.
 */
export const baseConfig = defineConfig({
  plugins: ['unicorn', 'typescript', 'import'],
  categories: {
    correctness: 'error',
    suspicious: 'warn',
    perf: 'warn'
  },
  options: {
    typeAware: true
  },
  env: {
    builtin: true,
    es2026: true,
    node: true
  },
  rules: {
    'no-console': 'error',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: false, allowTernary: false }
    ],
    'no-extra-boolean-cast': 'off',
    'no-useless-assignment': 'error',
    'prefer-const': 'error',
    'object-shorthand': 'error',
    'import/newline-after-import': 'error',
    'import/no-named-as-default-member': 'off',
    'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
    'unicorn/no-array-sort': 'off',
    'unicorn/no-array-reverse': 'off',
    'typescript/ban-ts-comment': 'error',
    'sort-keys': 'off'
  },
  overrides: [
    {
      files: [
        '**/*.{test,spec}.{ts,tsx,mts,cts,js,jsx,mjs,cjs}',
        '**/__tests__/**',
        '**/__mocks__/**'
      ],
      env: {
        jest: true,
        vitest: true
      }
    },
    {
      files: ['scripts/**', '**/*.config.*'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
});
