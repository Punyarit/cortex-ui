import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class SlotMap {
  static async map(value: string | string[], box: CBox.Ref, state?: StyleStates) {
    box.slotMap ||= {};
    box.slotMap[state || 'default'] = {};
    const styles = this.getStylesArray(value);

    this.generateDynamicStyles(styles, box, state);

    if (state === 'toggle') {
      (await import('./styles-toggle')).StyleToggle.handle(box, 'slot');
    }

    // generate style text
    box.slotMapCSSResult = box.slotMap
      ? Object.values(box.slotMap)
          .flatMap((res) => Object.values(res!))
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

  static generateDynamicStyles(
    styles: string | string[],
    box: CBox.Ref,
    state?: StyleStates
  ): void {
    for (const style of styles) {
      const [selector, styleValue] = style.split(': ').map((s) => s.trim());
      if (selector && styleValue) {
        const cssText = this.createCssText(styleValue);

        (box.slotMap as any)[state || 'default'][selector] = `${
          state === 'toggle' ? ':host([slot-toggle])' : state ? `:host(:${state})` :''
        } ::slotted(${selector}){${cssText}}`;
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
