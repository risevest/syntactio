import { defineConfig } from 'oxlint';
import { baseConfig } from './base.js';

/**
 * React rules. Extends base.
 * React Compiler rules (purity, refs, immutability, set-state-in-effect, ...)
 * run natively via the `correctness` category.
 */
export const reactConfig = defineConfig({
  extends: [baseConfig],
  plugins: ['react'],
  env: {
    browser: true
  },
  settings: {
    react: {
      version: '19.0'
    }
  },
  rules: {
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'error',
    'react/hook-use-state': 'error',
    'react/jsx-curly-brace-presence': [
      'warn',
      { children: 'never', props: 'never' }
    ],
    'react/no-unstable-nested-components': 'error',
    'react/no-clone-element': 'error',
    'react/no-react-children': 'error',
    'react/prefer-function-component': 'error',
    'react/only-export-components': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'warn',
    'react/style-prop-object': 'off',
    'react/no-object-type-as-default-prop': 'off',
    'react/hooks': 'off',
    'react/exhaustive-effect-dependencies': 'off',
    'react/memo-dependencies': 'off',
    'react/capitalized-calls': 'off'
  },
  overrides: [
    {
      files: ['src/app/**', 'app/**', 'src/pages/**', 'pages/**'],
      rules: {
        'react/only-export-components': 'off'
      }
    }
  ]
});
