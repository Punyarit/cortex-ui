import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-div.breakpoint';
import { Breakpoint, StyleStates } from '../types/c-div.types';

export class SlotBreakpoint {
  static async setHostStyle(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ) {
    
    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize, state);
    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(breakpoint, breakpointSize, styles, box, state);

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(box, `slot-${breakpoint}`);
    }
    box.slotBreakpointCSSResult = box.slotBreakpoint
      ? Object.values(box.slotBreakpoint)
          .flatMap((breakpointObj) => Object.values(breakpointObj!))
          .flatMap((stateObj) => Object.values(stateObj))
          .join('')
      : '';

    box.updateStyles();
  }

  static generateDynamicStyles(
    breakpoint: Breakpoint,
    breakpointSize: {
      min?: number | undefined;
      max?: number | undefined;
    },
    styles: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ): void {
    const mediaRule = createMediaRule(breakpointSize);
    for (const style of styles) {
      const [selector, styleValue] = style.split(': ').map((s) => s.trim());
      if (selector && styleValue) {
        const cssText = this.createCssText(styleValue);
        (box.slotBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'default'][
          selector
        ] = `${mediaRule}{${
          state === 'toggle'
            ? `:host([slot-${breakpoint}-toggle])`
            : state
            ? `:host(:${state})`
            : ''
        } ::slotted(${selector}){${cssText}}}`;
      }
    }
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
  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-div[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
function initializeUiBreakpoint(
  box: CXDiv.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  },
  state?: StyleStates
): void {
  box.slotBreakpoint ||= {};
  (box.slotBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  (box.slotBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'default'] ||= {};
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
