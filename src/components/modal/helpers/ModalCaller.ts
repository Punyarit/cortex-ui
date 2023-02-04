import { ChooseLangCaller } from './callers/chooseLang.caller';
import { DecideCaller } from './callers/dialog.caller';
import { SnackbarCaller } from './callers/snackbar.caller';

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
