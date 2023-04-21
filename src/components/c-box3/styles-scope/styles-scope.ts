import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class StylesScope {
  static async scope(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    if (state) {
      box.uiStates ||= {};
      box.uiStates[state] ||= {};
    }
    const styles = this.getStylesArray(value);
    this.generateDynamicStyles(styles, box, state);

    box.uiClassNames ||= {};
    box.uiClassNames[state ? state : 'ui'] = Object.keys(
      (state ? box?.uiStates?.[state] : box.uiStyles)!
    );

    if (state === 'toggle') {
      (await import('../styles-scope/styles-toggle')).StyleToggle.handle(box, 'ui');
    }
    box.className = Array.from(new Set(Object.values(box.uiClassNames).flat())).join(' ');

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
    for (const style of styles) {
      const [className, styleValue] = style.split(':').map((s) => s.trim());
      if (className && styleValue) {
        const cssText = this.createCssText(styleValue);

        if (state && box?.uiStates?.[state]) {
          (box.uiStates as any)[state][className] = `:host(.${className}${
            state === 'toggle' ? '[ui-toggle]' : state ? `:${state}` : ''
          }){${cssText}}`;
        } else if (box?.uiStyles) {
          box.uiStyles[className] = `:host(.${className}){${cssText}}`;
        }
      }
    }
  }

  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
