import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { stylesMapper } from '../../styles-mapper/styles-mapper';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';
import { ScopedStyles } from '../ScopedStyles';
export class UIAttribute {
  constructor(private attr: string, private box: CBoxUiAttribute, private value: string) {}
  init() {
    ScopedStyles.set();
    if (!this.value) return;
    const styles = this.value?.split(',')?.map((style) => style.trim());

    for (const style of styles) {
      const [uiName, uiStyle] = style?.split(':').map((s) => s.trim());

      if (uiName && uiStyle) {
        const styleText = uiStyle
          .split(' ')
          .filter(Boolean)
          .map((s) => {
            const styleProp = stylesMapper.get(`c-box[${s.replace('!', '').trim()}]`);
            return styleProp ? `${styleProp}${s.endsWith('!') ? '!important' : ''};` : '';
          })
          .join('');

        if (styleText) {
          if (!this.box.scopedCache) {
            this.box.scopedCache = new Map();
          }
          let selectorText: string | undefined;

          if (this.box.scopedCache.has(uiName)) {
            selectorText = this.box.scopedCache.get(uiName)?.[0];
          } else {
            if (this.box.scopedCache.size) {
              selectorText = `c-box[_${this.attr}~="${uiName}"][c${
                this.box.scopedCache.values().next().value[1]
              }]`;
            } else {
              selectorText = `c-box[_${this.attr}~="${uiName}"][c${ScopedStyles.counter}]`;
              this.box.setAttribute(`c${ScopedStyles.counter}`, '');
              this.box.scopedCache.set(uiName, [selectorText, ScopedStyles.counter]);
              ScopedStyles.counter++;
            }
          }

          const indexSelector = findCssRuleIndex(ScopedStyles.sheet, selectorText!);
          if (typeof indexSelector === 'number') {
            ScopedStyles.sheet?.deleteRule(indexSelector);
          }

          const rule = `${selectorText}{${styleText}}`;
          ScopedStyles.sheet?.insertRule(rule, 0);
        }
      }
    }

    const uiAttrValue = styles.map((s) => s.split(':')[0].trim()).join(' ');
    this.box.setAttribute(`_${this.attr}`, uiAttrValue);
    this.box.removeAttribute(this.attr);
  }
}
