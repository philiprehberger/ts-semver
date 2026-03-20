import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('semver-ts', () => {
  it('should export parse', () => {
    assert.ok(mod.parse);
  });

  it('should export coerce', () => {
    assert.ok(mod.coerce);
  });

  it('should export stringify', () => {
    assert.ok(mod.stringify);
  });

  it('should export compare', () => {
    assert.ok(mod.compare);
  });

  it('should export gt', () => {
    assert.ok(mod.gt);
  });

  it('should export lt', () => {
    assert.ok(mod.lt);
  });

  it('should export gte', () => {
    assert.ok(mod.gte);
  });

  it('should export lte', () => {
    assert.ok(mod.lte);
  });

  it('should export eq', () => {
    assert.ok(mod.eq);
  });

  it('should export satisfies', () => {
    assert.ok(mod.satisfies);
  });

  it('should export maxSatisfying', () => {
    assert.ok(mod.maxSatisfying);
  });

  it('should export minSatisfying', () => {
    assert.ok(mod.minSatisfying);
  });

  it('should export increment', () => {
    assert.ok(mod.increment);
  });

  it('should export sort', () => {
    assert.ok(mod.sort);
  });

  it('should export rsort', () => {
    assert.ok(mod.rsort);
  });
});
