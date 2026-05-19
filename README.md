# @risemaxi/syntactio

ESLint config for Rise client apps.

## Installation

```bash
npm install -D @risemaxi/syntactio
```

OR

```bash
yarn add -D @risemaxi/syntactio
```

OR

```bash
bun install -D @risemaxi/syntactio
```

## Peer Dependencies

- TypeScript ^5.9.3
- ESLint ^9.0.0

## Usage

Use it after your base Expo config in `eslint.config.js`:

```js
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const riseConfig = require("@risemaxi/syntactio");

module.exports = defineConfig([expoConfig, riseConfig]);
```

## License

MIT
