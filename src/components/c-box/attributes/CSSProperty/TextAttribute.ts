import { abbrMultiStyleMapper } from '../../styles-mapper/abbr-styles-mapper';
import { ScopedProperty } from '../scoped/ScopedProperty';
import { UIScopedStyles } from '../scoped/UIScoped';

export class TextAttribute {
  constructor(private box: CBoxTest.Ref, private attr: string, private value: string) {}

  init() {
    UIScopedStyles.setStylesheet();
    ScopedProperty.scope('prop', this.createStyleText(), this.attr, this.box);
  }

  private createStyleText() {
    const [attrSize, attrSource, attrColor] = this.value.split(' ');

    const sizeWithImportant = attrSize.endsWith('!') ? '!important' : '';
    const sourceWithImportant = attrSource.endsWith('!') ? '!important' : '';
    const colorWithImportant = attrColor.endsWith('!') ? '!important' : '';
    const [fontSize, fontFamily, fontColor] = abbrMultiStyleMapper.get(this.attr)!;
    return `{
        ${fontFamily}: var(--${attrSource.replace('!', '')})${sourceWithImportant};
        ${fontSize}: var(--size-${attrSize.replace('!', '')})${sizeWithImportant};
        ${fontColor}: var(--${attrColor.replace('!', '')})${colorWithImportant};
      }
    `;
  }
}
