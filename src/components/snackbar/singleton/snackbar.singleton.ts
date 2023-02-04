export class SnackbarSingleton {
  private static instance: SnackbarSingleton;

  public static ref: CXSnackbar.Ref;
  constructor(CxSnackbarRef: CXSnackbar.Ref) {
    if (!SnackbarSingleton.ref) {
      SnackbarSingleton.ref = CxSnackbarRef;
    }

    if (SnackbarSingleton.instance) {
      return SnackbarSingleton.instance;
    }
    SnackbarSingleton.instance = this;
  }
}
