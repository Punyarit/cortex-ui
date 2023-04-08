import { findCssRuleIndex } from '../../../../helpers/functions/cssRule/findCssRuleIndex';
import { abbrStylesMapper, iconStyleMapper } from '../../styles-mapper/abbr-styles-mapper';
import { ScopedIcon } from '../scoped/ScopedIcon';
import { UIScopedStyles } from '../scoped/UIScoped';

export class IconAttribute {
  constructor(private box: CBoxTest.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    const iconState = this.attr.split('-')[2] ? `:${this.attr.split('-')[2]}` : undefined;
    const prefixSuffix = this.attr.split('-')[1] === 'prefix' ? '::before' : '::after';
    ScopedIcon.scope('prop', this.createStyleText(prefixSuffix, iconState), this.attr, this.box);
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

      //active::before {}
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
