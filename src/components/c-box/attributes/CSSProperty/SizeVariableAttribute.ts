import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';

export class SizeVariableAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    const stylesheet = this.getStylesheet();
    const selectorText = this.createSelectorText();
    this.removeExistingRule(stylesheet, selectorText);

    const newRule = this.createRule(selectorText);
    stylesheet?.insertRule(newRule);
  }

  private getStylesheet() {
    return this.box.shadowRoot?.styleSheets[0];
  }

  private createSelectorText() {
    return `:host([${this.attr}])`;
  }

  private removeExistingRule(stylesheet: CSSStyleSheet | undefined, selectorText: string) {
    const indexSelector = findCssRuleIndex(stylesheet, selectorText);
    if (typeof indexSelector === 'number') {
      stylesheet?.deleteRule(indexSelector);
    }
  }

  private createRule(selectorText: string) {
    const valueWithImportant = this.value.endsWith('!') ? '!important' : '';

    return `${selectorText} {
      --${this.attr}: var(--size-${this.value.replace('!', '')})${valueWithImportant};
    }`;
  }
}
