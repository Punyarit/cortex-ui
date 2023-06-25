import { styleMap } from './styleMap';
import { getStyleLookupResult } from './getStyleLookupResult';
import { Theme } from '../theme';
import { HashedClass, ParsedStye } from '../types/theme.types';
import generateHashedClass from './generateComponentId';
import { NoScreenError } from './NoScreenError';

export function parseStyle(stylesAbbr: string): ParsedStye {
  const { groups, scope } = groupStyles(stylesAbbr);
  const styleResult: string[] = [];
  const screenStyleResult: HashedClass = {};
  const hashedClasses: HashedClass = {};
  const cssVariablesResult: string[] = [];

  for (let index = 0; index < groups.length; ++index) {
    const styleAbbr = groups[index];
    if (styleAbbr.startsWith('$')) {
      const [variable, styleAbbrValue] = splitVariable(styleAbbr);
      const styleAbbrTrim = styleAbbrValue.trim();

      if (styleAbbrTrim.startsWith('.')) {
        // is screen
        const screenResult = getScreenResult(variable, styleAbbrTrim, scope);
        for (const screenResultClassName in screenResult) {
          screenStyleResult[screenResultClassName] = screenResult[screenResultClassName];
        }
      } else if (styleAbbrTrim.startsWith('0%') || styleAbbrTrim.startsWith('from')) {
        // is animation
        const styleText = getAnimationResult(styleAbbrTrim.split(';'));
        styleResult[index] = `@keyframes ${variable.slice(1)}{${styleText}}`;
      } else {
        // is variable
        cssVariablesResult[index] = getVariableResult(variable.slice(1), styleAbbrValue);
      }
    } else {
      //  in class
      const { className, cssProperties, hashedClass, mergedClass, selectorSplitted } =
        getStyleTextFromClass(styleAbbr, scope);
      hashedClasses[className] = { hashedClass, mergedClass };
      const selector = selectorSplitted || '';

      styleResult[index] = `.${mergedClass}${selector}{${cssProperties.join('')}}`;
    }
  }

  return {
    styleResult,
    hashedClasses,
    screenStyleResult,
    cssVariablesResult,
  };
}

function splitClassNameAndSelector(classNameWithSelector: string) {
  const regex = /(.*?)([>\s~+]|::|:)(.*)/;
  const match = classNameWithSelector.trim().match(regex);

  if (match) {
    return [match[1], match[2] + match[3]];
  }

  return [classNameWithSelector]; // if no match, return the original string as is
}
function getStyleTextFromClass(styleAbbr: string, scope: string) {
  let cssProperties: Array<string | undefined> = [];
  const [selector, styleAbbrResult] = styleAbbr.split(': ');
  const [className, selectorSplitted] = splitClassNameAndSelector(selector);
  const classNameTrim = className.trim().slice(1);
  console.log('parseStyle.js |classNameTrim| = ', classNameTrim);
  const styleAbbrResultTrim = styleAbbrResult.trim();
  const styleAbbrResultSplitted = styleAbbrResultTrim.split(' ');

  for (let index = 0; index < styleAbbrResultSplitted.length; index++) {
    const styleAbbrResultSplittedValue = styleAbbrResultSplitted[index];
    cssProperties[index] = getStyleResult(styleAbbrResultSplittedValue);
  }

  const cssRule = `${classNameTrim}{${cssProperties.join('')}}`;
  const hashedClass = generateHashedClass(cssRule);
  const mergedClass = `${classNameTrim}__${hashedClass}`;
  return {
    cssProperties,
    className: classNameTrim,
    hashedClass,
    mergedClass,
    selectorSplitted,
  };
}

function getScreenResult(variable: string, styleAbbrTrim: string, scope: string) {
  const screenValue = getThemeScreenValue(variable.slice(1));
  const styleAbbrSplit = styleAbbrTrim.split(';');
  const hashedClassValue: HashedClass = {};

  for (let styleAbbrIndex = 0; styleAbbrIndex < styleAbbrSplit.length; styleAbbrIndex++) {
    const styleAbbr = styleAbbrSplit[styleAbbrIndex];
    if (styleAbbr) {
      const { cssProperties, className, hashedClass, mergedClass, selectorSplitted } =
        getStyleTextFromClass(styleAbbr, scope);
      const selector = selectorSplitted || '';
      const cssRule = `.${className}${selector}{${cssProperties.join('')}}`;
      const cssText = `@media only screen and ${screenValue}{${cssRule}}`;
      hashedClassValue[mergedClass] = { hashedClass, mergedClass, cssText, classRef: className };
    }
  }

  return hashedClassValue;
}

function getThemeScreenValue(variable: string) {
  if (!Theme.screen || !Theme.screen[variable]) NoScreenError(variable);
  return Theme.screen?.[variable];
}

function getStyleValueResult(styleAbbr: string) {
  const [s1, s2, s3, s4] = styleAbbr.split('-');
  return `${getStyleLookupResult(styleAbbr, s1, s2, s3, s4)}`;
}

function getStyleResult(styleAbbr: string) {
  const styleAbbrVal = styleAbbr.replace(';', '');
  if (styleAbbrVal.startsWith('$')) {
  } else {
    return (styleMap[styleAbbrVal] || getStyleValueResult(styleAbbrVal)) + ';';
  }
}

function getAnimationResult(keyframes: string[]) {
  let styleText: string[] = [];

  for (let index = 0; index < keyframes.length; index++) {
    const keyframe = keyframes[index];
    if (keyframe) {
      const [duration, styleAbbr] = keyframe.split(': ');
      styleText[index] = `${duration}{${getStyleResult(styleAbbr)}}`;
    }
  }

  return styleText.join('');
}

function getVariableResult(variable: string, styleAbbrValue: string) {
  const [cssProperty, cssValue] = styleAbbrValue.split(':');
  return `--${variable}:${cssValue}`;
}

function groupStyles(inputString: string) {
  const lines = inputString.split('\n');
  let currentGroup = '';
  let groups = [];
  let scope = ``;

  for (let line of lines) {
    const trimmedLine = line.trim();
    // if the line is not empty or indented
    if (trimmedLine && !line.startsWith('    ')) {
      if (trimmedLine.startsWith('scope')) {
        scope = trimmedLine.slice(6).trim();
      } else {
        if (currentGroup) {
          groups.push(currentGroup.replace(/\s+$/g, '')); // add current group to groups
        }
        currentGroup = trimmedLine; // start a new group
      }
    } else if (trimmedLine) {
      currentGroup += ' ' + trimmedLine; // append to current group
    }
  }

  // append the last group if it's not empty
  if (currentGroup) {
    groups.push(currentGroup.replace(/\s+$/g, ''));
  }

  return { groups, scope };
}

function splitVariable(s: string) {
  let index = s.indexOf(':');
  return [s.slice(0, index), s.slice(index + 1)];
}
