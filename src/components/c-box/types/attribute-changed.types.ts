export const CBoxPopover = ['popover-close-button'] as const;
export type CBoxPopoverType = typeof CBoxPopover[number];
export type PopoverAbilitiesType = Record<typeof attributeChnged[number], () => void>;

export const attributeChnged = [...CBoxPopover] as const;
export type AttributeChngedType = typeof attributeChnged[number];
