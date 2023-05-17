import { InitialShadow } from '../helpers/initial-shadow';
import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-div.types';

export class StylesScope {
  static async scope(value: string | string[], box: CXDiv.Ref, state?: StyleStates) {
    InitialShadow.init(box);

    if (state) {
      box.classStateMap ||= {};
      box.classStateMap[state] = {};
    } else {
      box.classMap = {};
    }

    const styles = this.getStylesArray(value);
    this.generateDynamicStyles(styles, box, state);

    box.classNames ||= {};
    box.classNames[state ? state : 'ui'] = Object.keys(
      (state ? box?.classStateMap?.[state] : box.classMap)!
    );

    if (state === 'toggle') {
      (await import('../helpers/toggle-event')).StyleToggle.handle(box, 'class');
    }

    box.className = Array.from(new Set(Object.values(box.classNames).flat())).join(' ');

    // generate style text
    box.classCSSResult = box.classMap ? Object.values(box.classMap).join('') : '';
    box.classStateCSSResult = box.classStateMap
      ? Object.values(box.classStateMap)
          .flatMap((states) => Object.values(states))
          .join('')
      : '';

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

  static generateDynamicStyles(styles: string[], box: CXDiv.Ref, state?: StyleStates): void {
    for (const style of styles) {
      const [className, styleValue] = style.split(':').map((s) => s.trim());
      if (className && styleValue) {
        const cssText = this.createCssText(styleValue);

        if (state && box?.classStateMap?.[state]) {
          (box.classStateMap as any)[state][className] = `:host(.${className}${
            state === 'toggle' ? '[class-toggle]' : state ? `:${state}` : ''
          }){${cssText}}`;
        } else if (box?.classMap) {
          box.classMap[className] = `:host(.${className}){${cssText}}`;
        }
      }
    }
  }

  static createCssText(styleValue: string): string {
    return styleValue
      .split(' ')
      .filter(Boolean)
      .map((s) => {
        const styleProp = stylesMapper.get(`c-div[${s.replace('!', '').trim()}]`);
        return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
      })
      .join('');
  }
}
