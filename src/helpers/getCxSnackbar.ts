import { SnackbarSingleton } from '../components/snackbar/singleton/snackbar.singleton';

export function getCxSnackbarRef(): CXSnackbar.Ref | null {
  return SnackbarSingleton.CxSnackbarRef;
}
