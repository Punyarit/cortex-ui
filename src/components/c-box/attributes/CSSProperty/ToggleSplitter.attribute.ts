import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';

export class ToggleSplitterAttribute {
  constructor(private box: CBoxUiAttribute, private attr: string, private value: string) {}

  init() {
    if (this.isUiCacheValueSet()) return;

    this.setUiCache();
    this.setCSSRule();
    this.setToggleEvent();
    this.box.removeAttribute(this.attr);

    if (this.value !== 'none') {
      this.checkToggle();
    }
  }

  private isUiCacheValueSet() {
    return typeof this.box.uiCache?.[this.value] === 'number';
  }

  private setToggleEvent() {
    if (this.box.iconToggled === undefined) {
      this.box.iconToggled = false;
      this.box.addEventListener('click', this.toggleEvent);
    }
  }

  private toggleEvent = () => {
    this.box.iconToggled = !this.box.iconToggled;
    this.checkToggle();
  };

  private checkToggle() {
    if (this.box.iconToggled) {
      this.box.setAttribute(this.attr, this.box.uiCache!.value as string);
    } else {
      this.box.removeAttribute(this.attr);
    }
  }

  private setUiCache() {
    if (!this.box.uiCache) {
      this.box.uiCache = {};
    }
    this.box.uiCache.value = this.value;
  }

  private setCSSRule() {
    if (this.value === 'none') return;

    const stylesheet = this.getStylesheet();
    const selectorText = this.createSelectorText();
    this.removeExistingRule(stylesheet!, selectorText);

    const [size, source, color] = this.value.split(' ');
    const newRule = this.createRule(selectorText, size, source, color);
    this.insertRuleAndUpdateCache(stylesheet!, newRule);
  }

  private getStylesheet() {
    return this.box.shadowRoot?.styleSheets[0];
  }

  private createSelectorText() {
    return `:host([${this.attr}])`;
  }

  private removeExistingRule(stylesheet: CSSStyleSheet, selectorText: string) {
    const indexSelector = findCssRuleIndex(stylesheet, selectorText);
    if (typeof indexSelector === 'number') {
      stylesheet.deleteRule(indexSelector);
    }
  }

  private createRule(selectorText: string, size: string, source: string, color: string) {
    const sourceWithImportant = source.endsWith('!') ? '!important' : '';
    const sizeWithImportant = size.endsWith('!') ? '!important' : '';
    const colorWithImportant = color.endsWith('!') ? 'important' : '';

    return `${selectorText} {
      --${this.attr}: ${source.replace('!', '')}${sourceWithImportant};
      --${this.attr}-size: var(--size-${size.replace('!', '')})${sizeWithImportant};
      --${this.attr}-color: var(--${color.replace('!', '')})${colorWithImportant};
      `;
  }

  private insertRuleAndUpdateCache(stylesheet: CSSStyleSheet, cssRule: string) {
    const newIndex = stylesheet.cssRules.length;
    stylesheet.insertRule(cssRule, newIndex);
    this.box.uiCache![this.value] = newIndex;
  }
}
