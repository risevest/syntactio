import { defineConfig } from 'oxlint';
import baseConfig from './oxlint.config.js';

export default defineConfig({
  ...baseConfig,
  jsPlugins: [
    ...baseConfig.jsPlugins,
    {
      name: 'react-compiler',
      specifier: 'eslint-plugin-react-hooks'
    }
  ],
  rules: {
    ...baseConfig.rules,
    'react-compiler/set-state-in-render': 'error',
    'react-compiler/set-state-in-effect': 'error',
    'react-compiler/refs': 'error',
    'react-compiler/purity': 'error',
    'react-compiler/immutability': 'error',
    'react-compiler/globals': 'error',
    'react-compiler/static-components': 'error',
    'react-compiler/use-memo': 'error',
    'react-compiler/component-hook-factories': 'error',
    'react-compiler/preserve-manual-memoization': 'error',
    'react-compiler/incompatible-library': 'warn',
    'react-compiler/error-boundaries': 'error',
    'react-compiler/unsupported-syntax': 'warn',
    'react-compiler/config': 'error',
    'react-compiler/gating': 'error'
  }
});
