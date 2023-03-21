import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';

export class VariableAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const styleSheet = this.box.shadowRoot?.styleSheets[0];
    const selectorText = `:host([${this.attr}])`;
    const indexSelector = findCssRuleIndex(styleSheet!, selectorText);
    if (typeof indexSelector === 'number') {
      styleSheet?.deleteRule(indexSelector);
    }
    styleSheet?.insertRule(`${selectorText}{--${this.attr}:var(--${this.value})}`);
  }
}
