export class ThemeSingleton {
  private static instance: ThemeSingleton;

  public static CxThemeRef: CXTheme.Ref;
  constructor(CxThemeRef: CXTheme.Ref) {
    if (!ThemeSingleton.CxThemeRef) {
      ThemeSingleton.CxThemeRef = CxThemeRef;
    }

    if (ThemeSingleton.instance) {
      return ThemeSingleton.instance;
    }
    ThemeSingleton.instance = this;
  }
}
