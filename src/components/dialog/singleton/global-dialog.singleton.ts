export class GlobalDialogSingleton {
  private static instance: GlobalDialogSingleton;

  public static ref: CXDialog.Ref;
  constructor(CxDialogRef: CXDialog.Ref) {
    if (!GlobalDialogSingleton.ref) {
      GlobalDialogSingleton.ref = CxDialogRef;
    }

    if (GlobalDialogSingleton.instance) {
      return GlobalDialogSingleton.instance;
    }
    GlobalDialogSingleton.instance = this;
  }
}
