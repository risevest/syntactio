import { defineConfig } from 'oxlint';

/**
 * Extra React Compiler rules for projects that ship with the compiler.
 * The recommended compiler rules already run via `reactConfig`.
 * Compose with other configs:
 *   extends: [nativeConfig, compilerConfig]
 */
export const compilerConfig = defineConfig({
  plugins: ['react'],
  rules: {
    'react/unsupported-syntax': 'error',
    'react/rule-suppression': 'warn',
    'react/no-deriving-state-in-effects': 'error'
  }
});
