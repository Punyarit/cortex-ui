import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-box.breakpoint';
import { Breakpoint, StyleStates } from '../types/c-box.types';

export class StylesPseudoBreakpoint {
  static async scope(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CBox.Ref,
    pseudo: 'before' | 'after',
    state?: StyleStates
  ) {
    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize, pseudo);

    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(breakpoint, breakpointSize, styles, box, pseudo, state);

    if (state === 'toggle') {
      (await import('../styles-scope/styles-toggle')).StyleToggle.handle(
        box,
        `${pseudo}-${breakpoint}`
      );
    }

    box.uiBeforeBreakpointCSSResult = box.uiBeforeBreakpoint
      ? Object.values(box.uiBeforeBreakpoint)
          .flatMap((breakpointObj) => Object.values(breakpointObj!))
          .join('')
      : '';

    box.uiAfterBreakpointCSSResult = box.uiAfterBreakpoint
      ? Object.values(box.uiAfterBreakpoint)
          .flatMap((breakpointObj) => Object.values(breakpointObj!))
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
    pseudo: 'before' | 'after',
    state?: StyleStates
  ): void {
    const mediaRule = createMediaRule(breakpointSize);

    for (let index = 0; index < styles.length; ++index) {
      const [content, style] = styles[index].split(':').map((s) => s.trim());
      // style can be undefined *note if style = undefined that mean content is styles (ui-before="styles")
      const styleTexts = style || content;
      if (styleTexts) {
        const cssText = style
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        (box[pseudo === 'before' ? 'uiBeforeBreakpoint' : 'uiAfterBreakpoint'] as any)[
          breakpointSize.min || breakpointSize.max!
        ][state || pseudo] = `${mediaRule}{:host${
          state === 'toggle' ? `([${pseudo}-${breakpoint}-toggle])` : state ? `(:${state})` : ''
        }::${pseudo}{content:'${style ? content : ''}';${cssText}}}`;
      }
    }
  }
}
function initializeUiBreakpoint(
  box: CBox.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  },
  pseudo: 'before' | 'after'
): void {
  const breakpointObj = pseudo === 'before' ? 'uiBeforeBreakpoint' : 'uiAfterBreakpoint';
  box[breakpointObj] ||= {};
  (box[breakpointObj] as any)[breakpointSize.min || breakpointSize.max!] ||= {};
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
