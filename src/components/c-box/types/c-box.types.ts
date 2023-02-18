import { BoxBaseAttr } from './c-box-base.type';
import { IngredientAttr } from './c-box.ingredient.type';
import { UtilAttr } from './utils.types';

type UITypes = {
  ui?: string[] | string[][];
};

export type CBoxTypes = UITypes | BoxBaseAttr | UtilAttr | IngredientAttr;
