import type { SemVer } from './types';
import { parse } from './parse';

function toSemVer(input: string | SemVer): SemVer {
  if (typeof input === 'string') {
    const parsed = parse(input);
    if (!parsed) throw new Error(`Invalid version: ${input}`);
    return parsed;
  }
  return input;
}

function comparePrerelease(a: (string | number)[], b: (string | number)[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  if (a.length === 0) return 1;
  if (b.length === 0) return -1;

  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (i >= a.length) return -1;
    if (i >= b.length) return 1;
    const ai = a[i], bi = b[i];
    if (ai === bi) continue;
    if (typeof ai === 'number' && typeof bi === 'number') return ai < bi ? -1 : 1;
    if (typeof ai === 'number') return -1;
    if (typeof bi === 'number') return 1;
    return String(ai) < String(bi) ? -1 : 1;
  }
  return 0;
}

export function compare(a: string | SemVer, b: string | SemVer): -1 | 0 | 1 {
  const va = toSemVer(a), vb = toSemVer(b);
  if (va.major !== vb.major) return va.major < vb.major ? -1 : 1;
  if (va.minor !== vb.minor) return va.minor < vb.minor ? -1 : 1;
  if (va.patch !== vb.patch) return va.patch < vb.patch ? -1 : 1;
  const pre = comparePrerelease(va.prerelease, vb.prerelease);
  return pre as -1 | 0 | 1;
}

export function gt(a: string | SemVer, b: string | SemVer): boolean { return compare(a, b) === 1; }
export function lt(a: string | SemVer, b: string | SemVer): boolean { return compare(a, b) === -1; }
export function gte(a: string | SemVer, b: string | SemVer): boolean { return compare(a, b) >= 0; }
export function lte(a: string | SemVer, b: string | SemVer): boolean { return compare(a, b) <= 0; }
export function eq(a: string | SemVer, b: string | SemVer): boolean { return compare(a, b) === 0; }
