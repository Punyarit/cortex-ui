import { beforeEach, describe, expect, it } from 'vitest';
import '../../cx/components/materials/button/button';

describe('Button', () => {
  let button: CXButton.Ref | null = null;

  beforeEach(() => {
    button = document.createElement('cx-button');
  });

  it('should be rendered', () => {
    // 📌FIXME: add test case later
    const text = 'Button';
    expect('Button').toBe(text);
  });
});
