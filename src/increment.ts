import type { SemVer, ReleaseType } from './types';
import { parse, stringify } from './parse';

export function increment(version: string | SemVer, type: ReleaseType): string {
  const ver = typeof version === 'string' ? parse(version) : version;
  if (!ver) throw new Error(`Invalid version: ${version}`);

  switch (type) {
    case 'major':
      return stringify({ major: ver.major + 1, minor: 0, patch: 0, prerelease: [], build: [] });
    case 'minor':
      return stringify({ major: ver.major, minor: ver.minor + 1, patch: 0, prerelease: [], build: [] });
    case 'patch':
      return stringify({ major: ver.major, minor: ver.minor, patch: ver.patch + 1, prerelease: [], build: [] });
    case 'prerelease': {
      const pre = [...ver.prerelease];
      if (pre.length === 0) {
        return stringify({ ...ver, patch: ver.patch + 1, prerelease: [0], build: [] });
      }
      const last = pre[pre.length - 1];
      pre[pre.length - 1] = typeof last === 'number' ? last + 1 : 0;
      return stringify({ ...ver, prerelease: pre, build: [] });
    }
  }
}
