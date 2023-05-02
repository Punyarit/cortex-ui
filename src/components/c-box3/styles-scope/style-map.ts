import { stylesMapper } from '../styles-mapper/styles-mapper';
import { StyleStates } from '../types/c-box.types';

export class StyleMap {
  static async style(styles: string | string[], box: CBox.Ref, state?: StyleStates) {
    box.styleMap ||= {};
    box.styleMap[state || 'default'] = {};

    this.generateDynamicStyles(styles, box, state);

    if (state === 'toggle') {
      (await import('../styles-scope/styles-toggle')).StyleToggle.handle(box, 'style');
    }

    // generate style text
    box.styleMapCSSResult = box.styleMap ? Object.values(box.styleMap).join('') : '';

    box.updateStyles();
  }

  static generateDynamicStyles(
    styleValue: string | string[],
    box: CBox.Ref,
    state?: StyleStates
  ): void {
    let cssText: string[] = [];
    if (Array.isArray(styleValue)) {
      for (let index = 0; index < styleValue.length; ++index) {
        cssText[index] = this.createCssText(styleValue[index]);
      }
    } else {
      cssText[0] = this.createCssText(styleValue);
    }

    (box.styleMap as any)[state || 'default'] = `:host${
      state === 'toggle' ? '([style-toggle])' : state ? `(:${state})` : ''
    }{${cssText.join('')}}`;
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
