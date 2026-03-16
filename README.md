# @philiprehberger/ts-semver

[![CI](https://github.com/philiprehberger/ts-semver/actions/workflows/publish.yml/badge.svg)](https://github.com/philiprehberger/ts-semver/actions/workflows/publish.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/ts-semver.svg)](https://www.npmjs.com/package/@philiprehberger/ts-semver)
[![License](https://img.shields.io/github/license/philiprehberger/ts-semver)](LICENSE)

Lightweight semver parsing, comparison, and range matching.

## Installation

```bash
npm install @philiprehberger/ts-semver
```

## Usage

```ts
import { parse, satisfies, sort, increment } from '@philiprehberger/ts-semver';

parse('2.1.0-rc.1');
// { major: 2, minor: 1, patch: 0, prerelease: ['rc', 1] }

satisfies('1.5.0', '^1.0.0');    // true
sort(['2.0.0', '1.0.0', '1.5.0']); // ['1.0.0', '1.5.0', '2.0.0']
increment('1.2.3', 'minor');     // '1.3.0'
```

## API

| Function | Description |
|----------|-------------|
| `parse(version)` | Parse to SemVer object |
| `coerce(input)` | Loose parse (e.g. "v1.2") |
| `compare(a, b)` | Compare two versions |
| `gt` / `lt` / `gte` / `lte` / `eq` | Boolean comparisons |
| `satisfies(version, range)` | Check range match |
| `maxSatisfying(versions, range)` | Highest matching version |
| `minSatisfying(versions, range)` | Lowest matching version |
| `increment(version, type)` | Bump version |
| `sort(versions)` / `rsort(versions)` | Sort versions |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
