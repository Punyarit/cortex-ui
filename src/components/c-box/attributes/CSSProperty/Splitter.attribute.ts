import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';

export class SplitterAttribute {
  constructor(private box: CBox.Ref, private attr: string, private value: string) {}

  init() {
    const stylesheet = this.getStylesheet();
    const selectorText = this.createSelectorText();
    this.removeExistingRule(stylesheet!, selectorText);

    const [size, source, color] = this.value.split(' ');
    const newRule = this.createRule(selectorText, size, source, color);

    stylesheet?.insertRule(newRule);
  }

  private getStylesheet() {
    return this.box.shadowRoot?.styleSheets[0];
  }

  private createSelectorText() {
    return `:host([${this.attr}])`;
  }

  private removeExistingRule(stylesheet: CSSStyleSheet | undefined, selectorText: string) {
    const indexSelector = findCssRuleIndex(stylesheet!, selectorText);
    if (typeof indexSelector === 'number') {
      stylesheet?.deleteRule(indexSelector);
    }
  }

  private createRule(selectorText: string, size: string, source: string, color: string) {
    const sourceWithImportant = source.endsWith('!') ? '!important' : '';
    const sizeWithImportant = size.endsWith('!') ? '!important' : '';
    const colorWithImportant = color.endsWith('!') ? '!important' : '';

    return `${selectorText} {
      --${this.attr}: ${source.replace('!', '')}${sourceWithImportant};
      --${this.attr}-size: var(--size-${size.replace('!', '')})${sizeWithImportant};
      --${this.attr}-color: var(--${color.replace('!', '')})${colorWithImportant};
    }`;
  }
}
