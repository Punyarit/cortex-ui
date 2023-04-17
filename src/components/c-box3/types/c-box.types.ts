export type StyleStates = typeof styleStyles[number];
const styleStyles = [
  'active',
  'focus',
  'focus-within',
  'focus-visible',
  'hover',
  'target',
  'toggle',
] as const;

export type UiClassName = {
  [className: string]: string;
};

export type UiPseudoState = {
  [state: string]: string;
};

export type UiTypes = 'ui' | 'icon' | 'before' | 'after' | 'animate';

export type UiToggleSelectedRef = Record<UiTypes, CBox.Ref | undefined>;

export type ToggleEvents = Record<UiTypes, Function>;

export type UiStates = Partial<Record<Partial<StyleStates>, UiClassName>>;
export const uiSpacingAttributes = ['w', 'h', 'p', 'm'] as const;
export type UiSpacingAttributes = typeof uiSpacingAttributes[number];
export type UiSpacingTypes =
  | 'width'
  | 'max-width'
  | 'min-width'
  | 'height'
  | 'max-height'
  | 'min-height'
  | 'padding'
  | 'padding-left'
  | 'padding-top'
  | 'padding-right'
  | 'padding-bottom'
  | 'padding-x'
  | 'padding-y'
  | 'margin'
  | 'margin-left'
  | 'margin-top'
  | 'margin-right'
  | 'margin-bottom'
  | 'margin-x'
  | 'margin-y';
export type UiSpacing = Partial<Record<UiSpacingTypes, string>>;

export type UiAnimateState = Partial<Record<StyleStates | 'default', string>>;
