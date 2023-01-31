// vrersion 2

import { ThemeVersion } from '../../theme/types/theme.types';

export const buttonTypesV2 = ['primary', 'secondary-outline', 'secondary', 'tertiary'] as const;
export const buttonSizes = ['small', 'medium', 'large'] as const;
export const buttonIconSides = ['prefix', 'suffix'] as const;
export const buttonColorsV2 = ['primary', 'error'] as const;
export const buttonExternalVar = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'borderRadius',
  'outlineWidth',
  'fontSize',
] as const;

export type ButtonTypesV2 = typeof buttonTypesV2[number];
export type ButtonSizes = typeof buttonSizes[number];
export type ButtonIconSides = typeof buttonIconSides[number];
export type ButtonColorsV2 = typeof buttonColorsV2[number];
export type ButtonExposeVar = typeof buttonExternalVar[number];

// vrersion 1
export const buttonTypesV1 = ['primary', 'secondary', 'text'] as const;
export type ButtonTypesV1 = typeof buttonTypesV1[number];

export const buttonColorsV1 = ['primary', 'gray', 'white', 'error', 'gray-ray-lighter'] as const;
export type ButtonColorsV1 = typeof buttonColorsV1[number];

// color version control
export type ButtonVersionTypes = {
  1: ButtonColorsV1;
  2: ButtonTypesV2;
};

export type ButtonVersionColors = {
  1: ButtonTypesV1;
  2: ButtonColorsV2;
};

export type ButtonTypes<T extends ThemeVersion = 2> = ButtonVersionTypes[T];
export type ButtonColors<T extends ThemeVersion = 2> = ButtonVersionColors[T];
