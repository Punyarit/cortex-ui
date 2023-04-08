export type StyleStates = typeof styleStyles[number];
const styleStyles = [
  'active',
  'focus',
  'focus-within',
  'focus-visible',
  'hover',
  'target',
] as const;

export type UiClassName = {
  [className: string]: string;
};

export type UiStates = Partial<Record<Partial<StyleStates>, UiClassName>>;
