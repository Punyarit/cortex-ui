import { CxButtonName } from '../components/button/types/button.name';
import { CxDialogName } from '../components/dialog/types/dialog.name';
import { CxIconName } from '../components/icon/types/icon.name';
import { CxModalName } from '../components/modal/types/modal.name';
import { CxPopoverName } from '../components/popover/types/popover.name';
import { CxProgressName } from '../components/progress/types/progress.name';
import { CxSnackbarName } from '../components/snackbar/types/snackbar.name';
import { CxSpinnerName } from '../components/spinner/types/spinner.name';
import { CxThemeName } from '../components/theme/types/theme.name';
import { CxTransitionName } from '../components/transition/types/transition.name';

export const componentNames = [
  CxButtonName,
  CxDialogName,
  CxIconName,
  CxModalName,
  CxPopoverName,
  CxProgressName,
  CxSnackbarName,
  CxSpinnerName,
  CxThemeName,
  CxTransitionName,
] as const;

export type ComponentNameTypes = (typeof componentNames)[number];
