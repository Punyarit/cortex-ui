import { createAndInjectStyle } from './helpers/createAndInjectStyle';
import { generateColorStyleText } from './helpers/generateColorStyleText';
import generateComponentId from './helpers/generateComponentId';
import { getAccessibleClassName } from './helpers/getAccessibleClassName';
import { getCssVariableResult } from './helpers/getCssVariableResult';
import { getScreenStyleResult } from './helpers/getScreenStyleResult';
import { initDefaultStyle } from './helpers/initDefaultStyle';
import { parseStyle } from './helpers/parseStyle';
import { StyleProperty, ThemeVariable } from './types/theme.types';

initDefaultStyle();
export const mappedStyle = new Map();

// Cortex Style
export const style = <T extends string>(styleAbbr: TemplateStringsArray): StyleProperty<T> => {
  const style = document.createElement('style');
  const { hashedClasses, styleResult, screenStyleResult, cssVariablesResult } = parseStyle(
    styleAbbr[0]
  );

  const variableResult = getCssVariableResult(cssVariablesResult);
  const { screenAccessibleClass, screenCssText } = getScreenStyleResult(
    screenStyleResult,
    hashedClasses
  )!;
  const cssTextResult = [...styleResult, ...screenCssText!, variableResult].join('');
  
  style.textContent = cssTextResult;
  const styleId = generateComponentId(cssTextResult);

  mappedStyle.set(styleId, style);

  createAndInjectStyle(cssTextResult, styleId, style);
  const accessibleClassName = getAccessibleClassName({
    ...hashedClasses,
    ...screenAccessibleClass,
  });

  return { ...accessibleClassName, style } as StyleProperty<T>;
};

// CX-Theme
export class Theme extends HTMLElement {
  public static color: ThemeVariable = {};
  public static font?: ThemeVariable;
  public static fsDisplay = '1';
  public static screen?: ThemeVariable;
  public static variable = ``;

  constructor() {
    super();
    const colorStyleText = generateColorStyleText(Theme.color);
    const variableStyleText = `cx-theme{${Theme.variable}}`;
    const themeSTyle = colorStyleText + variableStyleText;
    createAndInjectStyle(themeSTyle, 'initial-theme');
  }
}
customElements.define('cx-theme', Theme);

// CX-DIV
export class Div extends HTMLElement {}
customElements.define('cx-div', Div);
