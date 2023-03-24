export const padding = ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr'] as const;
export const observer = ['visible'] as const;
export type ObserverType = typeof observer[number];
export const margin = ['m', 'mx', 'my', 'mt', 'mb', 'ml', 'mr'] as const;
export const widthHeight = ['w', 'min-w', 'max-w', 'h', 'min-h', 'max-h'] as const;
export const position = ['position', 'left', 'top', 'right', 'bottom', 'z-index'] as const;
export const display = [
  'display',
  'visibility',
  'user-select',
  'whitespace',
  'cursor',
  'transition',
] as const;
export const flex = [
  'flex-direction',
  'flex-grow',
  'flex-shrink',
  'flex-wrap',
  'flex-basis',
  'order',
] as const;
export const text = ['tx-overflow', 'tx-transform', 'tx'] as const;
export const overflow = ['overflow', 'overflow-x', 'overflow-y', 'overflow-y'] as const;
export const border = [
  'border',
  'border-left',
  'border-right',
  'border-top',
  'border-bottom',
  'round',
  'outline',
] as const;
export const gap = ['row-gap', 'col-gap'] as const;
export const color = ['bg', 'tx', 'shadow', 'opacity'] as const;

export const utilsAttributes = [
  ...padding,
  ...margin,
  ...widthHeight,
  ...color,
  ...gap,
  ...position,
  ...display,
  ...text,
  ...border,
  ...flex,
  ...overflow,
  ...observer,
] as const;
export type UtilsAttributeType = typeof utilsAttributes[number];

export const CBoxPopoverAttributes = ['popover-close-button'] as const;
export const CBoxIconAttributes = [
  'icon-prefix',
  'icon-suffix',
  'icon-prefix-active',
  'icon-suffix-active',
  'icon-prefix-focus',
  'icon-suffix-focus',
  'icon-prefix-focus-within',
  'icon-suffix-focus-within',
  'icon-prefix-focus-visible',
  'icon-suffix-focus-visible',
  'icon-prefix-hover',
  'icon-suffix-hover',
  'icon-prefix-target',
  'icon-suffix-target',
  'icon-prefix-toggle',
  'icon-suffix-toggle',
] as const;

export const uiStylingAttributes = [
  'ui',
  'ui-active',
  'ui-focus',
  'ui-focus-visible',
  'ui-focus-within',
  'ui-hover',
  'ui-target',
  'ui-toggle',
] as const;
export type CBoxPopoverType = typeof CBoxPopoverAttributes[number];
export type PopoverAbilitiesType = Record<typeof attributeChanged[number], () => void>;

export const uiStates = [
  'active',
  'focus',
  'focus-within',
  'focus-visible',
  'hover',
  'target',
] as const;
export type UiStateType = typeof uiStates[number];

export const attributeChanged = [
  ...CBoxPopoverAttributes,
  ...CBoxIconAttributes,
  ...utilsAttributes,
  ...uiStylingAttributes,
] as const;
export type AttributeChangedType = typeof attributeChanged[number];

export type OnToggleStatus = Record<'setToggleStatus', (status: ToggleStatus) => void>;
export type ToggleStatus = 'default' | 'toggled';
export type ToggleAttrStatus = Record<'bg-toggle' | 'tx-toggle', ToggleStatus>;

export type CBoxWithToggle = CBox.Ref & ToggleAttrStatus & OnToggleStatus;

export type CBoxUiAttribute = CBox.Ref & {
  scopedCache?: Map<string, [string, number]>;
  uiToggled?: boolean;
  iconToggled?: boolean;
  uiCache?: { [value: string]: unknown };
  uiName?: string;
  variableCache?: Map<string, number>;
  valueCache?: Map<string, unknown>;
};

// to fix
// const abbrStyleMapper = new Map([
//   ['h', 'height'],
//   ['w', 'width'],
// ]);
