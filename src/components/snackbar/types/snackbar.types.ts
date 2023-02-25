export const snackbarModalSlot = 'global-snackbar';
export type SnackbarModalSlot = typeof snackbarModalSlot;
export const snackbarDurationDefault = 3500;

export const snackbarPosition = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const;

export type SnackbarPositionType = typeof snackbarPosition[number];
export const snackbarPositionClass = snackbarPosition.map((position) => `snackbar-${position}`);

export type SnackbarClassPositionType = `snackbar-${SnackbarPositionType}`;
