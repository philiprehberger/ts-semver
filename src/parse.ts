import type { SemVer } from './types';

const SEMVER_RE = /^v?(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/;

export function parse(version: string): SemVer | null {
  const match = version.trim().match(SEMVER_RE);
  if (!match) return null;

  const prerelease = match[4]
    ? match[4].split('.').map((p) => (/^\d+$/.test(p) ? parseInt(p, 10) : p))
    : [];

  const build = match[5] ? match[5].split('.') : [];

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease,
    build,
  };
}

export function coerce(input: string): SemVer | null {
  const trimmed = input.trim().replace(/^v/, '');
  const parts = trimmed.split('.');
  const major = parseInt(parts[0], 10);
  if (isNaN(major)) return null;
  const minor = parts[1] !== undefined ? parseInt(parts[1], 10) : 0;
  const patch = parts[2] !== undefined ? parseInt(parts[2], 10) : 0;
  return { major, minor: isNaN(minor) ? 0 : minor, patch: isNaN(patch) ? 0 : patch, prerelease: [], build: [] };
}

export function stringify(ver: SemVer): string {
  let str = `${ver.major}.${ver.minor}.${ver.patch}`;
  if (ver.prerelease.length > 0) str += `-${ver.prerelease.join('.')}`;
  if (ver.build.length > 0) str += `+${ver.build.join('.')}`;
  return str;
}
