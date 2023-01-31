import { SIZE_NUMBERS } from '../../../../types/sizes.type';

export type TxSizeAttr = Partial<Record<`tx-${typeof SIZE_NUMBERS[number]}`, boolean>>;

export type TxSizeKey = keyof TxSizeAttr;
