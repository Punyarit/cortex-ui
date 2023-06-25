import { ThemeVariable } from "../types/theme.types"

export function generateColorStyleText(themeObj: ThemeVariable) {
  let cssOutput = '';

  for (const [theme, value] of Object.entries(themeObj)) {
    cssOutput += `cx-theme.${theme} { ${value} } `;
  }

  return cssOutput;
}