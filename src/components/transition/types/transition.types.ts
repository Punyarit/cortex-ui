// transition Builder
export interface TransitionBuilderTypes {
  setTransition(size: TransitionAttributes): this;
  minimize(): string;
}

export class StylesBasedTime {
  // 📌string = CSSText result
  start?: string;
  end?: string;
}

export type TransitionStyles = {
  getCssText(): string;
};
export const transitions = ['scale-up', 'scale-down', 'top-down', 'bottom-up', 'fade-in', 'fade-out'] as const;
export type TransitionKeys = typeof transitions[number];
export const transitionTiming = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'] as const;
export type TransitionTimingKeys = typeof transitionTiming[number];

export type TransitionTypes = {
  start: TransitionKeys;
  end: TransitionKeys;
};

export const fillMOde = ['forwards'] as const;
export type FillMode = typeof fillMOde[number];

export type TransitionAttributes = {
  name: TransitionKeys;
  duration: string;
  delay: string;
  timing: TransitionTimingKeys;
  fillMode?: FillMode;
};

export type TransitionDetail = {
  transition: TransitionAttributes;
  fade: boolean;
  when: WhenTypes;
};

export const whenTypes = ['start', 'end'] as const;
export type WhenTypes = typeof whenTypes[number];

// 📌start='require'; end='require'; fade='optional'
export type TransitionOptionalFadeTypes = Required<Pick<CXTransition.Set, 'start' | 'end'>> &
  Partial<Pick<CXTransition.Set, 'fade'>>;

// 📌for components that fade can be undefined
// 📌fade can be undefined mean some components have own opacity such as modal/dialog
export type TransitionDefaultFadeTypes = Pick<CXTransition.Set, 'start' | 'end'>;
