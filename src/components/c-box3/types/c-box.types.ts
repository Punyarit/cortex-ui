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

export type UiTypes = 'ui' | 'icon' | 'before' | 'after';

export type UiToggleSelectedRef = Record<UiTypes, CBox.Ref | undefined>;

export type ToggleEvents = Record<UiTypes, Function>;

export type UiStates = Partial<Record<Partial<StyleStates>, UiClassName>>;
