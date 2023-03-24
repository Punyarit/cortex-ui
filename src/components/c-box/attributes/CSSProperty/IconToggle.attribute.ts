import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { iconStyleMapper } from '../../styles-mapper/abbr-styles-mapper';
import { CBoxUiAttribute } from '../../types/attribute-changed.types';
import { ScopedIcon } from '../scoped/ScopedIcon';
import { ScopedProperty } from '../scoped/ScopedProperty';
import { UIScopedStyles } from '../scoped/UIScoped';

export class IconToggleAttribute {
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
    const prefixSuffix = this.attr.split('-')[1] === 'prefix' ? '::before' : '::after';
    ScopedIcon.scope('prop', this.createStyleText(prefixSuffix), this.attr, this.box);
  }

  private createStyleText(prefixSuffix: '::before' | '::after', iconState?: string) {
    const [size, source, color] = this.value.split(' ');
    if (size === 'none') {
      return `${iconState || ''}${prefixSuffix}{
        content: none;
      }
      `;
    } else {
      const [iconSize, iconSrc, iconColor] = iconStyleMapper.get(this.attr)!;

      const sourceWithImportant = source.endsWith('!') ? '!important' : '';
      const sizeWithImportant = size.endsWith('!') ? '!important' : '';
      const colorWithImportant = color.endsWith('!') ? '!important' : '';

      return `${iconState || ''}${prefixSuffix}{
        content: '\uE800';
        ${iconSrc}: ${source.replace('!', '')}${sourceWithImportant};
        ${iconSize}: var(--size-${size.replace('!', '')})${sizeWithImportant};
        ${iconColor}: var(--${color.replace('!', '')})${colorWithImportant};
      }
      `;
    }
  }
}
