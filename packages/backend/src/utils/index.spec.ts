import { describe, expect, test } from 'vitest';

import { calculator } from '../utils';

describe('Utils', () => {
  test('should rely on addFunction to add two numbers', () => {
    expect.hasAssertions();

    const calc = calculator;

    const result = calc.add(1, 2);
    expect(result).toBe(3);
  });
});
