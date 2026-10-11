import { defineConfig } from 'oxlint';

export const compilerConfig = defineConfig({
  plugins: ['react'],
  rules: {
    'react/unsupported-syntax': 'error',
    'react/rule-suppression': 'warn',
    'react/no-deriving-state-in-effects': 'error'
  }
});
