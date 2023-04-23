import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-box.breakpoint';
import { Breakpoint, StyleStates } from '../types/c-box.types';

export class StylesScopeBreakpoint {
  static async scope(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CBox.Ref,
    state?: StyleStates
  ) {
    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize, state);

    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(breakpoint, breakpointSize, styles, box, state);

    // Update class names
    updateClassNames(box, breakpointSize, state, breakpoint);

    if (state === 'toggle') {
      (await import('../styles-scope/styles-toggle')).StyleToggle.handle(box, `ui-${breakpoint}`);
    }

    box.className = Array.from(new Set(Object.values(box.uiClassNames!).flat())).join(' ');

    box.uiBreakpointCSSResult = box.uiBreakpoint
      ? Object.values(box.uiBreakpoint)
          .flatMap((styles) => Object.values(styles!))
          .join('')
      : '';

    box.uiBreakpointStatesCSSResult = box.uiBreakpointStates
      ? Object.values(box.uiBreakpointStates)
          .flatMap((breakpointObj) => Object.values(breakpointObj!))
          .flatMap((stateObj) => Object.values(stateObj))
          .join('')
      : '';

    box.updateStyles();
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

  static generateDynamicStyles(
    breakpoint: Breakpoint,
    breakpointSize: {
      min?: number | undefined;
      max?: number | undefined;
    },
    styles: string[],
    box: CBox.Ref,
    state?: StyleStates
  ): void {
    const mediaRule = createMediaRule(breakpointSize);

    for (const style of styles) {
      const [className, styleValue] = style.split(':').map((s) => s.trim());
      if (className && styleValue) {
        const cssText = this.createCssText(styleValue);

        if (
          state &&
          box?.uiBreakpointStates?.[breakpointSize.min || breakpointSize.max!]?.[state]
        ) {
          (box.uiBreakpointStates as any)[breakpointSize.min || breakpointSize.max!][state][
            className
          ] = `${mediaRule}{:host(.${className}${createStateSelector(
            state,
            breakpoint
          )}){${cssText}}}`;
        } else if (box?.uiBreakpoint) {
          (box.uiBreakpoint[breakpointSize.min || breakpointSize.max!] as any)[
            className
          ] = `${mediaRule}{:host(.${className}){${cssText}}}`;
        }
      }
    }
  }

  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
function initializeUiBreakpoint(
  box: CBox.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  },
  state?: StyleStates
): void {
  if (state) {
    box.uiBreakpointStates ||= {};
    (box.uiBreakpointStates as any)[breakpointSize.min || breakpointSize.max!] ||= {};
    (box.uiBreakpointStates as any)[breakpointSize.min || breakpointSize.max!][state] ||= {};
  } else {
    box.uiBreakpoint ||= {};
    box.uiBreakpoint[breakpointSize.min || breakpointSize.max!] ||= {};
  }
}

function updateClassNames(
  box: CBox.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  },
  state: StyleStates | undefined,
  breakpoint: Breakpoint
): void {
  box.uiClassNames ||= {};
  box.uiClassNames[state ? `${state}-${breakpoint}` : `ui-${breakpoint}`] = Object.keys(
    (state
      ? box?.uiBreakpointStates?.[breakpointSize.min || breakpointSize.max!]?.[state]
      : box?.uiBreakpoint?.[breakpointSize.min || breakpointSize.max!])!
  );
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

function createStateSelector(state: StyleStates, breakpoint: Breakpoint): string {
  if (state === 'toggle') {
    return `[ui-${breakpoint}-toggle]`;
  } else if (state) {
    return `:${state}`;
  } else {
    return '';
  }
}
