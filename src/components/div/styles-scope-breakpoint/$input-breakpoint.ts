import { InitialShadow } from '../helpers/initial-shadow'
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-div.breakpoint';
import { Breakpoint, InputSelector, StyleStates } from '../types/c-div.types';

export class StylesInputBreakpoint {
  static async scope(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ) {
    InitialShadow.init(box);

    const target = box.children[0].tagName.toLowerCase();
    if (target !== 'input' && target !== 'textarea') {
      throw SyntaxError(
        "When using c-div with '$input' property, must only be applied to the INPUT or TEXTAREA element."
      );
    }

    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize, state);

    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(breakpointSize, styles, box, target, state);

    box.inputBreakpointCSSResult = box.inputBreakpoint
      ? Object.values(box.inputBreakpoint)
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
    breakpointSize: {
      min?: number | undefined;
      max?: number | undefined;
    },
    styles: string[],
    box: CXDiv.Ref,
    target: 'input' | 'textarea',
    state?: StyleStates
  ): void {
    const mediaRule = createMediaRule(breakpointSize);

    for (const style of styles) {
      const [selectorValue, styleValue] = style.split(':').map((s) => s.trim()) as [
        InputSelector,
        string
      ];
      if (selectorValue && styleValue) {
        const cssText = this.createCssText(styleValue);

        (box.inputBreakpoint as any)[breakpointSize.min || breakpointSize.max!][
          state || 'default'
        ][selectorValue] = `${mediaRule}{::slotted(${target}${
          selectorValue !== 'input' && selectorValue !== 'placeholder' ? `:${selectorValue}` : ''
        }${state ? `:${state}` : ''})${
          selectorValue === 'placeholder' ? `::${selectorValue}` : ''
        }{${cssText}}}`;
      }
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
  box.inputBreakpoint ||= {};
  (box.inputBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  (box.inputBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  (box.inputBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'default'] ||=
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
