import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/c-box.breakpoint';
import { Breakpoint, StyleStates } from '../types/c-box.types';

export class StylesIconBreakpoint {
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

    if (state === 'toggle') {
      (await import('../styles-scope/styles-toggle')).StyleToggle.handle(box, `icon-${breakpoint}`);
    }

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
    const iconStyles = [];

    for (let index = 0; index < styles.length; ++index) {
      const [iconName, styleValue] = styles[index].split(':').map((s) => s.trim());
      if (iconName && styleValue) {
        let iconSide = 'before';

        const cssText = styleValue
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
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        iconStyles[index] = `${mediaRule}{:host${
          state === 'toggle' ? `([icon-${breakpoint}-toggle])` : state ? `(:${state})` : ''
        }::${iconSide}{content: '\uE800';font-family: ${iconName};${cssText}}}`;
      }
    }

    (box.iconBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'icon'] =
      iconStyles.join(' ');
  }

  static createCssText(styleValue: string): string {
    return styleValue;
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
  box.iconBreakpoint ||= {};
  (box.iconBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  // (box.iconBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'icon'] ||= {};
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

function createStateSelector(breakpoint: Breakpoint, state?: StyleStates): string {
  if (state === 'toggle') {
    return `[icon-${breakpoint}-toggle]`;
  } else if (state) {
    return `:${state}`;
  } else {
    return '';
  }
}
