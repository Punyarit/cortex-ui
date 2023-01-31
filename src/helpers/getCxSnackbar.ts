import { SnackbarSingleton } from '../components/materials/snackbar/singleton/snackbar.singleton';

export function getCxSnackbarRef(): CXSnackbar.Ref | null {
  return SnackbarSingleton.CxSnackbarRef;
}
