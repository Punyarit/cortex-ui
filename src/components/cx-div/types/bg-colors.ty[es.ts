import { ColorAttr } from '../../../../types/colors.v2.type';

export type BgColorKeys = `bg-${keyof ColorAttr}`;

export type BgColorAttrs = Partial<Record<BgColorKeys, boolean>>;
