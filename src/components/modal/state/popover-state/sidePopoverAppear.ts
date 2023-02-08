export const sidePopover = ['center', 'left', 'right', 'top', 'bottom'] as const;

export type SidePopoverType = typeof sidePopover[number];
