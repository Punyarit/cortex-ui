export class ThemeSingleton {
  private static instance: ThemeSingleton;

  public static ref: CXTheme.Ref;
  constructor(CxThemeRef: CXTheme.Ref) {
    if (!ThemeSingleton.ref) {
      ThemeSingleton.ref = CxThemeRef;
    }

    if (ThemeSingleton.instance) {
      return ThemeSingleton.instance;
    }
    ThemeSingleton.instance = this;
  }
}
