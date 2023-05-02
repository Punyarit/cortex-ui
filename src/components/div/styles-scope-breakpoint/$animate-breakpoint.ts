import { stylesMapper } from '../styles-mapper/styles-mapper';
import { breakpointMinMax } from '../types/cx-div.breakpoint';
import { Breakpoint, StyleStates } from '../types/cx-div.types';

export class StylesAnimateBreakpoint {
  static async scope(
    breakpoint: Breakpoint,
    value: string | string[],
    box: CXDiv.Ref,
    state?: StyleStates
  ) {
    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(
        box,
        `animate-${breakpoint}`
      );
    }

    const breakpointSize = breakpointMinMax[breakpoint];

    // Initialize breakpoint and state data structures
    initializeUiBreakpoint(box, breakpointSize, state);

    this.generateDynamicStyles(breakpoint, breakpointSize, box, value, state);

    box.animateBreakpointCSSResult = box.animateBreakpoint
      ? Object.values(box.animateBreakpoint)
          .flatMap((breakpointObj) => Object.values(breakpointObj!))
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
    box: CXDiv.Ref,
    value: string | string[],
    state?: StyleStates
  ): void {
    const val = value.slice(0, value.length - 1);
    const mediaRule = createMediaRule(breakpointSize);

    const rules = [];
    for (let index = 0; index < val.length; index++) {
      const [keyframe, styles] = val[index].split(':');
      const cssText = this.createCssText(styles);
      rules[index] = `${keyframe}{${cssText}}`;
    }

    (box.animateBreakpoint as any)[breakpointSize.min || breakpointSize.max!][
      state || 'default'
    ] = `@keyframes ui-animate-${breakpoint}{${rules.join('')}}${mediaRule}{:host${
      state === 'toggle' ? `([animate-${breakpoint}-toggle])` : state ? `(:${state})` : ''
    }{animation: ui-animate-${breakpoint} ${value[value.length - 1]};}}`;
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
  box.animateBreakpoint ||= {};
  (box.animateBreakpoint as any)[breakpointSize.min || breakpointSize.max!] ||= {};
  (box.animateBreakpoint as any)[breakpointSize.min || breakpointSize.max!][
    state || 'default'
  ] ||= {};
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
