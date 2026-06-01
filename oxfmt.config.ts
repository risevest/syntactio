import { defineConfig } from "oxfmt";

export const oxfmtConfig = defineConfig({
  singleQuote: true,
  trailingComma: "none",
  semi: true,
  bracketSpacing: true,
  bracketSameLine: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  embeddedLanguageFormatting: "auto",
  sortImports: {
    newlinesBetween: false,
    groups: [
      "type-import",
      ["value-builtin", "value-external"],
      "type-internal",
      "value-internal",
      ["type-parent", "type-sibling", "type-index"],
      ["value-parent", "value-sibling", "value-index"],
      "unknown",
    ],
  },
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "cx"],
  },
  sortPackageJson: {
    sortScripts: true,
  },
  ignorePatterns: ["node_modules", "dist", "bun.lock", "package-lock.json", "yarn.lock"],
});
