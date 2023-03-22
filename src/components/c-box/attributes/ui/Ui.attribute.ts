import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { stylesMapper } from '../../styles-mapper/styles-mapper';

export class UIAttribute {
  constructor(private attr: string, private box: HTMLElement, private value: string) {}
  init() {
    const styles = this.value.split(',').map((style) => style.trim());

    for (const style of styles) {
      const [uiName, uiStyle] = style.split(':').map((s) => s.trim());

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
          const styleSheet = this.box.shadowRoot?.styleSheets[0];
          const selectorText = `:host([_${this.attr}~="${uiName}"])`;

          const indexSelector = findCssRuleIndex(styleSheet, selectorText);
          if (typeof indexSelector === 'number') {
            styleSheet?.deleteRule(indexSelector);
          }

          const rule = `${selectorText}{${styleText}}`;
          styleSheet?.insertRule(rule, 0);
        }
      }
    }

    const uiAttrValue = styles.map((s) => s.split(':')[0].trim()).join(' ');
    this.box.setAttribute(`_${this.attr}`, uiAttrValue);
    this.box.removeAttribute(this.attr);
  }
}
