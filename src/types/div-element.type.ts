import {ColorsAttr} from './colors.type';
import {SIZES} from './sizes.types';

export type BorderRadiusAttr = Partial<
  Record<`round-${typeof SIZES[number]}`, boolean>
>;

export type HeightAttr = Partial<
  Record<`h-${typeof SIZES[number]}` | 'h-full', boolean>
>;

export type WidthAttr = Partial<
  Record<`w-${typeof SIZES[number]}` | 'w-full', boolean>
>;

export type PaddingAttr = Partial<Record<`p-${typeof SIZES[number]}`, boolean>>;

export type MarginAttr = Partial<Record<`m-${typeof SIZES[number]}`, boolean>>;

export type TopAttr = Partial<Record<`top-${typeof SIZES[number]}`, boolean>>;

export type RightAttr = Partial<
  Record<`right-${typeof SIZES[number]}`, boolean>
>;

export type BottomAttr = Partial<
  Record<`bottom-${typeof SIZES[number]}`, boolean>
>;

export type LeftAttr = Partial<Record<`left-${typeof SIZES[number]}`, boolean>>;

export type PositionAttr = Partial<
  Record<'absolute' | 'relative' | 'fixed' | 'static' | 'sticky', Boolean>
>;

export interface DivElementAttr
  extends MarginAttr,
    PaddingAttr,
    BorderRadiusAttr,
    PositionAttr,
    TopAttr,
    RightAttr,
    BottomAttr,
    LeftAttr,
    WidthAttr,
    HeightAttr,
    ColorsAttr {}
