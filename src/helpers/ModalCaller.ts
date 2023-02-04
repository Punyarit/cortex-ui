import { ChooseLangCaller } from './functions/modal-callers/chooseLang.caller';
import { DecideCaller } from './functions/modal-callers/dialog.caller';
import { SnackbarCaller } from './functions/modal-callers/snackbar.caller';

export class ModalCaller {
  static snackbar(config: CXSnackbar.Set) {
    return new SnackbarCaller(config);
  }

  static decide() {
    return new DecideCaller();
  }

  static chooseLang() {
    return new ChooseLangCaller();
  }
}
