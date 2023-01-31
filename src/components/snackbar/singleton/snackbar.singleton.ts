export class SnackbarSingleton {
  private static instance: SnackbarSingleton;

  public static CxSnackbarRef: CXSnackbar.Ref;
  constructor(CxSnackbarRef: CXSnackbar.Ref) {
    if (!SnackbarSingleton.CxSnackbarRef) {
      SnackbarSingleton.CxSnackbarRef = CxSnackbarRef;
    }

    if (SnackbarSingleton.instance) {
      return SnackbarSingleton.instance;
    }
    SnackbarSingleton.instance = this;
  }
}
