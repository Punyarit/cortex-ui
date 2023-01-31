import { ThemeSingleton } from '../components/materials/theme/singleton/theme.singleton';

export function getCxThemeRef(): CXTheme.Ref | null {
  return ThemeSingleton.CxThemeRef;
}
