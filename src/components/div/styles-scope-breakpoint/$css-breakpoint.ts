import { InitialShadow } from '../helpers/initial-shadow'
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-div.breakpoint';
import { Breakpoint, StyleStates } from '../types/c-div.types';

export class CssBreakpoint {
  static async setHostStyle(
    breakpoint: Breakpoint,
    value: Record<string, string | number>,
    div: CXDiv.Ref,
    state?: StyleStates
  ) {

    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(div, breakpointSize, state);

    this.generateDynamicStyles(breakpoint, breakpointSize, value, div, state);

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(div, `css-${breakpoint}`);
    }

    div.cssTextBreakpointResult = div.cssTextBreakpoint
      ? Object.values(div.cssTextBreakpoint)
          .flatMap((breakpointObj) => Object.values(breakpointObj!))
          .join('')
      : '';

    div.updateStyles();
  }

  static generateDynamicStyles(
    breakpoint: Breakpoint,
    breakpointSize: {
      min?: number | undefined;
      max?: number | undefined;
    },
    value: Record<string, string | number>,
    div: CXDiv.Ref,
    state?: StyleStates
  ): void {
    const mediaRule = createMediaRule(breakpointSize);

    const cssTextResult = Object.entries(value).reduce((acc, [key, value]) => {
      if (value) {
        acc += `${key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}:${value};`;
      }
      return acc;
    }, '');

    div.cssTextBreakpoint[breakpointSize.min || breakpointSize.max!][
      state || 'default'
    ] = `${mediaRule}{:host${
      state === 'toggle' ? `([css-${breakpoint}-toggle])` : state ? `(:${state})` : ''
    }{${cssTextResult}}}`;
  }
  static getStylesArray(value: string | string[]): string[] {
    if (typeof value === 'string') {
      return value.split(',').map((style) => style.trim());
    } else if (Array.isArray(value)) {
      return value;
    } else {
      throw SyntaxError('UI properties can only have a type of string or string[].');
    }
  }
}
function initializeUiBreakpoint(
  div: CXDiv.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  },
  state?: StyleStates
): void {
  div.cssTextBreakpoint ||= {};
  (div.cssTextBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  (div.cssTextBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'default'] ||=
    {};
}

function createMediaRule(breakpointSize: {
  min?: number | undefined;
  max?: number | undefined;
}): string {
  let mediaRule: string;

  if (breakpointSize.min && breakpointSize.max) {
    mediaRule = `@media only screen and (min-width: ${breakpointSize.min}px) and (max-width: ${breakpointSize.max}px)`;
  } else if (!breakpointSize.min && breakpointSize.max) {
    mediaRule = `@media only screen and (max-width: ${breakpointSize.max}px)`;
  } else if (breakpointSize.min && !breakpointSize.max) {
    mediaRule = `@media only screen and (min-width: ${breakpointSize.min}px)`;
  }

  return mediaRule!;
}
