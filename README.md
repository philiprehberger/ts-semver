# @philiprehberger/semver-ts

[![CI](https://github.com/philiprehberger/semver-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/semver-ts/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/semver-ts.svg)](https://www.npmjs.com/package/@philiprehberger/semver-ts)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/semver-ts)](https://github.com/philiprehberger/semver-ts/commits/main)

Lightweight semver parsing, comparison, and range matching

## Installation

```bash
npm install @philiprehberger/semver-ts
```

## Usage

```ts
import { parse, satisfies, sort, increment } from '@philiprehberger/semver-ts';

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

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/semver-ts)

🐛 [Report issues](https://github.com/philiprehberger/semver-ts/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/semver-ts/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
