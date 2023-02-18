import { SIZE_NUMBERS } from '../../../types/sizes.type';
import { BgColorAttrs } from './bg-colors.ty[es';
import { FontTypeAttr } from './c-box.fonts';
import { ActiveColorAttr, HoverColorAttr } from './pseudo-classes.type';
import { TxColorAttr } from './tx-colors.type';
import { TxSizeAttr } from './tx-sizes.type';

export type BorderRadiusAttr = Partial<
  Record<`round-${typeof SIZE_NUMBERS[number]}` | 'round-full', boolean>
>;
export type BorderRadiusKey = keyof BorderRadiusAttr;

export type HeightAttr = Partial<Record<`h-${typeof SIZE_NUMBERS[number]}` | 'h-full', boolean>>;
export type HeightKey = keyof HeightAttr;
export type WidthAttr = Partial<Record<`w-${typeof SIZE_NUMBERS[number]}` | 'w-full', boolean>>;
export type WidthKey = keyof WidthAttr;

export type PaddingAttr = Partial<Record<`p-${typeof SIZE_NUMBERS[number]}`, boolean>>;
export type PaddingKey = keyof PaddingAttr;

export type MarginAttr = Partial<Record<`m-${typeof SIZE_NUMBERS[number]}`, boolean>>;
export type MarginKey = keyof MarginAttr;

export type TopAttr = Partial<Record<`top-${typeof SIZE_NUMBERS[number]}`, boolean>>;
export type TopKey = keyof TopAttr;

export type RightAttr = Partial<Record<`right-${typeof SIZE_NUMBERS[number]}`, boolean>>;
export type RightKey = keyof RightAttr;

export type BottomAttr = Partial<Record<`bottom-${typeof SIZE_NUMBERS[number]}`, boolean>>;
export type BottomKey = keyof BottomAttr;

export type LeftAttr = Partial<Record<`left-${typeof SIZE_NUMBERS[number]}`, boolean>>;
export type LeftKey = keyof LeftAttr;

export type PositionAttr = Partial<
  Record<'absolute' | 'relative' | 'fixed' | 'static' | 'sticky', boolean>
>;
export type PositionKey = keyof PositionAttr;

export interface BoxBaseAttr
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
    TxColorAttr,
    TxSizeAttr,
    BgColorAttrs,
    FontTypeAttr {}

export type BoxBaseKey = keyof BoxBaseAttr;
