import { cssMap } from './cssMap';
import { getStyleCaseResult } from './getStyleCaseResult';

export function parseCSS(box: HTMLElement, css: string): { [key: string]: string } {
  let cssDict: { [key: string]: string } = {};
  let lines = css.split('\n'); // splitting the css string into lines

  for (let index1 = 0; index1 < lines.length; ++index1) {
    const line = lines[index1].trim();
    if (line.length) {
      let [selector, styles] = line.split(' : ');

      if (selector.startsWith('@variable')) {
        // const [, variable] = selector.split(':');
        // (box as any)[variable] = styles.slice(0, -1);
        // Object.defineProperty(box, variable.slice(1), {
        //   set: (val: string) => {
        //     box.style.setProperty(`--${variable}`, val);
        //   },
        // });
      } else {
        if (selector.startsWith('@keyframes')) {
          const keyframes = styles.split(';');
          let styleText = ``;
          for (let index2 = 0; index2 < keyframes.length; index2++) {
            const keyframe = keyframes[index2];
            if (keyframe) {
              const [duration, styleAbbr] = keyframe.split(': ');
              styleText += `${duration}{${getStyleResult(box, styleAbbr, selector)}}`;
            }
          }
          cssDict[selector.replace(':$', ' ')] = styleText;
        } else {
          // remove the trailing semicolon if it exists
          if (styles.endsWith(';')) {
            styles = styles.slice(0, -1).trim();
          }
          let styleText = '';
          // get styles
          const styleSplit = styles.split(' ');
          for (let index2 = 0; index2 < styleSplit.length; index2++) {
            styleText += `${getStyleResult(box, styleSplit[index2], selector)}`;
          }
          cssDict[selector] = styleText; // add the selector and styles to the dictionary
        }
      }
    }
  }

  return cssDict;
}

function getStyleResult(box: HTMLElement, styleAbbr: string, selector: string) {
  if (styleAbbr.startsWith('$')) {
    const variable = styleAbbr.slice(1);
    const [cssProperty, cssValue] = ((box as any)[styleAbbr] as string).split(':');
    box.style.setProperty(`--${variable}`, cssValue);
    return `${cssProperty}:var(--${variable});`;
  } else {
    return (cssMap[styleAbbr] || getStyleValueResult(styleAbbr)) + ';';
  }
}

function getStyleValueResult(styleAbbr: string) {
  const [s1, s2, s3, s4, s5, s6] = styleAbbr.split('-');
  return `${getStyleCaseResult(styleAbbr, s1, s2, s3, s4, s5, s6)}`;
}
