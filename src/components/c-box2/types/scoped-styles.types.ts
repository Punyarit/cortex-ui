export const scopedStyles = ['style', 'state', 'prop',] as const;

export type ScopedStyleType = typeof scopedStyles[number];
