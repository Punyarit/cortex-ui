import { SnackbarSingleton } from '../../../components/snackbar/singleton/snackbar.singleton';
import { ModalSingleton } from '../../../components/modal/singleton/modal.singleton';

export class SnackbarCaller {
  constructor(public config: CXSnackbar.Set) {}
  open() {
    SnackbarSingleton.ref.setSnackbarAppear();
    ModalSingleton.ref.openSnackbar(
      'global-snackbar',
      this.config?.duration || (SnackbarSingleton.ref.set.duration as number)
    );
  }
}
