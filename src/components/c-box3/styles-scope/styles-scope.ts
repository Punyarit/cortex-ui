import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class StylesScope {
  static scope(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    // Convert input value to an array of styles
    const styles = StylesScope.getStylesArray(value);
    // Create dynamic styles
    StylesScope.generateDynamicStyles(styles, box, state);

    // Add classes to element
    const className = state ? box?.uiStates?.[state] : box.uiStyles;
    box.uiClassNames ||= {};
    box.uiClassNames[state ? state : 'ui'] = Object.keys(className!);
    if (state !== 'toggle') {
      box.className = Array.from(new Set(Object.values(box.uiClassNames).flat())).join(' ');
    } else {
      // note when use ui-toggle the limitation is cant use onmouseup
      box.onmouseup = () => {
        for (let index = 0; index < box.uiClassNames!.toggle.length; index++) {
          box.classList.toggle(box.uiClassNames!.toggle[index]);
        }
      };
    }
    box.updateStyles();
  }

  static getStylesArray(value: string | string[]): string[] {
    if (typeof value === 'string') {
      return value.split(',').map((style) => style.trim());
    } else if (Array.isArray(value)) {
      return value;
    } else {
      throw SyntaxError('UI properties can only have a type of string or string[].');
    }
  }

  static generateDynamicStyles(styles: string[], box: CBox.Ref, state?: StyleStates): void {
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

        if (state && box?.uiStates?.[state]) {
          (box.uiStates as any)[state][className] = `:host(.${className}${
            state !== 'toggle' ? `:${state}` : ''
          }){${cssText}}`;
        } else if (box?.uiStyles) {
          box.uiStyles[className] = `:host(.${className}){${cssText}}`;
        }
      }
    }
  }
}
