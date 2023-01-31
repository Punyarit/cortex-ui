export class SpinnerAttributes {
  public size!: SizeTypes;
  public color!: ColorValueTypes;
}

export const SizeMap = {
  small: {
    width: 'size-24',
    height: 'size-24',
    borderWidth: 'size-4',
  },
  medium: {
    width: 'size-28',
    height: 'size-28',
    borderWidth: 'size-4',
  },
  large: {
    width: 'size-32',
    height: 'size-32',
    borderWidth: 'size-4',
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

export interface SpinnerBuilderTypes {
  setSize(size: SizeKeyTypes): this;
  setColor(color: ColorKeyTypes): this;
  build(): SpinnerAttributes;
}
