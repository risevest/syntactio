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
import { nativeConfig } from "@risemaxi/syntactio/oxlint/native";

export default defineConfig({
  extends: [nativeConfig],
});
```

With React Compiler:

```ts
import { defineConfig } from "oxlint";
import { nativeConfig } from "@risemaxi/syntactio/oxlint/native";
import { compilerConfig } from "@risemaxi/syntactio/oxlint/compiler";

export default defineConfig({
  extends: [nativeConfig, compilerConfig],
});
```

### Oxfmt

```ts
export { oxfmtConfig as default } from "@risemaxi/syntactio/oxfmt";
```

## Config Layers

| Export              | Named Export     | Extends |
| ------------------- | ---------------- | ------- |
| `./oxlint`          | `baseConfig`     | —       |
| `./oxlint/react`    | `reactConfig`    | base    |
| `./oxlint/native`   | `nativeConfig`   | react   |
| `./oxlint/compiler` | `compilerConfig` | -       |

## Exports

| Export                                    | Description                  |
| ----------------------------------------- | ---------------------------- |
| `@risemaxi/syntactio`                     | ESLint flat config           |
| `@risemaxi/syntactio/oxlint`              | Base oxlint config           |
| `@risemaxi/syntactio/oxlint/react`        | React oxlint config          |
| `@risemaxi/syntactio/oxlint/native`       | React Native oxlint config   |
| `@risemaxi/syntactio/oxlint/compiler`     | React Compiler oxlint config |
| `@risemaxi/syntactio/oxfmt`               | Oxfmt config                 |
| `@risemaxi/syntactio/react-native-compat` | Rewritten react-native rules |

## License

MIT
