export const positionReversed = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const;

export type PositionType = keyof typeof positionReversed;
