import { InitialShadow } from '../helpers/initial-shadow';
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-div.breakpoint';
import { Breakpoint, StyleStates } from '../types/c-div.types';

export class StylesIconBreakpoint {
  static async scope(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ) {
    InitialShadow.init(box);

    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize);

    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(breakpoint, breakpointSize, styles, box, state);

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(box, `icon-${breakpoint}`);
    }

    box.iconBreakpointCSSResult = box.iconBreakpoint
      ? Object.values(box.iconBreakpoint)
          .flatMap((res) => Object.values(res!))
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
    box: CXDiv.Ref,
    state?: StyleStates
  ): void {
    const mediaRule = createMediaRule(breakpointSize);
    const iconStyles = [];

    for (let index = 0; index < styles.length; ++index) {
      const [iconName, styleValue] = styles[index].split(':').map((s) => s.trim());
      const styleIcon = styleValue || iconName;

      if (iconName && styleIcon) {
        let iconSide = 'before';

        const cssText = styleIcon
          .split(' ')
          .filter((s) => {
            if (s === 'before' || s === 'after') {
              iconSide = s;
              return false;
            } else {
              return Boolean(s);
            }
          })
          .map((s) => {
            const styleProp = stylesMapper.get(`c-div[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        iconStyles[index] = `${mediaRule}{:host${
          state === 'toggle' ? `([icon-${breakpoint}-toggle])` : state ? `(:${state})` : ''
        }::${iconSide}{${styleValue ? `content: '\uE800';font-family: ${iconName};` : ``}${cssText}}}`;
      }
    }

    (box.iconBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'icon'] =
      iconStyles.join(' ');
  }
}
function initializeUiBreakpoint(
  box: CXDiv.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  }
): void {
  box.iconBreakpoint ||= {};
  (box.iconBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
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
