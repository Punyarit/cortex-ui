import { stylesMapper } from '../styles-mapper/styles-mapper';
import { Breakpoint, StyleStates } from '../types/c-box.types';

export class StylesBreakpoint {
  static breakpoints: Record<Breakpoint, { min?: number; max?: number }> = {
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

  static async scope(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CBox.Ref,
    state?: StyleStates
  ) {
    const breakpointSize = this.breakpoints[breakpoint];
    if (state) {
      box.uiBreakpointStates ||= {};
      (box.uiBreakpointStates as any)[breakpointSize.min || breakpointSize.max!] ||= {};
      (box.uiBreakpointStates as any)[breakpointSize.min || breakpointSize.max!][state] ||= {};
    } else {
      box.uiBreakpoint ||= {};
      box.uiBreakpoint[breakpointSize.min || breakpointSize.max!] ||= {};
    }

    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(breakpoint, breakpointSize, styles, box, state);

    box.uiClassNames ||= {};
    box.uiClassNames[state ? `${state}-${breakpoint}` : `ui-${breakpoint}`] = Object.keys(
      (state
        ? box?.uiBreakpointStates?.[breakpointSize.min || breakpointSize.max!]?.[state]
        : box?.uiBreakpoint?.[breakpointSize.min || breakpointSize.max!])!
    );

    if (state === 'toggle') {
      (await import('../styles-scope/styles-toggle')).StyleToggle.handle(box, `ui-${breakpoint}`);
    }
    box.className = Array.from(new Set(Object.values(box.uiClassNames).flat())).join(' ');

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
    let mediaRule: string;

    if (breakpointSize.min && breakpointSize.max) {
      mediaRule = `@media only screen and (min-width: ${breakpointSize.min}px) and (max-width: ${breakpointSize.max}px)`;
    } else if (!breakpointSize.min && breakpointSize.max) {
      mediaRule = `@media only screen and (max-width: ${breakpointSize.max}px)`;
    } else if (breakpointSize.min && !breakpointSize.max) {
      mediaRule = `@media only screen and (min-width: ${breakpointSize.min}px)`;
    }

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
          ] = `${mediaRule!}{:host(.${className}${
            state === 'toggle' ? `[ui-${breakpoint}-toggle]` : state ? `:${state}` : ''
          }){${cssText}}}`;
        } else if (box?.uiBreakpoint) {
          (box.uiBreakpoint[breakpointSize.min || breakpointSize.max!] as any)[
            className
          ] = `${mediaRule!}{:host(.${className}){${cssText}}}`;
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
