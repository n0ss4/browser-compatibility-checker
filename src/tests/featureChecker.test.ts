import { describe, it, expect, jest } from '@jest/globals';
import { isFeatureSupported } from '../core/featureChecker.js';

jest.mock('browserslist', () => () => ['defaults']);

jest.mock('caniuse-lite', () => ({
  __esModule: true,
  default: {},
  features: {},
  feature: {},
}));

describe('isFeatureSupported', () => {
  it('should return a boolean for known feature', () => {
    const result = isFeatureSupported('arrow-functions');
    expect(typeof result).toBe('boolean');
  });

  it('should default to false for unknown feature', () => {
    const result = isFeatureSupported('made-up-feature-xyz');
    expect(result).toBe(false);
  });
});