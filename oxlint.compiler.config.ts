import { defineConfig } from "oxlint";

/**
 * React Compiler rules. Standalone.
 * Requires eslint-plugin-react-hooks@>=6.0.0.
 * Compose with other configs:
 *   extends: [nativeConfig, compilerConfig]
 */
export const compilerConfig = defineConfig({
  jsPlugins: [
    {
      name: "react-compiler",
      specifier: "eslint-plugin-react-hooks",
    },
  ],
  rules: {
    "react-compiler/react-compiler": "error",
  },
});
