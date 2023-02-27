export const padding = ['p', 'px', 'py', 'pt', 'pb', 'pl', 'pr'] as const;
export const margin = ['m', 'mx', 'my', 'mt', 'mb', 'ml', 'mr'] as const;
export const widthHeight = ['w', 'min-w', 'max-w', 'h', 'min-h', 'max-h'] as const;
export const gap = ['row-gap', 'col-gap'] as const;
export const color = [
  'bg-color',
  'tx-color',
  'tx-hover',
  'bg-hover',
  'tx-active',
  'bg-active',
  'bg-focus',
  'tx-focus',
] as const;
export const utilsAttributes = [...padding, ...margin, ...widthHeight, ...color, ...gap] as const;
export type UtilsAttributeType = typeof utilsAttributes[number];

export const CBoxPopoverAttributes = ['popover-close-button'] as const;
export const CBoxIconAttributes = [
  'icon-prefix',
  'icon-suffix',
  'icon-color',
  'icon-size',
] as const;

export type CBoxPopoverType = typeof CBoxPopoverAttributes[number];
export type PopoverAbilitiesType = Record<typeof attributeChnged[number], () => void>;

export const attributeChnged = [
  ...CBoxPopoverAttributes,
  ...CBoxIconAttributes,
  ...utilsAttributes,
] as const;
export type AttributeChangedType = typeof attributeChnged[number];
