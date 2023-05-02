import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/cx-div.breakpoint';
import { Breakpoint, StyleStates } from '../types/cx-div.types';

export class StyleBreakpoint {
  static async setHostStyle(
    breakpoint: Breakpoint,
    styles: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ) {
    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize, state);

    this.generateDynamicStyles(breakpoint, breakpointSize, styles, box, state);

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(
        box,
        `style-${breakpoint}`
      );
    }

    box.styleBreakpointCSSResult = box.styleBreakpoint
      ? Object.values(box.styleBreakpoint)
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
    styleValue: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ): void {
    let cssText: string[] = [];
    if (Array.isArray(styleValue)) {
      for (let index = 0; index < styleValue.length; ++index) {
        cssText[index] = this.createCssText(styleValue[index]);
      }
    } else {
      cssText[0] = this.createCssText(styleValue);
    }

    const mediaRule = createMediaRule(breakpointSize);

    (box.styleBreakpoint as any)[breakpointSize.min || breakpointSize.max!][
      state || 'default'
    ] = `${mediaRule}{:host${
      state === 'toggle' ? `([style-${breakpoint}-toggle])` : state ? `(:${state})` : ''
    }{${cssText.join('')}}}`;
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
  box: CXDiv.Ref,
  breakpointSize: {
    min?: number | undefined;
    max?: number | undefined;
  },
  state?: StyleStates
): void {
  box.styleBreakpoint ||= {};
  (box.styleBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  (box.styleBreakpoint as any)[breakpointSize.min || breakpointSize.max!][state || 'default'] ||=
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
