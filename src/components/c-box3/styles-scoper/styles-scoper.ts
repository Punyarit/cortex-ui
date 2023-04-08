import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class StylesScoper {
  static scope(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    // assign styles and check type
    let styles: string[];
    if (typeof value === 'string') {
      styles = value?.split(',')?.map((style) => style.trim());
    } else if (Array.isArray(value)) {
      styles = value;
    } else {
      throw SyntaxError('UI properties can only have a type of string or string[].');
    }

    // create dynamic style
    let classNames = '';
    for (let index = 0; index < styles.length; ++index) {
      const [className, style] = styles[index].split(':').map((s) => s.trim());
      if (className && style) {
        const cssText = style
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        classNames += (classNames ? ' ' : '') + className;
        if (state && box?.uiStates?.[state]) {
          (box.uiStates as any)[state][className] = `:host(.${className}:${state}){${cssText}}`;
        } else if (box?.uiStyles) {
          box.uiStyles[className] = `:host(.${className}){${cssText}}`;
        }
      }
    }

    // add classes to element
    box.className = classNames;
    box.updateStyles();
  }
}
