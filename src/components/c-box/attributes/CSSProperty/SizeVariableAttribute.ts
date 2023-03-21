import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';

export class SizeVariableAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const stylesheet = this.box.shadowRoot?.styleSheets[0];
    const selectorText = `:host([${this.attr}])`;
    const indexSelector = findCssRuleIndex(stylesheet!, selectorText);
    if (typeof indexSelector === 'number') {
      stylesheet?.deleteRule(indexSelector);
    }
    stylesheet?.insertRule(`${selectorText}{--${this.attr}:var(--size-${this.value})}`);
  }
}
