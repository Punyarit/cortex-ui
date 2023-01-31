import { BoxBaseAttr } from './box-base.type';
import { UtilAttrs } from './utils.types';

type UITypes = {
  ui?: string[] | string[][];
};

export type DxDivTypes = UITypes | BoxBaseAttr | UtilAttrs;
