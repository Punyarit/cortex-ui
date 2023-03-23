export const scopedStyles = [
  'style',
  'state',
  'size',
  'splitter',
  'spitter-each',
  'toggle-splitter',
  'value',
  'variable',
] as const;

export type ScopedStyleType = typeof scopedStyles[number];
