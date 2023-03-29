export const fontTypes = [
  'bold',
  'boldItalic',
  'extraBold',
  'extraBoldItalic',
  'extraLight',
  'extraLightItalic',
  'italic',
  'light',
  'lightItalic',
  'medium',
  'mediumItalic',
  'regular',
  'semiBoldItalic',
  'semiBold',
  'thin',
  'thinItalic',
] as const;

export type FontTypeAttr = Partial<Record<`${typeof fontTypes[number]}`, boolean>>;
export type FontTypeKeys = keyof FontTypeAttr;
