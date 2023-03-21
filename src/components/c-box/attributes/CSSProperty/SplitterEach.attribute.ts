import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';

export class SplitterEachAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const stylesheet = this.box.shadowRoot!.styleSheets[0];
    const selectorText = `:host([${this.attr}])`;

    const indexSelector = findCssRuleIndex(stylesheet!, selectorText);
    if (typeof indexSelector === 'number') {
      stylesheet?.deleteRule(indexSelector);
    }

    let cssText = '';

    const attrs = this.value.split(' ');
    for (let index = 0; index < attrs.length; index++) {
      cssText = cssText + `--${this.attr}-attr-${index}:${attrs[index]};`;
    }

    stylesheet.insertRule(`${selectorText}{${cssText}}`, 0);
  }
}
