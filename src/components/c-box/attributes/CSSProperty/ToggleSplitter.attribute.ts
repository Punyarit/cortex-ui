import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';
import { UIScopedStyles } from '../UIScopedStyles';

export class ToggleSplitterAttribute {
  constructor(private box: CBoxUiAttribute, private attr: string, private value: string) {}

  init() {
    if (this.isUiCacheValueSet()) return;
    UIScopedStyles.setStylesheet();
    this.setValueCache();
    this.setCSSRule();
    this.setToggleEvent();
    this.box.removeAttribute(this.attr);

    this.box.valueCache?.set(this.attr, this.value);

    if (this.value !== 'none') {
      this.checkToggle();
    }
  }

  private isUiCacheValueSet() {
    return this.box.valueCache?.get(this.attr) === this.value;
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
      this.box.setAttribute(this.attr, this.box.valueCache?.get(this.attr) as string);
    } else {
      this.box.removeAttribute(this.attr);
    }
  }

  private setValueCache() {
    if (!this.box.valueCache) {
      this.box.valueCache = new Map();
    }
  }

  private setCSSRule() {
    if (this.value === 'none') return;

    const [size, source, color] = this.value.split(' ');
    UIScopedStyles.scopedProperty(
      'toggle-splitter',
      this.createStyleText(size, source, color),
      this.attr,
      this.box
    );
  }

  private createStyleText(size: string, source: string, color: string) {
    const sourceWithImportant = source.endsWith('!') ? '!important' : '';
    const sizeWithImportant = size.endsWith('!') ? '!important' : '';
    const colorWithImportant = color.endsWith('!') ? 'important' : '';

    return `
      --${this.attr}: ${source.replace('!', '')}${sourceWithImportant};
      --${this.attr}-size: var(--size-${size.replace('!', '')})${sizeWithImportant};
      --${this.attr}-color: var(--${color.replace('!', '')})${colorWithImportant};
      `;
  }
}
