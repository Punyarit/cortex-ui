export class DecideDialogSingleton {
  private static instance: DecideDialogSingleton;

  public static ref: CXDecideDialog.Ref;

  constructor(CxDecideDialogRef: CXDecideDialog.Ref) {
    if (!DecideDialogSingleton.ref) {
      DecideDialogSingleton.ref = CxDecideDialogRef;
    }

    if (DecideDialogSingleton.instance) {
      return DecideDialogSingleton.instance;
    }
    DecideDialogSingleton.instance = this;
  }
}
