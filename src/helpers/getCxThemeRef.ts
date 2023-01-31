import {ThemeSingleton} from '../components/theme/singleton/theme.singleton';

export function getCxThemeRef(): CXTheme.Ref | null {
  return ThemeSingleton.CxThemeRef;
}
