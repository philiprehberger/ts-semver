import { compare } from './compare';

export function sort(versions: string[]): string[] {
  return [...versions].sort((a, b) => compare(a, b));
}

export function rsort(versions: string[]): string[] {
  return [...versions].sort((a, b) => compare(b, a));
}
