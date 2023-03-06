export const buttonTypes = ['primary', 'secondary-outline', 'secondary', 'tertiary'] as const;
export const buttonSizes = ['small', 'medium', 'large'] as const;
export const buttonIconSides = ['prefix', 'suffix'] as const;
export const buttonColors = ['primary', 'error'] as const;
export const buttonExternalVar = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'borderRadius',
  'outlineWidth',
  'fontSize',
] as const;

export type ButtonTypes = typeof buttonTypes[number];
export type ButtonSizes = typeof buttonSizes[number];
export type ButtonIconSides = typeof buttonIconSides[number];
export type ButtonColors = typeof buttonColors[number];
export type ButtonExposeVar = typeof buttonExternalVar[number];
