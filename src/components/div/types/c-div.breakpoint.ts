import { Breakpoint } from './c-div.types';

export type BreakpointMinMax = Record<Breakpoint, { min?: number; max?: number }>;

export const breakpointMinMax: BreakpointMinMax = {
  xs: {
    max: 599,
  },
  sm: {
    min: 600,
    max: 959,
  },
  md: {
    min: 960,
    max: 1279,
  },
  lg: {
    min: 1280,
    max: 1919,
  },
  xl: {
    min: 1920,
    max: 2559,
  },
  xxl: {
    min: 2560,
  },
};
