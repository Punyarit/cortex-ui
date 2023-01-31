import { ColorAttr } from '../../../types/colors.v2.type';

export type TxColorKey = `tx-${keyof ColorAttr}`;

export type TxColorAttr = Partial<Record<TxColorKey, boolean>>;
