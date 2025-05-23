import { describe, expect, test } from 'vitest';

import { addFunction } from '../utils';

describe('Utils', () => {
  test('should add two numbers', () => {
    expect.hasAssertions();

    const result = addFunction(1, 2);
    expect(result).toBe(3);
  });
});
