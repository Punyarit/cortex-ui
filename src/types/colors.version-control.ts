import { ColorTypesV1 } from './colors.v1.types';
import { ColorTypesV2 } from './colors.v2.type';

export const shadeV2 = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
export const shadeV1 = ['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

export type ColorVersionTypes = {
  1: ColorTypesV1;
  2: ColorTypesV2;
};

export type ColorTypes<V extends keyof ColorVersionTypes = 2> = ColorVersionTypes[V];
