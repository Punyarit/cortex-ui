export const styleAttributes = [
  'm',
  'mt',
  'mb',
  'ml',
  'mr',
  'mx',
  'my',
  'p',
  'pt',
  'pb',
  'pl',
  'pr',
  'px',
  'py',
  'gap-x',
  'gap-y',
] as const;
export const styleAttributesSet = new Set(styleAttributes);
export type StyleAttributes = typeof styleAttributes[number];
