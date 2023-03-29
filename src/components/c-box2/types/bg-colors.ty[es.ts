import { ColorAttr } from '../../../types/colors.type';

export type BgColorKeys = `bg-${keyof ColorAttr}`;

export type BgColorAttrs = Partial<Record<BgColorKeys, boolean>>;
