export interface SemVer {
  major: number;
  minor: number;
  patch: number;
  prerelease: (string | number)[];
  build: string[];
}

export type ReleaseType = 'major' | 'minor' | 'patch' | 'prerelease';
