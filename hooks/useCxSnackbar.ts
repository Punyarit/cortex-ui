import { getCxModalRef } from '../helpers/getCxModalRef';
import { getCxSnackbarRef } from '../helpers/getCxSnackbar';

export function useCxSnackbar(config: CXSnackbar.Set) {
  const CxModalRef = getCxModalRef();
  const CxSnackbar = getCxSnackbarRef();

  if (!CxModalRef || !CxSnackbar) return;
  CxSnackbar.fix.text(config.text).iconSrc(config.iconSrc).exec();
  CxSnackbar.open();
  CxModalRef.openSnackbar('global-snackbar', config?.duration || (CxSnackbar.set.duration as number));
}
