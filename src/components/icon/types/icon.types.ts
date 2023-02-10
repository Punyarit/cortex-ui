import { iconSrcs } from './icon.src';

export type SizeValue = 'size-16' | 'size-20' | 'size-24';
export type ColorValue = 'primary-500' | 'white' | 'error-500' | 'gray-500';

export const colorMap = {
  primary: 'primary-500',
  white: 'white',
  error: 'error-500',
  gray: 'gray-500',
} as const;

export const colorKeys = Object.keys(colorMap) as (keyof typeof colorMap)[];

export const sizeMap = {
  small: 'size-16',
  medium: 'size-20',
  large: 'size-24',
} as const;

export const sizeKeys = Object.keys(sizeMap) as (keyof typeof sizeMap)[];

export interface IconBuilderTypes {
  setSize(size: IconSizeTypes): this;
  setColor(color: IconColorTypes): this;
  build(): IconAttributes;
}

export class IconAttributes {
  size: SizeValue = 'size-20';
  color: ColorValue = 'primary-500';
}

export const iconSides = ['prefix', 'suffix'] as const;

export type IconSizeTypes = typeof sizeKeys[number];
export type IconColorTypes = typeof colorKeys[number];

export type IconSrcTypes = typeof iconSrcs[number];
