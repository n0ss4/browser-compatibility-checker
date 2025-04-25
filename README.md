# 🧪 Compatibility Checker CLI (TypeScript)

A powerful CLI tool to scan JavaScript/TypeScript codebases for browser-incompatible features using Can I Use and Browserslist.

## 🚀 Features

- Detect usage of browser-incompatible features
- Support for custom file extensions
- Output reports in JSON and console table
- Regex-based feature mapping
- Verbose + progress options

## 📦 Installation

```bash
pnpm install
```

## 🛠 Usage

Run from CLI:

```bash
npx tsx src/bin/cli.ts --input ./src --features arrow-functions const let --report json --output report.json
```

Run programmatically:

```ts
import { runScanner } from './src/core/scanner';

runScanner({
  dir: './src',
  extensions: ['.ts', '.js'],
  features: ['arrow-functions'],
  verbose: true,
  showProgress: true,
  report: 'console',
});
```

## 🧪 Testing

```bash
pnpm run test
```

## 📂 Project Structure

```
src/
├── bin/cli.ts
├── config/featureMap.ts
├── core/
│   ├── scanner.ts
│   ├── featureChecker.ts
│   └── fileAnalyzer.ts
├── reporters/
│   ├── consoleReporter.ts
│   └── jsonReporter.ts
├── utils/
│   ├── logger.ts
│   └── pathUtils.ts
├── tests/
│   ├── scanner.test.ts
│   └── featureChecker.test.ts
└── index.ts
```

## 🧠 Powered by

- [caniuse-lite](https://www.npmjs.com/package/caniuse-lite)
- [browserslist](https://github.com/browserslist/browserslist)
