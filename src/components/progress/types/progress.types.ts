export class ProgressAttributes {
  size!: SizeTypes;
  color!: ColorValueTypes;
}

export const SizeMap = {
  small: {
    width: 'size-80',
    height: 'size-80',
    scale: 'number-1',
    translate: 'base-size-0',
  },
  medium: {
    width: 'size-110',
    height: 'size-110',
    scale: 'number-1-4',
    translate: 'base-size-16',
  },
  large: {
    width: 'size-138',
    height: 'size-138',
    scale: 'number-1-8',
    translate: 'base-size-30',
  },
} as const;

export type SizeTypes = typeof SizeMap['small'] | typeof SizeMap['medium'] | typeof SizeMap['large'];

export const ColorMap = {
  primary: 'primary-500',
  white: 'white',
  error: 'error-500',
  gray: 'gray-500',
} as const;

export const ColorKey = Object.keys(ColorMap) as (keyof typeof ColorMap)[];
export const SizeKey = Object.keys(SizeMap) as (keyof typeof SizeMap)[];
export const colorValueKey = Object.values(ColorMap);

export type ColorValueTypes = typeof colorValueKey[number];
export type ColorKeyTypes = typeof ColorKey[number];
export type SizeKeyTypes = typeof SizeKey[number];

export interface ProgressBuilderTypes {
  setSize(size: SizeKeyTypes): this;
  setColor(color: ColorKeyTypes): this;
  build(): ProgressAttributes;
}
