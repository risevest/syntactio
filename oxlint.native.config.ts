import { defineConfig } from "oxlint";
import { reactConfig } from "./oxlint.react.config.js";

/**
 * React Native rules. Extends react.
 * Includes compat plugin for rules that crash in the original plugin.
 */
export const nativeConfig = defineConfig({
  extends: [reactConfig],
  jsPlugins: [
    "@risemaxi/syntactio/react-native-compat",
    "eslint-plugin-react-native",
    "eslint-plugin-react-native-a11y",
  ],
  globals: {
    cancelAnimationFrame: "readonly",
    cancelIdleCallback: "readonly",
    clearImmediate: "readonly",
    ErrorUtils: "readonly",
    requestAnimationFrame: "readonly",
    requestIdleCallback: "readonly",
    setImmediate: "readonly",
  },
  rules: {
    "react-native-compat/no-unused-styles": "warn",
    "react-native-compat/no-inline-styles": "warn",
    "react-native-compat/no-color-literals": "warn",
    "react-native/no-raw-text": ["error", { skip: ["AnimatedText"] }],
    "react-native/sort-styles": "warn",
    "react-native/no-single-element-style-arrays": "warn",
    "react-native/split-platform-components": "warn",
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
  },
});
