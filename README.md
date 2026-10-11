# @risemaxi/syntactio

Linting and formatting config for Rise client apps.

## Installation

```bash
bun add -D @risemaxi/syntactio
```

### Optional: Oxlint + Oxfmt

```bash
bun add -D oxlint oxfmt oxlint-tsgolint
```

Requires Node `^20.19.0 || >=22.12.0`, oxlint `>=1.79`, oxfmt `>=0.59` and oxlint-tsgolint `>=7.0.2003`.

## Usage

### ESLint (default)

```js
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const riseConfig = require('@risemaxi/syntactio');

module.exports = defineConfig([expoConfig, riseConfig]);
```

### Oxlint

Name the file `oxlint.config.mts` in apps without `"type": "module"` (Expo/React Native apps). A plain `.ts` config there makes Node warn with `MODULE_TYPELESS_PACKAGE_JSON` and reparse the file on every run.

```ts
import { ignorePatterns } from '@risemaxi/syntactio/oxlint';
import { nativeConfig } from '@risemaxi/syntactio/oxlint/native';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [nativeConfig],
  ignorePatterns
});
```

`ignorePatterns` has to be set in your root config. Oxlint resolves them relative to the config file that declares them, so patterns inside a shared config never match your files.

Type-aware linting is on by default. To also report TypeScript errors (replaces a separate `tsc --noEmit`), opt in from your root config:

```ts
options: {
  typeCheck: true;
}
```

With React Compiler:

```ts
import { compilerConfig } from '@risemaxi/syntactio/oxlint/compiler';

export default defineConfig({
  extends: [nativeConfig, compilerConfig],
  ignorePatterns
});
```

The recommended React Compiler rules (`purity`, `refs`, `immutability`, `set-state-in-effect`, ...) run natively for every React project. `compilerConfig` adds the stricter ones that only matter when the compiler is part of your build. Oxlint no longer needs `eslint-plugin-react-hooks`.

### Oxfmt

`oxfmt.config.mts`:

```ts
export { oxfmtConfig as default } from '@risemaxi/syntactio/oxfmt';
```

## Config Layers

| Export              | Named Export     | Extends | Scope                                                                |
| ------------------- | ---------------- | ------- | -------------------------------------------------------------------- |
| `./oxlint`          | `baseConfig`     | —       | Any TypeScript project. Also exports `ignorePatterns`.               |
| `./oxlint/react`    | `reactConfig`    | base    | React, including native React Compiler rules.                        |
| `./oxlint/native`   | `nativeConfig`   | react   | React Native / Expo: RN plugins, globals, `import/no-default-export` |
| `./oxlint/compiler` | `compilerConfig` | —       | Stricter React Compiler rules.                                       |

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
