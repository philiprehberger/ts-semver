import { parse } from './parse';
import { compare, gte, lte, lt } from './compare';
import type { SemVer } from './types';

function parseRange(range: string): ((ver: SemVer) => boolean) {
  const trimmed = range.trim();

  if (trimmed === '*') return () => true;

  if (trimmed.includes(' ')) {
    const parts = trimmed.split(/\s+/);
    const fns = parts.map(parseRange);
    return (ver) => fns.every((fn) => fn(ver));
  }

  if (trimmed.startsWith('^')) {
    const base = parse(trimmed.slice(1));
    if (!base) return () => false;
    return (ver) => {
      if (lt(ver, base)) return false;
      if (base.major !== 0) return ver.major === base.major;
      if (base.minor !== 0) return ver.major === 0 && ver.minor === base.minor;
      return ver.major === 0 && ver.minor === 0 && ver.patch === base.patch;
    };
  }

  if (trimmed.startsWith('~')) {
    const base = parse(trimmed.slice(1));
    if (!base) return () => false;
    return (ver) => ver.major === base.major && ver.minor === base.minor && gte(ver, base);
  }

  if (trimmed.startsWith('>=')) {
    const base = parse(trimmed.slice(2));
    if (!base) return () => false;
    return (ver) => gte(ver, base);
  }

  if (trimmed.startsWith('>')) {
    const base = parse(trimmed.slice(1));
    if (!base) return () => false;
    return (ver) => compare(ver, base) === 1;
  }

  if (trimmed.startsWith('<=')) {
    const base = parse(trimmed.slice(2));
    if (!base) return () => false;
    return (ver) => lte(ver, base);
  }

  if (trimmed.startsWith('<')) {
    const base = parse(trimmed.slice(1));
    if (!base) return () => false;
    return (ver) => compare(ver, base) === -1;
  }

  if (trimmed.includes('.x') || trimmed.includes('.*')) {
    const parts = trimmed.replace(/x|\*/g, '0').split('.');
    const major = parseInt(parts[0], 10);
    if (parts.length <= 2) return (ver) => ver.major === major;
    const minor = parseInt(parts[1], 10);
    return (ver) => ver.major === major && ver.minor === minor;
  }

  const exact = parse(trimmed);
  if (exact) return (ver) => compare(ver, exact) === 0;

  return () => false;
}

export function satisfies(version: string | SemVer, range: string): boolean {
  const ver = typeof version === 'string' ? parse(version) : version;
  if (!ver) return false;
  return parseRange(range)(ver);
}

export function maxSatisfying(versions: string[], range: string): string | null {
  const matching = versions.filter((v) => satisfies(v, range));
  if (matching.length === 0) return null;
  return matching.sort((a, b) => compare(b, a))[0];
}

export function minSatisfying(versions: string[], range: string): string | null {
  const matching = versions.filter((v) => satisfies(v, range));
  if (matching.length === 0) return null;
  return matching.sort((a, b) => compare(a, b))[0];
}
