# @risemaxi/syntactio

Linting and formatting config for Rise client apps.

## Installation

```bash
bun add -D @risemaxi/syntactio
```

### Optional: Oxlint + Oxfmt

```bash
bun add -D oxlint oxfmt oxlint-tsgolint eslint-plugin-react-hooks
```

## Usage

### ESLint (default)

```js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const riseConfig = require("@risemaxi/syntactio");

module.exports = defineConfig([expoConfig, riseConfig]);
```

### Oxlint

```ts
import { defineConfig } from "oxlint";
import syntactioConfig from "@risemaxi/syntactio/oxlint";

export default defineConfig({
  extends: [syntactioConfig],
  overrides: [
    {
      files: ["src/app/**"],
      rules: { "import/no-default-export": "off" },
    },
  ],
});
```

With React Compiler rules (requires `eslint-plugin-react-hooks@>=6.0.0`):

```ts
import { defineConfig } from "oxlint";
import syntactioConfig from "@risemaxi/syntactio/oxlint/compiler";

export default defineConfig({
  extends: [syntactioConfig],
});
```

### Oxfmt

```ts
export { default } from "@risemaxi/syntactio/oxfmt";
```

## Exports

| Export                                    | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `@risemaxi/syntactio`                     | ESLint flat config                                   |
| `@risemaxi/syntactio/oxlint`              | Oxlint config                                        |
| `@risemaxi/syntactio/oxlint/compiler`     | Oxlint + React Compiler rules                        |
| `@risemaxi/syntactio/oxfmt`               | Oxfmt config                                         |
| `@risemaxi/syntactio/react-native-compat` | Rewritten unmaintained react-native rules for oxlint |

## License

MIT
