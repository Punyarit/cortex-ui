import { PopoverState } from '../../modal/state/popover-state/popover.state';

export const PopoverModalSlotPrefix = 'cx-popover-modal';

export const popoverPositions = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'left-top',
  'left-center',
  'left-bottom',
  'right-top',
  'right-center',
  'right-bottom',
] as const;

export type PopoverPositionType = typeof popoverPositions[number];

export type PopoverContent = HTMLElement & { popoverState?: PopoverState };
