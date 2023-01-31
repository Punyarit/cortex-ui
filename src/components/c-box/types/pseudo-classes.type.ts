import { ColorAttr } from '../../../types/colors.v2.type';
import { TxColorKey } from './tx-colors.type';

export type HoverColorKey = `hover-${keyof ColorAttr}`;
export type ActiveColorKey = `active-${TxColorKey}`;

export type HoverColorAttr = Partial<Record<HoverColorKey, boolean>>;
export type ActiveColorAttr = Partial<Record<ActiveColorKey, boolean>>;
