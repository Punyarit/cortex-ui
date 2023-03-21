import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';

export class SplitterAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}
  init() {
    const stylesheet = this.box.shadowRoot?.styleSheets[0];
    const selectorText = `:host([${this.attr}])`;
    const indexSelector = findCssRuleIndex(stylesheet!, selectorText);
    if (typeof indexSelector === 'number') {
      stylesheet?.deleteRule(indexSelector);
    }
    const [size, source, color] = this.value.split(' ');

    stylesheet!.insertRule(
      `${selectorText}{--${this.attr}:${source};--${this.attr}-size:var(--size-${size});--${this.attr}-color:var(--${color});}`
    );
  }
}
