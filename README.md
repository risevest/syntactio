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

- TypeScript ^5.0.0
- ESLint ^8.0.0

## Usage

In `.eslintrc.js`:

```js
module.exports = {
  extends: [require.resolve("@risemaxi/syntactio")],
};
```

## License

MIT
