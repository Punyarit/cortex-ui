import { shadeV1 } from './colors.version-control';

export type Color_12 = Partial<Record<`colors-12-${typeof shadeV1[number]}`, boolean>>;
export type Color_11 = Partial<Record<`colors-11-${typeof shadeV1[number]}`, boolean>>;
export type Color_10 = Partial<Record<`colors-10-${typeof shadeV1[number]}`, boolean>>;
export type Color_9 = Partial<Record<`colors-9-${typeof shadeV1[number]}`, boolean>>;
export type Color_8 = Partial<Record<`colors-8-${typeof shadeV1[number]}`, boolean>>;
export type Color_7 = Partial<Record<`colors-7-${typeof shadeV1[number]}`, boolean>>;
export type Color_6 = Partial<Record<`colors-6-${typeof shadeV1[number]}`, boolean>>;
export type Color_5 = Partial<Record<`colors-5-${typeof shadeV1[number]}`, boolean>>;
export type Color_4 = Partial<Record<`colors-4-${typeof shadeV1[number]}`, boolean>>;
export type Color_3 = Partial<Record<`colors-3-${typeof shadeV1[number]}`, boolean>>;
export type Color_2 = Partial<Record<`colors-2-${typeof shadeV1[number]}`, boolean>>;
export type Color_1 = Partial<Record<`colors-1-${typeof shadeV1[number]}`, boolean>>;

export type Gray = Partial<Record<`gray-${typeof shadeV1[number]}`, boolean>>;
export type Neutral = Partial<Record<`neutral-${typeof shadeV1[number]}`, boolean>>;

const statusColors = [
  'status-light-gray',
  'status-gray',
  'status-light-green',
  'status-light-blue',
  'status-light-violet',
  'status-light-purple',
  'status-light-purple',
  'status-light-orange',
  'status-green',
  'status-blue',
  'status-violet',
  'status-purple',
  'status-light-pink',
  'status-pink',
  'status-orange',
  'status-light-yellow',
  'status-yellow',
] as const;
export type StatusColors = Partial<Record<typeof statusColors[number], boolean>>;

export type ColorAttr = Color_1 &
  Color_2 &
  Color_3 &
  Color_4 &
  Color_5 &
  Color_6 &
  Color_7 &
  Color_8 &
  Color_9 &
  Color_10 &
  Color_11 &
  Color_12 &
  StatusColors &
  Gray &
  Neutral;

export type ColorTypesV1 = keyof ColorAttr;
