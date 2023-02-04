import { ChooseLangDialogCaller } from './functions/modal-callers/choose-lang-dialog.caller';
import { DecideDialogCaller } from './functions/modal-callers/decide-dialog.caller';
import { SnackbarCaller } from './functions/modal-callers/snackbar.caller';
import '../components/snackbar/snackbar';
import '../components/dialog/templates/decide-dialog/decide-dialog';
export class ModalCaller {
  static snackbar(config: CXSnackbar.Set) {
    return new SnackbarCaller(config);
  }

  static decideDialog(config: CXDecideDialog.Set) {
    return new DecideDialogCaller(config);
  }

  static chooseLangDialog() {
    return new ChooseLangDialogCaller();
  }
}
