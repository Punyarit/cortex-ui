import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';

export class SplitterEachAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    const stylesheet = this.getStylesheet();
    const selectorText = this.createSelectorText();
    this.removeExistingRule(stylesheet, selectorText);

    const cssText = this.createCssText();
    const newRule = this.buildRule(selectorText, cssText);
    stylesheet?.insertRule(newRule, 0);
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

  private createCssText() {
    const attrs = this.value.split(' ');
    let cssText = '';

    for (let index = 0; index < attrs.length; index++) {
      const valueWithImportant = attrs[index].endsWith('!') ? '!important' : '';
      cssText += `--${this.attr}-attr-${index}:${attrs[index].replace(
        '!',
        ''
      )}${valueWithImportant};`;
    }

    return cssText;
  }

  private buildRule(selectorText: string, cssText: string) {
    return `${selectorText}{${cssText}}`;
  }
}
