export type StyleStates = (typeof styleStyles)[number];
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

export type UiTypes =
  | 'css'
  | 'css-xs'
  | 'css-sm'
  | 'css-md'
  | 'css-lg'
  | 'css-xl'
  | 'css-xxl'
  | 'class'
  | 'class-xs'
  | 'class-sm'
  | 'class-md'
  | 'class-lg'
  | 'class-xl'
  | 'class-xxl'
  | 'before'
  | 'before-xs'
  | 'before-sm'
  | 'before-md'
  | 'before-lg'
  | 'before-xl'
  | 'before-xxl'
  | 'after'
  | 'after-xs'
  | 'after-sm'
  | 'after-md'
  | 'after-lg'
  | 'after-xl'
  | 'after-xxl'
  | 'animate'
  | 'animate-xs'
  | 'animate-sm'
  | 'animate-md'
  | 'animate-lg'
  | 'animate-xl'
  | 'animate-xxl'
  | 'icon'
  | 'icon-xs'
  | 'icon-sm'
  | 'icon-md'
  | 'icon-lg'
  | 'icon-xl'
  | 'icon-xxl'
  | 'style'
  | 'style-xs'
  | 'style-sm'
  | 'style-md'
  | 'style-lg'
  | 'style-xl'
  | 'style-xxl'
  | 'slot'
  | 'slot-xs'
  | 'slot-sm'
  | 'slot-md'
  | 'slot-lg'
  | 'slot-xl'
  | 'slot-xxl';

export type InputSelector =
  | 'input'
  | 'placeholder'
  | 'disabled'
  | 'checkbox'
  | 'checked'
  | 'required'
  | 'optional'
  | 'valid'
  | 'invalid'
  | 'in-range'
  | 'out-of-range'
  | 'read-only'
  | 'read-write';

export type UiToggleSelectedRef = Record<UiTypes, CXDiv.Ref | undefined>;

export type ToggleEvents = Record<UiTypes, Function>;

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const;
export type Breakpoint = (typeof breakpoints)[number];

export type UiBreakpointState = Partial<Record<number, UiStates>>;
export type UiIconBreakpoint = Partial<Record<number, UiClassName>>;
export type UiBreakpoint = Partial<Record<number, UiClassName>>;
export type UiPseudoBreakpoint = Partial<Record<number, UiPseudoState>>;
export type UiAnimateBreakpoint = Partial<Record<number, string>>;
export type UiAnimateStatesBreakpoint = Partial<Record<number, UiAnimateState>>;

export type UiStates = Partial<Record<Partial<StyleStates>, UiClassName>>;
export type UiInput = Partial<
  Record<StyleStates | 'default', Partial<Record<InputSelector, string>>>
>;
export type UiInputBreakpoint = Partial<Record<number, UiInput>>;
export const uiSpacingAttributes = ['w', 'h', 'p', 'm'] as const;
export type UiSpacingAttributes = (typeof uiSpacingAttributes)[number];
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
