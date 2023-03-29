import { ColorAttr } from '../../../types/colors.type';

export type TxColorKey = `tx-${keyof ColorAttr}`;

export type TxColorAttr = Partial<Record<TxColorKey, boolean>>;
