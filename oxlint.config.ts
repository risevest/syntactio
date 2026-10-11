import { defineConfig } from 'oxlint';
import { baseConfig, ignorePatterns } from './src/oxlint/base.ts';

export default defineConfig({
  extends: [baseConfig],
  ignorePatterns
});
